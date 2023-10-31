## 2023년 10월 12일

# 타입스크립트

- 오픈소스로 공개되어 있어 계속 개발, 유지 보수 중 발전 가능성이 아주 크다.
- 자스를 안전하게 사용할 수 있도록 타입 관련 기능을 추가한 언어
- 자스의 확장판

자바스크립트의 한계점 ?

- 동적 타입 시스템을 사용
- 변수의 타입을 코드가 실행되는 도중에 결정
- 변수의 타입이 하나로만 고정되지 않음 / 다양한 타입 변수에 넣기 가능
- 숫자에 문자열 메소드를 사용해도 실행이됨 / 실행되면 안됨
- 오류가 발생하며 서비스가 마비

정적 타입 시스템 (Java, C)

- 변수를 선언함과 동시에 타입을 정해줘야함
- 타입 관련 오류가 있으면 실행이 안됨 / 오류를 바로 알려줌
- 미리 확인이 가능함
- 모든 변수에 일일이 변수를 작성 -> 매우 귀찮고 코드가 길어진다

타입스크립트는 동적 타입 + 정적 타입을 혼합

- 모든 변수 일일이 타입 명시하지 않아도 됨
- 초기값을 가지고 알아서 타입을 지정함
- 점진적 타입 시스템이라고 부름
- 실행 전 검사를 통해 타입 안정성을 확보함
- 타입에 문제가 있을 경우 실행 안됨

### 타입스크립트 동작 원리

사람 -> 자스 -> 컴파일 -> 바이트 코드 -> 컴퓨터
컴파일러는 작성한 코드를 AST로 변환하고, 바이트 코드로 변환한다.

타스도 컴파일을 거쳐야하는데, 독특하게 진행된다.
TS -> AST -> 타입검사 -> 성공 시 JS로 변환되고 종료
실행될 때 다시 JS -> AST -> 바이트 코드로 실행됨

---

## 2023년 10월 13일

# 컴파일러 옵션 설정

```
npm init
npm i @types/node
## 컴파일러 설치
npm i typescript -g

## 버전 확인
tsc -v

## 컴파일러+node.js 한번에 타스파일을 실행할 수 있음
npm i ts-node -g

```

타입스크립트는 컴파일러 옵션을 쉽게 설정할 수 있음.

```
tsc --init
```

```
## tsconfig.json
{
  "include": ["src"]
}
```

src 디렉토리 아래에 있는 모든 파일을 한번에 컴파일 하게함 / 컴파일 범위를 지정
-> tsc만 입력하면 알아서 src를 컴파일함

```
{
  "compilerOptions": {
    "target": "ES5"
  },
  "include": ["src"]
}
```

target : JS의 버전을 설정할 수 있음

```
# index.ts
const func = () => console.log("Hello");
```

실행 시

```
# index.js
var func = function () { return console.log("Hello"); };
```

ES5에는 화살표 함수가 없어 일반 함수표현식으로 바껴서 나오는 것을 확인할 수 있음

```
# tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext"
  },
  "include": ["src"]
}
```

ESNext : 자바스크립트 최신 버전
다시 실행하면

```
# index.js
const func = () => console.log("Hello");
```

화살표 함수로 잘 만들어짐

#### 타스를 자스로 변환하는 과정이나, type 검사 등 아주 상세한 옵션들을 설정할 때에는 컴파일러 옵션즈 안에 옵션을 설정한다.

---

# 자바스크립트 모듈 옵션

### 모듈이란 ?

- 독립적으로 존재하는 프로그램의 일부로 재사용이 가능한 것들
- 자스에서는 독립된 하나의 파일을 모듈이라고 부른다.
- 특정 정보를 담은 하나의 객체거나 특정 목적을 지닌 복수의 함수로 구성하는 경우가 많음

### 모듈 시스템?

- 모듈을 사용하는 방법

### ES 모듈 시스템

- ECMAScript의 약자 줄여서 ESM
- 가장 최근 개발된 모듈 시스템으로 리액트, 뷰와 같은 최신 프론트엔드 기술은 모두 ESM을 채택

---

```
# tsconfig.js
{
  "compilerOptions": {
    "target": "ESNext",
    "moduleResolution": "node",
    "module": "CommonJS"
  },
  "include": ["src"]
}
```

CommonJS라는 옛날 모듈 옵션으로 설정

```
# hello.ts
export const hello = () => {
  console.log("hello");
};
```

```
# index.ts
import { hello } from "./hello";

hello();
```

실행하면

```
# index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("./hello");
(0, hello_1.hello)();
```

처음보는 문법의 향연 ..

```
# tsconfig.js
{
  "compilerOptions": {
    "target": "ESNext",
    "moduleResolution": "node",
    "module": "ESNext"
  },
  "include": ["src"]
}
```

모듈을 최신 버전으로 변경하고 실행

```
# hello.js
export const hello = () => {
    console.log("hello");
};
```

익숙한 ESM 코드가 나타남 !

---

outDIR: 컴파일 후 생성되는 자스 파일들이 어디에 위치했으면 좋겠는지 지정

```
# tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "moduleResolution": "node",
    "module": "ESNext",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

실행시키면 자동으로 dist 폴더가 생성되고, 그안에 자스 파일들이 생성된다.

---

strict : 엄격한 타입 검사

```
# hello.ts에 매개변수를 추가
export const hello = (message) => {
  console.log("hello" + message);
};
```

오류가 발생하지 않다가

```
# tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "moduleResolution": "node",
    "module": "ESNext",
    "outDir": "dist",
    "strict": true
  },
  "include": ["src"]
}
```

strict를 true로 지정하니 message 타입 에러가 발생한다.
타스는 매개변수들의 타입을 개발자가 직접 지정하도록 권장함.
-> 매개변수의 타입이 뭐가 될지 알수 없기 때문
true로 켜놔야 엄격하게 검사해서 오류 가능성을 줄일 수 있다.

---

- 타입스크립트는 파일을 전역 모듈로 취급함. 그래서 다른 파일에서 동일한 변수명을 사용하면 안된다.

### 해결방법 1

export, import 모듈 시스템을 사용하는 문법 키워드를 파일 내 한번이라도 작성하면 그 파일은 독립적인 격리된 파일로 취급된다.

### 해결방법 2

tsconfig.json에 옵션 추가

```
{
  "compilerOptions": {
    "target": "ESNext",
    "moduleResolution": "node",
    "module": "ESNext",
    "outDir": "dist",
    "strict": true,
    "moduleDetection": "force"
  },
  "include": ["src"]
}
```

moduleDetection : force
지정하고 실행시킨 후 js 파일 결과를 보면 자동으로 export가 추가되어 있음

```
# index.js
const a = 1;
export {};
```

## 2023년 10월 14일

와이어 프레임 제작, 발표 PPT 제작

## 2023년 10월 15일

목업 제작

## ReactNative

장점 : 쉬운 접근성(자스를 이용), 비용 절감(한번에 IOS, And 개발 가능), Fast Refresh(결과 바로 확인 가능)
단점 : 네이티브 앱에 비해 성능이 좋지 않음, 디버깅이 어려움

### 동작 방식

브릿지가 자스 스레드에서 정보를 받아 네이티브 스레드로 전달을 하는 방식
데이터 변경이 발생했을 때

- 가상 돔이 먼저 변경됨
- 가상 돔과 실제 돔을 비교하여 변경해야하는 부분을 찾음
- 찾은 부분만 변경됨
- 이후 화면 변화 발생

## 프로젝트 생성

expo 페이지 회원가입

```
npm install -g expo-cli
expo login
expo init my-first-expo
```

## JSX 문법

- react의 div처럼 View로 전체가 감싸져있어야함
- if 문을 작성할 경우 즉시 실행함수로 작성해야함
- 로직이 복잡한 경우 JSX밖에서 조건문을 처리해라

## props vs state

props : 외부(부모)에서 전달 / 수정 불가능
state : 컴포넌트가 갖고있는 데이터 / 내부에서 생성 / 수정 가능
-> state에 변화가 일어나면 컴포넌트가 리렌더링 된다.
-> 부모가 리렌더링되면 자식도 리렌더링 됨

useState

## 2023년 10월 18일

- 목업 갈아엎기
- 발표자료 준비하기

## 2023년 10월 19일

- 발표자로 준비하기(PPT)

## 2023년 10월 20일

- 중간발표 성공적

## 2023년 10월 22일

react native 학습
styledcomponent

```
App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Box from "./Box";
import Shadow from "./Shadow";
import styled, { css } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #018291;
  align-items: center;
  justify-content: center;
`;
const cssText = css`
  font-size: 20px;
  font-weight: 600;
`;
const StyledText = styled.Text`
  ${cssText}
  color: white;
`;

const ErrorText = styled(StyledText)`
  ${cssText}
  color: red;
`;

const StyledButton = styled.Button``;

export default function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <StyledText>Hi</StyledText>
      <ErrorText>bye</ErrorText>
      <StyledButton title="styled" onPress={() => alert("styled!!")} />
    </Container>
  );
}
```

```
Box.js
import React from "react";
import { View } from "react-native";

const Box = ({ style }) => {
  return <View style={[{ borderWidth: 2, width: "100%" }, style]} />;
};

export default Box;
```

```
shadow.js
import React from "react";
import { StyleSheet, View, Platform, Text } from "react-native";

const Shadow = () => {
  return (
    <View style={styles.Shadow}>
      <Text>{Platform.OS === "ios" ? "ios" : "android"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Shadow: {
    width: 200,
    height: 200,
    ...Platform.select({
      ios: {
        backgroundColor: "blue",
        shadowColor: "#000",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        backgroundColor: "skyblue",
        elevation: 20,
      },
    }),
  },
});
export default Shadow;
```

## 2023년 10월 26일

react-native 학습
API까지 도달 실패
에러에 막혔다.
내일 해결할 것 ..

## 2023년 10월 27일

TodoApp 만들기 완료
오늘도 안드로이드 스튜디오 오류때매 시간을 많이 잡아먹혔다.
이제 진짜 플레이어 시도를 할 수 있을 것 같음
주말에 시도해봐야겠다.

## 2023년 10월 31일

유튜브를 보고 열심히 따라했으나,
안드로이드는 지원을 안한다는 엔딩을 맞이하였다.
정말 큰일났다.
이번주까지만 해보고 웹으로 바꾸던지 해야겠다 ..
