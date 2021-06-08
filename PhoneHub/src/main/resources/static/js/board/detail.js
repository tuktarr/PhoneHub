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
	const commentBtn = document.querySelector('.comment_btn')
	const newcommentEL = document.getElementById('newComment')
	const newcomment = newcommentEL.value.trim()

	if (newcomment) {
		const dateEL = document.createElement('div')
		dateEL.classList.add("comment_date")
		const dateString = dataToString(new Date());
		dateEL.innerText = dateString;

		// innerText에 값을 추가해야함
//		const contentEL = document.createElement('div')
		const contentEL = document.createElement('div')
		contentEL.classList.add('comment_user')
		contentEL.innerText = 'good';
		contentEL.classList.add('comment_content')
		contentEL.innerText = newcomment;

		const commentEL = document.createElement('div')
		commentEL.classList.add('comment_row')
		commentEL.appendChild(dateEL)
		commentEL.appendChild(contentEL)

		document.getElementById('comments').appendChild(commentEL)
		
	function ajax() {

		const param = {
			userPk: userPk,
			ctnt: newcommentEL.value,
			boardPk: boardPk
		}

		fetch('/comment', {
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
				alert('내용을 입력해 주십시오')
				return
			case 1:
				alert('댓글작성완료')
				return
		}
	}
		commentBtn.addEventListener('click', ajax)
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

function selCmtList() {
	fetch(`/comment?boardPk=${boardPk}`)
		.then(res => res.json())
		.then(myJson => {
			CmtProc(myJson)
		})
	}
		
	function CmtProc(myJson) {
		myJson.forEach(function(item) {
			const commentEL = document.createElement('div')
			const userEL = document.createElement('div')
			const contentEL = document.createElement('div')
			const dateEL = document.createElement('div')
			const ccmtEL = document.createElement('div')
			const a = document.createElement('a')
			const a1 = document.createElement('a')
			ccmtEL.classList.add('comment_re')
			commentEL.classList.add('comment_row')
			userEL.classList.add('comment_user')
			contentEL.classList.add('comment_content')
			dateEL.classList.add("comment_date")
			userEL.innerText = item.nickname
			contentEL.innerText = item.ctnt
			dateEL.innerText = item.modDt
			a.innerText = '답글달기'
			a1.innerText = '답글취소'
			ccmtEL.append(a)
			commentEL.appendChild(userEL)
			commentEL.appendChild(contentEL)
			commentEL.appendChild(dateEL)
			commentEL.appendChild(ccmtEL)
			document.getElementById('comments').appendChild(commentEL)
			a.addEventListener('click', ccmt)
			
			function ccmt(){
				const ccmtBox = document.createElement('div')
				const textareaEL = document.createElement('textarea')
				const buttonEL = document.createElement('button')
				
				ccmtBox.id="commentBox"
				textareaEL.placeholder="답글을 달아주세요"
				buttonEL.innerText ='등록'
				ccmtBox.append(textareaEL)
				ccmtBox.append(buttonEL)
				a.remove()
				ccmtEL.append(a1)
				commentEL.append(ccmtBox)
				a1.addEventListener('click',function(){
					ccmtBox.remove()
					a1.remove()
					ccmtEL.append(a)
				})
			}
		})
		
	}

selCmtList()