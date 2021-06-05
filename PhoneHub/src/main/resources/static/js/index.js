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
const perfo = document.querySelector('.perfo')
if (perfo) {
    fetch('/phonerankings')
        .then(res => res.json())
        .then(myJson => {
            rankBoxPrint(myJson)
        })

    function rankBoxPrint(myJson) {

        const div = document.createElement('div')
        div.className = 'cont_img'
        for (let i = 0; i < 4; i++) {
            const div2 = document.createElement('div')

            div2.innerHTML = `<img id="teamlogo" src="` + myJson.performanceRankings[i].pictureURLSmall + `">`

            div.append(div2)
        }
        perfo.append(div)
    }
}

// 휴대폰 가성비 순위
const price = document.querySelector('.price')
if (price) {
    fetch('/phonerankings')
        .then(res => res.json())
        .then(myJson => {
            rankBoxPrint(myJson)
        })

    function rankBoxPrint(myJson) {

        const div = document.createElement('div')
        div.className = 'cont_img'
        for (let i = 0; i < 4; i++) {
            const div2 = document.createElement('div')

            div2.innerHTML = `<img id="teamlogo" src="` + myJson.cost_Effectivenes[i].pictureURLSmall + `">`

            div.append(div2)
        }
        price.append(div)
    }
}