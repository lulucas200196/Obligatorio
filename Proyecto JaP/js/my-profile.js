datos = {};
function guardarDatos(){
    //valores de los inputs de datos
    userInput = document.getElementById("showUser");
    passInput = document.getElementById("showPass");
    nameInput = document.getElementById("showName");
    surnameInput = document.getElementById("showSurname");
    ageInput = document.getElementById("showAge");
    emailInput = document.getElementById("showEmail");
    tNumberInput = document.getElementById("showTNumber");

    //parrafos invalidacion
    userp = document.getElementById("invalidUser");
    namep = document.getElementById("invalidName");
    surnamep = document.getElementById("invalidSurname");
    agep = document.getElementById("invalidAge");
    emailp = document.getElementById("invalidEmail");
    tNumberp = document.getElementById("invalidTNumber");

    let missingInfo = false;
    //guardamos cada dato en el local storage
    if(userInput.value != ""){ //si el input no está vacío lo desabilitamos, guardamos el valor en el local storage y vaciamos el parrafo de invalidación
        userInput.setAttribute("disabled", "");
        localStorage.setItem("Usuario", userInput.value);
        userp.innerHTML ="";
    }else{ //si el input está vacío y el dato no está guardado en el local storage mostramos el parrafo invalido
        userp.innerHTML = "Ingrese un usuario.";
    }
    
    if(passInput.value != ""){
        passInput.setAttribute("disabled", "");
        localStorage.setItem("Password", passInput.value);
    }

    if(nameInput.value != ""){
        var name = nameInput.value;
        nameInput.setAttribute("disabled", "");
        namep.innerHTML = "";
    }else{
        namep.innerHTML = "Ingrese un nombre.";
        missingInfo = true;
    }

    if(surnameInput.value != ""){
        var surname = surnameInput.value;
        surnameInput.setAttribute("disabled", "");
        surnamep.innerHTML = "";
    }else{ 
        surnamep.innerHTML = "Ingrese un apellido.";
        missingInfo = true;
    }
    
    if(ageInput.value != ""){
        var age = ageInput.value;
        ageInput.setAttribute("disabled", "");
        agep.innerHTML= "";
    }else{
        agep.innerHTML = "Ingrese una edad."; 
        missingInfo = true;
    }

    if(emailInput.value != ""){
        var email = emailInput.value;
        emailInput.setAttribute("disabled", "");
        emailp.innerHTML = "";
    }else{
        emailp.innerHTML = "Ingrese una email."; 
        missingInfo = true;
    }

    if(tNumberInput.value != ""){
        var tNumber = tNumberInput.value;
        tNumberInput.setAttribute("disabled", "");
        tNumberp.innerHTML = "";
    }else{
        tNumberp.innerHTML = "Ingrese un número de teléfono."; 
        missingInfo = true;
    }
    
    if(!missingInfo){ //si no se perdio ningun dato guardo el objeto en el local storage
        datos.nombre = name;
        datos.apellido =  surname;
        datos.edad = age;
        datos.email = email;
        datos.numeroT = tNumber;
        localStorage.setItem("dates", JSON.stringify(datos))
    
        let msgToShowHTML = document.getElementById("resultSpan");
        let msgToShow = "";
        msgToShow = "¡Cambios guardados con éxito!";
        document.getElementById("alertResult").classList.add('alert-success');
        msgToShowHTML.innerHTML = msgToShow;
        document.getElementById("alertResult").classList.add("show");
    }
    /*
    if (misssingInfo){
        let msgToShowHTML = document.getElementById("resultSpan");
        let msgToShow = "";
        msgToShow = "¡Cambios guardados con éxito!";
        document.getElementById("alertResult").classList.add('alert-success');
        msgToShowHTML.innerHTML = msgToShow;
        document.getElementById("alertResult").classList.add("show");
    }*/
    mostrarDatos();
    //mostrar usuario en el menú
    mostrar();
}
function mostrarDatos(){
    //datos del local storage
    
    var datos = JSON.parse(localStorage.getItem("dates"));
    var user = localStorage.getItem("Usuario");
    var pass = localStorage.getItem("Password");

    //inputs de datos
    userInput = document.getElementById("showUser");
    passInput = document.getElementById("showPass");
    nameInput = document.getElementById("showName");
    surnameInput = document.getElementById("showSurname");
    ageInput = document.getElementById("showAge");
    emailInput = document.getElementById("showEmail");
    tNumberInput = document.getElementById("showTNumber");
    
    //mostrar usuario
    userInput.value = user;
    //desabilitamos el input
    userInput.setAttribute("disabled", "");

    //mostrar contraseña
    if (pass === null){
        passInput.placeholder = `Sin guardar`;
    }else{
        let pas="";
        for (let i = 0; i < pass.length; i++) {
            pas += "•";
        }
        passInput.value = pas;
    }
    passInput.setAttribute("disabled", "");

    
    //mostrar nombre apellido edad email y numero si están definidos y guardados en el localStorage
    if(datos != null){
        if (datos.nombre != null){
            nameInput.value = datos.nombre;
            nameInput.setAttribute("disabled", "");
        }
        if (datos.apellido != null){
            surnameInput.value = datos.apellido;
            surnameInput.setAttribute("disabled", "");
        }
        if (datos.edad != null){
            ageInput.value = datos.edad;
            ageInput.setAttribute("disabled", "");
        }
        if (datos.email != null){
            emailInput.value = datos.email;
            emailInput.setAttribute("disabled", "");
        }
        if (datos.numeroT != null){
            tNumberInput.value = datos.numeroT;
            tNumberInput.setAttribute("disabled", "");
        }
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarDatos();
    document.getElementById("editUser").addEventListener("click", function (e){
        document.getElementById("showUser").removeAttribute("disabled");
    })
    document.getElementById("editPass").addEventListener("click", function (e){
        document.getElementById("showPass").removeAttribute("disabled");
    })
    document.getElementById("editName").addEventListener("click", function (e){
        document.getElementById("showName").removeAttribute("disabled");
    })
    document.getElementById("editSurname").addEventListener("click", function (e){
        document.getElementById("showSurname").removeAttribute("disabled");
    })
    document.getElementById("editAge").addEventListener("click", function (e){
        document.getElementById("showAge").removeAttribute("disabled");
    })
    document.getElementById("editEmail").addEventListener("click", function (e){
        document.getElementById("showEmail").removeAttribute("disabled");
    })
    document.getElementById("editTNumber").addEventListener("click", function (e){
        document.getElementById("showTNumber").removeAttribute("disabled");
    })
});