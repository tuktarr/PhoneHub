	const modalDiv = document.querySelector('.email_modal')

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


	function joinChk() {
	    const joinBtn = document.querySelector('#joinBtn')

	    joinBtn.addEventListener('click', function() {
	        if (chkSign()) {
	            alert('회원가입을 축하합니다.')
	            location.href = 'login.html';
	        }
	    })
	}
	joinChk()

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
	    const joinFrm = document.getElementById('joinFrm')
	    const nickVal = joinFrm.nickname.value
	    const nickChk = /^([a-zA-Z0-9|가-힣]){1,12}$/g
	    const passVal = joinFrm.password.value
	    const passChk = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{8,}$/g
	    const rePassVal = joinFrm.repass.value
	    const callVal = joinFrm.call.value
	    const callChk = /^010-\d{4}-\d{4}$/g
	    const yearVal = joinFrm.yyyy.value
	    const yearChk = /^(19|20)\d{2}&/g
	    const monthVal = joinFrm.mm.value
	    const monthChk = /^(0[1-9]|1[012])$/g
	    const dayVal = joinFrm.dd.value
	    const dayChk = /^(0[1-9]|[12][0-9]|3[0-1])$/g

	    if (!nickChk.test(nickVal)) {
	        alert('올바른 닉네임을 써주세요.')
	        return false
	    } else if (!passChk.test(passVal)) {
	        alert('잘못된 비밀번호 형식 입니다.')
	        return false
	    } else if (passVal !== rePassVal) {
	        alert('비밀번호를 확인 해 주세요.')
	        return false
	    } else if (!callChk.test(callVal)) {
	        alert('올바른 전화번호를 써주세요.')
	        return false
	    } else if (!yearChk.test(yearVal)) {
	        alert('올바른 연도를 써주세요.')
	        return false
	    } else if (!monthChk.test(monthVal)) {
	        alert('올바른 달을 써주세요.')
	        return false
	    } else if (!dayChk.test(dayVal)) {
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