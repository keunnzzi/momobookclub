// 달력
window.onload = function () { buildCalendar(); }    // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

// 추가: 월 이름을 영문으로 변환하기 위한 배열
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {

    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = monthNames[nowMonth.getMonth()];             // 연도 숫자 갱신
    document.getElementById("calMonth").innerText = nowMonth.getFullYear();  // 월 숫자 갱신

    while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    }

    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
        nowColumn.innerText = leftPad(nowDay.getDate());      // 추가한 열에 날짜 입력


        if (nowDay.getDay() == 0) {                 // 일요일인 경우 글자색 빨강으로
            // nowColumn.style.color = "#DC143C";
        }
        if (nowDay.getDay() == 6) {                 // 토요일인 경우 글자색 파랑으로 하고
            // nowColumn.style.color = "#0000CD";
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }


        if (nowDay < today) {                       // 지난날인 경우
            nowColumn.className = "pastDay";
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
            nowColumn.className = "today";
            nowColumn.onclick = function () { choiceDate(this); }
        }
        else {                                      // 미래인 경우
            nowColumn.className = "futureDay";
            nowColumn.onclick = function () { choiceDate(this); }
        }
    }
    if (lastDate.getDay() != 6) {
        for (let i = lastDate.getDay(); i < 6; i++) {
            nowRow.insertCell();
        }
    }
}

// 날짜 선택
function choiceDate(nowColumn) {
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    nowColumn.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        value = "0" + value;
        return value;
    }
    return value;
}



// #Board01 .button-wrap .nd-button 이미지 변경
$(document).ready(function() {
    // 1. 마우스를 올렸을 때 (mouseenter)
    $('.nd-button').on('mouseenter', function() {
        const $img = $(this).find('img');
        
        // 0.4초 동안 사라졌다가 이미지를 바꾸고 다시 0.4초 동안 나타남
        $img.stop().fadeOut(200, function() {
            $(this).attr('src', './images/community/04.board01/01.section1/icon5-1.svg').fadeIn(200);
        });
    });

    // 2. 마우스를 뗐을 때 (mouseleave)
    $('.nd-button').on('mouseleave', function() {
        const $img = $(this).find('img');
        
        // 애니메이션 없이 즉시 원래 이미지로 변경하고 보임 상태로 고정
        $img.stop().show().attr('src', './images/community/04.board01/01.section1/icon5.svg');
        
        // 혹시 투명도가 변한 상태에서 멈출 것을 대비해 opacity를 1로 강제 설정
        $img.css('opacity', '1'); 
    });
});


// 탭 전환 기능을 담당하는 함수
// evt : 클릭 이벤트 객체(어떤 탭을 클릭했는지 알려줌)
// boardName : 보여줄 콘텐츠 영역의 id 값 (예시 : "Board01")

function openBoard(evt, boardName) {

    // 변수 선언
    // i : 반복문에서 사용
    // x : 'board' 클래스를 가진 모든 콘텐츠 영역 (div)
    // tablinks : 'tablink' 클래스를 가진 모든 탭 번튼(li)

    var i, x, tablinks;
    //i, x, tablinks 라는 변수 3개를 동시에 선언하는 것

    // 1. 모든 탭 콘텐츠(.board)를 숨김 처리
    // -> 새로운 탭을 클릭할 때 이전 탭 내용이 남지 않도록 초기화
    x = document.getElementsByClassName("board");
    // .board 요소들을 전부 선택해서 x에 저장

    // .board 갯수만큼 반복
    // i를 0부터 시작해서 x.length보다 작을 때까지 1씩 증가시키며 반복한다
    // = i를 0부터 시작해서 x의 길이만큼 하나씩 증가시키며 반복해라
    for (i=0; i < x.length; i++) {
        // 각각의 탭 콘텐츠를 화면에 숨김
        x[i].style.display = "none";
    }


    // 2, 모든 탭 버튼(.tablink)에서 'opacity'클래스를 제거(비활성화 상태로 만들기)
    tablinks = document.getElementsByClassName ("tablink");
    // 탭 버튼 요소들을 전부 선택

    for (i=0; i < x.length; i++) {
        // className에 들어있는 "opacity" 문자열을 제거
        // 예시 : "tablink opacity" -> "tablink"
        tablinks[i].className = tablinks[i].className.replace("opacity", "");
    }


    // 3. 클릭한 탭과 연결된 콘텐츠 영역만 표시
    // boardName으로 전달된 ID값을 가진 요소를 찾아 display = "block"으로 바꿔 보여줌
    document.getElementById(boardName).style.display="block";


    // 4. 클릭한 탭 버튼에 'opacity' 클래스 추가(활성화 상태로 표시)
    // evt.currentTarget : 현재 클릭된 요소(탭버튼)
    // className 뒤에 "opacity"를 붙여서 활성화 스타일 적용
    evt.currentTarget.className += " opacity";
    // 클래스명 앞 공백 : 기존 클래스랑 추가되는 클래스를 분리하기 위한 필수 요소
}



// script5.js 파일에 추가
function openBoardFromHeader(boardName) {
    // 1. 모든 게시판 컨텐츠를 숨김
    var i, board, tablinks;
    board = document.getElementsByClassName("board");
    for (i = 0; i < board.length; i++) {
        board[i].style.display = "none";
    }

    // 2. 모든 탭 버튼에서 활성화 클래스(opacity 등)를 제거
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("opacity");
    }

    // 3. 선택한 게시판(#Board02)을 보여줌
    document.getElementById(boardName).style.display = "block";

    // 4. 해당하는 탭 버튼(두 번째 li)에도 활성화 효과 부여
    // 인덱스 번호는 상황에 맞게 조절하세요 (0이 첫 번째 탭, 1이 두 번째 탭)
    document.getElementsByClassName("tablink")[1].classList.add("opacity");
}



AOS.init();


$(document).ready(function() {
    // 1. URL에서 ?tab=Board02 부분을 찾아내는 함수
    const urlParams = new URLSearchParams(window.location.search);
    const tabTarget = urlParams.get('tab');

    // 2. 만약 전달받은 값이 'Board02'라면
    if (tabTarget === 'Board02') {
        // 기존 탭의 활성화 표시(opacity 클래스)를 모두 지우고
        $(".tablink").removeClass("opacity");
        // 모든 게시판 내용을 숨긴 뒤
        $(".board").hide();

        // 이벤트 탭(두 번째 li)에 활성화 표시를 하고
        $("#tab-box li").eq(1).addClass("opacity");
        // 이벤트 게시판(#Board02)만 보여줍니다.
        $("#Board02").show();
    }
});