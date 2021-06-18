const bestHitUp = document.querySelector('.best')
const worstHitUp = document.querySelector('.worst')
const boardPk = bestHitUp.value
const userPk = document.getElementById('userPk').value
console.log(userPk)
	
function warnEmpty() {
	alert("댓글을 입력해주세요.")
}

const commentBtn = document.getElementById('comment_btn')
commentBtn.addEventListener('click', submitComment)

function submitComment() {
	const newcommentEL = document.getElementById('newComment')
	if (newcommentEL.value) {

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
				location.reload()
				return
			case 1:
				alert('댓글작성완료')
				location.reload()
				return
			case 2:
				alert('로그인이 필요합니다.')
				location.reload()
				return
		}
	}

	ajax()
	} 
	else {
		warnEmpty()
	}
}

function popularHit() {

	const param = {
		userPk: userPk,
		boardPk: boardPk
	}
	fetch(`/boardGetPopular?userPk=${userPk}&boardPk=${boardPk}`, {
		method: 'post',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(param)
	}).then(res => res.json())
		.then(myJson => {
			proc(myJson)
		})

	function proc(myJson) {
		if (myJson == 1) {
			alert('추천했습니다')
			location.reload()
			return
		} else if (myJson == 2) {
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
	const param = {
		userPk: userPk,
		boardPk: boardPk
	}
	fetch(`/boardGetWorst?userPk=${userPk}&boardPk=${boardPk}`, {
		method: 'post',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(param)
	}).then(res => res.json())
		.then(myJson => {
			proc(myJson)
		})

	function proc(myJson) {
		if (myJson == 1) {
			alert('추천했습니다')
			location.reload()
			return
		} else if (myJson == 2) {
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
			CmtProc(myJson) //댓글리스트
		})
	}
		
	function CmtProc(myJson) {
		myJson.forEach(function(item,index,arr) {
			const commentEL = document.createElement('div')
			const ccommentEL = document.createElement('div')
			const userEL = document.createElement('div')
			const contentEL = document.createElement('div')
			const dateEL = document.createElement('div')
			const ccmtEL = document.createElement('div')
			const TrashCan = document.createElement('div')
			const a = document.createElement('a')
			const a1 = document.createElement('a')
			const icontainer = document.createElement('div')
			const i = document.createElement('i')
			var arrCheckVal = new Array()
			var uniqueArr=[]
			for(var z=0; z<arr.length-1; z++){
				if(arr[z].groupCmt == arr[z+1].groupCmt){
					arrCheckVal.push(arr[z].groupCmt)
				}			
			}
			arrCheckVal.forEach((element) => {
				if(!uniqueArr.includes(element)) {
					uniqueArr.push(element)
				}
			})

			for(var x=0; x<uniqueArr.length; x++){
					if(item.groupCmt == uniqueArr[x]){
						commentEL.classList.add('manyComment')									
					}
				}
			if(index == 0) {
				commentEL.classList.add('first')
				ccommentEL.classList.add('first')
			}
			i.classList.add('fas')
			i.classList.add('fa-level-up-alt')
			i.classList.add('fa-rotate-90')
			icontainer.append(i)
			icontainer.classList.add('icontainer')
			commentEL.classList.add('comment_row')
			userEL.classList.add('comment_user')
			contentEL.classList.add('comment_content')
			dateEL.classList.add('comment_date')
			ccmtEL.classList.add('comment_re')
			TrashCan.classList.add('comment_trash')			
			userEL.innerText = item.nickname
			contentEL.innerText = item.ctnt
			dateEL.innerText = item.modDt
			a.innerText = '답글달기'
			a1.innerText = '답글취소'
			ccommentEL.classList.add('ccomment_row')
			if(item.depth == 0){
				ccmtEL.append(a)
				commentEL.appendChild(userEL)
				commentEL.appendChild(contentEL)
				dateEL.appendChild(TrashCan)
				commentEL.appendChild(dateEL)
				commentEL.appendChild(ccmtEL)
				document.getElementById('comments').appendChild(commentEL)
				a.addEventListener('click', ccmt)
			} else {
				ccommentEL.appendChild(icontainer)
				ccommentEL.appendChild(userEL)
				ccommentEL.appendChild(contentEL)
				dateEL.appendChild(TrashCan)
				ccommentEL.appendChild(dateEL)
				document.getElementById('comments').appendChild(ccommentEL)
			}
			
			function ccmt(){
				const ccmtBox = document.createElement('div')
				const textareaEL = document.createElement('textarea')
				const buttonEL = document.createElement('button')
				
				ccmtBox.id="commentBox"
				textareaEL.placeholder="답글을 달아주세요"
				textareaEL.id = 'commentctnt'
				buttonEL.innerText ='등록'
				buttonEL.id = 'commentReg'
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
				const commentctntEL = document.getElementById('commentctnt')
				const commentRegEL = document.getElementById('commentReg')
				commentRegEL.addEventListener('click', function(){
					console.log(item.userPk)
					console.log(item.boardPk)
					console.log(item.groupCmt)
					console.log(commentctntEL.value)
					const param = {
						userPk: item.userPk,
						boardPk: item.boardPk,
						ctnt: commentctntEL.value,
						groupCmt: item.groupCmt
					}
					
					fetch('/ccmt', {
					method: 'post',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(param)
					}).then(res => res.json())
					.then(myJson => {
						proc(myJson)
					})
					
					function proc(myJson) {
						if(myJson == 1) {
							if(confirm("등록하시겠습니까?") == true) {
								location.reload()
							}
						} else if(myJson == 0) {
							alert('내용을 입력해주세요.')
							return
						}
					}
				})
			}
			
			TrashCan.addEventListener('click', function ajax(){
				const param = {
					userPk: item.userPk,
					cmtPk: item.cmtPk
					}
					 
				fetch('/del', {
					method: 'post',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(param)
					}).then(res => res.json())
					.then(myJson => {
						proc(myJson)
					})
					
				function proc(myJson) {
					if(myJson == 1) {
						if(confirm("삭제하시겠습니까?") == true){
							location.reload()
						}
						return
					} else if(myJson == 0) {
						alert('삭제할 수 없습니다.')
						return
					}
				}
			})
		})
	}

selCmtList()

const btnDelElem = document.getElementById("comment_delete")

if (btnDelElem) {
	btnDelElem.addEventListener('click', function() {
		if (confirm('삭제하시겠습니까 ?')) {
			ajax()
		}
	})

	function ajax() {
		fetch(`/del/${boardPk}`, {
			method: 'delete',
		}).then(function() {
			location.href = '/list'
		})
	}
}

const btnListElem = document.getElementById("backList")

if (btnListElem) {
	btnListElem.addEventListener('click', function() {
		location.href = '/list'
	})
}