const searchPhoneElem = document.getElementById('searchPhone')
if (searchPhoneElem) {

    let brand = ''
    let SIM = ''
    let weight = ''
    let network = 0
    let cameraCount = 0
    let memoryCardSlot = ''
    let bluetooth = ''
    let USB = ''
    let page = 1
    let rowContent = 9

    let searchInfo = {
        brand,
        SIM,
        weight,
        network,
        cameraCount,
        memoryCardSlot,
        bluetooth,
        USB,
        page,
        rowContent
    }

    function searchBrand(param) {
        searchInfo.page = 1
        searchInfo.brand = param
        refresh(searchInfo)
    }

    function searchSIM(param) {
        searchInfo.page = 1
        searchInfo.SIM = param
        refresh(searchInfo)
    }

    function searchWeight(param) {
        searchInfo.page = 1
        searchInfo.weight = param
        refresh(searchInfo)
    }

    function searchNetwork(param) {
        searchInfo.page = 1
        searchInfo.network = param
        refresh(searchInfo)
    }

    function searchCameraCount(param) {
        searchInfo.page = 1
        searchInfo.cameraCount = param
        refresh(searchInfo)
    }

    function searchMemoryCardSlot(param) {
        searchInfo.page = 1
        searchInfo.memoryCardSlot = param
        refresh(searchInfo)
    }

    function searchBluetooth(param) {
        searchInfo.page = 1
        searchInfo.bluetooth = param
        refresh(searchInfo)
    }

    function searchUSB(param) {
        searchInfo.page = 1
        searchInfo.USB = param
        refresh(searchInfo)
    }

    
    function refresh(searchInfo) {
        searchPhoneElem.innerHTML = ''
        sessionStorage.setItem('pageInfo', JSON.stringify(searchInfo))

        fetch(`/searchPhones?brand=${searchInfo.brand}&bodySIM=${searchInfo.SIM}&bodyWeight=${searchInfo.weight}&network=${searchInfo.network}&cameraCount=${searchInfo.cameraCount}&memoryCardSlot=${searchInfo.memoryCardSlot}&commsBluetooth=${searchInfo.bluetooth}&commsUSB=${searchInfo.USB}&page=${searchInfo.page}&rowContent=${searchInfo.rowContent}`)
            .then(res => res.json())
            .then(myJson => {
                printPhone(myJson)
                getMaxPageNum()
            })
    }

    refresh(searchInfo)

    function getPhonesList(currentPage) {
        searchInfo.page = currentPage
        refresh(searchInfo)
    }


    function printPhone(myJson) {
        myJson.data.forEach(e => {
            const containDiv = document.createElement('div')
            containDiv.classList.add('item_box')

            const a = document.createElement('a')
            a.setAttribute('href', `phonedetails?pk=${e.pk}`)

            const img = document.createElement('img')
            img.setAttribute('src', e.pictureURLSmall)

            const insideDiv = document.createElement('div')
            insideDiv.classList.add('item_box_detail')

            const nameSpan = document.createElement('span')
            nameSpan.classList.add('item_name')
            nameSpan.innerText = e.phone
            insideDiv.append(nameSpan)

            const numSpan = document.createElement('span')
            numSpan.classList.add('item_num')
            numSpan.innerText = e.miscModels
            insideDiv.append(numSpan)

            a.append(img)
            a.append(insideDiv)
            containDiv.append(a)

            searchPhoneElem.append(containDiv)
        });
    }
}

function getMaxPageNum() {
    let rowContent = 9

    let pageInfoTxt = sessionStorage.getItem('pageInfo')
    let searchInfo = JSON.parse(pageInfoTxt)

    fetch(`/phoneMaxPageNum?brand=${searchInfo.brand}&bodySIM=${searchInfo.SIM}&bodyWeight=${searchInfo.weight}&network=${searchInfo.network}&cameraCount=${searchInfo.cameraCount}&memoryCardSlot=${searchInfo.memoryCardSlot}&commsBluetooth=${searchInfo.bluetooth}&commsUSB=${searchInfo.USB}&rowContent=${rowContent}`)
        .then(res => res.json())
        .then(maxPage => {
            pageProc(maxPage)
        })
}
getMaxPageNum()

const pagingContentElem = document.querySelector('#phonePaging')
function pageProc(maxPage, page) {

    let pageInfoTxt = sessionStorage.getItem('pageInfo')
    let searchInfo = JSON.parse(pageInfoTxt)

    let sessionPage = parseInt(searchInfo.page)

    if (!sessionPage) {
        sessionPage = 1
    }

    if (!page) {
        page = sessionPage
    }

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
        getPhonesList(1)
        pageProc(maxPage, 1)
    })

    const ltLi = document.createElement('li')
    const ltA = document.createElement('a')
    ltA.classList.add('prev')
    ltA.innerHTML = '&lt'
    ltLi.append(ltA)
    blue_barUl.append(ltLi)

    if (page > 1) {
        ltLi.addEventListener('click', function () {
            getPhonesList(page - 1)
            pageProc(maxPage, page - 1)
        })
    }

    param = paging(page, maxPage)

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
            getPhonesList(i)
            pageProc(maxPage, i)
        })
    }

    const gtLi = document.createElement('li')
    const gtA = document.createElement('a')
    gtA.classList.add('prev')
    gtA.innerHTML = '&gt'
    gtLi.append(gtA)
    blue_barUl.append(gtLi)

    if (page < maxPage) {
        gtLi.addEventListener('click', function () {
            getPhonesList(page + 1)
            pageProc(maxPage, page + 1)
        })
    }

    const nLi = document.createElement('li')
    const nextA = document.createElement('a')
    nextA.classList.add('prev')
    nextA.innerHTML = '&raquo'
    nLi.append(nextA)
    blue_barUl.append(nLi)

    nLi.addEventListener('click', function () {
        getPhonesList(maxPage)
        pageProc(maxPage, maxPage)
    })

    pagingContentElem.append(blue_barUl)
}

function paging(page, maxPage) {
    let startPage = 1;
    let lastPage = 9;

    if(maxPage < 9) {
        lastPage = maxPage
    }

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