const listContentElem = document.querySelector('#bottom_news')

function getNewsList(page) {

    if (!page) {
        page = 1
    }

    const rowContent = 7

    const info = {
        page,
        rowContent
    }
    sessionStorage.setItem('pageInfo', JSON.stringify(info))

    fetch(`/newsListData?page=${page}&rowContent=${rowContent}`)
        .then(res => res.json())
        .then(myJson => {
            newsProc(myJson)
        })
}

getNewsList(1)

function newsProc(myJson) {
    if (myJson.length === 0) {
        listContentElem.innerHTML = '<div>글이 없습니다.</div>'
        return
    }

    listContentElem.innerHTML = ''

    myJson.forEach(function (item) {
        const bottom_thumbDiv = document.createElement('div')
        bottom_thumbDiv.classList.add('bottom_thumb')

        const a = document.createElement('a')
        a.setAttribute("href", item.url)
        a.addEventListener('click', function () {
            fetch(`/updNewsHits${item.pk}`)
        })

        const img = document.createElement('img')
        img.setAttribute("src", item.img)
        a.append(img)

        const descriptionDiv = document.createElement('div')
        descriptionDiv.classList.add('txt_area')
        descriptionDiv.classList.add('news_bottom_txt')

        const titleDiv = document.createElement('div')
        titleDiv.classList.add('news_title')
        titleDiv.innerText = item.title
        descriptionDiv.append(titleDiv)

        const descriptionSpan = document.createElement('span')
        descriptionSpan.innerText = item.content
        descriptionDiv.append(descriptionSpan)

        const writerDiv = document.createElement('div')
        writerDiv.classList.add('writer_info')

        const dateSpan = document.createElement('span')
        dateSpan.classList.add('write_date')
        dateSpan.innerHTML = item.regDt
        writerDiv.append(dateSpan)

        const writerSpan = document.createElement('span')
        writerSpan.classList.add('writer')
        writerSpan.innerHTML = item.writer
        writerDiv.append(writerSpan)

        descriptionDiv.append(writerDiv)
        a.append(descriptionDiv)
        bottom_thumbDiv.append(a)

        listContentElem.append(bottom_thumbDiv)
    })
}

function getMaxPageNum() {
    const rowContent = 7

    fetch(`/getMaxNewsPageNum?rowContent=${rowContent}`)
        .then(res => res.json())
        .then(myJson => {
            pageProc(myJson)
        })
}
getMaxPageNum()

const pagingContentElem = document.querySelector('#newsPaging')
function pageProc(myJson) {
    pagingContentElem.innerHTML = null
    const blue_barUl = document.createElement('ul')
    blue_barUl.classList.add('blue_bar')

    const pLi = document.createElement('li')
    const prevA = document.createElement('a')
    prevA.classList.add('prev')
    prevA.innerHTML = '&laquo'
    pLi.append(prevA)
    blue_barUl.append(pLi)

    for (let i = 1; i <= 10; i++) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.innerText = i

        li.append(a)
        blue_barUl.append(li)

        //span에 click이벤트를 건다. 클릭하면 getBoardList 함수 호출
        a.addEventListener('click', function () {
            getNewsList(i)
            pageHighlight(this)
        })
    }
    pagingContentElem.append(blue_barUl)
}

function pageHighlight(ele) {
    //모든 span의 selected 클래스를 빼준다.
    var selectedSpan = pagingContentElem.querySelector('.active')
    if (selectedSpan) {
        selectedSpan.classList.remove('active')
    }

    //나의 span에 selected 클래스 추가한다.
    ele.classList.add('active')
}