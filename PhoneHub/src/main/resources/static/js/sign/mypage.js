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
for (var i=0; i< upInfo.length; i++) {
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

}

const passUpBtn = document.querySelector('#passUpBtn')
const passupCont = document.querySelector('.passup_cont')
passUpBtn.onclick = function() {
    passupCont.classList.toggle('pop')
}

const nicknameElem = document.getElementById('nickname')
const emailElem = document.getElementById('email')
const callElem = document.getElementById('call')
const birthElem = document.getElementById('birth')
const sexElem = document.getElementById('sex')

function ajax() {
	
}
upInfo[i].addEventListener('click', ajax)