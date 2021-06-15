const globalSearchBtnElem = document.getElementById('globalSearchBtn')
const box = document.querySelector('.search_box')
const hSearchElem = document.getElementById('hSearch')
globalSearchBtnElem.onclick = function () {
	box.classList.toggle('active')
}

hSearchElem.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		const keyword = hSearchElem.value
		location.href = `/searchHub?searchKeyword=${keyword}`
	}
})

{
	function searchParam(key) {
		return new URLSearchParams(location.search).get(key);
	}

	const searchKeyword = searchParam('searchKeyword')
	if (searchKeyword) {
		phoneSearch(searchKeyword)
		newsSearch(searchKeyword)
		boardSearch(searchKeyword)
	}

	function phoneSearch(keyword) {
		const phoneSearchResultsElem = document.getElementById('phoneSearchResults')
		const numberPhoneSearchesElem = document.getElementById('numberPhoneSearches')
		fetch(`/global-search-phone?searchKeyword=${keyword}&page=1&rowContent=8`)
			.then(res => res.json())
			.then(phoneData => print(phoneData))


		function print(phoneData) {
			numberPhoneSearchesElem.innerText = `(${phoneData.length})`
			if (phoneData.length !== 0) {
				phoneData.forEach(phone => {
					const phoneCardDiv = document.createElement('div')
					phoneCardDiv.classList.add('phone_card')

					const span1 = document.createElement('span')
					const span2 = document.createElement('span')
					const span3 = document.createElement('span')
					const span4 = document.createElement('span')
					phoneCardDiv.append(span1)
					phoneCardDiv.append(span2)
					phoneCardDiv.append(span3)
					phoneCardDiv.append(span4)

					const a = document.createElement('a')
					a.setAttribute('href', `/phonedetails?pk=${phone.pk}`)
					a.classList.add('phone_card_thumb')

					const img = document.createElement('img')
					img.setAttribute('src', phone.pictureURLSmall)

					const captionDiv = document.createElement('div')	//caption
					captionDiv.classList.add('caption')

					const nameP = document.createElement('p')		//name
					nameP.innerText = phone.phone
					captionDiv.append(nameP)

					const scoreDiv = document.createElement('div') //caption_score
					scoreDiv.classList.add('caption_score')
					captionDiv.append(scoreDiv)

					const scoreBoxDiv = document.createElement('div')	// score_box
					const APScore = Math.floor(phone.apscore / 100)
					const score = state(APScore)
					scoreBoxDiv.classList.add('score_box')
					scoreBoxDiv.classList.add(score)
					scoreDiv.append(scoreBoxDiv)

					const scoreP = document.createElement('p')		// apscore
					scoreP.innerText = APScore
					scoreBoxDiv.append(scoreP)

					const percentDiv = document.createElement('div')
					percentDiv.classList.add('percent_bar')
					scoreDiv.append(percentDiv)

					const percentWidthDiv = document.createElement('div')
					percentWidthDiv.classList.add('progress')
					percentWidthDiv.classList.add(score)
					percentWidthDiv.style.width = APScore + '%'
					percentDiv.append(percentWidthDiv)

					a.append(img)
					a.append(captionDiv)

					phoneCardDiv.append(a)
					phoneSearchResultsElem.append(phoneCardDiv)
				})

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

			} else {
				phoneSearchResultsElem.innerText = '결과가 없습니다.'
			}
		}

	}

	function newsSearch(keyword) {
		const newsSearchResultsElem = document.getElementById('newsSearchResults')
		const numberNewsSearchesElem = document.getElementById('numberNewsSearches')

		fetch(`/global-search-news?searchKeyword=${keyword}&page=1&rowContent=8`)
			.then(res => res.json())
			.then(newsData => print(newsData))

		function print(newsData) {
			numberNewsSearchesElem.innerText = `(${newsData.length})`
			if (newsData.length !== 0) {
				newsData.forEach(news => {
					const newsCardDiv = document.createElement('div')
					newsCardDiv.classList.add('news_card')

					const a = document.createElement('a')
					a.setAttribute('href', news.url)
					a.classList.add('news_card_thumb')
					a.addEventListener('click', function () {
						fetch(`/updnewshits${news.pk}`)
					})

					const img = document.createElement('img')
					img.setAttribute('src', news.img)
					a.append(img)

					const captionDiv = document.createElement('div')
					captionDiv.classList.add('caption')
					captionDiv.classList.add('caption_news')

					const titleSpan = document.createElement('span')
					titleSpan.innerText = news.title
					captionDiv.append(titleSpan)

					const writerInfoDiv = document.createElement('div')
					writerInfoDiv.classList.add('info_writer')

					const timestampSpan = document.createElement('span')
					timestampSpan.classList.add('timestamp')
					timestampSpan.innerText = news.regDt
					writerInfoDiv.append(timestampSpan)

					const writerSpan = document.createElement('span')
					writerSpan.classList.add('writer')
					writerSpan.innerText = news.writer
					writerInfoDiv.append(writerSpan)
					captionDiv.append(writerInfoDiv)

					a.append(captionDiv)
					newsCardDiv.append(a)
					newsSearchResultsElem.append(newsCardDiv)
				})
			} else {
				newsSearchResultsElem.innerText = '결과가 없습니다.'
			}
		}

	}

	function boardSearch(keyword) {
		const boardSearchResultsElem = document.getElementById('boardSearchResults')
		const numberBoardSearchesElem = document.getElementById('numberBoardSearches')

		fetch(`/global-search-board?searchKeyword=${keyword}&page=1&rowContent=5`)
			.then(res => res.json())
			.then(boardData => print(boardData))

		function print(boardData) {
			numberBoardSearchesElem.innerText = `(${boardData.length})`
			if (boardData.length !== 0) {
				boardData.forEach(board => {
					const boardRangeDiv = document.createElement('div')
					boardRangeDiv.classList.add('board_range')

					const titleSpan = document.createElement('span')
					titleSpan.classList.add('sec_board_tit')

					const titleA = document.createElement('a')
					titleA.setAttribute('href', `detail?boardPk=${board.boardPk}`)
					titleA.innerText = board.title
					titleSpan.append(titleA)
					boardRangeDiv.append(titleSpan)

					const contentSpan = document.createElement('span')
					contentSpan.classList.add('sec_board_content')
					contentSpan.innerText = board.ctnt
					boardRangeDiv.append(contentSpan)

					const gallInfoDiv = document.createElement('div')
					gallInfoDiv.classList.add('gall_info')

					const gallA = document.createElement('a')
					gallA.setAttribute('href', `list`)
					gallA.classList.add('gall_name')
					gallA.innerText = board.category
					gallInfoDiv.append(gallA)

					const timeSpan = document.createElement('span')
					timeSpan.classList.add('gall_info_time')
					timeSpan.innerText = board.modDt
					gallInfoDiv.append(timeSpan)
					boardRangeDiv.append(gallInfoDiv)

					boardSearchResultsElem.append(boardRangeDiv)
				})
			} else {
				boardSearchResultsElem.innerText = '결과가 없습니다.'
			}
		}

	}

}