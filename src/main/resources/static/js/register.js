//var host = "http://localhost:8080/randoms/register"
var host = "https://randomspeakers.herokuapp.com/register"

function regi(){
	let email = document.getElementById('email').value;
	let pwd = document.getElementById('pwd').value;
	
	firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  
	  console.log(errorCode);
	  console.log(errorMessage);
	  // ...
	});
}