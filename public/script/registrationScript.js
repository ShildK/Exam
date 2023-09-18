const btn = document.querySelector('.registrationBtn');
const container = document.querySelector('.users');
const userName = document.querySelector('.user__name');
const userEmail = document.querySelector('.user__email');
const userPassword = document.querySelector('.user__password');
const checkPassword = document.querySelector('.check__user__password');
const dispalyMessage = document.querySelector('.message');
const authorizationBtn = document.querySelector('.authorization');

btn.addEventListener('click', async (e) => {
    e.preventDefault()

    if (userPassword.value == checkPassword.value) {
        let data = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
        }

        let req = await fetch('/registration', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data),
        })

        // let res = await req.json();
        // console.log(res);
        let message;
        let userID;

        if(req.status == 403){
            message = await req.text()
            dispalyMessage.textContent = message
        }
        else if(req.status == 200){
            userID = await req.text()
            dispalyMessage.textContent = ''
            window.location.href = '/authorization';
        }
        else{
            console.log('Возникла ошибка');
        }
    }
    else{
        dispalyMessage.textContent = 'Пароли не совпадают'
    }

})

authorizationBtn.addEventListener('click', () => {
    window.location.href = '/authorization';
})