var product = {};
const productsArray = [];

function showImages(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let images = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}

function showProductsRel(arrayProductos, arrayRelated){
    let htmlContentToAppend = `<br> <div>`;
    for(let h = 0; h < arrayRelated.length; h++){
        let rel = arrayRelated[h];
    
    for(let i = 0; i < arrayProductos.length; i++){
        let product = arrayProductos[i];
        if(i === rel){
        
            htmlContentToAppend += `
            
            <a href="product-info.html" class="list-group-item list-group-item-action" style="width: 18rem">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                <br>
                <h5 class="mb-1">`+ product.currency + " " + product.cost + `</h5>
                
                <p class="mb-1">`+ product.name + `</p>
            </a>
            `
        }

        document.getElementById("productsRel").innerHTML = htmlContentToAppend + ` 
        </div>
        <br> 
        <button class="btn btn-light" onclick="document.getElementById('productsRel').innerHTML = ''";>
        Dejar de ver
        </button>
        `;
    }
}
}


function showComments(array){
    let htmlContentToAppend = "";

    for (i = 0; i < array.length; i++){
        let comment = array[i];

        var puntuacion = ``;

        //hacer que las estrellas se pinten de color

    for (let j=0; j < comment.score; j++){
        puntuacion += `
        <i class="fa fa-star" style="color: orange;"></i>
        `
        ;
    }   
        
    for (let k=0; k < 5 - comment.score; k++){
        puntuacion += `
        <i class="fa fa-star" style="color: gray;"></i>
        `
        ;
    }

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


function enviarComentario(){
    var comentario = document.getElementById("newComment").value;
    var user = localStorage.getItem("Usuario");
    //estrella -> .score
    var newComment = {};


    //Obtener la fecha y hora
    var hoy = new Date(); //guardar, en la variable hoy, una instancia de la clase Date
    var año = hoy.getFullYear();
    var mes = hoy.getMonth() + 1; //sumamos 1 al mes porque comienza en 0
    var dia = hoy.getDate(); 
    
    var fecha = año + '-' + ((mes < 10) ? '0' + mes: mes) + '-' + ((dia < 10) ? '0' + dia: dia);

    var hora = hoy.getHours();
    var min = hoy.getMinutes();
    var seg = hoy.getSeconds();
    
    var hms = ((hora < 10) ? '0' + hora: hora) + ':' + ((min < 10) ? '0' + min: min) + ':' + ((seg < 10) ? '0' + seg: seg);
    var fechaYHora = fecha + ' ' + hms;

    newComment.score = estrella;
    newComment.description = comentario;
    newComment.user = user;
    newComment.dateTime = fechaYHora;

    comments.push(newComment);
    showComments(comments);
    //console.log(comments);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            
            let related = product.relatedProducts;
            //Muestro las imagenes en forma de galería
            showImages(product.images);
            document.getElementById("mostrar").addEventListener("click", function(){
                getJSONData(PRODUCTS_URL).then(function(resultObj2){ //obtenemos el array productos
                    if (resultObj2.status === "ok"){
                        productsAll = resultObj2.data;
                        showProductsRel(productsAll, related); 
                    }
                })
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj3){
        if (resultObj3.status === "ok"){

            comments = resultObj3.data;
            showComments(comments);
        }
    })
    
});