//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function onLogin(){
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    if (email =="" || pass =="") {
        alert("Por favor, complete los campos vacíos");
    }else{        
        location.href='index.html';
    }    
};


document.getElementById("button").addEventListener("click", function(){
    onLogin();
});


document.addEventListener("DOMContentLoaded", function(e){

});