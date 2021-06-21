const profileInfoCont = document.querySelector('.profile_info_cont')
const profile = document.querySelectorAll('.profileInput')
for (var i = 0; i < profile.length; i++) {
	const upInfo = document.createElement('span')
	const createDiv = document.createElement('div')
	createDiv.append(profile[i])
	createDiv.append(upInfo)
	profileInfoCont.prepend(createDiv)
	upInfo.classList.add('up_info')
	upInfo.innerText = '수정'
}
const upInfo = document.getElementsByClassName('up_info')

const passUpBtn = document.querySelector('#passUpBtn')
const passupCont = document.querySelector('.passup_cont')
passUpBtn.onclick = function () {
	passupCont.classList.toggle('pop')
}

const profileElem = document.querySelector('.profile_info_cont')
const nicknameElem = document.getElementById('nickname')
const emailElem = document.getElementById('email')
const callElem = document.getElementById('call')
const birthElem = document.getElementById('birth')
const sexElem = document.getElementById('sex')
if (profileElem) {

	function ajax() {

		var param = {
			newPhone: callElem.value,
			newBirthday: birthElem.value,
			newGender: sexElem.value,
			newNickname: nicknameElem.value,
			userEmail: emailElem.value
		}
		console.log(param)
		fetch('/myremainder', {
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
		console.log("remainder : " + myJson.remainder)

		switch (myJson.remainder) {

			case 0: case 1:
				const M = 'M'
				const F = 'F'
				if (sexElem.value != M && sexElem.value != F) {
					alert('성별(M or F)의 형식을 맞춰주십시오')
					sexElem.focus()
					break
				}
				return ok()
			case 2:
				const birthChk = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
				if (!birthChk.test(birthElem.value)) {
					alert('생년월일(xxxx-xx-xx) 형식을 맞춰주십시오')
					birthElem.focus()
					break
				}
				return ok()
			case 3:
				const callChk = /^010-\d{4}-\d{4}$/g
				if (!callChk.test(callElem.value)) {
					alert('휴대폰 번호 (010-xxxx-xxxx) 형식을 맞춰주십시오')
					callElem.focus()
					break
				}
				return ok()
			case 4:
				const nickChk = /^([a-zA-Z0-9|가-힣]){1,12}$/g
				if (!nickChk.test(nicknameElem.value)) {
					alert('닉네임 (최소 1자 ~ 12자) 형식을 맞춰주십시오.')
					nicknameElem.focus()
					break
				}
				return ok()
			case 5:
				return ok()
		}

		function ok() {
			alert('회원정보 수정을 성공하셨습니다')
			location.href = '/mypage'
		}
	}

	const passchkContElem = document.getElementById('passchkCont')
	const password = document.getElementById('password')
	const passwordChk = document.getElementById('passwordChk')
	const newPassword = document.getElementById('newPassword')
	const updPasswordBtn = document.getElementById('updPassword')
	if (passchkContElem) {
		function ajax() {
			var param = {
				userEmail: emailElem.value,
				userPw: password.value,
				userPwRe: passwordChk.value,
				userNewPw: newPassword.value
			}

			fetch('/mypassword', {
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
			console.log(myJson.password)
			switch (myJson.password) {
				case 1:
					alert('원래 비밀번호와 다릅니다.')
					return
				case 2:
					alert('새 비밀번호 칸이 비어있습니다.')
					return
				case 3:
					alert('기존의 비밀번호와 같을 수는 없습니다.')	
					return
				case 4:
					alert('새 비밀번호와 새 비밀번호 확인이 다릅니다.')
					return
				case 5:
					alert('비밀번호 최소 8자리에 숫자, 문자, 특수문자 각각 1개 이상 포함시켜주세요')
					return
				case 6:
					alert('수정되었습니다.')
					location.href = '/logout'
					return
			}
		}
		updPasswordBtn.addEventListener('click', ajax)
	}
  
	const proUpBtnElem = document.getElementById('proUpBtn')
	function profileUpload() {
		if (proUpBtnElem.files.length === 0) {
			alert('이미지를 선택해 주세요')
			return
		}

		let formData = new FormData();
		formData.append('profileImg', proUpBtnElem.files[0])

		fetch('profile', {
			method: 'post',
			body: formData
		})
			.then(res => res.json())
			.then(profile => {
				if (profile === 1) {
					setTimeout(function () {
						location.reload();
					}, 2000)
				} else {
					alert('이미지 업로드 실패하였습니다.')
				}
			})
	}

	function profileDelete() {
		fetch('profileDel')
			.then(res => res.json())
			.then(profile => {
				if (profile === 1) {
					location.reload()
				} else {
					alert('이미지 삭제 실패하였습니다.')
				}
			})
	}


	for (var i = 0; i < upInfo.length; i++) {
		upInfo[i].addEventListener('click', ajax)
	}

}