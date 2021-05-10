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

const passUpBtn = document.querySelector('#passUpBtn')
const passupCont = document.querySelector('.passup_cont')
passUpBtn.onclick = function() {
    passupCont.classList.toggle('pop')
}