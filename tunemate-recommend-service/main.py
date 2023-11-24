import random
from typing import List, Optional

import math
from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
import pandas as pd
import pymysql
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
import py_eureka_client.eureka_client as eureka_client
import os
import requests
import schedule
import time
import threading
from crawler import crawl_concert_info

# 스케줄러 초기화
schedule.every().day.at("00:00").do(crawl_concert_info)


# 스케줄링 작업을 실행할 백그라운드 스레드 시작
def schedule_thread():
    while True:
        schedule.run_pending()
        time.sleep(1)


load_dotenv()
os.environ["DATABASE_URL"] = os.getenv("DATABASE_URL")
os.environ["DATABASE_USERNAME"] = os.getenv("DATABASE_USERNAME")
os.environ["DATABASE_PASSWORD"] = os.getenv("DATABASE_PASSWORD")
os.environ["EUREKA_SERVER"] = os.getenv("EUREKA_SERVER")
os.environ["APP_NAME"] = os.getenv("APP_NAME")
os.environ["INSTANCE_PORT"] = os.getenv("INSTANCE_PORT")
os.environ["INSTANCE_HOST"] = os.getenv("INSTANCE_HOST")
os.environ["DATABASE_PORT"] = os.getenv("DATABASE_PORT")
app = FastAPI()


@app.on_event("startup")
async def startup_event():
    await eureka_client.init_async(eureka_server=os.environ["EUREKA_SERVER"],
                                   app_name=os.environ["APP_NAME"],
                                   instance_port=int(os.environ["INSTANCE_PORT"]),
                                   instance_host=os.environ["INSTANCE_HOST"]
                                   )


# 스레드를 시작하여 스케줄링 작업 실행
schedule_thread_thread = threading.Thread(target=schedule_thread)
schedule_thread_thread.start()


class ReturnDto(BaseModel):
    userId: str
    name: str
    playlist: str
    img: str | None
    similarity: float


class SongDto(BaseModel):
    title: str
    img: str
    artist: str
    uri: str


class ResponseDto(BaseModel):
    userId: Optional[str]
    name: Optional[str]
    img: Optional[str]
    playlistId: str
    similarity: float


class Images(BaseModel):
    images: Optional[List[dict]]

class Music(BaseModel):
    album: Images
    artists: List[str]
    name: str
    uri: str

# 노래 추천
@app.get("/recommendation/songs", response_model=List[Music])
def song(UserId: str | None = Header(default=None)):
    def cosine_similarity(song1, song2):
        dot_product = 0.0
        magnitude1 = 0.0
        magnitude2 = 0.0
        # 모든 특성과 artist 정보 포함
        features = ["tempo", "energy", "danceability", "acousticness"]
        for feature in features:
            dot_product += song1[feature] * song2[feature]
            magnitude1 += song1[feature] ** 2
            magnitude2 += song2[feature] ** 2

            # "artist" 정보를 원-핫 인코딩으로 변환하여 처리
        if song1["artist"] == song2["artist"]:
            dot_product += 1  # 같은 artist면 1
            magnitude1 += 1  # artist 정보를 더해줌
            magnitude2 += 1  # artist 정보를 더해줌

        magnitude1 = math.sqrt(magnitude1)
        magnitude2 = math.sqrt(magnitude2)

        if magnitude1 == 0.0 or magnitude2 == 0.0:
            return 0.0  # Divide by zero, return minimum similarity

        return dot_product / (magnitude1 * magnitude2)

    conn = pymysql.connect(user=os.environ["DATABASE_USERNAME"],
                           password=os.environ["DATABASE_PASSWORD"], host=os.environ["DATABASE_URL"],
                           db="MUSIC", port=int(os.environ["DATABASE_PORT"]), charset="utf8",
                           cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()
    sql = "SELECT count(*) as count FROM track where playlist_id = (select id from playlist where user_id = %s);"
    cursor.execute(sql, UserId)
    counting = cursor.fetchone()["count"]
    if (counting == 0):
        raise HTTPException(status_code=400, detail="Not Enough Music Data")

    all_songs = []  # 데이터베이스에 존재하는 모든 노래 (제목, 가수 등 노래 특징이 딕셔너리 형태로 담겨있음)
    sql = "select * from tracks"
    cursor.execute(sql)
    for songInfo in cursor.fetchall():
        all_songs.append(songInfo)

    my_songs = []  # 내 플레이리스트에 담긴 노래 uri
    sql = "SELECT track_spotify_id FROM MUSIC.track where playlist_id = (select id from playlist where user_id = %s)"
    cursor.execute(sql, UserId)

    for songUri in cursor.fetchall():
        my_songs.append(songUri.get("track_spotify_id"))

    sql = "select b.track_spotify_id, a.artist from tracks a, (SELECT track_spotify_id FROM MUSIC.track where playlist_id = (select id from playlist where user_id = %s) order by count desc limit 3) b where a.spotify_uri = b.track_spotify_id"
    cursor.execute(sql, UserId)
    songs = []  # 내 플레이리스트에 재생 순위 3위의 노래들
    recommendList = []
    for song in cursor.fetchall():
        sql = "SELECT * FROM MUSIC.tracks where artist like %s and spotify_uri != %s order by rand() limit 3"
        cursor.execute(sql, ("%" + song["artist"].split(",")[0] + "%", song["track_spotify_id"]))
        li = cursor.fetchall()
        for i in li:
            recommendList.append(i["spotify_uri"])

        songs.append(song["track_spotify_id"])
    print(recommendList)
    sql = "SELECT track_spotify_id FROM MUSIC.track where playlist_id = (select id from playlist where user_id = %s)"
    cursor.execute(sql, UserId)
    myMusicList = []

    for i in cursor.fetchall():
        myMusicList.append(i["track_spotify_id"])
    for mysong in songs:
        sql = "select * from tracks where spotify_uri = %s"
        cursor.execute(sql, mysong)
        top3 = cursor.fetchone()
        lili = []
        for songInfo in all_songs:
            if mysong == songInfo["spotify_uri"]: continue
            similarity = cosine_similarity(top3, songInfo)  # 두 곡의 유사도
            lili.append((similarity, songInfo))
        sorted_data = sorted(lili, key=lambda x: x[0], reverse=True)
        count = 0
        for i in sorted_data:
            if (i[1]["spotify_uri"] not in myMusicList):
                count += 1
                recommendList.append(i[1]["spotify_uri"])
                if count == 5:
                    break

    recommendList = set(recommendList)

    responseData = []
    for trackUri in recommendList:
        sql = "select * from tracks where spotify_uri = %s"
        cursor.execute(sql, trackUri)
        songData = cursor.fetchone()
        # responseData.append(SongDto(title=songData["title"], img=songData["image"], artist=songData["artist"],
        #                             uri=songData["spotify_uri"]))
        artist = []
        img = Images(images=[{"url" : songData["image"]}])
        responseData.append(Music(name=songData["title"],artists=songData["artist"].split(","),uri=songData["spotify_uri"],album=img))

    return responseData


# 사람 추천
@app.get("/recommendation/friends", response_model=List)
def root(UserId: str | None = Header(default=None)):
    randomName = ["고범희","고범우","남완수","남완우","김윤수","김윤희","고윤우","김범수","남윤우","남범수","강한나","강한수","권현우","권현수","박성우","박성수","박성희","박현우","권성준","양윤우","양우철","권기윤","박은수","박은우","김민아","김민수","김민우","김민희","신민철","곽민철","한동민","권나라","이승기","강호동","유재석","송민호","장원영","하동훈","탁재훈","이상민","김준호","김정은","김정일","공효진","장나라","이정재","장우성","정지훈","김재헌","박지성","손흥민","황희찬","이강인","박주영","이청용","기성용","지동원","설기현","서장훈","민경훈","옥택연","김병만","박정희","김근우","이창원","송주형","류근필","이태준","고은영","김도운","이재용","서수정","우찬희","박은정","양승현","백건우","김진현","박주원","박준원","서주원"]
    nameSet = {"1": "고범순", "2": "김도식", "3": "김민석", "4": "이찬영", "5": "김운수", "6": "김근우", "7": "강한나", "8": "권연우", "9": "박상준", "10": "민동우", "12345": "남상희","1234":"채겨울","1111":"노선균"}
    conn = pymysql.connect(user=os.environ["DATABASE_USERNAME"],
                           password=os.environ["DATABASE_PASSWORD"], host=os.environ["DATABASE_URL"],
                           db="MUSIC", port=int(os.environ["DATABASE_PORT"]), charset="utf8")
    cursor = conn.cursor()

    # 대표 플레이리스트가 없거나 대표 플레이리스트에 담긴 곡이 10곡 미만일 경우 에러
    sql = "SELECT count(*) FROM MUSIC.track where playlist_id = (select id from playlist where user_id = %s);"
    cursor.execute(sql, UserId)
    counting = cursor.fetchone()[0]
    if (counting < 10):
        raise HTTPException(status_code=400, detail="Not Enough Music Data")

    sql = "SELECT distinct(track_spotify_id) FROM track"
    cursor.execute(sql)
    li = cursor.fetchall()

    li2 = []
    for i in li:
        li2.append(i[0])
    sql = "SELECT a.user_id, b.track_spotify_id FROM track as b, playlist as a where a.id = b.playlist_id"
    cursor.execute(sql)
    li3 = cursor.fetchall()
    sql = "select user_id from playlist"
    cursor.execute(sql)
    li4 = cursor.fetchall()
    userList = []
    for userId in li4:
        userList.append(userId[0])
    df = pd.DataFrame(columns=li2, index=userList)

    for userId in li4:
        user = userId[0]
        sql = "select track_spotify_id from (SELECT a.user_id, b.track_spotify_id FROM track as b, playlist as a where a.id = b.playlist_id) as b where user_id = %s "
        cursor.execute(sql, user)
        li5 = cursor.fetchall()
        songs = {a[0] for a in li5}
        for spotifyId in songs:
            df.loc[user][spotifyId] = 1
    df = df.fillna(0)
    similarities = cosine_similarity(df)
    similarity_df = pd.DataFrame(similarities, columns=df.index, index=df.index)

    similar_User = similarity_df[UserId].sort_values(ascending=False)[1:]
    print(similar_User)
    recommend = []
    similaritys = []
    # count = 0
    for similarUser in similar_User.index:
        # similaruser : 유사한 사용자의 기본키
        # UserService에  해당 사용자에 대한 정보를 요청하여 받아 리턴해준다.
        if similar_User[similarUser] != 0:
            # if(count == 5): break
            similaritys.append(similar_User[similarUser])
            recommend.append(similarUser)
            # count += 1

    def request(userId):
        # 다른 서비스로 HTTP GET 요청 보내기
        response = requests.get("http://k9A603.p.ssafy.io:8083/users/" + userId, headers={"UserId": userId})
        # response = await eureka_client.do_service_async("user-service" , "/users/"+userId, return_type=ResponseDto, headers={"UserId" : userId})

        return response.json()

    responseList = []
    print(recommend)
    for i in range(len(recommend)):
        sql = "select playlist_spotify_id from playlist where user_id = %s"
        cursor.execute(sql, recommend[i])
        playlistId = cursor.fetchall()[0][0]
        userOb = request(recommend[i])
        print(userOb)
        print(recommend[i], nameSet.get(recommend[i]), playlistId, similaritys[i])

        if(recommend[i] in nameSet.keys()):
            print("더미데이터!!")
            responseList.append(ReturnDto(userId=recommend[i], img="https://velog.velcdn.com/images/yoonwoo-kim/post/3060d189-1473-4a02-9658-28dc050d4c7e/image.png", name=nameSet.get(recommend[i]),
                                      playlist=playlistId, similarity=similaritys[i]))
        else:
            print("진짜 데이터!!")
            print(userOb.get("userId"))
            print(userOb.get("imageUrl"))
            print(userOb.get("name"))
            print(playlistId)
            print(similaritys[i])

            #if(nameSet.get(recommend[i]) == None): continue
            responseList.append(ReturnDto(userId=userOb.get("userId"), img=userOb.get("imageUrl"), name=userOb.get("name"),
                                        playlist=playlistId, similarity=similaritys[i]))

    return responseList
