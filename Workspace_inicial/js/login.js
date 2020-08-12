//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

      function onLogin(){
    var email = document.getElementById("email").value;
    var contrasenia = document.getElementById("pass").value;
    if (email!=""&& contrasenia !="") {
        window.location='index.html';
        auxi = 1;
    }else{        
        alert("Por favor, complete los campos vacíos");
    }

    
};

document.addEventListener("DOMContentLoaded", function(e){

});