const formElem = document.querySelector('#writeFrm')

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
			img: imgElem.value
		}

		fetch(boardPkElem.value == 0 ? 'write' : 'edit', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(res => res.json())
			.then(function(myJson) {
				console.log(myJson.result)
			})

	}

	writeEditBtn.addEventListener('click', ajax)
}