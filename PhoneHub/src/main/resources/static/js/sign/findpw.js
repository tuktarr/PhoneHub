var findPwButton = document.querySelector('#findbtn')

if (findPwButton) {
	var formElem = document.querySelector('#findFrm')

	function ajax() {
		var param = {
			userEmail: formElem.sendEmail.value
		}
		fetch('/findpw', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(function(res) {
			return res.json()
		}).then(function(myJson) {
			proc(myJson)
		})
	}
	
	function proc(myJson) {
		switch (myJson.result) {
			case 1:
				alert('이메일을 확인해 주세요')
				formElem.sendEmail.focus()
				return
			case 2:
				alert('입력된 이메일로 임시 비밀번호를 발송하였습니다.')
				
				location.href = '/login'
				return
		}
	}
	
	findPwButton.addEventListener('click', ajax)
}