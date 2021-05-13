const formElem = document.querySelector('#writeFrm')
const selectCate = document.querySelector('.select_Box')
const writeEditBtn = document.querySelector('#writeEditBtn')

if (writeEditBtn) {
	function ajax() {
		const titleElem = formElem.title
		const contentElem = formElem.content
		const userPkElem = formElem.userPk
		const boardPkElem = formElem.boardPk
		const imgElem = formElem.upload
		const categoryElem = formElem.category

		const param = {
			title: titleElem.value,
			ctnt: contentElem.value,
			userPk: userPkElem.value,
			boardPk: boardPkElem.value,
			img: imgElem.value,
			category: selectCate.value
		}

		fetch(boardPkElem.value == 0 ? 'write' : 'edit', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(res => res.json())
			.then(myJson => {
				proc(myJson)
			})
	}
	
	function proc(myJson) {
		switch (myJson.result) {
			case 0:
				alert('제목을 입력해 주십시오')
				return
			case 1:
				alert('내용을 입력해 주십시오')
				return
			case 2:
				location.href = "/list"
				return
		}
	}

	writeEditBtn.addEventListener('click', ajax)
}

