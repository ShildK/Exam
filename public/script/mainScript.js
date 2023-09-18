const btn = document.querySelector('button');
const title = document.querySelector('.title');
const container = document.querySelector('.container');
const addNewNote = document.querySelector('.add');
const inputNewNote = document.querySelector('.input__add__note');
const message = document.querySelector('.message');
const wrap = document.querySelector('.main')
const LogOut = document.querySelector('.lod__out');

function getAuthorizedUser() {
    let authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
    if (authorizedUser == undefined) {
        clearAuthorizedUser()
    }
    return authorizedUser
}

function clearAuthorizedUser() {
    localStorage.removeItem('authorizedUser')
}

window.onload = async () => {
    let authorizedUser = getAuthorizedUser();
    if (authorizedUser != undefined) {
        title.textContent = `Привет, ${authorizedUser.name}!`
        let userNotes = await getUserNotes();
        displayNotes(userNotes)

    }
    else {
        alert('Необходимо авторизоваться')
        window.location.href = '/authorization';


    }
}

async function addUserNote(text) {
    let authorizedUser = getAuthorizedUser();
    let userID = authorizedUser.id;
    let req = await fetch(`/api/users/${userID}/notes`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ text: text }),
    });
    let res = await req.json();
    return res;
}

async function updateUserNote(noteID, text) {
    let authorizedUser = getAuthorizedUser();
    let userID = authorizedUser.id;
    let req = await fetch(`/api/users/${userID}/notes/${noteID}`, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        method: "PUT",
        body: JSON.stringify({ text: text }),
    });
    let res = await req.json();
    return res
}

async function getUserNotes() {
    let authorizedUser = getAuthorizedUser();
    let userID = authorizedUser.id;
    let req = await fetch(`/api/users/${userID}/notes`);

    let res = await req.json();
    return res
}

async function deleteUserNote(noteID) {
    let authorizedUser = getAuthorizedUser();
    let userID = authorizedUser.id;
    let result = await fetch(`/api/users/${userID}/notes/${noteID}`, {
        method: 'DELETE',
    })

    return result
}


addNewNote.addEventListener('click', async () => {
    let text = inputNewNote.value
    if (inputNewNote.value != '') {
        let noteId = await addUserNote(text);
        displayNote({ id: noteId, text: text });
    }
    else {
        message.textContent = 'Поле ввода не может быть пустым'
    }
    inputNewNote.value = ''
})

function displayNote(note) {
    const wrapNotes = document.querySelector('.notes');

    let newNote = document.createElement('div');
    newNote.classList.add('new__note');

    let newNoteText = document.createElement('input');
    newNoteText.classList.add('new__note__text');
    newNoteText.type = 'text';
    newNoteText.setAttribute("readonly", "readonly");
    newNoteText.value = `${note.text}`;

    let noteBtnDelete = document.createElement('button');
    noteBtnDelete.textContent = 'Удалить';
    noteBtnDelete.classList.add('note__btn__delete');
    noteBtnDelete.setAttribute('id', `${note.id}`)

    let noteBtnUpdate = document.createElement('button');
    noteBtnUpdate.textContent = 'Изменить';
    noteBtnUpdate.classList.add('note__btn__update');
    noteBtnUpdate.setAttribute('id', `${note.id}`)

    wrapNotes.appendChild(newNote);
    newNote.appendChild(newNoteText);
    newNote.appendChild(noteBtnUpdate);
    newNote.appendChild(noteBtnDelete);

    noteBtnUpdate.addEventListener('click', async (e) => {
        let noteID = e.target.id
        if (noteBtnUpdate.innerHTML == "Изменить") {
            noteBtnUpdate.innerHTML = "Сохранить";
            newNoteText.removeAttribute("readonly", "readonly");
        }
        else {
            noteBtnUpdate.innerHTML = "Изменить"
            let updateResult = await updateUserNote(noteID, newNoteText.value);
            newNoteText.setAttribute("readonly", "readonly");
        }
    })

    noteBtnDelete.onclick = async function (e) {
        let noteID = e.target.id
        await deleteUserNote(noteID);
        this.parentElement.remove();
    }
}

function displayNotes(notes) {
    let html = `
        <div class="notes"></div>
    `
    container.innerHTML = html
    notes.forEach(note => {
        displayNote(note);
    });
}
function displayModalWindow() {
    const html = `
    <div class="modal__window">
        <h4 class="question__about__logout">Выйти из аккаунта?</h4>
        <div class="button__wrap">
            <button class="btn__logout">Да</button>
            <button class="btn__cansel">Нет</button>
        </div>
    </div>
    `
    wrap.insertAdjacentHTML('beforeend', html);
}


LogOut.addEventListener('click', (event) => {
    debugger
    displayModalWindow()
    $('.btn__cansel').click(function (event) {
        if ($('.modal__window').hasClass('modal__window__none')) {
            $('.modal__window').css('display', 'none')
        }
        else {
            $('.modal__window').addClass('modal__window__none')
        }
    })
    $('.btn__logout').on('click', function (event) {
        if ($('.modal__window').hasClass('modal__window__none')) {
            $('.modal__window').css('display', 'none')
            $('.modal__window').removeClass('modal__window__none')
            window.location.href = '/authorization';
        }
        else {
            $('.modal__window').addClass('modal__window__none')

        }
        clearAuthorizedUser()



        event.preventDefault()
    })

})