const top_rank = document.querySelector('#top_rank')
document.querySelectorAll
if (top_rank) {
    fetch('/performanceRankings')
        .then(res => res.json())
        .then(myJson => {
            rankBoxPrint(myJson)
        })
    function rankBoxPrint(myJson) {
        const secondDiv = document.createElement('div')
        secondDiv.classList.add('second')
        const firstDiv = document.createElement('div')
        firstDiv.classList.add('first')
        const thirdDiv = document.createElement('div')
        thirdDiv.classList.add('third')

        for (let i = 0; i <= 2; i++) {
            const imgDiv = document.createElement('div')
            imgDiv.classList.add('top_image_sec')

            const imgEl = document.createElement('img')

            const rankDiv = document.createElement('div')
            rankDiv.classList.add('rank_bar')

            const overlayDiv = document.createElement('div')
            overlayDiv.classList.add('overlay')

            const rankSpan = document.createElement('span')
            const nameSpan = document.createElement('span')
            nameSpan.classList.add('phone_name')

            imgEl.setAttribute('src', myJson.performanceRankings[i].pictureURLSmall)
            imgDiv.append(imgEl)

            if (i == 0) {
                rankDiv.classList.add('r_gold')
                overlayDiv.classList.add('gd')
                rankDiv.append(overlayDiv)
                rankSpan.innerHTML = 1
                rankDiv.append(rankSpan)
            } else if (i == 1) {
                rankDiv.classList.add('r_silver')
                overlayDiv.classList.add('sv')
                rankDiv.append(overlayDiv)
                rankSpan.innerHTML = 2
                rankDiv.append(rankSpan)
            } else {
                rankDiv.classList.add('r_bronze')
                overlayDiv.classList.add('bz')
                rankDiv.append(overlayDiv)
                rankSpan.innerHTML = 3
                rankDiv.append(rankSpan)
            }

            nameSpan.innerHTML = myJson.performanceRankings[i].phone
            rankDiv.append(nameSpan)

            if (i == 0) {
                firstDiv.append(imgDiv)
                firstDiv.append(rankDiv)
            } else if (i == 1) {
                secondDiv.append(imgDiv)
                secondDiv.append(rankDiv)
            } else {
                thirdDiv.append(imgDiv)
                thirdDiv.append(rankDiv)
            }
        }
        top_rank.append(secondDiv)
        top_rank.append(firstDiv)
        top_rank.append(thirdDiv)
    }
}

const upperMiddleRank = document.querySelector('#upperMiddleRank')
if (upperMiddleRank) {
    fetch('/performanceRankings')
        .then(res => res.json())
        .then(myJson => {
            rankBoxPrint(myJson)
        })
    function rankBoxPrint(myJson) {
        const wrapperDiv = document.createElement('div')
        wrapperDiv.classList.add('swiper-wrapper')

        for (let i = 3; i <= 9; i++) {
            const slideDiv = document.createElement('div')
            slideDiv.classList.add('swiper-slide')

            const or_boxDiv = document.createElement('div')
            or_boxDiv.classList.add('or_box')

            const img = document.createElement('img')
            img.setAttribute('src', myJson.performanceRankings[i].pictureURLSmall)
            or_boxDiv.append(img)

            const rankSpan = document.createElement('span')
            rankSpan.innerText = i + 1
            or_boxDiv.append(rankSpan)

            const nameSpan = document.createElement('span')
            nameSpan.classList.add('or_phone_tit')
            nameSpan.innerText = myJson.performanceRankings[i].phone
            or_boxDiv.append(nameSpan)

            slideDiv.append(or_boxDiv)
            wrapperDiv.append(slideDiv)
        }
        upperMiddleRank.append(wrapperDiv)

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
    }
}