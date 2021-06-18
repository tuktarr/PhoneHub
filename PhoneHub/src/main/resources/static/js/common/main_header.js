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

	let page = 1
	let keyword = searchKeyword

	let searchInfo = {
		page,
		keyword
	}

	if (searchInfo) {
		phoneSearch(searchInfo)
		newsSearch(searchInfo)
		boardSearch(searchInfo)
	}

	function phonePage(page) {
		searchInfo.page = page
		phoneSearch(searchInfo)
	}

	function newsPage(page) {
		searchInfo.page = page
		newsSearch(searchInfo)
	}

	function boardPage(page) {
		searchInfo.page = page
		boardSearch(searchInfo)
	}

	function phoneSearch(searchInfo) {
		const phoneSearchResultsElem = document.getElementById('phoneSearchResults')
		if (phoneSearchResultsElem) {
			fetch(`/global-search-phone?searchKeyword=${searchInfo.keyword}&page=${searchInfo.page}`)
				.then(res => res.json())
				.then(phoneData => {
					print(phoneData.data)
					if (searchInfo.page === 1) {
						paging(phoneData.maxPage, 'phone')
					}
				})


			function print(phoneData) {
				if (phoneData.length !== 0) {
					phoneSearchResultsElem.innerHTML = ""
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

						const captionDiv = document.createElement('div')
						captionDiv.classList.add('caption')

						const nameP = document.createElement('p')
						nameP.innerText = phone.phone
						captionDiv.append(nameP)

						const scoreDiv = document.createElement('div')
						scoreDiv.classList.add('caption_score')
						captionDiv.append(scoreDiv)

						const scoreBoxDiv = document.createElement('div')
						const APScore = Math.floor(phone.apscore / 100)
						const score = state(APScore)
						scoreBoxDiv.classList.add('score_box')
						scoreBoxDiv.classList.add(score)
						scoreDiv.append(scoreBoxDiv)

						const scoreP = document.createElement('p')
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
	}

	function newsSearch(searchInfo) {
		const newsSearchResultsElem = document.getElementById('newsSearchResults')
		if (newsSearchResultsElem) {
			fetch(`/global-search-news?searchKeyword=${searchInfo.keyword}&page=${searchInfo.page}`)
				.then(res => res.json())
				.then(newsData => {
					print(newsData.data)
					if (searchInfo.page === 1) {
						paging(newsData.maxPage, 'news')
					}
				})

			function print(newsData) {
				if (newsData.length !== 0) {
					newsSearchResultsElem.innerHTML = ""
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
	}

	function boardSearch(searchInfo) {
		const boardSearchResultsElem = document.getElementById('boardSearchResults')
		if (boardSearchResultsElem) {
			fetch(`/global-search-board?searchKeyword=${searchInfo.keyword}&page=${searchInfo.page}`)
				.then(res => res.json())
				.then(boardData => {
					print(boardData.data)
					if (searchInfo.page === 1) {
						paging(boardData.maxPage, 'board')
					}
				})

			function print(boardData) {
				boardSearchResultsElem.innerHTML = ""
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
						gallA.innerText = category(board.category)
						gallInfoDiv.append(gallA)

						const timeSpan = document.createElement('span')
						timeSpan.classList.add('gall_info_time')
						timeSpan.innerText = board.modDt
						gallInfoDiv.append(timeSpan)
						boardRangeDiv.append(gallInfoDiv)

						boardSearchResultsElem.append(boardRangeDiv)
					})

					function category(number) {
						if(number === 1) {
							return '자유게시판'
						} else if(number === 2) {
							return '중고장터'
						} else {
							return '공지사항'
						}
					}

				} else {
					boardSearchResultsElem.innerText = '결과가 없습니다.'
				}
			}
		}
	}

	function paging(maxPage, content) {
		const pagingContentElem = document.getElementById(content + 'Paging')
		function pageProc(maxPage, page) {

			if (!page) {
				page = 1
			}

			pagingContentElem.innerHTML = ""
			const blue_barUl = document.createElement('ul')
			blue_barUl.classList.add('blue_bar')

			const pLi = document.createElement('li')
			const prevA = document.createElement('a')
			prevA.classList.add('prev')
			prevA.innerHTML = '&laquo'
			pLi.append(prevA)
			blue_barUl.append(pLi)

			pLi.addEventListener('click', function () {
				let clickPage = 1
				contentList(content, clickPage)
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
					let clickPage = page - 1
					contentList(content, clickPage)
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
					let clickPage = i
					contentList(content, clickPage)
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
					let clickPage = page + 1
					contentList(content, clickPage)
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
				let clickPage = maxPage
				contentList(content, clickPage)
				pageProc(maxPage, maxPage)
			})

			pagingContentElem.append(blue_barUl)
		}

		function paging(page, maxPage) {
			let startPage = 1;
			let lastPage = 9;

			if (maxPage < 9) {
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

		function contentList(content, page) {
			if (content === "phone") {
				return phonePage(page)
			} else if (content === "news") {
				return newsPage(page)
			} else {
				return boardPage(page)
			}
		}

		pageProc(maxPage)
	}

}