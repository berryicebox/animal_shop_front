# KOSTA 3차 프로젝트 : 애니멀핑 🐾 
<br/>

# 📃목차

- 개요
    - 프로젝트 목적
    - 아이디어 및 배경
    - 프로젝트 플랜
- 팀원
    - 소개 및 역할 분담
- 설계
    - 주요 기능
    - 사용된 기술 스택
    - 프로젝트 구조
    - REST API 설계
    - ERD 설계
    - 흐름도
- 동작 화면
- issue 사항
<br/>


# 📌 프로젝트 목적

- 반려동물 정보를 기반으로한 내 반려동물 맞춤 플랫폼 
- 위치기반 정보, 공공 API를 기반으로한 서비스 제공 
<br/>


# 💡 아이디어 및 배경

- 반려동물을 키우는 사람들이 내가 키우는 반려동물에 대해 더 잘 알고 다양한 생각을 공유하는게 좋다는 생각이 들었습니다. (커뮤니티, 동물백과, 펫 정보 계산기)
- 반려동물을 키우는 사람들이 더 잘 키울 수 있기를 바랍니다. (쇼핑몰 운영 & 관리자와 채팅)
- 반려동물과 함께 가볼만한 곳을 알려주고 싶었습니다. (펫 동반시설 지도 검색)
- 반려동물에게 새 가족을 만들어 주고 싶었습니다. (유기동물 관심상태 등록 및 상태 메일 전송)
  
<br/>


# 🗓️ 프로젝트 플랜

<img width="1335" height="590" alt="Image" src="https://github.com/user-attachments/assets/93a3da3a-aa9c-4422-b8fc-e42e690d0759" />

<br/>

# 🤼 팀 멤버 소개

| **항목**     | **선우**                                                                                      | **소진**                                                                                      | **정아**                                                                                      | **혁주**                                                                                      |
|:------------|:---------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------|
| **사진**     | ![한선우](https://avatars.githubusercontent.com/u/120350053?v=4)                              | ![최소진](https://avatars.githubusercontent.com/u/126531546?v=4)   | ![최정아](https://avatars.githubusercontent.com/u/177386559?v=4)   | ![석혁주](https://avatars.githubusercontent.com/u/140710676?v=4)   |
| **역할**     | BackEnd(팀장)                                                                                     | FrontEnd(부팀장)                                                                                     | FrontEnd                                                                                     | BackEnd                                                                                     |
| **GitHub**   | [한선우 GitHub](https://github.com/hamster0410)                                               | [최소진 GitHub](https://github.com/sosojean)                                                 | [최정아 GitHub](https://github.com/berryicebox)                                              | [석혁주 GitHub](https://github.com/cocoboll0)                                              |
| **주 작업**  | 1. 팀 전체 관리 <br>2. REST API 설계<br>3. ERD 설계 <br>4. 소셜 로그인, 페이, 소켓 채팅 구현<br>5. 쇼핑몰 CRUD 구현 <br>6. 발표 | 1. 프로젝트 기획 <br>2. 백엔드 통신 설계 <br>3. 지도, 채팅 구현 <br>4. 댓글 및 대댓글 로직 구현<br>5. 판매 데이터 분석 툴 구현<br>6. React 프로젝트 관리 | 1. 팀 회의 서기 <br>2. 내 반려동물 정보 기반 계산기 구현 <br>3. 동물 백과 구현<br>4. 유기동물 검색 구현 <br>5. 장바구니 및 판매자 상품관리 구현 | 1. 팀 일정 관리<br> 2. 오픈 API 전처리 <br>3. 쇼핑몰 CRUD 구현 <br>4. API 명세서 작성 <br>5. 코드 리팩토링 & QA <br>6. 발표 자료 작성 |
<br/>


# 🔑 주요 기능

- **커뮤니티**
    - 다양한 카테고리를 가진 게시판을 통해 반려동물을 키우는 사람들이 원하는 주제로 소통합니다. 
- **쇼핑몰**
    - 반려동물을 키우는데 필요한 물건들을 사용자가 직접 사고 판매합니다. 
- **유틸리티**
    - 반려동물을 키우는데 도움이 될만한 기능들을 추가했습니다. 


<br/>

    
# ⚒️ 사용된 기술 스택

<img width="1335" height="590" alt="Image" src="https://github.com/user-attachments/assets/93a3da3a-aa9c-4422-b8fc-e42e690d0759" />

<br/>


# 🌌 프로젝트 구조

```agda
Front End (React)

├── App.jsx
├── App.test.js
├── index.css
├── index.jsx
├── assets            // scss, 이미지, 폰트
│   ├── fonts
│   ├── img
│   └── styles
├── components        // 컴포넌트
│   ├── additional    // 부가기능 (유기동물 입양, 계산기, 동물백과)
│   │   ├── adopt
│   │   ├── calc
│   │   └── wiki
│   ├── board         // 커뮤니티
│   ├── chatting      // 채팅
│   ├── comment       // 댓글
│   ├── common        // 공통사용 UI요소
│   ├── layout        // 헤더, 푸터, 라우터 등
│   ├── map           // 지도
│   ├── member        // 유저
│   │   ├── myPage
│   │   │   └── items
│   │   ├── password
│   │   └── pet
│   │       └── register
│   └── shop          // 쇼핑몰(관리자, 주문, 상품, 판매자)
│       ├── admin
│       │   └── notice
│       ├── order
│       │   ├── delivery
│       ├── product
│       │   ├── QnA
│       │   ├── detail
│       │   ├── option
│       │   └── review
│       └── seller
│           ├── itemList
│           ├── itemRegister
│           └── sellerQna
├── pages            // 페이지
│   ├── additional   // 부가기능
│   ├── board        // 커뮤니티
│   ├── chatting     // 채팅
│   ├── map          // 지도
│   ├── member       // 유저
│   └── shop         // 쇼핑몰
│       ├── admin
│       ├── order
│       ├── product
│       └── seller
└── utils            // 전역함수, 데이터 등


----------------------------------------------------------------------------------------

Back End (Spring Boot)

project/
├── community                 //애니멀핑 커뮤니티 도메인
│   ├── comment               //댓글 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── heart_comment         //댓글 좋아요 CRUD
│   │   ├── controller
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── heart_post            //게시글 좋아요 CRUD
│   │   ├── controller
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── member                //회원 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   └── post                   //게시글 CRUD
│       ├── controller
│       ├── dto
│       ├── entity
│       ├── repository
│       └── service
├── global                    // 전체 프로젝트에서 공통적으로 쓰이는 서비스 모음
│   ├── admin                 // 관리자 기능 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── config                // 내부 보안 설정, 소켓 통신 
│   ├── controller            // 파일 입출력 Controller
│   ├── dto    
│   ├── init                  // 프로젝트 실행 시 초기 세팅(디렉토리 생성 등)
│   ├── pay                   // 결제 구현 CRUD
│   │   ├── config
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── security              // spring security, jwt token provider
│   └── service
├── shop                      // 애니멀핑 쇼핑몰 도메인
│   ├── cart                  // 장바구니 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── cart_item             // 장바구니 상품 CRUD
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── delivery              // 배송 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── item                  // 상품 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── item_comment          // 상품 리뷰 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── item_comment_like     // 상품 리뷰 좋아요 CRUD
│   │   ├── controller
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── main                  // 메인페이지 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   └── service
│   ├── order                 // 주문 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── order_item             // 주문 상품 CRUD
│   │   ├── dto
│   │   ├── entity
│   │   └── repository
│   ├── pet                    // 반려동물 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   ├── point                  // 상품 결제 포인트 CRUD
│   │   ├── controller
│   │   ├── dto
│   │   ├── entity
│   │   ├── repository
│   │   └── service
│   └── seller                 // 판매자 기능 CRUD
│       └── controller
└── tools                      // 유틸리티(지도 검색, 유기동물, 동물 백과, 펫 계산기)
    ├── abandoned_animal       // 유기동물 CRUD
    │   ├── controller
    │   ├── dto
    │   ├── entity
    │   ├── repository
    │   └── service
    ├── calculate              // 계산기 CRUD
    │   ├── controller
    │   ├── dto
    │   └── service
    ├── chat                   // 채팅 CRUD
    │   ├── controller
    │   ├── dto
    │   ├── entity
    │   ├── repository
    │   └── service
    ├── map_service            // 지도 CRUD
    │   ├── controller
    │   ├── dto
    │   ├── entity
    │   ├── repository
    │   └── service
    └── wiki_service            // 동물 백과 CRUD 
        ├── controller
        ├── dto
        ├── entity
        ├── repository
        └── service

```
<br/>


# ✉️ REST API 명세서
API에 대한 자세한 내용은 아래 링크를 참고하세요:

[REST API 명세서 보기](https://crimson-shingle-d7b.notion.site/api-13ddb7c32eb98022b074dd7562af351e?pvs=74)


# 🧱  ERD 설계
<img width="3339" height="2276" alt="Image" src="https://github.com/user-attachments/assets/3e6a34ac-5136-4c52-89d9-c4a7f5d768ca" />

<br/>

# 🔄  흐름도
<img width="2495" height="1161" alt="Image" src="https://github.com/user-attachments/assets/68413912-fb8e-415d-b81b-cd92d3554310" />

<br/>


# 🔥 동작 화면

### 장바구니
<p align="center">
    <img width="1133" height="767" alt="Image" src="https://github.com/user-attachments/assets/d56edac9-e1b6-4bff-b91f-4f54c407acae" />
</p>
<br/>

### 쇼핑몰 메인
<p align="center">
    <img width="1913" height="861" alt="Image" src="https://github.com/user-attachments/assets/c27c9794-626f-49fa-8edc-cf394ba9a899" />
</p>
<br/>


### 판매자 상품관리
<p align="center">
<img width="1170" height="552" alt="Image" src="https://github.com/user-attachments/assets/20e50f50-794d-424e-a867-1028461d3128" />
</p>
<br/>


<br/>


<br/>


# ❓ Issue 사항

개발 과정에서 특히 공을 들였던 부분은 아래와 같습니다:

1. **장바구니 컴포넌트 및 결제 시스템 연동**  
   - 카카오페이 결제 연동에서 일반 구매와 장바구니 구매 간 데이터 구조 차이로 인해 `useLocation`과 `useNavigate`를 사용해 두 결제를 구분할 수 있도록 하였습니다.
   - 개발 초기에는 상품 상세 컴포넌트에 장바구니 로직을 함께 작성했지만 후기에 이르며 코드가 길어져 코드 가독성을 위해 장바구니 버튼을 컴포넌트로 전환 하였습니다.
   - LocalStorage를 사용한 비로그인 회원의 장바구니 사용도 로그인 회원과 일관된 경험을 할 수 있도록 백엔드 로직과 유사하게 작동하도록 코드를 작성하였습니다.

2. **유기동물 정보 검색 필터 구현**  
   - 하나의 옵션만 선택하면 되는 일반 필터와 다르게 지역 필터는 시/도를 선택했을 때 시/군/구가 출력되도록 서브 옵션(서브 카테고리)이 필요했습니다. 일반 필터와 달리 서브 필터는 처음 구현 해 보았기에 고민이 필요했습니다.
   - Array에 각 옵션을 객체로 가공하여 저장한 후에 `find()` 등을 활용하여 서브 필터링을 구현하였습니다.


# 협업자료
- 발표 ppt 
https://www.miricanvas.com/v/142oczu
- SpringBoot(백엔드) 코드
https://github.com/hamster0410/animal_shop_back
