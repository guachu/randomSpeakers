var registerModule=(function(){
    var register=function() {
        var nameF = document.getElementById('name').value;
        var emailF = document.getElementById('email').value;
        var passwordF = document.getElementById('password').value;
        var cPasswordF = document.getElementById('password_confirmation').value;
        if (passwordF != cPasswordF){
            alert("La contraseña no concuerca con la confirmacion de esta");
        }
        else{
            var user = { nombre : nameF, mail : emailF, contrasenia : passwordF};
            postRequest("/api/identificacion/Registrar", user, function(data){
            console.log("valor del data: "+data == true)
            console.log("data: "+data)
            if(data){
                location.href = "/index.html"; 
            }
            else{
                alert("Lo sentimos ese nombre de usuario ya esta registrado");
            }
            
        });
        }
        
        
    }
    var postRequest= function(url, object,callback){
        //debugger
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(object),
            success:callback
        });
    }
    return{
        register: register
    }
})();

var loginModule=(function(){
    var loginManage=function() {

        var nameF = document.getElementById('name').value;
        var passwordF = document.getElementById('password').value;
        console.log(nameF);
        console.log(passwordF);
        var user = { nombre : nameF, contrasenia : passwordF};
        postRequest("/api/identificacion", user, function(data){
            location.href = "/main.html"; 
        });
        
    }
    var postRequest= function(url, object,callback){
        //debugger
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(object),
            success:callback
        });
    
    }
    return{
        login: function(){
            loginManage();
        }
    }
})();
