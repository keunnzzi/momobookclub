// 코드실행
$(function () {
    // 윈도우 스크롤 시 실행
    $(window).scroll(function () {
        // 스크롤이 100px 넘으면,
        if ($(this).scrollTop() > 100) {
            // .header_scrolled 클래스 추가
            $("#header").addClass("header_scrolled");
            // .logo_img 클래스를 가진 img 태그의 이미지 경로를 변경
            // attr : 해당 속성을 읽거나/바꾸는 역할
            // 보통 html 요소의 속성을 가져오거나 변경하는 함수
            $(".logo_img").attr("src", "./images/main/01.logo/logo.svg");
            $(".search_icon").attr("src", "./images/main/02.header/icon-2.svg");
            $(".login_icon").attr("src", "./images/main/02.header/icon-1.svg");
        } else {
            // 스크롤이 위로 올라가면 클래스 제거
            $("#header").removeClass("header_scrolled");
            // .logo_img 클래스를 가진 img 태그의 이미지 경로를 다시 원상태로 복구
            $(".logo_img").attr("src", "./images/main/01.logo/logo2.svg");
            $(".search_icon").attr("src", "./images/main/02.header/icon-2-1.svg");
            $(".login_icon").attr("src", "./images/main/02.header/icon-1-1.svg");
        }
    });

    // 마우스를 올렸을 때(hover 시)
    $(".bg1").hover(function () {
        // header_scrolled 클래스 제거
        $(this).removeClass("header_scrolled");
    },
        // 마우스가 나갔을 때, 실행할 로직을 따로 정의하기 위해 function을 한번 더 씀
        // hover는 들어올 때/나갈 때 동작이 다르기 때문에, 각각의 동작을 처리하려고 function 실행문을 두 개 쓰는 것이다.
        function () {
            // 마우스가 나갔을 때, 스크롤이 100이상 이면 다시 header_scrolled 클래스 추가
            if ($(window).scrollTop() > 100) {
                $(this).addClass("header_scrolled");
            }
        }
    );
});

var swiper = new Swiper(".section1-swiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
    },
});
var swiper2 = new Swiper(".section1-swiper2", {
    loop: true,
    spaceBetween: 10,
    autoplay: true,
    // navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    // },
    thumbs: {
        swiper: swiper,
    },
});


var swiper = new Swiper(".section3-swiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    freeMode: true,
    autoplay: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
    },
});


// 클릭 아코디언 배너
$(function () {

    // .show_banner 요소를 클릭하면,
    $(".show_banner").click(function () {

        // 클릭한 .show_banner(this)를 기준으로, 가장 가까운 li 부모를 찾는다.
        // $li : 해당 li 전체
        // parent() vs closest() 의 차이
        // parent() : 바로 한 단계 위만 찾음
        // closest() : 위로 쭉 올라가다가 li 나오면 거기서 멈춤
        const $li = $(this).closest("li");

        // 해당 li가 'on' 클래스를 가지고 있는지 체크
        // if 조건문 : 'on' 클래스를 가지고 있어서 이미 열려있으면,
        // return : 함수 강제 종료(즉, 아무것도 하지마라)
        if ($li.hasClass("on")) return;

        // .accordion_wrap 안에 있는 모든 li에서 'on' 클래스 제거
        $(".accordion_wrap li").removeClass("on");

        // 아까 클릭한(선택한) li만 'on' 클래스 추가 
        $li.addClass("on");
    });
});

var swiper = new Swiper(".section6-swiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    freeMode: true,
    autoplay: true,
});

AOS.init();