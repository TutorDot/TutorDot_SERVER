# 🧑🏼‍🏫 튜터닷 -  안녕하세요, 과외 관리의 마침표 [ Tutor. ] 입니다!
![image](https://user-images.githubusercontent.com/22907830/86105632-8b4ea980-bafa-11ea-8b2d-dc329635ea07.png)

## 🔥SERVER  - 엄서영 🧞‍♂️, 권세희 🧞‍♀️, 이유영 🧞
#### ✨ 사용 언어, 기술 스택
![image](https://user-images.githubusercontent.com/22907830/86451099-62762080-bd55-11ea-8ebf-a3afbad43c6f.png)

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
![image](https://user-images.githubusercontent.com/22907830/86609880-8781c200-bfe7-11ea-91c1-82440507758a.png)

### 📦 ERD
![ERD_real](https://user-images.githubusercontent.com/53335160/86785752-0b968100-c09e-11ea-9b66-a6da96137749.png)

### 👭🏼 역할분담 ✔️
- all : **기능 명세서 정리**, **테이블 초기 셋팅(변수이름 서)**, 보일러플레이트 작성, Dependencies Module작성, api에 해당하는 뷰캡쳐, 코드작성(notice.js)
- 서영 🧞‍♂️ : **api 명세서 스프레드시트 정리**, **api 명세서 wiki(lecture.js, notice.js)**, **SQL연결**, ERD 검토, 코드작성(lecture.js), Bucket연결, EC2연결
- 세희 🧞‍♀️ : **api 명세서 wiki(user.js, diary.js, notice.js)**, ERD 작성 및 검토, 코드작성(user.js, diary.js)
- 유영 🧞 : **api 명세서 wiki(calander.js)**, ERD 작성 및 검토, 코드작성(calander.js)

### 🛠 Dependencies Module (package.json)

### 📷 api에 해당하는 뷰캡쳐
