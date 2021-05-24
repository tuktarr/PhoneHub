const leftNewsElem = document.querySelector('#news_top_left')
if (leftNewsElem) {
    const now = new Date();
    const today = now.getFullYear().toString() + ("0" + (now.getMonth() + 1)) + now.getDate().toString()

    fetch(`/selpopularnews?regDt=${today}`)
        .then(res => res.json())
        .then(myJson => {
            leftNewsBox(myJson)
        })
    function leftNewsBox(myJson) {
        const bigDiv = document.createElement('div')
        bigDiv.classList.add('big')
        const smallDiv = document.createElement('div')
        smallDiv.classList.add('small')

        for (let i = 0; i < myJson.length; i++) {
            const thumbDiv = document.createElement('div')
            thumbDiv.classList.add('thumb')

            const a = document.createElement('a')
            a.setAttribute("href", myJson[i].url)
            a.addEventListener('click', function () {
                fetch(`/updnewshits${myJson[i].pk}`)
            })

            thumbDiv.append(a)

            const img = document.createElement('img')
            img.setAttribute("src", myJson[i].img)
            a.append(img)

            const div = document.createElement('div')
            div.classList.add('txt_area')
            div.classList.add('small_txt')
            a.append(div)

            const span = document.createElement('span')
            span.innerText = myJson[i].content
            div.append(span)

            if (i === 0) {
                div.classList.remove('small_txt')
                div.classList.add('big_txt')
                bigDiv.append(thumbDiv)
                continue;
            }

            smallDiv.append(thumbDiv)
        }

        leftNewsElem.append(bigDiv)
        leftNewsElem.append(smallDiv)

    }
}

const rightNewsElem = document.querySelector("#news_top_right")
if (rightNewsElem) {
    fetch('/selpopularnews')
        .then(res => res.json())
        .then(myJson => {
            rightNewsBox(myJson)
        })

    function rightNewsBox(myJson) {
        const middleDiv = document.createElement('div')
        middleDiv.classList.add('top_view_link')

        for (let i = 0; i < myJson.length; i++) {
            if (i < 3) {
                const topDiv = document.createElement('div')
                topDiv.classList.add('top_view_thumb')

                const a = document.createElement('a')
                a.setAttribute("href", myJson[i].url)
                a.addEventListener('click', function () {
                    fetch(`/updnewshits${myJson[i].pk}`)
                })

                const img = document.createElement('img')
                img.setAttribute("src", myJson[i].img)
                a.append(img)

                const div = document.createElement('div')
                div.classList.add('txt_area')
                div.classList.add('view_txt')
                a.append(div)

                const span = document.createElement('span')
                span.innerText = myJson[i].title
                div.append(span)

                topDiv.append(a)
                rightNewsElem.append(topDiv)
            } else {
                const a = document.createElement('a')
                a.setAttribute('href', myJson[i].url)
                a.classList.add('one_line_link')
                a.innerHTML = `<p>#</p>${myJson[i].title}`
                a.addEventListener('click', function () {
                    fetch(`/updNewsHits${myJson[i].pk}`)
                })

                middleDiv.append(a)
                rightNewsElem.append(middleDiv)
            }
        }
    }
}

const listContentElem = document.querySelector('#bottom_news')
function getNewsList(page) {
    let sessionPage = parseInt(sessionStorage.getItem('sessionPage'))

    if (!sessionPage) {
        sessionPage = 1
    }

    if (!page) {
        page = sessionPage
    }

    let rowContent = 7

    fetch(`/newslistdata?page=${page}&rowContent=${rowContent}`)
        .then(res => res.json())
        .then(myJson => {
            newsProc(myJson)
        })
}

getNewsList()

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
            fetch(`/updnewshits${item.pk}`)
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
    let rowContent = 7

    fetch(`/getmaxnewspagenum?rowContent=${rowContent}`)
        .then(res => res.json())
        .then(myJson => {
            pageProc(myJson)
        })
}
getMaxPageNum()

const pagingContentElem = document.querySelector('#newsPaging')
function pageProc(myJson, page) {
    let sessionPage = parseInt(sessionStorage.getItem('sessionPage'))
    
    if (!sessionPage) {
        sessionPage = 1
    }
    
    if (!page) {
        page = sessionPage
    }
    
    sessionStorage.setItem('sessionPage', page)

    pagingContentElem.innerHTML = null
    const blue_barUl = document.createElement('ul')
    blue_barUl.classList.add('blue_bar')

    const pLi = document.createElement('li')
    const prevA = document.createElement('a')
    prevA.classList.add('prev')
    prevA.innerHTML = '&laquo'
    pLi.append(prevA)
    blue_barUl.append(pLi)

    pLi.addEventListener('click', function () {
        getNewsList(1)
        pageProc(myJson, 1)
    })

    const ltLi = document.createElement('li')
    const ltA = document.createElement('a')
    ltA.classList.add('prev')
    ltA.innerHTML = '&lt'
    ltLi.append(ltA)
    blue_barUl.append(ltLi)

    if (page > 1) {
        ltLi.addEventListener('click', function () {
            getNewsList(page - 1)
            pageProc(myJson, page - 1)
        })
    }

    param = paging(page, myJson)

    for (let i = param.startPage; i <= param.lastPage; i++) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.innerText = i

        if (i === page) {
            a.classList.add("active")
        }
        li.append(a)
        blue_barUl.append(li)

        a.addEventListener('click', function () {
            getNewsList(i)
            pageProc(myJson, i)
        })
    }

    const gtLi = document.createElement('li')
    const gtA = document.createElement('a')
    gtA.classList.add('prev')
    gtA.innerHTML = '&gt'
    gtLi.append(gtA)
    blue_barUl.append(gtLi)

    if (page < myJson) {
        gtLi.addEventListener('click', function () {
            getNewsList(page + 1)
            pageProc(myJson, page + 1)
        })
    }

    const nLi = document.createElement('li')
    const nextA = document.createElement('a')
    nextA.classList.add('prev')
    nextA.innerHTML = '&raquo'
    nLi.append(nextA)
    blue_barUl.append(nLi)

    nLi.addEventListener('click', function () {
        getNewsList(myJson)
        pageProc(myJson, myJson)
    })

    pagingContentElem.append(blue_barUl)
}

function paging(page, maxPage) {
    let startPage = 1;
    let lastPage = 9;

    if (page - 4 > 1) {
        startPage = page - 4
        lastPage = page + 4
        if (lastPage > maxPage) {
            lastPage = maxPage
        }
    }

    param = {
        startPage,
        lastPage
    }

    return param
}