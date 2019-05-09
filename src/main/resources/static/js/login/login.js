var registerModule=(function(){
    var register=function() {
        var nameF = document.getElementById('name').value;
        var emailF = document.getElementById('email').value;
        var passwordF = document.getElementById('password').value;
        
        var user = { name : nameF, email : emailF, password : passwordF,profile:null,rating:null};
        APIModule.register(user);
        //location.href = "/login"; 
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
        var user = { name : nameF,  password : passwordF};
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


