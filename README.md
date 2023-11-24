# TuneMate

> 🎵음악 취향 기반 친구 추천 뮤직플레이어🎵

새로운 친구를 사귀는데에 어려움이 있으셨나요??

음악 듣는 것을 좋아하시나요??

**TuneMate**는 **스트리밍** 기능을 제공하고 **음악 취향 기반**으로 친구를 추천해줍니다.

친구를 사귀고 함께 플레이리스트를 만들어 나가 보세요

![image](https://github.com/yoonwoo-kim/TuneMate/assets/59324129/658a5193-0f09-4276-83e1-3048557b00c6)


## 💡 주요기능

| 구분 | 기능                          | 설명                                                                                                    |
| ---- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | 음악 스트리밍                 | Spotify API를 활용한 음악 스트리밍 서비스                                                               |
| 2    | 음악 취향 기반 친구 추천      | 코사인 유사도를 이용하여 대표 플레이리스트 기반 유사한 사용자 추천                                      |
| 3    | 음악 취향 기반 곡 추천        | 콘텐츠 기반 필터링을 이용하여 가수 이름, 템포, 에너지 등 곡의 특징을 벡터화하여 유사도 측정 후 곡 추천  |
| 4    | 플레이리스트 실시간 공동 편집 | SSE(Server-Sent-Event)를 활용하여 플레이리스트 변경 이벤트 발생 시 연결 된 사람에게 변경 된 데이터 전송 |

## 💡 부가기능

| 구분 | 기능           | 설명                                                     |
| ---- | -------------- | -------------------------------------------------------- |
| 1    | 친구와의 채팅  | WebSocket, RabbitMQ 활용하여 구현                        |
| 2    | 공연 정보 제공 | 스케줄러 활용, 인터파크 티켓 사이트 크롤링하여 정보 제공 |
| 3    | 만남 일정 관리 | 공연 정보를 토대로 만남 일정 관리                        |

## 🖥️ 서비스 화면

- 로그인 화면
- 메인화면
- 내 프로필

<p align="center">  
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/c0847c90-4f63-411e-b1c2-634c4a2e7adc"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/f58be4ee-5f34-48c1-a71c-9ffff718d2cb"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/6a2fa3ba-607b-4cbd-9861-b83d15bcd19b"  width="200" height="400"/>
</p>

---
<br>

- 플레이리스트 설정
- 곡 추가
- 플레이리스트 순서 변경
<p align="center">  
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/e38627ad-2a0a-4b19-8c7d-ec1b2738f289"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/c70354b8-6e57-4d83-a0da-b3f77a87613b"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/8c51d96a-4363-4ffa-ae87-d70bde5535e4"  width="200" height="400"/>

</p>

---
<br>

- 친구목록 화면
- 친구 추천 화면
- 공고 모집 목록
<p align="center">
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/abb249d1-e4f3-4463-88fc-882e31bae2e3"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/46fd7bfb-689a-45ac-b36a-150beaaf9dec"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/6e6076e9-885b-499e-b510-d49431dcd5f9"  width="200" height="400"/>
</p>

---
<br>

- 공고 상세 화면
- 공고 요청 화면
- 플레이리스트 화면
- 플레이리스트 화면 2
<p align="center">
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/59d9c101-e0d2-4e11-867a-a4d5076ee955"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/622ae456-644e-42c1-b220-6dfc5ed04682"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/bf18eef3-7e35-4fcb-9e60-e268b54a8d28"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/c30ba65f-feb6-43e0-8334-b01d4870e15e"  width="200" height="400"/>
</p>

---
<br>

- 채팅 화면
- 공동 플레이리스트 곡 추가(유저 1)
- 공동 플레이리스트 곡 추가(유저 2)

<p align="center">
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/9c3349bc-4ae7-4b0a-b7c6-90867715841d"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/78acfc3c-5b2e-48ba-bea9-459588a882da"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/ec37f6a2-973f-43a4-bd5e-02dfa764c3fb"  width="200" height="400"/>
</p>

---
<br>

- 공동 플레이리스트 곡 위치 변경(유저 1)
- 공동 플레이리스트 곡 위치 변경(유저 2)

<p align="center">
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/640b2a43-1b74-4bf9-950b-c85afee00128"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/e3249d3d-28e5-4fe5-a7f5-23dbee463071"  width="200" height="400"/>

</p>

---
<br>

- 공동 플레이리스트 곡 삭제(유저 1)
- 공동 플레이리스트 곡 삭제(유저 2)

<p align="center">
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/b0adac43-9264-4364-99e4-77ffacdd3155"  width="200" height="400"/>
<img src="https://github.com/yoonwoo-kim/TuneMate/assets/59324129/b13435bb-fbb5-4437-ac7e-135defe18275"  width="200" height="400"/>

</p>


## 🐳 아키텍처

![image](https://github.com/yoonwoo-kim/TuneMate/assets/59324129/bf370ef3-e7b9-4a2a-a6bb-472378120d5d)

## 🛠️ 기술스택

`Backend`

- IntelliJ IDE
- Springboot 3.1.5
- Spring cloud netflix eureka
- Spring cloud gateway
- Spring cloud openfeign
- Spring security
- Spring Data JPA
- QueryDSL
- Java 17
- WebSocket
- RabbitMQ
- SSE
- JWT
- Gradle
- Swagger
- FastAPI
- Pandas

`Data`

- mySQL
- Redis
- MongoDB

`Frontend`

- visual Studio Code IDE
- Next.js
- React
- Bootstrap
- Spotify API

`Infra`

- Mobaxterm
- AWS EC2
- Nginx
- Jenkins
- Docker
- Docker-compose

`etc`

- Gitlab
- Notion
- Jira
- Mattermost

## 📅 프로젝트 진행 기간

2023.10.10(화) ~ 2023.11.17(금) (6주간 진행)

## 👨‍💻 팀원 소개

![image](https://github.com/yoonwoo-kim/TuneMate/assets/59324129/dded2a5a-f00f-4dfa-ae29-19f19d4067ed)
![image](https://github.com/yoonwoo-kim/TuneMate/assets/59324129/3f343c76-ba3d-4214-87c8-92097ee342c3)
