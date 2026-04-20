var swiper = new Swiper(".section2-swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    freeMode: true,
    autoplay: true,
});

var swiper = new Swiper(".section1-swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    freeMode: true,
    autoplay: true,
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

    // 핵심: 탭이 전환되면서 요소들이 나타난 후 AOS 위치를 다시 계산합니다.
    AOS.refresh();
}

AOS.init();


$(document).ready(function() {
    // 1. URL에서 파라미터 값을 가져오는 함수
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // 2. 'tab' 파라미터가 'Board02'라면 해당 탭 실행
    var activeTab = getUrlParameter('tab');

    if (activeTab === 'Board02') {
        // 모든 게시판 숨기기
        $('.board').hide();
        // Board02 보이기
        $('#Board02').show();
        
        // 탭 버튼 활성화 상태 변경 (두 번째 탭에 opacity 클래스 추가)
        $('.tablink').removeClass('opacity');
        $('.tablink').eq(1).addClass('opacity'); 
        
        // 페이지 로드 시 해당 위치로 스크롤하고 싶다면 추가 (선택 사항)
        // $('html, body').animate({ scrollTop: $('#tab-wrap').offset().top }, 500);

        // [핵심] 숨겨져 있던 보드가 나타났으므로 AOS 애니메이션 위치를 다시 계산합니다.
        setTimeout(function() {
            AOS.refresh();
        }, 100); // 0.1초 정도의 아주 미세한 지연을 주면 더 정확하게 작동합니다.
    }
});


$(document).ready(function() {
    // 1. URL에서 파라미터(tab)를 가져오는 함수
    function getParameterByName(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    // 2. 페이지 로드 시 'tab' 파라미터가 'Board02'라면 해당 탭 클릭 실행
    const activeTab = getParameterByName('tab');
    if (activeTab === 'Board02') {
        // 기존에 작성하신 openBoard 함수를 호출하거나, 
        // 이벤트 탭(두 번째 li)을 강제로 클릭하게 합니다.
        $("#tab-box li").eq(1).trigger("click");
    }
});


function openBoardFromHeader(boardName) {
    // 1. 모든 게시판 컨텐츠를 숨김
    $(".board").hide();
    
    // 2. 모든 탭 버튼에서 활성화 클래스(opacity)를 제거
    $(".tablink").removeClass("opacity");

    // 3. 대상 게시판(#Board02)을 보여줌
    $("#" + boardName).show();

    // 4. 상단 탭 버튼 중 해당되는 순서에 'opacity' 클래스 추가
    if (boardName === 'Board01') {
        $(".tablink").eq(0).addClass("opacity");
    } else if (boardName === 'Board02') {
        $(".tablink").eq(1).addClass("opacity");
    }
    
    // 클릭 시 페이지 상단으로 튕기는 현상 방지
    if (event) event.preventDefault();
}


$(document).ready(function() {
    // 1. URL에서 tab 파라미터 값을 가져옵니다.
    const urlParams = new URLSearchParams(window.location.search);
    const tabTarget = urlParams.get('tab');

    // 2. 만약 tab 파라미터가 'Board02'라면 (큐레이션 탭)
    if (tabTarget === 'Board02') {
        // 모든 탭 버튼에서 활성화 클래스 제거
        $(".tablink").removeClass("opacity");
        // 모든 게시판 숨김
        $(".board").hide();

        // [핵심] 큐레이션 탭(두 번째 li)에 활성화 클래스 추가
        $("#tab-box li").eq(1).addClass("opacity");
        // 큐레이션 게시판(#Board02) 보여줌
        $("#Board02").show();
    }
});