# 유튜브 뮤직 클론 코딩 프로젝트

본 프로젝트는 유튜브 뮤직 클론 코딩 프로젝트로, 풀스택 개발을 목표로 진행하였습니다. 현재 페이지는 프로젝트 중 프론트엔드 프로젝트의 설명을 담고 있습니다.

### 프로젝트 소개

프로젝트에 사용된 스킬입니다.
<br/>

![react](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![react-hook-form](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)
![recoil](https://img.shields.io/badge/Recoil-3578E5.svg?style=for-the-badge&logo=Recoil&logoColor=white)
![styled-components](https://img.shields.io/badge/styledcomponents-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)
![react-router](https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white)

<br/>

자주 이용하는 웹 사이트인 유튜브 뮤직의 디자인과 기능을 비슷하게 구현하고자 했습니다. 예상치 못한 사용자의 행동과 사용자의 편의를 고려했습니다. 사용자의 입력의 경우, 서버로 입력 정보를 전송하기 전에 유효성 검사를 하여 오류를 최소화 하고자 했습니다. 유튜브 뮤직의 기능 중 `재생목록` 에 관련한 기능들에 집중했습니다.

<br/>

### 프로젝트 일정

24.05.26 - 24.06.15 : 1차 배포 완료(80% 완성도, 기본 기능 동작)

### 문제 및 해결

#### 1. 로그인 (프론트엔드 관점)

로그인은 로컬 로그인과 구글 로그인으로 나눠 구현했습니다. 구글 API를 통해 구글 로그인을 구현했습니다. 로컬 로그인을 하던 중 발생한 문제는 백엔드의 세션에 로그인 정보가 저장되지 않는 것이었습니다. DB에 세션이 저장된 것은 확인하였지만 세션을 조회하거나 로그아웃을 통해 삭제할 수 없었습니다. 원인을 파악해보니 서버의 문제가 아니라 사용자의 입력 정보를 서버에 전달할 때 쿠키를 함께 보내지 않은 문제였습니다. fetch 함수에 `credentials : "include"` 를 작성하지 않아 쿠키가 전달되지 않았고 서버에서 권한이 없다고 판단한 것이었습니다. 백엔드와의 통신을 처음 경험하다보니 생긴 문제였습니다.

일회성 로그인을 완료한 뒤 해결해야 하는 문제는 로그인 유지였습니다. 이는 상태 관리 라이브러리와 로컬 스토리지를 통해 해결했습니다. 로그인 한 사용자의 정보를 상태에 저장하고 로그인 했다는 결과를 로컬 스토리지에 저장했습니다. 이를 통해 페이지를 이동할 때 상태를 확인하여 로그인을 유지시켰고 새로고침 뒤에는 로컬 스토리지의 저장된 정보를 통해 서버에서 다시 사용자의 정보를 상태에 저장할 수 있게 하였습니다. 비록 사용에 어려움은 없지만 현재 방식은 비효율적이라 판단하여 더 안전하고 효율적인 로그인 유지 방식을 고려하고 있습니다.

#### 2. 컴포넌트 분할

프로젝트 진행 중 페이지 디자인 구현에 많은 시간을 들였습니다. 이는 설계 단계에서 페이지 디자인 분석을 구체적으로 하지 않았기 때문이었습니다. 페이지를 여러 컴포넌트로 나누고 컴포넌트끼리 유사도를 파악한 뒤 하나의 컴포넌트에서 디자인을 다르게 할 수 있다는 것을 깨달았습니다.

또 컴포넌트를 분할하지 않았을 때 원치 않는 렌더링이 실행되었습니다. 설계 단계에서 재생바 컴포넌트는 전체 페이지의 공통 디자인인 레이아웃 컴포넌트 안에 있었습니다. 재생바의 기능을 구현할 때 레이아웃 컴포넌트와 렌더링이 함께 되어 구현에 차질이 생겼습니다. 독립적인 렌더링을 위해 컴포넌트를 분할하여 기능 구현을 완료할 수 있었습니다.

컴포넌트의 분할은 단순히 디자인 구현의 간편함 뿐만 아니라 기능적인 측면의 장점이 있다는 것을 배웠습니다. 설계 단계에서 디자인 측면과 기능 측면을 모두 고려하여 컴포넌트을 구성해야 한다는 것을 알게 되었습니다.

<br/>

### 이용방법

서비스를 이용하기 위해서 백엔드 서버가 먼저 동작해야 합니다. 백엔드 서버 링크를 들어가 서버를 동작시킵니다.
<br/>
백엔드 프로젝트 배포 링크 : [https://watermelon-back-lmg.fly.dev/](https://watermelon-back-lmg.fly.dev/)
<br/>
그후 프론트엔드 배포 링크로 서비스를 이용합니다.
<br/>
프론트엔드 프로젝트 배포 링크 : [https://watermelon-lmg.netlify.app/](https://watermelon-lmg.netlify.app/)
<br/>
자세한 이용 방법은 노션 링크를 참조해주세요. [노션 링크](https://lazy-mg.notion.site/1064dd2d09c64cfd8d4daf48ab126b69?pvs=4)

### 관련 링크

노션 계획표 : [링크](https://lazy-mg.notion.site/7b1dcd5713e64d61b1537b70c0bc5e46?pvs=4)<br/>
블로그 기록 : [링크](https://velog.io/@cbfmark/series/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%9C%A0%ED%8A%9C%EB%B8%8C%EB%AE%A4%EC%A7%81)
