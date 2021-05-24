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
/*for (var i=0; i< upInfo.length; i++) {
	if(i == 0){
		upInfo[i].addEventListener('click', function(){
		alert('성별 수정 완료')		
	})	
	}
	if(i == 1){
		upInfo[i].addEventListener('click', function(){
		alert('생일 수정 완료')		
	})		
	}
	if(i == 2){
		upInfo[i].addEventListener('click', function(){
		alert('번호 수정 완료')		
	})	
	}
	if(i == 3){
		upInfo[i].addEventListener('click', function(){
		alert('이메일 수정 완료')		
	})	
	}
	if(i == 4){
		upInfo[i].addEventListener('click', function(){
		alert('닉네임 수정 완료')		
	})	
	}

}*/

const passUpBtn = document.querySelector('#passUpBtn')
const passupCont = document.querySelector('.passup_cont')
passUpBtn.onclick = function() {
    passupCont.classList.toggle('pop')
}

const profileElem = document.querySelector('.profile_info_cont')
const nicknameElem = document.getElementById('nickname')
const emailElem = document.getElementById('email')
const callElem = document.getElementById('call')
const birthElem = document.getElementById('birth')
const sexElem = document.getElementById('sex')
if(profileElem) {
	
function ajax() {
	
	var param = {
		userNewEmail: emailElem.value,
		newPhone: callElem.value,
		newBirthday: birthElem.value,
		newGender: sexElem.value,
		newNickname: nicknameElem.value
		
	}
	console.log(param)
	fetch('/myremainder',{
		method: 'post',
		headers: {
			'Content-Type' : 'application/json',
		},
		body: JSON.stringify(param)
	}).then(function(res) {
		return res.json()
	}).then(function(myJson){
		proc(myJson)
	})	
}

function proc(myJson) {
		switch (myJson.remainder) {
			
			case 0: 
				const M = 'M'
				const F = 'F'
				if(sexElem.value != M && sexElem.value != F) {
					alert('성별(M or F)의 형식을 맞춰주십시오')
					sexElem.focus()
					break
				}
				return ok()
			case 2:
				const birthChk = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
				if(birthChk.test(birthElem.value)) {
					alert('생년월일(xxxx-xx-xx) 형식을 맞춰주십시오')
					birthElem.focus()
				}
				return ok()
			case 3:
				const callChk = /^010-\d{4}-\d{4}$/g
				if(!callChk.test(callElem.value)) {
					alert('휴대폰 번호 (010-xxxx-xxxx) 형식을 맞춰주십시오')
					callElem.focus()
				}
				return ok()
			case 4:
				const emailChk = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,3}$/i
				if(!emailChk.test(emailElem.value)){
					alert('이메일 형식을 맞춰주십시오')
					emailElem.focus()
				}
				return ok()
			case 5:
				const nickChk = /^([a-zA-Z0-9|가-힣]){1,12}$/g
				if(!nickChk.test(nicknameElem.value)) {
					alert('닉네임 (최소 1자 ~ 12자) 형식을 맞춰주십시오.')
					nicknameElem.focus()		
				}
				return ok()		
		}
		
		function ok() {
			alert('회원정보 수정을 성공하셨습니다')
			location.href = '/mypage'
		}
}

for (var i=0; i< upInfo.length; i++) {	
	upInfo[i].addEventListener('click', ajax)
}

}