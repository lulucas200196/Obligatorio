var carrito = {};
var articulos = [];
var currentCurrency = "";
var total = 0;
var porcentaje = 0.15;

function showCart(object){ //mostrar el carrito
    array = object.articles;
    if(array.length < 1){ //carrito vacío
        document.getElementById("all").innerHTML = `
        <div>
            <h3 class="p-4" align="center">El carrito está vacío</h3>
            <div>
            <a class="btn btn-light btn-lg btn-block" href="products.html">Ver más productos</a>
            </input>
            </div>
        </div>
        `;
        showCartCount();
    }else{ //escribimos el carrito
    let htmlContent = `
    <hr class="my-3">
    <table align="center" cellspacing="1000" cellpadding="10" width="100%" class="lead">
        <tbody>
      <tr>  
        <th> </th>
        <th>Nombre</th>
        <th>Costo Unitario</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
        <th>Eliminar</th>
      </tr>
      `;
    array = object.articles;
    total = 0;
    for (let i = 0; i < array.length; i++) {  //escribimos cada producto en la tabla
        const article = array[i];       
        total += article.subTotal;
        htmlContent += `
        <tr>
            <td><img src="${article.src}" alt="${article.name} class="card" style="width: 150px;"></td>
            <td>${article.name}</td>
            <td id="costUnit${i}">${article.currency}`+ " " +`${article.unitCost}</td>
            <td width="60"><input type="number" class="form-control" id="productCostInput${i}"  required="" value="${article.count}" min="0" onclick="cant(carrito)" onkeyup="cant(carrito)"> <p class="invalid-feedback" style="font-size:small" align="center">Cantidad incorrecta</p></td>
            <td id="cant${i}">${article.currency}`+ " " +`${article.subTotal}</td>
            <td align="center"><span class="deleteCart" id="del${i}" onclick="articulos.splice(${i}, 1); showCart(carrito); showBuy(); updateTCosts(); showCartCount();"> <i class="fas fa-trash-alt"> </i></span></td>
        </tr>
            `;
    }
    //escribimos el final de la tabla con el total etc.
    document.getElementById("cart-container").innerHTML = htmlContent + `
    <tr>  
        <td></td>
        <td></td>
        <td></td>
        <th>Total:</th>
        <td><span id="total"> ${currentCurrency} ${total}<span></td>
        <td><button class="btn btn-light" id"delAll" onclick="delAll(carrito);">Vaciar carrito</button></td>
      </tr>
    </tbody>
    </table>
    <hr class="my-3">
    <div align="center">
        <button class="btn btn-secondary" onclick="pesos(carrito)"> Ver todo en Pesos</button>
        <button class="btn btn-secondary" onclick="dollars(carrito)"> Ver todo en Dolares</button>
    </div>
    <br>
    `;
    }
    localStorage.setItem("cart", JSON.stringify(object)); //guardo el carrito en el localStorage
    showCartCount();
}

function cant(object){ //cambiando cantidad de articulos
    array = object.articles;
    total = 0;
    for (let h = 0; h < array.length; h++) {
        const article = array[h];

        article.count = document.getElementById(`productCostInput${h}`).value; //convertimos la cantidad de cada producto en el valor que tenga el input
        article.subTotal = article.unitCost * article.count; //calculamos el valor subtotal de cada articulo
        total += article.subTotal; //lo sumamos al total del precio
        document.getElementById(`cant${h}`).innerHTML = article.currency + " " + article.subTotal;
    }
    document.getElementById("total").innerHTML = currentCurrency + " " + total; //escribimos el total
    updateTCosts();
    localStorage.setItem("cart", JSON.stringify(object));
}

function delAll(object){ //borrar todos los elementos del carrito
    object.articles = [];
    showCart(object);
}

function pesos(object){ //convertir todos los precios a pesos
    array = object.articles;
    total = 0;
    currentCurrency = "UYU";
    for (let g = 0; g < array.length; g++) {
        const article = array[g];
        if(article.currency === "USD"){
            article.unitCost *= 40;
            article.currency = "UYU";
            article.count = document.getElementById(`productCostInput${g}`).value;
            article.subTotal = article.unitCost * article.count;
            total += article.subTotal;
        }
    }
    showCart(object);
    showBuy();
    updateTCosts()
}

function dollars(object){ //convertir todos los precios a dolares
    array = object.articles;
    total = 0;
    currentCurrency = "USD";
    for (let f = 0; f < array.length; f++) {
        const article = array[f];
        if(article.currency === "UYU"){
            article.unitCost /= 40;
            article.currency = "USD";
            article.count = document.getElementById(`productCostInput${f}`).value;
            article.subTotal = article.unitCost * article.count;
            total += article.subTotal;
        }
    }
    showCart(object);
    showBuy();
    updateTCosts()
}

function showEnvios (){ //mustro toda la informacion de envio
    htmlContent=`
    <h3>Tipo de envío</h3>
        <div class="d-block my-3">
            <div class="custom-control custom-radio">
                <input id="premiumRadio" name="shippingType" type="radio" class="custom-control-input" checked="" required="">
                <label class="custom-control-label" for="premiumRadio">Premium 2 a 5 días (15%)</label>
            </div>
            <div class="custom-control custom-radio">
                <input id="expressRadio" name="shippingType" type="radio" class="custom-control-input" required="">
                <label class="custom-control-label" for="expressRadio">Express 5 a 8 días (7%)</label>
            </div>
            <div class="custom-control custom-radio">
                <input id="standardRadio" name="shippingType" type="radio" class="custom-control-input" required="">
                <label class="custom-control-label" for="standardRadio">Stándard 12 a 15 días (5%)</label>
            </div>
        </div>
        <br>
    <h3>Dirección de envío</h3>
        <br>
        <div class="row">
            <div class="col-md-3 mb-3">
                <label for="country">Pais:</label>
                <input type="text" class="form-control" id="country" placeholder="" value="">
                <div class="invalid-feedback">
                    Ingresa un país
                  </div>
            </div>
            <div class="col-md-3 mb-3">
                <label for="street">Calle:</label>
                <input type="text" class="form-control" id="street" placeholder="" value="">
                <div class="invalid-feedback">
                    Ingresa una calle
                  </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 mb-3">
                <label for="esq">Esquina:</label>
                <input type="text" class="form-control" id="esq" placeholder="" value="">
                <div class="invalid-feedback">
                    Ingresa una esquina
                  </div>
            </div>
            <div class="col-md-3 mb-3">
                <label for="number">Número de puerta:</label>
                <input type="number" class="form-control" id="number" placeholder="" value="">
                <div class="invalid-feedback">
                    Ingresa tu número de puerta
                  </div>
            </div>
        </div>
    <hr class"my-3">
    `;

    document.getElementById("envio").innerHTML = htmlContent;
}

function showBuy(){ //muestro toda la informacion sobre la compra, precio, porcentaje de envío y total
    htmlContent=`
    <h4 class="mb-3">Compra</h4>
        <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">Precio</h6>
                    <small class="text-muted">Total de la compra</small>
                </div>
                <span class="text-muted" id="totalCost">${currentCurrency} ${total}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 class="my-0">Precio de envío</h6>
                    <small class="text-muted">Según el tipo de envío</small>
                </div>
                <span class="text-muted" id="comissionText"></span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total ($)</span>
                <strong id="totalCostText">-</strong>
            </li>
        </ul>
    <hr class="mb-4">
    `;
    document.getElementById("comprar").innerHTML = htmlContent;
}

function showPayMethods(){ //muestro link para acceder a la modal de método de pago 
    htmlContent = `
    <div class="d-block my-3">
        <h4 class="mb-3">Métodos de pago</h4>    
        <div id="showMethod" class="mb-3"></div>
        <div class="row">
            <button type="button" class="m-1 btn btn-link" data-toggle="modal" data-target="#methodsModal">Seleccionar método de pago</button>
        </div>
        <div id="invalidMethod" class"mb-3" style="color: red; font-size: small">
        </div>
        <br>
        <button class="btn btn-primary btn-lg" id="buy" onclick="validations();">Comprar</button>
    </div>
    `;
    document.getElementById("metodoPago").innerHTML = htmlContent;
}

function updateTCosts(){ //actualizar costos
    
    let costEnvio = (Math.round(total * porcentaje * 100) / 100);
    let totalToBuy = total + costEnvio;

    let totalToShow = currentCurrency + " " + total;
    let porcentageToShow = currentCurrency + " " + costEnvio;
    let totalCostToShow = currentCurrency + " " + totalToBuy.toFixed(2);
    
    document.getElementById("totalCost").innerHTML = totalToShow;
    document.getElementById("comissionText").innerHTML = porcentageToShow;
    document.getElementById("totalCostText").innerHTML = totalCostToShow;
}

function showCartCount(){ //mostrar cantidad de productos en el carrito en todos los documentos
    //obtener datos almacenados
    var cart = localStorage.getItem("cart");
    //convertimos a JSON la información
    var obj = JSON.parse(cart);
    //Mostrando los datos almacenados
    if(obj === null){
        document.getElementById("cont").innerHTML = `<i class="fas fa-shopping-cart"></i>`;        
    }else{
    document.getElementById("cont").innerHTML = `<i class="fas fa-shopping-cart"></i>` + " " + obj.articles.length; //cantidad de elementos del array obj.articles.length
    }
}

function date(){ //Agregar barra en fecha de expiración de la tarjeta de crédito
    expirationDate = document.getElementById("expiration");
    if(expirationDate.value.length === 2){
        expirationDate.value += "/";    
    }
}

function payMethods(){ //muestro los campos para rellenar dependiendo de la forma de pago seleccionada
    //div para escribir el método de pago
    let showMethod = document.getElementById("showMethod");
    //radio buttons
    var card = document.getElementById("card");
    var bank = document.getElementById("bankA");
    var htmlContent = "";
    
    if(card.checked){ //si se selecciona tarjeta de crédito muestro los siguientes campos
        htmlContent = `
            <div class="form-group row">
                <div class="col-xs-2 col-sm">
                    <label for="completeName">Nombre y apellido</label>
                    <input id="completeName" type="text" class="form-control">
                    <div class="invalid-feedback">
                        Ingresa tu nombre y apellido
                    </div>
                </div>
                <div class="col-xs-2 col-sm">
                    <label for="cardNumber">Número de tarjeta</label>
                    <input id="cardNumber" type="tel" class="form-control">
                    <div class="invalid-feedback">
                        Ingresa el número de la tarjeta
                    </div>
                </div>
            </div>  

            <div class="form-group row">
                <div class="col-xs-2 col-sm">
                    <label for="expiration">Fecha de venc. (MM/AA)</label>
                    <input id="expiration" type="tel" class="form-control" onkeyup="date();" maxlength="5">
                    <div class="invalid-feedback">
                        Ingresa fecha de nacimiento
                    </div>
                </div>
                <div class="col-xs-2 col-sm">
                    <label for="securityCode">Código de seg. (CVV)</label>
                    <input id="securityCode" type="tel" class="form-control" maxlength="4">
                    <div class="invalid-feedback">
                        Ingresa el código de seguridad
                    </div>
                </div>  
            </div>
        `;
        document.getElementById("cardHTML").innerHTML = htmlContent;
        document.getElementById("bankHTML").innerHTML = "";
        showMethod.innerHTML = `<br><p>Método de pago seleccionado: <strong>${card.value}</strong></p>`;
    }else if (bank.checked){ //si se selecciona cuenta bancaria muestro el siguiente campo
        htmlContent = `
            <div class="form-group row">
              <div class="col-xs-2 col-sm">
                <label for="bankNumber">Número de cuenta</label>
                <input id="bankNumber" type="text" class="form-control">
                <div class="invalid-feedback">
                    Ingresa el número de cuenta
                </div>
              </div>
            </div>
        `;
        document.getElementById("bankHTML").innerHTML = htmlContent;
        document.getElementById("cardHTML").innerHTML = "";
        showMethod.innerHTML = `<br><p>Método de pago seleccionado: <strong>${bank.value}</strong></p>`;
    }
    //vacío div de ivalidación
    document.getElementById("invalidMethod").innerHTML = "";
}

function validations(){ //funcion validar espacios vacíos
    let infoMissing = false;
    
    //carrito del local storage
    var cart = localStorage.getItem("cart");
    //convertimos a JSON la información
    var obj = JSON.parse(cart);
    //cantidad de articulos diferentes en el carrito
    var count = obj.articles.length;
    //input cantidades
    for (let e = 0; e < count; e++) {
        let countInput = document.getElementById(`productCostInput${e}`);
        //saco la clase invalida
        countInput.classList.remove(`is-invalid`);
        if(countInput.value <= 0){
            countInput.classList.add(`is-invalid`);
            infoMissing = true;
        }
    }
    //inputs text para validar de envío
    let country = document.getElementById("country");
    let street = document.getElementById("street");
    let corner = document.getElementById("esq");
    let number = document.getElementById("number");
    
    //radio buttons para validar de método de pago
    let card = document.getElementById("card");
    let bankA = document.getElementById("bankA");
    
    //div para escribir invalidación de metodo de pago
    let showInvalidMethod = document.getElementById("invalidMethod");
    
    //Quito las clases que marcan como inválidos (envío)
    country.classList.remove('is-invalid');
    street.classList.remove('is-invalid');
    corner.classList.remove('is-invalid');
    number.classList.remove('is-invalid');
    //vacío el div de metodo de pago incorrecto
    showInvalidMethod.innerHTML ="";
    //inputs de forma de pago
    //consulto el método de pago seleccionado
    if(card.checked){ //si se elige tarjeta de crédito
        let completeName = document.getElementById("completeName");
        let cardNumber = document.getElementById("cardNumber");
        let expiration = document.getElementById("expiration");
        let securityCode = document.getElementById("securityCode");
        
        //quito las clases que marcan con inválidos (tarjeta de crédito)
        completeName.classList.remove('is-invalid');
        cardNumber.classList.remove('is-invalid');
        expiration.classList.remove('is-invalid');
        securityCode.classList.remove('is-invalid');
        //validaciones (tarjeta de crédito)
        if(completeName.value === ""){
            completeName.classList.add('is-invalid');
            showInvalidMethod.innerHTML = `Por favor, selecione un método de pago correcto`;
            infoMissing = true;
        }
        if(cardNumber.value === ""){
            cardNumber.classList.add('is-invalid');
            showInvalidMethod.innerHTML = `Por favor, selecione un método de pago correcto`;
            infoMissing = true;
        }
        if(expiration.value === ""){
            expiration.classList.add('is-invalid');
            showInvalidMethod.innerHTML = `Por favor, selecione un método de pago correcto`;
            infoMissing = true;
        }
        if(securityCode.value === ""){
            securityCode.classList.add('is-invalid');
            showInvalidMethod.innerHTML = `Por favor, selecione un método de pago correcto`;
            infoMissing = true;
        }    
    } else if(bankA.checked){//si se elige cuenta bancaria
        let bankNumber = document.getElementById("bankNumber");
        //quito las clases que marcan con inválidos (cuenta bancaria)
        bankNumber.classList.remove('is-invalid');
        //validamos si está vacío el número de cuenta
        if(bankNumber.value === ""){
            bankNumber.classList.add('is-invalid');
            showInvalidMethod.innerHTML = `Por favor, selecione un método de pago correcto`;
            infoMissing = true;
        }
    }else{  //si nungun método fué seleccionado
        showInvalidMethod.innerHTML = `Por favor, selecione un método de pago`;
        infoMissing = true;
    }
    //Se realizan los controles necesarios

    //Consulto por el nombre del producto
    if (country.value === ""){
        country.classList.add('is-invalid');
        infoMissing = true;
    }
    
    //Consulto por la categoría del producto
    if (street.value === ""){
        street.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por el costo
    if (corner.value === ""){
        corner.classList.add('is-invalid');
        infoMissing = true;
    }
    
    //consulto numero de puerta
    if (number.value === ""){
        number.classList.add('is-invalid');
        infoMissing = true;
    }
    //si todas las validaciones fueron comprobadas
    if (!infoMissing){
        getJSONData(CART_BUY_URL).then(function(resultObj){
            let msgToShowHTML = document.getElementById("resultSpan");
            let msgToShow = "";

            //Si la publicación fue exitosa, devolverá mensaje de éxito
            if (resultObj.status === 'ok'){
                msgToShow = resultObj.data.msg;
                document.getElementById("alertResult").classList.add('alert-success');
            }
            msgToShowHTML.innerHTML = msgToShow;
            document.getElementById("alertResult").classList.add("show");
        });
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            carrito = resultObj.data;
            articulos = carrito.articles;
             //pasamos todo a dolares
            for (let j = 0; j < articulos.length; j++) {
                const article = articulos[j];
                    if(article.currency === "UYU"){
                        article.unitCost /= 40;
                        article.currency = "USD";
                    }
                article.subTotal = article.unitCost * article.count; //agregamos la propiedad subtotal
            }
            currentCurrency = "USD";
            showCart(carrito);
            showEnvios();
            showBuy(carrito);
            updateTCosts();
            showPayMethods();
            document.getElementById("premiumRadio").addEventListener("change", function(){
                porcentaje = 0.15;
                updateTCosts()
            });
            document.getElementById("expressRadio").addEventListener("change", function(){
                porcentaje = 0.07;
                updateTCosts()
            });
            document.getElementById("standardRadio").addEventListener("change", function(){
                porcentaje = 0.05;
                updateTCosts()
            });
        }
    }) 
});