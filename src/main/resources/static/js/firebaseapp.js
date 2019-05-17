const myform = document.querySelector("#mainForm")
const btnLogout = document.querySelector("#btnLogout")
const loginSection = document.querySelector("#loginSection")
const userName = document.querySelector("#userName")
const statusOnline = document.querySelector("#statusOnline")
const statusOffline = document.querySelector("#statusOffline")

const handlerSubmit = event => {
    event.preventDefault()
    const email = document.querySelector("#inputEmail").value
    const pass = document.querySelector("#inputPassword").value

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

const logout = () => {
    firebase.auth().signOut()
}

firebase.auth().onAuthStateChanged(
    user => {
        statusEffects(user)
    }
)

myform.addEventListener("submit", handlerSubmit)
btnLogout.addEventListener("click", logout)

const setLoggedElements = (user) => {
    loginSection.classList.add('hidden')
    statusOffline.classList.add('hidden')
    statusOnline.classList.remove('hidden')

    const { email } = user
    const nickName = email.split('@')[0]
    userName.innerHTML = nickName
    loginSection.classList.add('hidden')
}

const setLogoutElements = () => {
    statusOffline.classList.remove('hidden')

    loginSection.classList.remove('hidden')
    statusOnline.classList.add('hidden')
    userName.innerHTML = ""
}


const statusEffects = user => {
    if (user) {
        setLoggedElements(user)
    }
    else {
        setLogoutElements()
    }
}

const main = () => {
    const user = firebase.auth().currentUser;
    statusEffects(user)
}

main() 