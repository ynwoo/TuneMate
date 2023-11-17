# TuneMate

> 🎵음악 취향 기반 친구 추천 뮤직플레이어🎵

새로운 친구를 사귀는데에 어려움이 있으셨나요??

음악 듣는 것을 좋아하시나요??

**TuneMate**는 **스트리밍** 기능을 제공하고 **음악 취향 기반**으로 친구를 추천해줍니다.

친구를 사귀고 함께 플레이리스트를 만들어 나가 보세요

![TuneMate_](/uploads/9a5a9570ee779fffbcb0e5a57fcd9333/TuneMate_.png)

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

<p align="center">  

<img src="/uploads/cd16a0396c4df7dde68729f4870c45b0/image.png"  width="200" height="400"/>
<img src="/uploads/34121431763481bd3c3d563801273d4a/image.png"  width="200" height="400"/>
<img src="/uploads/f0bf0b5d928267ed6bf4c60142eff45d/image.png"  width="200" height="400"/>
<figcaption align="center">1. 메인화면   2. 공연 상세 화면    3. 내 프로필 화면</figcaption>
</p>

<p align="center">
<img src="/uploads/8b9a581d4d85943411df1f4886446f53/image.png"  width="200" height="400"/>
<img src="/uploads/2a9f495cc4176f4fddfd396a94519d3d/image.png"  width="200" height="400"/>
<img src="/uploads/5217f1968f3740e4cb534a04d97a70d2/image.png"  width="200" height="400"/>
<figcaption align="center">4. 친구목록 화면   5. 채팅 화면    6. 친구추천 화면</figcaption>
</p>

<p align="center">
<img src="/uploads/16e8f40f196184b0dccc869253498f54/image.png"  width="200" height="400"/>
<img src="/uploads/6cf0754895933682beff99b9e676d173/image.png"  width="200" height="400"/>
<img src="/uploads/a4c684a48f585a6731c0cb93464a1531/image.png"  width="200" height="400"/>
<figcaption align="center">7. 공고 화면   8. 공고 상세 화면    9. 공고 생성 화면</figcaption>
</p>

<!-- ### 메인 화면
<img src="/uploads/cd16a0396c4df7dde68729f4870c45b0/image.png"  width="200" height="400"/> |

### 공연 상세 화면
<img src="/uploads/34121431763481bd3c3d563801273d4a/image.png"  width="200" height="400"/>

### 내 프로필 화면
<img src="/uploads/f0bf0b5d928267ed6bf4c60142eff45d/image.png"  width="200" height="400"/> -->

<!-- ### 친구 목록 화면
<img src="/uploads/8b9a581d4d85943411df1f4886446f53/image.png"  width="200" height="400"/>

### 채팅 화면
<img src="/uploads/2a9f495cc4176f4fddfd396a94519d3d/image.png"  width="200" height="400"/>

### 친구 추천 화면
<img src="/uploads/5217f1968f3740e4cb534a04d97a70d2/image.png"  width="200" height="400"/> -->

<!-- ### 공고 화면
<img src="/uploads/16e8f40f196184b0dccc869253498f54/image.png"  width="200" height="400"/>

### 공고 상세 화면
<img src="/uploads/6cf0754895933682beff99b9e676d173/image.png"  width="200" height="400"/>

### 공고 생성 화면
<img src="/uploads/a4c684a48f585a6731c0cb93464a1531/image.png"  width="200" height="400"/> -->


## 🐳 아키텍처

![Architecture](/uploads/d75e66e5ae9c438314ddd03f7fe2f006/Architecture.png)

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

![image](/uploads/acfb2d76e7995d8364ba033ab29596ab/image.png)
