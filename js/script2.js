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
            $(".logo_img").attr("src", "./images/brandstory/01.logo/logo.svg");
            $(".search_icon").attr("src", "./images/brandstory/02.header/icon-2.svg");
            $(".login_icon").attr("src", "./images/brandstory/02.header/icon-1.svg");
        } else {
            // 스크롤이 위로 올라가면 클래스 제거
            $("#header").removeClass("header_scrolled");
            // .logo_img 클래스를 가진 img 태그의 이미지 경로를 다시 원상태로 복구
            $(".logo_img").attr("src", "./images/brandstory/01.logo/logo2.svg");
            $(".search_icon").attr("src", "./images/brandstory/02.header/icon-2-1.svg");
            $(".login_icon").attr("src", "./images/brandstory/02.header/icon-1-1.svg");
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


window.addEventListener('scroll', function () {
    // 1. 대상 요소 선택
    const title = document.querySelector('.visual-main-title');

    // 2. 현재 스크롤 위치값 가져오기
    const scrollY = window.scrollY;

    // 3. 투명도 및 흐림 정도 계산
    // 400px 정도 내렸을 때 완전히 사라지게 설정했습니다. (숫자를 조절해보세요!)
    let opacity = 1 - (scrollY / 1000);
    let blur = scrollY / 200; // 점점 흐려지는 효과 (선택사항)

    // 4. 범위 제한 (0~1 사이값 유지)
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    // 5. 스타일 적용
    title.style.opacity = opacity;
    title.style.filter = `blur(${blur}px)`;
});


// 가로 스크롤 적용

const content = document.getElementById('horizontalContent');
const spacer = document.querySelector('.scroll-spacer');
const sections = document.querySelectorAll('.section-item');

window.addEventListener('scroll', () => {
    const offsetTop = spacer.offsetTop;
    const scrollDistance = window.pageYOffset - offsetTop;
    const maxScroll = spacer.offsetHeight - window.innerHeight;
    
    if (scrollDistance >= 0 && scrollDistance <= maxScroll) {
        const progress = scrollDistance / maxScroll;
        
        // 1. 가로 이동 (현재 3개 섹션이므로 66.6% 이동)
        // 섹션 개수에 따라 (sections.length - 1) * 100 / sections.length 로 계산 가능
        const movePercentage = progress * 66.66; 
        content.style.transform = `translateX(-${movePercentage}%)`;

        // 2. 섹션별 투명도 및 흐림 효과 적용
        sections.forEach((section, index) => {
            // 각 섹션이 화면 중앙에 오는 지점 계산 (0, 0.5, 1.0)
            const sectionProgress = index / (sections.length - 1);
            
            // 현재 스크롤 위치와 해당 섹션 지점의 거리 차이
            const distance = Math.abs(progress - sectionProgress);
            
            // 효과 수치 계산 (가중치 3은 감도입니다. 숫자가 클수록 빨리 사라짐)
            let opacity = 1 - (distance * 3); 
            let blur = distance * 15; // 최대 15px까지 흐려짐

            // 최소/최대값 제한
            if (opacity < 0) opacity = 0;
            if (opacity > 1) opacity = 1;

            // 내부 컨텐츠 박스에 스타일 적용
            const box = section.querySelector('.content-box');
            if (box) {
                box.style.opacity = opacity;
                box.style.filter = `blur(${blur}px)`;
                box.style.transition = "opacity 0.3s ease-out, filter 0.3s ease-out";
            }
        });
    }
});


// 이미지 스크롤
$(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var winWidth = $(window).width();
    var section = $('#section4');
    var sectionTop = section.offset().top;
    
    // 애니메이션 시작 지점: 섹션이 화면 하단에서 보이기 시작할 때
    var start = sectionTop - windowHeight; 
    // 애니메이션 종료 지점: 섹션 상단이 화면 상단에 도달할 때 (이때 100%가 되도록 조정)
    var end = sectionTop; 

    var progress = (scrollTop - start) / (end - start);

    // 값의 범위를 0 ~ 1로 고정
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    // 현재 화면 너비에서 1000px을 제외한 한쪽 여백의 퍼센트 계산
    var maxInset = 0;
    if (winWidth > 1000) {
        maxInset = ((winWidth - 1000) / 2 / winWidth) * 100;
    }

    // progress가 1이 되면 currentInset은 0이 되어 100%를 보여줌
    var currentInset = maxInset * (1 - progress);

    $('#section4 .img-box').css({
        'clip-path': 'inset(0 ' + currentInset + '% 0 ' + currentInset + '%)'
    });
});