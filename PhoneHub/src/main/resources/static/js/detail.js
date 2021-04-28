function warnEmpty() {
    alert("댓글을 입력해주세요.")
}

function dataToString(date) {
    const dateString = date.toISOString();
    const dateToString = dateString.substring(0, 10) + " " + dateString.substring(11, 19);
    return dateToString
}

function submitComment() {
    const commBtn = document.querySelector('.comment_btn')
    const newcommentEL = document.getElementById('newComment')
    const newcomment = newcommentEL.value.trim()

    if (newcomment) {
        const dateEL = document.createElement('div')
        dateEL.classList.add("comment_date")
        const dateString = dataToString(new Date());
        dateEL.innerText = dateString;

        // innerText에 값을 추가해야함
        // const contentEL = document.createElement('div')
        // contentEL.classList.add('comment_user')
        // contentEL.innerText = ;
        const contentEL = document.createElement('div')
        contentEL.classList.add('comment_content')
        contentEL.innerText = newcomment;

        const commentEL = document.createElement('div')
        commentEL.classList.add('comment_row')
        commentEL.appendChild(dateEL)
        commentEL.appendChild(contentEL)

        document.getElementById('comments').appendChild(commentEL)
        newcommentEL.value = "";

        // dateEL.addEventListener('click', function() {
        //     commentEL.remove()
        // })

    } else {
        warnEmpty()
    }
}