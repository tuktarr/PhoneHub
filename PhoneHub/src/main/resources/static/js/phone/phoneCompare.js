

const leftPhoneSearchElem = document.getElementById('leftPhoneSearch')

if (leftPhoneSearchElem) {
    function searchParam(key) {
        return new URLSearchParams(location.search).get(key);
    }

    const pk = searchParam('pk')

    fetch(`/phoneCompareSearch?pk=${pk}`)
    .then(res => res.json())
    .then(myJson => {
        printPhone(myJson)
    })

    function printPhone(myJson) {
        console.log(myJson)
    }
}