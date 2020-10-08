var carrito = {};
var articulos = [];
var currentCurrency = "";
var total = 0;
var porcentaje = 0.15;

function showCart(object){
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
            <td><input type="number" class="form-control" id="productCostInput${i}" style="width: 60px" required="" value="${article.count}" min="0" onclick="cant(carrito)" onkeyup="cant(carrito)"></td>
            <td id="cant${i}">${article.currency}`+ " " +`${article.subTotal}</td>
            <td align="center"><span class="deleteCart" id="del${i}" onclick="articulos.splice(${i}, 1); showCart(carrito); showBuy(); updateTCosts(); showCartCount();"> <i class="fas fa-trash-alt"> </i></span></td>
        </tr>
            `;
    }
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
    localStorage.setItem("cartCount", array.length);   
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
}

function delAll(object){
    object.articles = [];
    showCart(object);
}

function pesos(object){
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

function dollars(object){
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

function showEnvios (){
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
            </div>
            <div class="col-md-3 mb-3">
                <label for="street">Calle:</label>
                <input type="text" class="form-control" id="street" placeholder="" value="">
            </div>
        </div>
        <div class="row">
            <div class="col-md-3 mb-3">
                <label for="esq">Esquina:</label>
                <input type="text" class="form-control" id="esq" placeholder="" value="">
            </div>
            <div class="col-md-3 mb-3">
                <label for="number">Número de puerta:</label>
                <input type="number" class="form-control" id="number" placeholder="" value="">
            </div>
        </div>
    <hr class"my-3">
    `;

    document.getElementById("envio").innerHTML = htmlContent;
}

function showBuy(){
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
                <span class="text-muted" id="comissionText">-</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
                <span>Total ($)</span>
                <strong id="totalCostText">-</strong>
            </li>
        </ul>
    <hr class="mb-4">
    <button class="btn btn-primary btn-lg" type="submit">Comprar</button>
    `;
    document.getElementById("comprar").innerHTML = htmlContent;
}

function updateTCosts(){
    
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
    var count = localStorage.getItem("cartCount");
    //Mostrando los datos almacenados
    if(count === null){
        document.getElementById("cont").innerHTML = `<i class="fas fa-shopping-cart"></i>`;        
    }else{
    document.getElementById("cont").innerHTML = `<i class="fas fa-shopping-cart"></i>` + " " + count;
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
            
            for (let j = 0; j < articulos.length; j++) { //pasamos todo a dolares
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

/* ONCLICK y ONKEYUP en function showCart(); at cart.js:35
                inputCant = document.getElementById(`productCostInput${j}`);
    
                // cambiar cantidad clickeando
                inputCant.addEventListener("click", function(){
                    cant(carrito);
                });
                // cambiar cantidad escribiendo
                inputCant.addEventListener("keyup", function(){
                    cant(carrito);
                });

                //borrar un articulo
                document.getElementById(`del${j}`).addEventListener("click", function(){
                    articulos.splice(j, 1);
                    showCart(carrito);
                });*/