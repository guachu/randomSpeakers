//var host = "http://localhost:8080/randoms/users"
var host = "https://randomspeakers.herokuapp.com/users"

async function addUser(){
    //console.log(document.getElementById("username").value);
    await Promise.resolve(axios.post(host+"sign-up",{
        "username":document.getElementById("username").value,
        "password":document.getElementById("password").value
    }));
    window.location.href='login';
}
firebase.auth().onAuthStateChanged(
    user => {
        statusEffects(user)
    }
)

const handlerSubmit = event => {
    event.preventDefault()
    const email = document.querySelector("#username").value
    const pass = document.querySelector("#password").value

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .catch(function (error) {
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

const statusEffects = user => {
    console.log(user)
    if (user) {
        window.location.replace("index.html")
    }
    else {
        console.log("user is empty")
    }
}

const main = () => {
    const user = firebase.auth().currentUser;
    statusEffects(user)
}

const myform = document.querySelector("#login-form")
myform.addEventListener("submit", handlerSubmit)

main()