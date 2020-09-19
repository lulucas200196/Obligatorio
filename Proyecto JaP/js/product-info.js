var product = {};
const productsArray = [];

function showImages(array){  //Función para mostrar las imagenes como una gallería

        let htmlImages = "";
        let htmlIndicators = "";

    for(let i = 0; i < array.length; i++){   //mostramos cada uno de los elementos del array
        let images = array[i];

        if (i == 0) {
            htmlImages += `
            <div class="carousel-item active">
                <img src="${images}" alt="" class="img-fluid img-thumbnail">
            </div>
              `;
              htmlIndicators +=`
            <li data-target="#productImages" data-slide-to="${i}" class="active"></li>
            `;  
           
        }else{
            htmlImages += `
            <div class="carousel-item">
                <img src="${images}" alt="" class="img-fluid img-thumbnail" >
            </div>
              `;
              htmlIndicators +=`
            <li data-target="#productImages" data-slide-to="`+ i +`"></li>
            `
        }  
    }
    
    document.getElementById("slides").innerHTML = htmlImages;
    document.getElementById("indicators").innerHTML = htmlIndicators;
    
    //Flechas para cambiar de imagen en el carrusel
    document.getElementById("productImages").innerHTML += `
    <a class="carousel-control-prev" href="#productImages" data-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#productImages" data-slide="next">
              <span class="carousel-control-next-icon"></span>
            </a>
            `
    ;
}

function showProductsRel(arrayProductos, arrayRelated){   //mostrar los productos relacionados
    let htmlContentToAppend = `<br> <div>`;
    for(let h = 0; h < arrayRelated.length; h++){   //para cada elemento del array de los relacionamos
        let rel = arrayRelated[h];
    
    for(let i = 0; i < arrayProductos.length; i++){
        let product = arrayProductos[i];
        if(i === rel){                       //si la posición del producto es igual a un elemento del array relacionados
                                            //mostramos los datos de dicho producto
            htmlContentToAppend += `           
            
            <a href="product-info.html" class="list-group-item list-group-item-action" style="width: 18rem">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                <br>
                <h5 class="mb-1">`+ product.currency + " " + product.cost + `</h5>
                
                <p class="mb-1">`+ product.name + `</p>
            </a>
            `
        }
        //escribimos todo el html en el elemento de id productosRel y agregamos un boton para dejar de ver los productos
        document.getElementById("productsRel").innerHTML = htmlContentToAppend + ` 
        </div>
        <br> 
        <button class="btn btn-light" onclick="dejarDeVer()";>
        Dejar de ver
        </button>
        `;
    }
}
}

function dejarDeVer(){
    showSpinner();
    document.getElementById('productsRel').innerHTML = '';  //Borra todo el contenido del div con id productosRel
    hideSpinner();
}

function showComments(array){   //mostrar comentarios
    let htmlContentToAppend = "";

    for (i = 0; i < array.length; i++){      //Cada elemento del array comentarios lo igualamos a comment para luego sacar los datos del array
        let comment = array[i];

        var puntuacion = ``;

        //escribimos 1 estrella amarilla tantas veces como la puntuación que nos da comment.score
    for (let j=0; j < comment.score; j++){
        puntuacion += `
        <i class="fa fa-star" style="color: orange;"></i>
        `
        ;
    }   
        //escribimos las estrellas que nos faltan para llegar a 5 estrellas, de color gris
    for (let k=0; k < 5 - comment.score; k++){              //5 es el total de estrellas que queremos y comment.score es el numero de estrellas que ya escribimos
        puntuacion += `
        <i class="fa fa-star" style="color: gray;"></i>
        `
        ;
    }
        //mostramos todos los datos de los commentarios
        htmlContentToAppend += `
        
        
        <dt>${comment.user}</dt>            
              <br>
              <dd>${comment.description} - ${puntuacion}</dd>
              <dd>${comment.dateTime}</dd>
              <hr class="my-3">
        `
    }

    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}

//agregar un comentario
function sendComment(){   
    var comentario = document.getElementById("newComment").value;  //Guardamos en comentario, lo que el usuario ingrese en el imput para comentar
    if(comentario === ""){
        alert("Por favor, escriba un comentario.");
    }else{
        var user = localStorage.getItem("Usuario");                    //Guardamos en user, el usuario que está guardado en el localstorage desde el login
        //estrella -> .score
        var newComment = {}; //creamos el objeto que guardará el nuevo comentario


        //Obtener la fecha y hora
        var hoy = new Date();           //guardar, en la variable hoy, una instancia de la clase Date
        var año = hoy.getFullYear();    //guardamos el año actual
        var mes = hoy.getMonth() + 1;   //guardamos el mes actual y le sumamos 1 al porque comienza en 0
        var dia = hoy.getDate();        //guardamos el día actual
    
        //sumamos todo y si el mes y el dia son menores que 10 le agregamos un 0 al principio de cada dato
        var fecha = año + '-' + ((mes < 10) ? '0' + mes: mes) + '-' + ((dia < 10) ? '0' + dia: dia);

        var hora = hoy.getHours();  //guardamos hora actual 
        var min = hoy.getMinutes(); //guardamos minutos actuales
        var seg = hoy.getSeconds(); //guardamos segundos actuales
        
        //sumamos todo y si alguno es menor que 10 le agregamos un 0, sino los datos quedan igual
        var hms = ((hora < 10) ? '0' + hora: hora) + ':' + ((min < 10) ? '0' + min: min) + ':' + ((seg < 10) ? '0' + seg: seg);
        var fechaYHora = fecha + ' ' + hms;

        //agregamos todas las propiedades del nuevo comentario
        newComment.score = estrella;         
        newComment.description = comentario; 
        newComment.user = user;
        newComment.dateTime = fechaYHora;

    
        comments.push(newComment);  //agregamos el objeto nuevocomentario al array comentarios que recibimos del JSON
        showComments(comments);     //mostramos todos los comentarios nuevamente
        //console.log(comments);
        
        //Borramos el contenido del input donde el usuario ingresa el comentario
        document.getElementById("newComment").value = "";
        //Desselecionamos todos los botones de puntuación
        for (let i = 1; i < 5; i++) {
            document.getElementById(`radio${i}`).checked = false;
        }
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            //guardamos en una variable todos los elementos a los que le agregaremos la información
            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            
            //escribimos en cada elemento los datos del producto
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            
            let related = product.relatedProducts; //guardamos el array relatedProducts en la variable related
            
            showImages(product.images); //Muestro las imagenes
            document.getElementById("mostrar").addEventListener("click", function(){  //evento cuando se clickee el botón con id mostrar
                getJSONData(PRODUCTS_URL).then(function(resultObj2){                  //obtenemos el array productos
                    if (resultObj2.status === "ok"){
                        productsAll = resultObj2.data;
                        showProductsRel(productsAll, related);      //del array productos, mostramos solo los relacionados
                    }
                })
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj3){
        if (resultObj3.status === "ok"){

            comments = resultObj3.data;
            showComments(comments); //muestro los comentarios
        }
    })
    
});