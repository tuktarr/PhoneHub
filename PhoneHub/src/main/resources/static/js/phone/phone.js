const searchPhoneElem = document.getElementById('searchPhone')
if (searchPhoneElem) {
    fetch('/searchPhones')
        .then(res => res.json())
        .then(myJson => {
            printPhone(myJson)
        })

    let brand = ''
    let SIM = ''
    let weight = ''
    let network = 0
    let cameraCount = 0
    let memoryCardSlot = ''
    let bluetooth = ''
    let USB = ''

    let searchInfo = {
        brand,
        SIM,
        weight,
        network,
        cameraCount,
        memoryCardSlot,
        bluetooth,
        USB
    }

    function searchBrand(param) {
        searchInfo.brand = param
        refresh(searchInfo)
    }

    function searchSIM(param) {
        searchInfo.SIM = param
        refresh(searchInfo)
    }

    function searchWeight(param) {
        searchInfo.weight = param
        refresh(searchInfo)
    }

    function searchNetwork(param) {
        console.log(param)
        searchInfo.network = param
        refresh(searchInfo)
    }

    function searchCameraCount(param) {
        searchInfo.cameraCount = param
        refresh(searchInfo)
    }

    function searchMemoryCardSlot(param) {
        searchInfo.memoryCardSlot = param
        refresh(searchInfo)
    }

    function searchBluetooth(param) {
        searchInfo.bluetooth = param
        refresh(searchInfo)
    }

    function searchUSB(param) {
        searchInfo.USB = param
        refresh(searchInfo)
    }

    function refresh(searchInfo) {
        searchPhoneElem.innerHTML = ''
        fetch(`/searchPhones?brand=${searchInfo.brand}&bodySIM=${searchInfo.SIM}&bodyWeight=${searchInfo.weight}&network=${searchInfo.network}&cameraCount=${searchInfo.cameraCount}&memoryCardSlot=${searchInfo.memoryCardSlot}&commsBluetooth=${searchInfo.bluetooth}&commsUSB=${searchInfo.USB}`)
            .then(res => res.json())
            .then(myJson => {
                printPhone(myJson)
            })
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