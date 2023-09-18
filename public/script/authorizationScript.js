const btn = document.querySelector('.authorizationBtn');
const container = document.querySelector('.users');
const userEmail = document.querySelector('.user__email');
const userPassword = document.querySelector('.user__password');
const dispalyMessage = document.querySelector('.message');
const registrationBtn = document.querySelector('.registrationBtn');

function setAuthorizedUser(name, id) {
    let authorizedUser = {
        name: name,
        id: id,
    };
    localStorage.setItem('authorizedUser', JSON.stringify(authorizedUser));
    return authorizedUser;
}

btn.addEventListener('click', async (e) => {
    e.preventDefault();

    let authorizationReq = {
        email: userEmail.value,
        password: userPassword.value,
    }

    let req = await fetch('/authorization', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(authorizationReq),
    })

    let message;
    let user;

    if (req.status == 403) {
        message = await req.text();
        dispalyMessage.textContent = message;
    }
    else if (req.status == 200) {
        user = await req.json();
        let authorizedUser = setAuthorizedUser(user.name, user.id)
        console.log(authorizedUser);
        dispalyMessage.textContent = '';
        window.location.href = '/main';
    }
    else {
        console.log('Возникла ошибка');
    }

})

registrationBtn.addEventListener('click', () => {
    window.location.href = '/registration';
})