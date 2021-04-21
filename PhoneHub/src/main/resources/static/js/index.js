// 휴대폰 성능 순위
const perfo = document.querySelector('.perfo')
if (perfo) {
    fetch('/phoneRankings')
        .then(res => res.json())
        .then(myJson => {
            rankBoxPrint(myJson)
        })

    function rankBoxPrint(myJson) {

        const div = document.createElement('div')
        div.className = 'cont_img'
        for (var i = 0; i < 4; i++) {
            const div2 = document.createElement('div')

            div2.innerHTML = `<img id="teamlogo" src="` + myJson.performanceRankings[i].pictureURLSmall + `">`

            div.append(div2)
        }
        perfo.append(div)
    }
}