FROM openjdk:17-jdk-slim-buster

EXPOSE 8081

# gradle 빌드 시 jar 파일 생성 경로
ARG JAR_FILE=./build/libs/*.jar

# JAR_FILE을 메인 디렉토리에 복사
COPY ${JAR_FILE} app.jar

# 시스템 진입점
ENTRYPOINT ["java","-jar","app.jar", "--spring.profiles.active=prod"]
