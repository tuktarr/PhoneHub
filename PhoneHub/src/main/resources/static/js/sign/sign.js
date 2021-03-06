const modalDiv = document.querySelector('.email_modal')
const joinElem = document.querySelector('#joinFrm')
const emailchkbtnElem = document.querySelector('#emailchkbtn')
const emailchkElem = document.querySelector('#emailchk')
const emailbarElem = document.querySelector('.emailbar')
const nicknamebarElem = document.querySelector('.nicknamebar')
const passwordbarElem = document.querySelector('.passwordbar')
const repasswordbarElem = document.querySelector('.repasswordbar')
const callbarElem = document.querySelector('.callbar')
const birthdaybarElem = document.querySelector('.birthbar')
var error = document.createElement('span')
const input_buttonElem = document.querySelector('.input_button')
const male = document.getElementById('male')
const female = document.getElementById('female')

//이메일 인증이 완료되기 전까지는 밑에 칸들을 입력할 수 없도록 막음
const password = joinElem.password
const repassword = joinElem.repassword
const nickname = joinElem.nickname
const call = joinElem.call
const year = joinElem.yyyy
const month = joinElem.mm
const day = joinElem.dd
const gender = joinElem.gender


closeElement()
function closeElement() {
	password.disabled = true //password칸 비활성화
	repassword.disabled = true //repassword칸 비활성화
	nickname.disabled = true //nickname칸 비활성화
	call.disabled = true //call칸 비활성화
	year.disabled = true //년도칸 비활성화
	month.disabled = true //월칸 비활성화
	day.disabled = true //일칸 비활성화
	gender.disabled = true //성별칸 비활성화 
}

function setModal() {
	const modalClose = document.querySelector('.email_close')

	// 닫기 버튼을 클릭시 모달창 닫기
	modalClose.addEventListener('click', function (event) {
		if (event.target === modalClose) {
			closeModal()
		}
	})
}
setModal()
// 회원가입 버튼을 눌렀을 때 이벤트 발생
const joinBtnElem = document.querySelector('#joinBtn')

if (joinBtnElem) {

	function ajax() {
		const birthday = year.value + month.value + day.value
		const param = {
			userEmail: email.value,
			userPw: password.value,
			userPwRe: repassword.value,
			nickname: nickname.value,
			phone: call.value,
			birthday: birthday,
			gender: gender.value
		}
		fetch('/join', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(function (res) {
			return res.json()
		}).then(function (myJson) {
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

		const param1 = {
			userEmail: email.value
		}
		const param = email.value
		console.log(param)
		fetch('/email', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(param)
		})

		fetch('/chkemail', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(param1)
		}).then(function (res) {
			return res.json()
		}).then(function (myJson) {
			proc(myJson)
		})

		function proc(myJson) {
			console.log(myJson.check)
			if (myJson.check === 0) {
				openModal()
			} else {
				alert('이미 있는 아이디입니다.')
				email.focus()
			}
		}

	}
}

emailsendButton.addEventListener('click', ajax)

// 이메일 모달창에서 버튼을 눌렀을 때 이벤트 발생
if (emailchkbtnElem) {
	function ajax() {
		const param = emailchkElem.value

		fetch('/verifyCode', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: param
		}).then(function (res) {
			return res.json()
		}).then(function (myJson) {
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

function chkEmail() {
	const emailVal = joinElem.email
	const emailChk = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,3}$/i

	if (emailVal === '') {
		alert('이메일을 입력 해 주세요.')
		return false
	} else if (!emailChk.test(emailVal.value)) {
		alert('잘못된 이메일 형식 입니다.')
		return false
	}

	return true
}

// 잘못된 형식으로 정보를 입력했을경우 잘못된 input으로 focus 시켜야함
// 각 칸마다 포커스아웃이 발생했을 시에 이벤트 발생

function chkSign() {
	const nickChk = /^([a-zA-Z0-9|가-힣]){1,12}$/g
	const passChk = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/g
	const callChk = /^010-\d{4}-\d{4}$/g
	const yearChk = /^(19|20)\d{2}/g
	const monthChk = /^(0[1-9]|1[012])$/g
	const dayChk = /^(0[1-9]|[12][0-9]|3[0-1])$/g

	nickname.addEventListener("blur", e => {
		console.log(nickname.value)
		if (!nickChk.test(nickname.value)) {
			error.className = 'errorNickname'
			error.innerText = '닉네임 형식이 일치하지 않습니다.'
			nicknamebarElem.append(error)
			nickname.focus()
		} else {
			error.remove()
		}
	})

	password.addEventListener("blur", e => {
		console.log(password.value)
		if (!passChk.test(password.value)) {
			error.className = 'errorPassword'
			error.innerText = '비밀번호 형식이 일치하지 않습니다.'
			passwordbarElem.append(error)
			password.focus()
		} else {
			error.remove()
		}

	})

	repassword.addEventListener("blur", e => {
		if (password.value !== repassword.value) {
			error.className = 'errorRepassword'
			error.innerText = '비밀번호와 일치하지 않습니다.'
			repasswordbarElem.append(error)
			nickname.disabled = true
			call.disabled = true
			year.disabled = true
			month.disabled = true
			day.disabled = true
			male.disabled = true
			female.disabled = true
		} else {
			error.remove()
			nickname.disabled = false
			call.disabled = false
			year.disabled = false
			month.disabled = false
			day.disabled = false
			gender.disabled = false
			male.disabled = false
			female.disabled = false
		}
	})

	call.addEventListener("blur", e => {
		if (!callChk.test(call.value)) {
			error.className = 'errorCallbar'
			error.innerText = '전화번호 형식이 일치하지 않습니다.'
			callbarElem.append(error)
			call.focus()
		} else {
			error.remove()
		}
	})
	year.addEventListener("blur", e => {
		if (!yearChk.test(year.value)) {
			error.className = 'errorYear'
			error.innerText = '년도형식이 일치하지 않습니다.'
			birthdaybarElem.append(error)
			year.focus()
		} else {
			error.remove()
		}
	})
	month.addEventListener("blur", e => {
		if (!monthChk.test(month.value)) {
			error.className = 'errorMonth'
			error.innerText = '월형식이 일치하지 않습니다.'
			birthdaybarElem.append(error)
			month.focus()
		} else {
			error.remove()
		}
	})
	day.addEventListener("blur", e => {
		if (!dayChk.test(day.value)) {
			error.className = 'errorDay'
			error.innerText = '일형식이 일치하지 않습니다.'
			birthdaybarElem.append(error)
			day.focus()
		} else {
			error.remove()
		}
	})

	return true
}

chkSign()

function openModal() {
	modalDiv.classList.add('open')
}

function closeModal() {
	modalDiv.classList.remove('open')
}