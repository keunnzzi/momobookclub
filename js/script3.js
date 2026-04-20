// Q&A 질문박스(한 번에 하나씩만)

$(function(){
    // .answer박스 숨기기
    $(".answer").hide();

    $(".question").click(function(){
        // [추가] 클릭한 요소의 상태를 미리 저장
        let isOpen = $(this).hasClass('on');
        let arrowImg = "./images/membership/07.section4/arrow.svg"; // 기본 이미지
        let arrowOnImg = "./images/membership/07.section4/arrow_on.svg"; // 변경할 이미지 (파일명 확인 필요)

        // 1. 다른 열려있는 요소들 초기화
        $(".answer").not($(this).next()).slideUp();
        $(".question").not(this).removeClass('on'); // 다른 박스 색상 원래대로
        $(".question").not(this).find("img").removeClass('turn').attr('src', arrowImg); // 다른 아이콘 원래대로

        // 2. 현재 클릭한 박스 상태 토글
        $(this).next().slideToggle();
        $(this).toggleClass('on'); // 배경색/글자색 토글
        $(this).find('img').toggleClass('turn'); // 회전 토글

        // 3. 이미지 교체 (on 클래스 유무에 따라)
        if($(this).hasClass('on')) {
            $(this).find('img').attr('src', arrowOnImg);
        } else {
            $(this).find('img').attr('src', arrowImg);
        }
    });
});

AOS.init();