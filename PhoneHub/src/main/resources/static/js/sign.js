const modalDiv = document.querySelector('.email_modal')
const joinElem = document.querySelector('#joinFrm')
const emailchkbtnElem = document.querySelector('#emailchkbtn')
const emailchkElem = document.querySelector('#emailchk')
const emailbarElem = document.querySelector('.emailbar')
const input_buttonElem = document.querySelector('.input_button')


//이메일 인증이 완료되기 전까지는 밑에 칸들을 입력할 수 없도록 막음
const password = joinElem.password
const repassword = joinElem.repassword
const nickname = joinElem.nickname
const call = joinElem.call
const year = joinElem.yyyy
const month = joinElem.mm
const day = joinElem.dd


closeElement()
function closeElement() {
	password.disabled = true //password칸 비활성화
	repassword.disabled = true //repassword칸 비활성화
	nickname.disabled = true //nickname칸 비활성화
	call.disabled = true //call칸 비활성화
}
function setModal() {
	const modalClose = document.querySelector('.email_close')
	const modalShow = document.querySelector('#emailSend')

	// 닫기 버튼을 클릭시 모달창 닫기
	modalClose.addEventListener('click', function(event) {
		if (event.target === modalClose) {
			closeModal()
		}
	})
	// 모달 창 보기 버튼 클릭
	modalShow.addEventListener('click', function() {
		if (chkEmail()) {
			openModal()
		}
	})
}
setModal()
// 회원가입 버튼을 눌렀을 때 이벤트 발생
const joinBtnElem = document.querySelector('#joinBtn')

	if(joinBtnElem){
		
		function ajax() {
			const birthday = year.value + month.value + day.value
			const param = {
				userEmail: email.value,
				userPw: password.value,
				userPwRe: repassword.value,
				nickname: nickname.value,
				phone: call.value,
				birthday: birthday
			}
			fetch('/join', {
				method: 'post',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(param)
			}).then(function(res) {
				return res.json()
			}).then(function(myJson) {
				console.log(myJson)
				console.log(repassword.value)
				console.log(myJson.result)
				proc(myJson)
			})

			function proc(myJson) {
				console.log(myJson.result)
				switch (myJson.result) {
					case 0:
						alert('아이디(이메일)을 확인해 주세요')
						return
					case 1:
						alert('이미 있는 아이디입니다.')
						return
					case 2:
						alert('비밀번호를 확인해주세요.')
						return
					case 3:
						alert('비밀번호 확인칸을 확인해주세요.')
						return
					case 4:
						alert('닉네임을 확인해주세요.')
						return
					case 5:
						alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
						return
					case 6:
						alert('생일을 작성해주세요')
						return
					case 7:
						alert('전화번호를 작성해주세요')
						return
					case 8:
						alert('회원가입을 축하합니다!')
						history.go(-1)
						return
				}
			}
		}
		
		joinBtnElem.addEventListener('click', ajax)
}

// 이메일 인증 버튼을 눌렀을 떄 이벤트 발생
const emailsendButton = document.querySelector('#emailSend')
const email = joinElem.email

if (emailsendButton) {
	function ajax() {

		const param = email.value

		fetch('/email', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(param)
		})
	}
}

emailsendButton.addEventListener('click', ajax)
var error = document.createElement('span')

if (emailchkbtnElem) {
	function ajax() {
		const param = emailchkElem.value

		fetch('/verifyCode', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: param
		}).then(function(res) {
			return res.json()
		}).then(function(myJson) {
			proc(myJson)
		})

	}

	function proc(myJson) {
		switch (myJson) {
			case 0:
				alert('인증번호를 확인해주세요.')
				error.className = 'errorEmail'
				error.innerText = '인증번호가 일치하지 않습니다.'
				emailbarElem.append(error)
				return
			case 1:
				//인증번호가 일치했을 때 모달창을 없애면서 진행
				alert('인증번호가 일치합니다.')
				changeEmail()
				console.log(error)
				if (error !== undefined) {
					error.remove()
				}
				return
		}
	}

	function changeEmail() {
		input_buttonElem.innerHTML = `<input id="emailSend" type="button" name="emailSend" value="인증됨" disabled>`

		password.disabled = false
		repassword.disabled = false
		nickname.disabled = false
		call.disabled = false
	}
}

emailchkbtnElem.addEventListener('click', ajax)

/*function joinChk() {
	const joinBtn = document.querySelector('#joinBtn')

	joinBtn.addEventListener('click', function() {
		if (chkSign()) {
			alert('회원가입을 축하합니다.')
			location.href = 'login.html';
		}
	})
}
joinChk()*/

function chkEmail() {
	const emailVal = joinFrm.email.value
	const emailChk = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

	if (emailVal === '') {
		alert('이메일을 입력 해 주세요.')
		return false
	} else if (!emailChk.test(emailVal)) {
		alert('잘못된 이메일 형식 입니다.')
		return false
	}

	return true
}

// 인증번호 입력을 했을 경우에만 정보가 저장되도록 설정해야함
// 잘못된 형식으로 정보를 입력했을경우 잘못된 input으로 focus 시켜야함
function chkSign() {
	const nickChk = /^([a-zA-Z0-9|가-힣]){1,12}$/g
	const passChk = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/g
	const callChk = /^010-\d{4}-\d{4}$/g
	const yearChk = /^(19|20)\d{2}&/g
	const monthChk = /^(0[1-9]|1[012])$/g
	const dayChk = /^(0[1-9]|[12][0-9]|3[0-1])$/g

	if (!nickChk.test(nickname)) {
		alert('올바른 닉네임을 써주세요.')
		return false
	} else if (!passChk.test(password)) {
		alert('잘못된 비밀번호 형식 입니다.')
		return false
	} else if (password !== repassword) {
		alert('비밀번호를 확인 해 주세요.')
		return false
	} else if (!callChk.test(call)) {
		alert('올바른 전화번호를 써주세요.')
		return false
	} else if (!yearChk.test(year)) {
		alert('올바른 연도를 써주세요.')
		return false
	} else if (!monthChk.test(month)) {
		alert('올바른 달을 써주세요.')
		return false
	} else if (!dayChk.test(day)) {
		alert('올바른 날짜를 써주세요.')
		return false
	}
	return true
}

function openModal() {
	modalDiv.classList.add('open')
}

function closeModal() {
	modalDiv.classList.remove('open')
}