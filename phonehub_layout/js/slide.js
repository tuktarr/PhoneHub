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
        el:  '.main_slide .sw_pg',
        type: 'bullets',
        clickable: true,
    },
});