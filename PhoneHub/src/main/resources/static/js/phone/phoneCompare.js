const leftPhoneSearchElem = document.getElementById('leftPhoneSearch')
const rightPhoneSearchElem = document.getElementById('rightPhoneSearch')

if (leftPhoneSearchElem) {
    const leftPhotoElem = document.getElementById('leftPhoto')
    const leftProcessorElem = document.getElementById('leftProcessor')
    const leftDisplayElem = document.getElementById('leftDisplay')
    const leftCameraElem = document.getElementById('leftCamera')
    const leftMemoryElem = document.getElementById('leftMemory')
    const leftSIMElem = document.getElementById('leftSIM')
    const leftNetworkElem = document.getElementById('leftNetwork')
    const leftConnectElem = document.getElementById('leftConnect')
    const leftOSElem = document.getElementById('leftOS')
    const leftSensorsElem = document.getElementById('leftSensors')
    const leftStandardElem = document.getElementById('leftStandard')
    const leftBatteryElem = document.getElementById('leftBattery')
    const leftServiceElem = document.getElementById('leftService')
    const leftOtherInfoElem = document.getElementById('leftOtherInfo')

    function searchParam(key) {
        return new URLSearchParams(location.search).get(key);
    }

    const pk = searchParam('pk')

    console.log(aa)
    console.log(aabb)

    fetch(`/phoneCompareSearch?pk=${pk}`)
        .then(res => res.json())
        .then(myJson => {
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
        })

    function printPhoto(myJson) {
        leftPhotoElem.innerHTML = ''

        const a = document.createElement('a')
        a.setAttribute('href', `/phonedetails?pk=${myJson.pk}`)

        const img = document.createElement('img')
        img.setAttribute('src', myJson.pictureURLSmall)
        a.append(img)

        leftPhotoElem.append(a)
    }

    function printProcessor(myJson) {
        leftProcessorElem.innerHTML = ''

        const CPUSpan = document.createElement('span')
        const CoreSpan = document.createElement('span')
        const GPUSpan = document.createElement('span')

        CPUSpan.innerText = myJson.platformChipset.slice(0, -1)
        CoreSpan.innerText = myJson.platformCPU.slice(0, -1)
        GPUSpan.innerText = myJson.platformGPU.slice(0, -1)

        leftProcessorElem.append(CPUSpan)
        leftProcessorElem.append(CoreSpan)
        leftProcessorElem.append(GPUSpan)
    }

    function printDisplay(myJson) {
        leftDisplayElem.innerHTML = ''

        const sizeSpan = document.createElement('span')
        const resolutionSpan = document.createElement('span')
        const typeSpan = document.createElement('span')
        const protectionSpan = document.createElement('span')

        sizeSpan.innerText = myJson.displaySize.slice(0, -1)
        resolutionSpan.innerText = myJson.displayResolution.slice(0, -1)
        typeSpan.innerText = myJson.displayType.slice(0, -1)
        protectionSpan.innerText = myJson.displayProtection.slice(0, -1)

        leftDisplayElem.append(sizeSpan)
        leftDisplayElem.append(resolutionSpan)
        leftDisplayElem.append(typeSpan)
        leftDisplayElem.append(protectionSpan)
    }

    function printCamera(myJson) {
        leftCameraElem.innerHtml = ''

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

        leftCameraElem.append(backCameraSpan)
        leftCameraElem.append(backVideoSpan)
        leftCameraElem.append(frontCameraSpan)
        leftCameraElem.append(frontVideoSpan)
        leftCameraElem.append(backFeatures)
        leftCameraElem.append(frontFeatures)
    }

    function printMemory(myJson) {
        leftMemoryElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.memoryInternal.slice(0, -1)

        leftMemoryElem.append(span)
    }

    function printSIM(myJson) {
        leftSIMElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.bodySIM.slice(0, -1)

        leftSIMElem.append(span)
    }

    function printNetwork(myJson) {
        leftNetworkElem.innerHTML = ''

        const techSpan = document.createElement('span')
        const span2G = document.createElement('span')
        const span3G = document.createElement('span')
        const span4G = document.createElement('span')
        const span5G = document.createElement('span')
        const speedSpan = document.createElement('span')

        techSpan.innerText = myJson.networkTechology.slice(0, -1)
        leftNetworkElem.append(techSpan)
        span2G.innerText = myJson.network2Gbands.slice(0, -1)
        leftNetworkElem.append(span2G)
        span3G.innerText = myJson.network3Gbands.slice(0, -1)
        leftNetworkElem.append(span3G)
        span4G.innerText = myJson.network4Gbands.slice(0, -1)
        leftNetworkElem.append(span4G)
        if (myJson.network5Gbands) {
            span5G.innerText = myJson.network5Gbands.slice(0, -1)
            leftNetworkElem.append(span5G)
        }
        speedSpan.innerText = myJson.networkSpeed.slice(0, -1)
        leftNetworkElem.append(speedSpan)
    }

    function printConnect(myJson) {
        leftConnectElem.innerHTML = ''

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

        leftConnectElem.append(memorySpan)
        leftConnectElem.append(USBSpan)
        leftConnectElem.append(WLANSpan)
        leftConnectElem.append(bluetoothSpan)
        leftConnectElem.append(GPSSpan)
        leftConnectElem.append(NFCSpan)
    }

    function printOS(myJson) {
        leftOSElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.platformOS.slice(0, -1)

        leftOSElem.append(span)
    }

    function printSensors(myJson) {
        leftSensorsElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.featuresSensors.slice(0, -1)

        leftSensorsElem.append(span)
    }
    function printStandard(myJson) {
        leftStandardElem.innerHTML = ''

        const dimensionsSpan = document.createElement('span')
        const weightSpan = document.createElement('span')
        const colorSpan = document.createElement('span')
        const builtSpan = document.createElement('span')

        dimensionsSpan.innerText = myJson.bodyDimensions.slice(0, -1)
        weightSpan.innerText = myJson.bodyWeight.slice(0, -1)
        colorSpan.innerText = myJson.miscColors.slice(0, -1)
        builtSpan.innerText = myJson.bodyBuilt.slice(0, -1)

        leftStandardElem.append(dimensionsSpan)
        leftStandardElem.append(weightSpan)
        leftStandardElem.append(colorSpan)
        leftStandardElem.append(builtSpan)
    }
    function printBattery(myJson) {
        leftBatteryElem.innerHtml = ''

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

        leftBatteryElem.append(otherSpan)
        leftBatteryElem.append(chargingSpan)
        leftBatteryElem.append(standBySpan)
        leftBatteryElem.append(talkTimeSpan)
        leftBatteryElem.append(musicPlaySpan)
    }


    function printService(myJson) {
        leftServiceElem.innerHTML = ''

        const span = document.createElement('span')
        span.innerText = myJson.featuresOther.slice(0, -1)

        leftServiceElem.append(span)
    }

    function printOtherInfo(myJson) {
        leftOtherInfoElem.innerHTML = ''

        const brandSapn = document.createElement('span')
        const announcedSapn = document.createElement('span')

        brandSapn.innerText = myJson.brand.slice(0, -1)
        announcedSapn.innerText = myJson.announced.slice(0, -1)

        leftOtherInfoElem.append(brandSapn)
        leftOtherInfoElem.append(announcedSapn)
    }
}

if (rightPhoneSearchElem) {
    const rightContentSearchElem = document.getElementById('rightContentSearch')

    function Search() {
        console.log(rightContentSearchElem.value)
    }
}
