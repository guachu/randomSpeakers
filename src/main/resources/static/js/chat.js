const handlerSubmit = event => {
    event.preventDefault()
    const email = document.querySelector("#username").value
    const pass = document.querySelector("#password").value

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

const logout = () => {
    console.log("logout")
    firebase.auth().signOut()
}

firebase.auth().onAuthStateChanged(
    user => {
        console.log("from changed")
        statusEffects(user)
    }
)

const setLoggedElements = (user) => {
    const { email } = user
    const nickName = email.split('@')[0]
    userName.innerHTML = nickName
}

const setLogoutElements = () => {
    console.log("logout redirect")
    //window.location.replace("login.html")
}

const statusEffects = user => {
    console.log(user)
    if (user) {
        setLoggedElements(user)
    }
    else {
        setLogoutElements()
    }
}



const btnLogout = document.querySelector("#btnLogout")
btnLogout.addEventListener("click", logout)