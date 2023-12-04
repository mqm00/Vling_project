# Vling_project

## 실행 버전

- **node.js**: v18.13.0
- **npm**: 8.19.3
- **mongoDB**: community@6.0
- **apollo/federation**: ^0.38.1
- **apollo/gateway**: ^2.6.1
- **apollo/server**: ^4.9.5
- **apollo-server**: ^3.13.0
- **graphql-tag**: ^2.12.6
- **module**: ^1.2.5
- **mongoose**: ^8.0.2
- **nodemon**: ^3.0.2
- **Homebrew**: ^4.1.22

## 실행 환경

- **Mac Sonoma 14.0**

## 실행 포트

- **apollo server**: 5110 port
- **MongoDB connect**: 27017 port

## 실행 방법

1. **MongoDB**: `brew services start mongodb-community@6.0` (터미널에서 실행)
2. **index.js**: `npm start` (Vling_project 폴더에서 실행)

## 연결 성공 시

- 콘솔 로그: `Server ready at http://localhost:5110/`
- 콘솔 로그: `DB Connected successfully`

## 연결 실패 시

- 콘솔 로그: `'Error starting the server:', error.message`
