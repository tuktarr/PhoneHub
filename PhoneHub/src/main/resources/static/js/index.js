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