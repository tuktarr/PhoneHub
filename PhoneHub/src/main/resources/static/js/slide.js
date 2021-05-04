const main = new Swiper('.sw_main', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        prevEl: '.main_slide .sw_prev',
        nextEl: '.main_slide .sw_next',
    },
    pagination: {
        el: '.main_slide .sw_pg',
        type: 'bullets',
        clickable: true,
    },
});

const other = new Swiper('.sw_or', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
})