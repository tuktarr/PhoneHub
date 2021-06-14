const globalSearchBtnElem = document.getElementById('globalSearchBtn')
const box = document.querySelector('.search_box')
const hSearchElem = document.getElementById('hSearch')
globalSearchBtnElem.onclick = function () {
	box.classList.toggle('active')
}

hSearchElem.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		const keyword = hSearchElem.value
		phoneSearch(keyword)
		newsSearch(keyword)
		boardSearch(keyword)
		location.href = `/searchHub?searchKeyword=${keyword}`
	}
})
{
	phoneSearch('10')
	function phoneSearch(keyword) {
		const phoneSearchResultsElem = document.getElementById('phoneSearchResults')
		fetch(`/global-search-phone?searchKeyword=${keyword}&page=1&rowContent=7`)
			.then(res => res.json())
			.then(phoneData => print(phoneData))

		function print(phoneData) {
			phoneData.forEach(phone => {

			});

			function state(score) {
				if (score >= 75) {
					return 'very_good'
				} else if (score >= 50) {
					return 'good'
				} else if (score >= 25) {
					return 'bad'
				} else {
					return 'very_bad'
				}
			}
		}

	}

	function newsSearch(keyword) {
		const newsSearchResultsElem = document.getElementById('newsSearchResults')

	}

	function boardSearch(keyword) {
		const boardSearchResultsElem = document.getElementById('boardSearchResults')

	}
}