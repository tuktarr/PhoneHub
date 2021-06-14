const globalSearchBtnElem = document.getElementById('globalSearchBtn')
const box = document.querySelector('.search_box')
const hSearchElem = document.getElementById('hSearch')
globalSearchBtnElem.onclick = function() {
	box.classList.toggle('active')
}

hSearchElem.addEventListener('keypress', (e) => {
	if(e.key === 'Enter') {
		const keyword = hSearchElem.value
		location.href=`/searchHub?searchKeyword=${keyword}&pPage=1&nPage=1&bPage=1&pRowContent=8&nRowContent=6&bRowContent=5`
	}
})