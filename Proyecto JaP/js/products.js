const ORDER_ASC_BY_NAME = "AZ";
const ORDER_BY_PROD_COST_UP = "Mayor precio";
const ORDER_BY_PROD_COST_DOWN = "Menor precio";
const ORDER_BY_PROD_SOLD_COUNT = "Más relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST_UP){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST_DOWN){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return 1; }
            if ( aCost < bCost ){ return -1; }
            return 0;
        });   
    }else if (criteria === ORDER_BY_PROD_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        })
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(category.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) <= maxCost))){

            htmlContentToAppend += `
            <div class="col-md-4">
                <div class="card mb-4 ">
                    <a href="product-info.html" class="custom-card">
                    <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    <hr> 
                    <div class="card-body">                        
                        <h5>${category.name}</h5>
                        <strong class="card-text">${category.currency} ${category.cost}</strong>
                        <div class="descr">
                        <hr class="mb-lg">
                        <p class="card-text text-muted">${category.description}</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
            `
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}
/**<a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + " - " + category.currency + " " + category.cost +`</h4>
                            <small class="text-muted">` + category.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a> */
function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortByCostUp").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COST_UP);
    });
    
    document.getElementById("sortByCostDown").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COST_DOWN);
    });
    
    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de productos.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});