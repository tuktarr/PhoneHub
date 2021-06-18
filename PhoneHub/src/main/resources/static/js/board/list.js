
const listContentElem = document.querySelector('.tab_content')
const rowCnt = 10;

const categoryElem = document.getElementById("tab_menus")

const myTabs = document.querySelectorAll(".tab_menus > li");
function myTabClicks(tabClickEvent) {

	for (var i = 0; i < myTabs.length; i++) {
		myTabs[i].classList.remove("active");
	}
	const clickedTab = tabClickEvent.currentTarget;
	clickedTab.classList.add("active");
	tabClickEvent.preventDefault();
	var x = categoryElem.getElementsByTagName("li")[0].getAttribute("class");
	var y = categoryElem.getElementsByTagName("li")[1].getAttribute("class");
	var z = categoryElem.getElementsByTagName("li")[2].getAttribute("class");
	const tabContent = document.querySelectorAll(".tab_content");
	category(x, y, z)
	getBoardList(1)
	getMaxPageNum()
	for (i = 0; i < tabContent.length; i++) {
		tabContent[i].classList.remove("active");
	}

	/*const anchorReference = tabClickEvent.target;
	const activePaneId = anchorReference.getAttribute("href");
	const activePane = document.querySelector(activePaneId);
	activePane.classList.add("active");*/

}

function category(x, y, z) {
	if (x === "board1 active") {
		return 1
	} else if(y === "board2 active") {
		return 2
	} else if(z === "board3 active") {
		return 3
	}
}


function goToDetail(boardPk) {
	location.href = `/detail?boardPk=${boardPk}`
}

getBoardList()
function getBoardList(page) {
	var x = categoryElem.getElementsByTagName("li")[0].getAttribute("class");
	var y = categoryElem.getElementsByTagName("li")[1].getAttribute("class");
	var z = categoryElem.getElementsByTagName("li")[2].getAttribute("class");

	if (!page) {
		page = 1
	}
	if (category(x, y, z) === 1) {
		fetch(`/boardListData?page=${page}&rowCnt=${rowCnt}&category=${1}`)
			.then(res => res.json())
			.then(myJson => {
				boardProc(myJson)
			})
	} else if (category(x, y, z) === 2) {
		fetch(`/boardListData?page=${page}&rowCnt=${rowCnt}&category=${2}`)
			.then(res => res.json())
			.then(myJson => {
				boardProc(myJson)
			})
	} else if (category(x, y, z) === 3) {
		fetch(`/boardListData?page=${page}&rowCnt=${rowCnt}&category=${3}`)
			.then(res => res.json())
			.then(myJson => {
				boardProc(myJson)
			})
	}
}

function boardProc(myJson) {
	if (myJson.length === 0) {
		listContentElem.innerHTML = '<div class="empty">글이 없습니다.</div>'
		return
	}

	//table
	const table = document.createElement('table')
	table.classList.add('tab_table')
	//colgroup
	const colgroup = document.createElement('colgroup')
	const col_1 = document.createElement('col')
	col_1.classList.add('num')
	const col_2 = document.createElement('col')
	col_2.classList.add('title')
	const col_3 = document.createElement('col')
	col_3.classList.add('writer')
	const col_4 = document.createElement('col')
	col_4.classList.add('hits')
	const col_5 = document.createElement('col')
	col_5.classList.add('date')
	colgroup.append(col_1)
	colgroup.append(col_2)
	colgroup.append(col_3)
	colgroup.append(col_4)
	colgroup.append(col_5)
	table.append(colgroup)
	// 테이블 tr th
	const htr = document.createElement('tr')
	const th_1 = document.createElement('th')
	const th_2 = document.createElement('th')
	const th_3 = document.createElement('th')
	const th_4 = document.createElement('th')
	const th_5 = document.createElement('th')
	htr.append(th_1)
	htr.append(th_2)
	htr.append(th_3)
	htr.append(th_4)
	htr.append(th_5)
	th_1.innerText = '번호'
	th_2.innerText = '제목'
	th_3.innerText = '글쓴이'
	th_4.innerText = '조회수'
	th_5.innerText = '날짜'
	table.append(htr)
	//리스트 반복
	myJson.forEach(function(item) {
		const tr = document.createElement('tr')
		tr.classList.add('gall_tr')
		const td_1 = document.createElement('td')
		td_1.classList.add('gall_num')
		const td_2 = document.createElement('td')
		td_2.classList.add('gall_title')
		const td_3 = document.createElement('td')
		td_3.classList.add('gall_nick')
		const td_4 = document.createElement('td')
		td_4.classList.add('gall_hits')
		const td_5 = document.createElement('td')
		td_5.classList.add('gall_date')
		td_1.innerText = item.seq
		td_2.innerText = item.title
		td_3.innerText = item.writerNm
		td_4.innerText = item.hits
		td_5.innerText = item.regDt
		tr.append(td_1)
		tr.append(td_2)
		tr.append(td_3)
		tr.append(td_4)
		tr.append(td_5)
		table.append(tr)
		td_2.addEventListener('click', function() {
			goToDetail(item.boardPk)
		});
	});
	listContentElem.innerHTML = ''
	listContentElem.append(table)
}
getMaxPageNum()
function getMaxPageNum() {
	var x = categoryElem.getElementsByTagName("li")[0].getAttribute("class");
	var y = categoryElem.getElementsByTagName("li")[1].getAttribute("class");
	var z = categoryElem.getElementsByTagName("li")[2].getAttribute("class");
	console.log(category(x,y,z))
	if (category(x, y, z) === 1) {
		fetch(`/boardGetMaxPageNum?rowCnt=${rowCnt}&category=${1}`)
			.then(res => res.json())
			.then(myJson => {
				pageProc(myJson)
			})
	}else if (category(x, y, z) === 2) {
		fetch(`/boardGetMaxPageNum?rowCnt=${rowCnt}&category=${2}`)
			.then(res => res.json())
			.then(myJson => {
				pageProc(myJson)
			})
	}else if (category(x, y, z) === 3) {
		fetch(`/boardGetMaxPageNum?rowCnt=${rowCnt}&category=${3}`)
			.then(res => res.json())
			.then(myJson => {
				pageProc(myJson)
			})
	}
}

const pagingContentElem = document.querySelector('#pagingContent')
const pageDiv = document.createElement('div')
pageDiv.classList.add('paging_control')
function pageProc(maxPage, page) {
    let sessionPage = parseInt(sessionStorage.getItem('boardPage'))

    if (!sessionPage) {
        sessionPage = 1
    }

    if (!page) {
        page = sessionPage
    }

    sessionStorage.setItem('boardPage', page)
	pageDiv.innerHTML = null
    const bluebar = document.createElement('ul')
    bluebar.classList.add('blue_bar')

	const laquoLi = document.createElement('li')
    const laquoA = document.createElement('a')
    laquoA.classList.add('prev')
    laquoA.innerHTML = '&laquo'
    laquoLi.append(laquoA)
    bluebar.append(laquoLi)

    laquoLi.addEventListener('click', function () {
        getBoardList(1)
        pageProc(maxPage, 1)
    })

    const ltLi = document.createElement('li')
    const ltA = document.createElement('a')
    ltA.classList.add('prev')
    ltA.innerHTML = '&lt'
    ltLi.append(ltA)
    bluebar.append(ltLi)

    if (page > 1) {
        ltLi.addEventListener('click', function () {
            getBoardList(page - 1)
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
        bluebar.append(li)

        a.addEventListener('click', function () {
            getBoardList(i)
            pageProc(maxPage, i)
        })
    }

    const gtLi = document.createElement('li')
    const gtA = document.createElement('a')
    gtA.classList.add('prev')
    gtA.innerHTML = '&gt'
    gtLi.append(gtA)
    bluebar.append(gtLi)

    if (page < maxPage) {
        gtLi.addEventListener('click', function () {
            getBoardList(page + 1)
            pageProc(maxPage, page + 1)
        })
    }

    const raquoLi = document.createElement('li')
    const raquoA = document.createElement('a')
    raquoA.classList.add('prev')
    raquoA.innerHTML = '&raquo'
    raquoLi.append(raquoA)
    bluebar.append(raquoLi)

    raquoLi.addEventListener('click', function () {
        getBoardList(maxPage)
        pageProc(maxPage, maxPage)
    })
	pageDiv.append(bluebar)
    pagingContentElem.append(pageDiv)
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

for (var i = 0; i < myTabs.length; i++) {
	myTabs[i].addEventListener("click", myTabClicks)
}

