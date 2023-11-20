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
<img src="/uploads/09225bab11f03f692ea7bee5bb29cfbb/KakaoTalk_20231120_151933572.png"  width="200" height="400"/>
<img src="/uploads/318f4f4a953039c4cc7a8a39fb444cb9/KakaoTalk_20231120_151955626.png"  width="200" height="400"/>
<img src="/uploads/edf4b2583f63aafb5f2c9db002d75eac/KakaoTalk_20231120_152010120.png"  width="200" height="400"/>
<figcaption align="center">1. 로그인 화면   2. 메인화면    3. 내 프로필 화면</figcaption>
</p>

<p align="center">  
<img src="/uploads/d4998969c6225ea890d9634de23b4ac8/KakaoTalk_20231120_152027611.png"  width="200" height="400"/>
<img src="/uploads/168b6891f32606bff37bc5ba9c9f7e94/KakaoTalk_20231120_152049220.png"  width="200" height="400"/>
<img src="/uploads/4f01998ba5c87ef4bd8f5bee07e7bf88/KakaoTalk_20231120_152123131.png"  width="200" height="400"/>
<figcaption align="center">4. 플레이리스트 설정   5. 곡 추가    6. 플레이리스트 순서 변경</figcaption>
</p>

<p align="center">
<img src="/uploads/5d23dcc409e711f161a7799122010e1d/KakaoTalk_20231120_152152304.png"  width="200" height="400"/>
<img src="/uploads/5b45ca072c7c03e9c0b88a2bba5fa352/KakaoTalk_20231120_152215791.png"  width="200" height="400"/>
<img src="/uploads/a5cffd3b3c87571e71c5be7e1fefa65c/Architecture.png"  width="200" height="400"/>
<figcaption align="center">7. 친구목록 화면   8. 친구 추천 화면    9. 공고 모집 목록</figcaption>
</p>

<p align="center">
<img src="/uploads/372c891f4bdfaf0dec7ae74a74813c59/KakaoTalk_20231120_152246967.png"  width="200" height="400"/>
<img src="/uploads/28fd622d9bdeced0ead61c3dedd4cada/KakaoTalk_20231120_152303063.png"  width="200" height="400"/>
<img src="/uploads/b994867abdd4b33d41637acdedb84fe9/KakaoTalk_20231120_152317391.png"  width="200" height="400"/>
<img src="/uploads/2d53c3f47082855fba542683401b7ecf/KakaoTalk_20231120_152339130.png"  width="200" height="400"/>
<figcaption align="center">10. 공고 상세 화면   11. 공고 요청 화면    12. 플레이리스트 화면1 13. 플레이리스트 화면2</figcaption>
</p>


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

![image](/uploads/a10a32cf6b48dafaa84ead1a1b0310c4/image.png)
![image](/uploads/53ac98bc0062883b649ed000f4216774/image.png)
