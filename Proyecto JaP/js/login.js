//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function onLogin(){
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    if (user =="" || pass =="") {
        alert("Por favor, complete los campos vacíos");
    }else{
        //Guardar datos en localStorage
        localStorage.setItem("Usuario", user);
        //redirección al inicio
        location.href='index.html';
    }
    if (document.getElementById('rePass').checked){ //si selecciona recordar contraseña
        localStorage.setItem("Password", pass); //la guardamos en el localstorage
    }
   
};

function mostrar(){
    //obtener datos almacenados
    var user = localStorage.getItem("Usuario");
    //Mostrando los datos almacenados
    document.getElementById("perfil").innerHTML = user;
}

function logOut(){
    localStorage.clear();   
    location.href='login.html';
}

/*
document.getElementById("button").addEventListener("click", function(){
    onLogin();
});

document.getElementById("close").addEventListener("click", function(){
    logOut();
});*/

document.addEventListener("DOMContentLoaded", function(e){

});