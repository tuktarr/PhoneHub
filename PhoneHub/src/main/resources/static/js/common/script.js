window.onload = function() {
    const gotop = document.querySelector('.gotop')

    gotop.addEventListener("click", scrollToTop);

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };

    // 새로고침시 스크롤 초기화
    /*
        manual = 복원안함
        auto = 복원함
    */
    history.scrollRestoration = "manual"
}