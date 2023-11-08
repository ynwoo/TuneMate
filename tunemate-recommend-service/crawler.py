import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
import pymysql
from datetime import datetime

load_dotenv()
os.environ["DATABASE_URL"] = os.getenv("DATABASE_URL")
os.environ["DATABASE_USERNAME"] = os.getenv("DATABASE_USERNAME")
os.environ["DATABASE_PASSWORD"] = os.getenv("DATABASE_PASSWORD")
os.environ["DATABASE_PORT"] = os.getenv("DATABASE_PORT")

# DB연결
conn = pymysql.connect(user=os.environ["DATABASE_USERNAME"],
                       password=os.environ["DATABASE_PASSWORD"], host=os.environ["DATABASE_URL"],
                       db="GROUPSERVICE", port=int(os.environ["DATABASE_PORT"]), charset="utf8")

cursor = conn.cursor()

# 테이블 생성
# sql = '''CREATE TABLE `concert` (
# 	`id`	Long	NOT NULL,
# 	`image`	varchar(255)	NULL,
# 	`title`	varchar(255)	NULL,
# 	`place`	varchar(255)	NULL,
# 	`stdate`	DATE	NULL,
# 	`eddate`	DATE	NULL
# );
# '''
# cursor.execute(sql)

# 크롤링
genre_url_mapping = {
    "Bal": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=Bal',
    "Roc": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=Roc',
    "Rap": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=Rap',
    "Jaz": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=Jaz',
    "Por": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=Por',
    "For": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=For',
    "Fes": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=Fes',
    "Ind": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&SubCa=Ind',
    "All": 'https://ticket.interpark.com/TPGoodsList.asp?Ca=Liv',
}
for genre, url in genre_url_mapping.items():
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')

        div = soup.select_one('div.stit')
        tr_elements = div.select('table > tbody > tr')
        for tr in tr_elements:
            # 각 "tr" 요소에서 필요한 데이터를 추출하거나 처리합니다.
            td_elements = tr.find_all('td')

            if len(td_elements) >= 4:
                # 이미지 URL 추출
                image_url = td_elements[0].find('img')['src']

                # 제목 추출
                title = td_elements[1].find('a').text.strip()

                # 장소 추출
                location = td_elements[2].text.strip()

                # 날짜 추출 및 "br" 태그 제거
                date_element = td_elements[3]
                for br in date_element.find_all('br'):
                    br.extract()
                date = date_element.get_text(strip=True)
                st_date, ed_date = date.split("~")
                # 날짜를 파싱하여 datetime 객체로 변환
                st_date = datetime.strptime(st_date, "%Y.%m.%d")
                # 새로운 날짜 형식으로 포맷
                st_date = st_date.strftime("%Y-%m-%d")
                # 날짜를 파싱하여 datetime 객체로 변환
                ed_date = datetime.strptime(ed_date, "%Y.%m.%d")
                # 새로운 날짜 형식으로 포맷
                ed_date = ed_date.strftime("%Y-%m-%d")

                # 값 삽입하기 전에 중복 확인
                check_sql = "SELECT COUNT(*) FROM concert WHERE title = %s"
                cursor.execute(check_sql, (title,))
                result = cursor.fetchone()

                if result[0] == 0:
                    # 값 삽입
                    sql = "INSERT INTO concert (image, title, place, stdate, eddate, genre) VALUES (%s, %s, %s, %s, %s, %s)"
                    cursor.execute(sql, (image_url, title, location, st_date, ed_date, genre))
                    # 원하는 정보 출력
                    print(f'이미지 URL: {image_url}')
                    print(f'제목: {title}')
                    print(f'장소: {location}')
                    print(f"장르: {genre}")
                    print(f'시작 날짜: {st_date}')
                    print(f'시작 날짜: {ed_date}')
                    print(f'"{title}" 추가되었습니다.')
                else:
                    print(f'"{title}" 이미 존재합니다. 삽입을 건너뜁니다.')

                print('------------------------------------------------------------------------')

    else:
        print(response.status_code)

# DB 연결 해제
conn.commit()
conn.close()
