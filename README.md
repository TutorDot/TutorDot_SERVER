# 🧑🏼‍🏫 튜터닷 -  안녕하세요, 과외 관리의 마침표 [ Tutor. ] 입니다!
![image](https://user-images.githubusercontent.com/22907830/86105632-8b4ea980-bafa-11ea-8b2d-dc329635ea07.png)

## 🔥SERVER  - 엄서영 🧞‍♂️, 권세희 🧞‍♀️, 이유영 🧞
#### ✨ 사용 언어, 기술 스택
![image](https://user-images.githubusercontent.com/22907830/86451099-62762080-bd55-11ea-8ebf-a3afbad43c6f.png)

### ✌ 안드로이드 버전
https://play.google.com/store/apps/details?id=com.tutor.tutordot

### ✌ IOS 버전
https://apps.apple.com/kr/app/%ED%8A%9C%ED%84%B0%EB%8B%B7-%ED%8A%9C%ED%84%B0%EB%A7%81-%EA%B4%80%EB%A6%AC%EC%9D%98-%EB%A7%88%EC%B9%A8%ED%91%9C/id1543140037

### ☑️ 핵심기능 설명 ✔️

💡 수업 방 구현 : 회원가입 시 튜터/튜티 중 역할을 선택합니다. 튜터가 과외 방을 만들고, 초대코드를 입력하여 튜티(학생, 학부모님)들이 그 방에 참여합니다.<br>
💡 공유 캘린더 : 튜터가 수업 일정을 공유 캘린더에 등록 및 변경할 수 있으며, 튜티가 이를 실시간으로 확인할 수 있습니다.<br>
💡 수업 일지 : 지난 수업 일정이 자동으로 수업 일지에 등록되어, 튜터가 진도, 숙제, 숙제 이행률을 등록할 수 있습니다.<br>
💡 다양한 알림 : 수업 일지가 추가되었을 때, 내일 수업이 있을 때, 수업료를 입금할 시간이 되었을 때, 수업 일정이 변경되었을 때 푸시 알림이 갑니다. 알림 탭에서 지난 알림들을 모아 볼 수도 있습니다.<br>

### 📄 기능명세서 ✔️

[👀 기능명세서 노션링크](https://www.notion.so/Server-5e780fef15c440fba3e6ddf43a0452a6)
![왕왕](https://user-images.githubusercontent.com/53335160/86526523-f3710700-becf-11ea-8d7b-6e23e9c2b08e.png)

### 🖨 Api 명세서 (링크) ✔️

####  Wiki 버전
[👀 튜터닷 api 명세서 Wiki링크](https://github.com/TutorDot/TutorDot_SERVER/wiki)

#### 스프레드 시트버전
![image](https://user-images.githubusercontent.com/22907830/87694883-b529f080-c7c9-11ea-86ca-452c3e8d7e24.png)

#### 📷 뷰별 api 명세서 [화면과 함께 설명 .pdf] - 화면별 뷰캡쳐
[👀 파일 다운로드](https://drive.google.com/file/d/1Zxlv2JgsUoj22IsQl2P9Y8PxnCa1Rx8E/view?usp=sharing)

#### 🧚‍♀️ Postman Runner [화면과 함께 설명 .pdf] – 실행 후 캡쳐
[👀 파일 다운로드](https://drive.google.com/file/d/1m-IA_PyuAVUil-HjWfEUOc1R4ErD0YOr/view?usp=sharing)

### 📦 ERD ✔️
![ERDERDERD](https://user-images.githubusercontent.com/53335160/86786445-f9691280-c09e-11ea-8dd2-e958437bfde9.png)

### 👭🏼 역할분담 ✔️
- all : **기능 명세서 정리**, **테이블 초기 셋팅(변수이름 서)**, **보일러플레이트 작성**, **Dependencies Module작성**, **api에 해당하는 뷰캡쳐**,
- 서영 🧞‍♂️ : **api 명세서 스프레드시트 정리**, **api 명세서 wiki(lecture.js, notice.js)**, **SQL연결**, **ERD 검토**, **코드작성(lecture.js)**, **Bucket연결**, **EC2연결**
- 세희 🧞‍♀️ : **api 명세서 wiki(user.js, diary.js, notice.js)**, **ERD 작성 및 검토**, **코드작성(user.js, diary.js, notice.js)**
- 유영 🧞 : **api 명세서 wiki(calander.js)**,** ERD 작성 및 검토**, **코드작성(calander.js, notice.js)**

### 🛠 Dependencies Module (package.json) ✔️
```javascript
{
  "name": "practice",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "aws-sdk": "^2.696.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "pbkdf2": "^3.0.17",
    "promise-mysql": "^4.1.3",
    "rand-token": "^1.0.1"
  }
}
```
