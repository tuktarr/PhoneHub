const bestHitUp = document.querySelector('.best')
const worstHitUp = document.querySelector('.worst')
const boardPk = bestHitUp.value
const userPk = document.getElementById('userPk').value
console.log(userPk)

function warnEmpty() {
	alert("댓글을 입력해주세요.")
}

function dataToString(date) {
	const dateString = date.toISOString();
	const dateToString = dateString.substring(0, 10) + " " + dateString.substring(11, 19);
	return dateToString
}

function submitComment() {
	const commBtn = document.querySelector('.comment_btn')
	const newcommentEL = document.getElementById('newComment')
	const newcomment = newcommentEL.value.trim()

	if (newcomment) {
		const dateEL = document.createElement('div')
		dateEL.classList.add("comment_date")
		const dateString = dataToString(new Date());
		dateEL.innerText = dateString;

		// innerText에 값을 추가해야함
		// const contentEL = document.createElement('div')
		// contentEL.classList.add('comment_user')
		// contentEL.innerText = ;
		const contentEL = document.createElement('div')
		contentEL.classList.add('comment_content')
		contentEL.innerText = newcomment;

		const commentEL = document.createElement('div')
		commentEL.classList.add('comment_row')
		commentEL.appendChild(dateEL)
		commentEL.appendChild(contentEL)

		document.getElementById('comments').appendChild(commentEL)
		newcommentEL.value = "";

		// dateEL.addEventListener('click', function() {
		//     commentEL.remove()
		// })

	} else {
		warnEmpty()
	}
}

function popularHit() {
	fetch(`/boardGetPopular?boardPk=${boardPk}&userPk=${userPk}`)
			.then(res => res.json())
			.then(myJson => {
				proc(myJson)
			})
			
			function proc(myJson) {
				if(myJson == 1) {
					alert('추천했습니다')
					location.reload()
					return
				} else if(myJson == 2) {
					alert('추천취소했습니다')
					location.reload()
					return
				} else {
					alert('무언가 잘못됐습니다')
					return
				}
			}
				
}

function blameHit() {
	fetch(`/boardGetWorst?boardPk=${boardPk}&userPk=${userPk}`)
			.then(res => res.json())
			.then(myJson => {
				proc(myJson)
			})
			
			function proc(myJson) {
				if(myJson == 1) {
					alert('추천했습니다')
					location.reload()
					return
				} else if(myJson == 2) {
					alert('추천취소했습니다')
					location.reload()
					return
				} else {
					alert('무언가 잘못됐습니다')
					return
				}
			}
}

bestHitUp.addEventListener('click', popularHit)

worstHitUp.addEventListener('click', blameHit)

