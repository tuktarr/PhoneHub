const leftPhoneSearchElem = document.getElementById('leftPhoneSearch')
if (leftPhoneSearchElem) {

    function searchParam(key) {
        return new URLSearchParams(location.search).get(key);
    }

    const pk = searchParam('pk')

    fetch(`/phoneCompareSearch?pk=${pk}`)
        .then(res => res.json())
        .then(myJson => {
            print(myJson, "left")
        })
}

{
    const leftContentSearchElem = document.getElementById('leftContentSearch')
    const rightContentSearchElem = document.getElementById('rightContentSearch')

    let phones = []

    leftContentSearchElem.addEventListener("keyup", function () { displayInputValue('left') })
    rightContentSearchElem.addEventListener("keyup", function () { displayInputValue('right') })

    function displayInputValue(way) {
        const contentSearchElem = document.getElementById(way + 'ContentSearch')
        const suggestionsElem = document.getElementById(way + 'Suggestions')
        const matchedArray = findMatches(contentSearchElem.value, phones)

        suggestionsElem.style.display = 'block'

        suggestionsElem.innerHTML = ''
        const ul = document.createElement('ul')

        matchedArray.forEach(e => {
            const li = document.createElement('li')
            const a = document.createElement('a')
            a.innerText = e
            a.setAttribute('href', "javascript:(function(){Search('" + way + "', '" + e + "')})()")
            li.append(a)
            ul.append(li)
            suggestionsElem.append(ul)
        })

        suggestionsElem.addEventListener("click", function () {
            suggestionsElem.style.display = 'none'
        })
    }

    fetch('/phonenames')
        .then(res => res.json())
        .then(myJson => {
            phones.push(...myJson)
        })

    function findMatches(wordToMatch, phones) {
        return phones.filter(phone => {
            const regex = new RegExp(wordToMatch, 'gi');
            return phone.match(regex)
        })
    }
}

function Search(way, phoneName) {
    const contentSearch = document.getElementById(way + 'ContentSearch')
    let searchPhone = contentSearch.value

    if (phoneName) {
        searchPhone = phoneName
    }

    fetch(`/phonenamesearch?phone=${searchPhone}`)
        .then(res => res.json())
        .then(myJson => {
            if (myJson != 0) {
                phoneCompare(myJson)
            }
        })

    function phoneCompare(num) {
        fetch(`/phoneCompareSearch?pk=${num}`)
            .then(res => res.json())
            .then(myJson => {
                print(myJson, way)
            })
    }
}

function print(myJson, way) {
    const contentSearch = document.getElementById(way + 'ContentSearch')
    const photoElem = document.getElementById(way + 'Photo')
    const processorElem = document.getElementById(way + 'Processor')
    const displayElem = document.getElementById(way + 'Display')
    const cameraElem = document.getElementById(way + 'Camera')
    const memoryElem = document.getElementById(way + 'Memory')
    const SIMElem = document.getElementById(way + 'SIM')
    const networkElem = document.getElementById(way + 'Network')
    const connectElem = document.getElementById(way + 'Connect')
    const OSElem = document.getElementById(way + 'OS')
    const sensorsElem = document.getElementById(way + 'Sensors')
    const standardElem = document.getElementById(way + 'Standard')
    const batteryElem = document.getElementById(way + 'Battery')
    const serviceElem = document.getElementById(way + 'Service')
    const otherInfoElem = document.getElementById(way + 'OtherInfo')

    function changePName(myJson) {
        contentSearch.value = ''
        contentSearch.setAttribute('placeholder', myJson.phone)
    }

    function printPhoto(myJson) {
        photoElem.innerHTML = ''

        const a = document.createElement('a')
        a.setAttribute('href', `/phonedetails?pk=${myJson.pk}`)

        const img = document.createElement('img')
        img.setAttribute('src', myJson.pictureURLSmall)
        a.append(img)

        photoElem.append(a)
    }

    function printProcessor(myJson) {
        processorElem.innerHTML = ''

        const CPUSpan = document.createElement('span')
        const CoreSpan = document.createElement('span')
        const GPUSpan = document.createElement('span')

        CPUSpan.innerText = myJson.platformChipset.slice(0, -1)
        CoreSpan.innerText = myJson.platformCPU.slice(0, -1)
        GPUSpan.innerText = myJson.platformGPU.slice(0, -1)

        processorElem.append(CPUSpan)
        processorElem.append(CoreSpan)
        processorElem.append(GPUSpan)
    }

    function printDisplay(myJson) {
        displayElem.innerHTML = ''

        const sizeSpan = document.createElement('span')
        const resolutionSpan = document.createElement('span')
        const typeSpan = document.createElement('span')
        const protectionSpan = document.createElement('span')

        sizeSpan.innerText = myJson.displaySize.slice(0, -1)
        resolutionSpan.innerText = myJson.displayResolution.slice(0, -1)
        typeSpan.innerText = myJson.displayType.slice(0, -1)
        protectionSpan.innerText = myJson.displayProtection.slice(0, -1)

        displayElem.append(sizeSpan)
        displayElem.append(resolutionSpan)
        displayElem.append(typeSpan)
        displayElem.append(protectionSpan)
    }

    function printCamera(myJson) {
        cameraElem.innerHTML = ''

        const backCameraSpan = document.createElement('span')
        const backVideoSpan = document.createElement('span')
        const frontCameraSpan = document.createElement('span')
        const frontVideoSpan = document.createElement('span')
        const backFeatures = document.createElement('span')
        const frontFeatures = document.createElement('span')

        if (myJson.mainCameraSingle) {
            backCameraSpan.innerText = myJson.mainCameraSingle.slice(0, -1)
        } else if (myJson.mainCameraDual) {
            backCameraSpan.innerText = myJson.mainCameraDual.slice(0, -1)
        } else if (myJson.mainCameraTriple) {
            backCameraSpan.innerText = myJson.mainCameraTriple.slice(0, -1)
        } else if (myJson.mainCameraQuad) {
            backCameraSpan.innerText = myJson.mainCameraQuad.slice(0, -1)
        } else if (myJson.mainCameraFive) {
            backCameraSpan.innerText = myJson.mainCameraFive.slice(0, -1)
        } else {
            backCameraSpan.innerText = myJson.mainCameraSix.slice(0, -1)
        }

        backVideoSpan.innerText = myJson.mainCameraVideo.slice(0, -1)

        if (myJson.selfieCameraSingle) {
            frontCameraSpan.innerText = myJson.selfieCameraSingle.slice(0, -1)
        } else if (myJson.selfieCameraDual) {
            frontCameraSpan.innerText = myJson.selfieCameraDual.slice(0, -1)
        } else if (myJson.selfieCameraTriple) {
            frontCameraSpan.innerText = myJson.selfieCameraTriple.slice(0, -1)
        } else {
            frontCameraSpan.innerText = myJson.selfieCameraQuad.slice(0, -1)
        }

        frontVideoSpan.innerText = myJson.selfieCameraVideo.slice(0, -1)
        backFeatures.innerText = myJson.mainCameraFeatures.slice(0, -1)
        frontFeatures.innerText = myJson.selfieCameraVideo.slice(0, -1)

        cameraElem.append(backCameraSpan)
        cameraElem.append(backVideoSpan)
        cameraElem.append(frontCameraSpan)
        cameraElem.append(frontVideoSpan)
        cameraElem.append(backFeatures)
        cameraElem.append(frontFeatures)
    }

    function printMemory(myJson) {
        memoryElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.memoryInternal.slice(0, -1)

        memoryElem.append(span)
    }

    function printSIM(myJson) {
        SIMElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.bodySIM.slice(0, -1)

        SIMElem.append(span)
    }

    function printNetwork(myJson) {
        networkElem.innerHTML = ''

        const techSpan = document.createElement('span')
        const span2G = document.createElement('span')
        const span3G = document.createElement('span')
        const span4G = document.createElement('span')
        const span5G = document.createElement('span')
        const speedSpan = document.createElement('span')

        techSpan.innerText = myJson.networkTechology.slice(0, -1)
        networkElem.append(techSpan)
        span2G.innerText = myJson.network2Gbands.slice(0, -1)
        networkElem.append(span2G)
        span3G.innerText = myJson.network3Gbands.slice(0, -1)
        networkElem.append(span3G)
        span4G.innerText = myJson.network4Gbands.slice(0, -1)
        networkElem.append(span4G)
        if (myJson.network5Gbands) {
            span5G.innerText = myJson.network5Gbands.slice(0, -1)
            networkElem.append(span5G)
        }
        speedSpan.innerText = myJson.networkSpeed.slice(0, -1)
        networkElem.append(speedSpan)
    }

    function printConnect(myJson) {
        connectElem.innerHTML = ''

        const memorySpan = document.createElement('span')
        const USBSpan = document.createElement('span')
        const WLANSpan = document.createElement('span')
        const bluetoothSpan = document.createElement('span')
        const GPSSpan = document.createElement('span')
        const NFCSpan = document.createElement('span')

        memorySpan.innerText = myJson.memoryCardSlot.slice(0, -1)
        USBSpan.innerText = myJson.commsUSB.slice(0, -1)
        WLANSpan.innerText = myJson.commsWLAN.slice(0, -1)
        bluetoothSpan.innerText = myJson.commsBluetooth.slice(0, -1)
        GPSSpan.innerText = myJson.commsGPS.slice(0, -1)
        NFCSpan.innerText = myJson.commsNFC.slice(0, -1)

        connectElem.append(memorySpan)
        connectElem.append(USBSpan)
        connectElem.append(WLANSpan)
        connectElem.append(bluetoothSpan)
        connectElem.append(GPSSpan)
        connectElem.append(NFCSpan)
    }

    function printOS(myJson) {
        OSElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.platformOS.slice(0, -1)

        OSElem.append(span)
    }

    function printSensors(myJson) {
        sensorsElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.featuresSensors.slice(0, -1)

        sensorsElem.append(span)
    }
    function printStandard(myJson) {
        standardElem.innerHTML = ''

        const dimensionsSpan = document.createElement('span')
        const weightSpan = document.createElement('span')
        const colorSpan = document.createElement('span')
        const builtSpan = document.createElement('span')

        dimensionsSpan.innerText = myJson.bodyDimensions.slice(0, -1)
        weightSpan.innerText = myJson.bodyWeight.slice(0, -1)
        colorSpan.innerText = myJson.miscColors.slice(0, -1)
        builtSpan.innerText = myJson.bodyBuilt.slice(0, -1)

        standardElem.append(dimensionsSpan)
        standardElem.append(weightSpan)
        standardElem.append(colorSpan)
        standardElem.append(builtSpan)
    }
    function printBattery(myJson) {
        batteryElem.innerHTML = ''

        const otherSpan = document.createElement('span')
        const chargingSpan = document.createElement('span')
        const standBySpan = document.createElement('span')
        const talkTimeSpan = document.createElement('span')
        const musicPlaySpan = document.createElement('span')

        otherSpan.innerText = myJson.batteryOther.slice(0, -1)
        chargingSpan.innerText = myJson.batteryCharging.slice(0, -1)
        standBySpan.innerText = myJson.batteryStandBy.slice(0, -1)
        talkTimeSpan.innerText = myJson.batteryTalkTime.slice(0, -1)
        musicPlaySpan.innerText = myJson.batteryMusicPlay.slice(0, -1)

        batteryElem.append(otherSpan)
        batteryElem.append(chargingSpan)
        batteryElem.append(standBySpan)
        batteryElem.append(talkTimeSpan)
        batteryElem.append(musicPlaySpan)
    }


    function printService(myJson) {
        serviceElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.featuresOther.slice(0, -1)

        serviceElem.append(span)
    }

    function printOtherInfo(myJson) {
        otherInfoElem.innerHTML = ''

        const brandSapn = document.createElement('span')
        const announcedSapn = document.createElement('span')

        brandSapn.innerText = myJson.brand.slice(0, -1)
        announcedSapn.innerText = myJson.announced.slice(0, -1)

        otherInfoElem.append(brandSapn)
        otherInfoElem.append(announcedSapn)
    }

    changePName(myJson)
    printPhoto(myJson)
    printProcessor(myJson)
    printDisplay(myJson)
    printCamera(myJson)
    printMemory(myJson)
    printSIM(myJson)
    printNetwork(myJson)
    printConnect(myJson)
    printOS(myJson)
    printSensors(myJson)
    printStandard(myJson)
    printBattery(myJson)
    printService(myJson)
    printOtherInfo(myJson)
}