// 메인 뉴스 배너
const mainNewsElem = document.getElementById('mainNews')
if (mainNewsElem) {
    const now = new Date();
    const today = now.getFullYear().toString()
        + ((now.getMonth() + 1).toString().length === 1 ? ("0" + (now.getMonth() + 1)) : (now.getMonth() + 1).toString())
        + (now.getDate().toString().length === 1 ? ("0" + now.getDate()) : now.getDate().toString())
    fetch(`/selpopularnews?regDt=${today}`)
        .then(res => res.json())
        .then(newsData => {
            mainNewsPrint(newsData)
        })

    function mainNewsPrint(newsData) {
        newsData.forEach(news => {
            const li = document.createElement('li')
            const span = document.createElement('span')
            const a = document.createElement('a')
            a.addEventListener('click', function () {
                fetch(`/updnewshits${news.pk}`)
            })
            a.innerText = news.title
            a.setAttribute('href', news.url)
            li.append(span)
            li.append(a)
            mainNewsElem.append(li)
        })
    }
}

// 휴대폰 성능 순위
const popularOrderElem = document.getElementById('popularOrder')
if (popularOrderElem) {
    fetch('/phonerankings')
        .then(res => res.json())
        .then(phones => {
            rankBoxPrint(phones)
        })

    function rankBoxPrint(phones) {
        for(let i = 0; i < 4; i++) {
            const div = document.createElement('div')
            div.classList.add('stand_img')
            const a = document.createElement('a')
            a.setAttribute('href', `/phonedetails?pk=${phones.performanceRankings[i].pk}`)
            const img = document.createElement('img')
            img.setAttribute('src', `${phones.performanceRankings[i].pictureURLSmall}`)
            const span = document.createElement('span')
            span.innerText = phones.performanceRankings[i].phone
            a.append(img)
            a.append(span)
            div.append(a)
            popularOrderElem.append(div)
        }
    }
}

// 휴대폰 가성비 순위
const costEffectivenessOrderElem = document.getElementById('costEffectivenessOrder')
if (costEffectivenessOrderElem) {
    fetch('/phonerankings')
        .then(res => res.json())
        .then(phones => {
            rankBoxPrint(phones)
        })

    function rankBoxPrint(phones) {
        for(let i = 0; i < 4; i++) {
            const div = document.createElement('div')
            div.classList.add('stand_img')
            const a = document.createElement('a')
            a.setAttribute('href', `/phonedetails?pk=${phones.cost_Effectivenes[i].pk}`)
            const img = document.createElement('img')
            img.setAttribute('src', `${phones.cost_Effectivenes[i].pictureURLSmall}`)
            const span = document.createElement('span')
            span.innerText = phones.cost_Effectivenes[i].phone
            a.append(img)
            a.append(span)
            div.append(a)
            costEffectivenessOrderElem.append(div)
        }
    }
}