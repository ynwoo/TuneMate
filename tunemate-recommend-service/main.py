from typing import List


import math
from dotenv import load_dotenv
from fastapi import FastAPI, Header
import pandas as pd
import pymysql
from pydantic import BaseModel
from sklearn.metrics.pairwise import cosine_similarity
import py_eureka_client.eureka_client as eureka_client
import os


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

class ReturnDto(BaseModel):
    userId : str
    name : str
    playlistId : str
    img : str


class SongDto(BaseModel):
    title  : str
    img : str
    artist : str
    uri : str

class ResponseDto(BaseModel):
    userId : str
    spotifyUserId : str
    name : str
    email : str
    imageUrl : str
    spotifyAccessToken : str

# 노래 추천
@app.get("/api/v1/recommendation/songs", response_model = List[SongDto])
def song(UserId : str | None = Header(default=None)):

    

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
            if(song1["artist"] == "BIGBANG"): print("빅뱅")
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
                           db="MUSIC", port=int(os.environ["DATABASE_PORT"]), charset="utf8",cursorclass=pymysql.cursors.DictCursor)
    cursor = conn.cursor()
    all_songs = [] # 데이터베이스에 존재하는 모든 노래 (제목, 가수 등 노래 특징이 딕셔너리 형태로 담겨있음)
    sql = "select * from tracks"
    cursor.execute(sql)
    for songInfo in cursor.fetchall():
        all_songs.append(songInfo)


    my_songs = [] # 내 플레이리스트에 담긴 노래 uri
    sql = "SELECT track_spotify_id FROM MUSIC.track where playlist_id = (select id from playlist where user_id = %s)"
    cursor.execute(sql,UserId)

    for songUri in cursor.fetchall():

        my_songs.append(songUri.get("track_spotify_id"))


    sql = "select b.track_spotify_id, a.artist from tracks a, (SELECT track_spotify_id FROM MUSIC.track where playlist_id = (select id from playlist where user_id = %s) order by count desc limit 3) b where a.spotify_uri = b.track_spotify_id"
    cursor.execute(sql, UserId)
    songs = [] # 내 플레이리스트에 재생 순위 3위의 노래들
    recommendList = []
    for song  in cursor.fetchall():
        sql = "SELECT * FROM MUSIC.tracks where artist like %s and spotify_uri != %s order by rand() limit 3"
        cursor.execute(sql, ("%" +song["artist"].split(",")[0]+"%",song["track_spotify_id"]))
        li = cursor.fetchall()
        for i in li:
            recommendList.append(i["spotify_uri"])

        songs.append(song["track_spotify_id"])



    for mysong in songs:
        sql = "select * from tracks where spotify_uri = %s"
        cursor.execute(sql,mysong)
        top3 = cursor.fetchone()
        lili = []
        for songInfo in all_songs:
            if mysong == songInfo["spotify_uri"]: continue
            similarity = cosine_similarity(top3,songInfo) # 두 곡의 유사도
            lili.append((similarity,songInfo))
        sorted_data = sorted(lili, key=lambda x: x[0], reverse=True)[:4]
        for i in sorted_data:
            recommendList.append(i[1]["spotify_uri"])


    recommendList = set(recommendList)

    responseData = []
    for trackUri in recommendList:
        sql = "select * from tracks where spotify_uri = %s"
        cursor.execute(sql, trackUri)
        songData = cursor.fetchone()
        responseData.append(SongDto(title = songData["title"],img= songData["image"],artist = songData["artist"],uri = songData["spotify_uri"]))

    return responseData

# 사람 추천
@app.get("/api/v1/recommendation/friends", response_model=List[ReturnDto])
def root(UserId : str | None = Header(default=None)):
    conn = pymysql.connect(user=os.environ["DATABASE_USERNAME"],
                           password=os.environ["DATABASE_PASSWORD"], host=os.environ["DATABASE_URL"],
                           db="MUSIC", port=int(os.environ["DATABASE_PORT"]), charset="utf8")
    cursor = conn.cursor()
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
    count = 0
    for similarUser in similar_User.index:
        # similaruser : 유사한 사용자의 기본키
        # UserService에  해당 사용자에 대한 정보를 요청하여 받아 리턴해준다.
        if similar_User[similarUser] != 0:
            if(count == 5): break
            recommend.append(similarUser)
            count += 1


    def request(userId):
            # 다른 서비스로 HTTP GET 요청 보내기
        response = eureka_client.do_service_async("user-service" , "/users/"+userId, return_type=ResponseDto)
        print(response)
        return response
    responseList = []
    for user in recommend:
        sql = "select playlist_spotify_id from playlist where user_id = %s"
        cursor.execute(sql,user)
        playlistId = cursor.fetchone
        userOb = request(user)
        print(userOb)
        print(userOb.get("userId"))
        responseList.append(ReturnDto(userId=userOb.get("userId"),img=userOb.get("imageUrl"),name=userOb.get("name"),playlistId=playlistId))
    
    return responseList
