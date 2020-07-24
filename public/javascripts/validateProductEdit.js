window.addEventListener("load", function () {
    
    let category = document.querySelector("select.category");
    category.addEventListener("change", function () {
        if (category.value < 1){
            let message = "Debe asignar una categoría";
            document.querySelector("span.category").innerText = message;
        }else {
            document.querySelector("span.category").innerText = ""
        };
    })
    
    let subCategory = document.querySelector("select.subCategory");
    subCategory.addEventListener("change", function () {
        if (subCategory.value < 1){
            let message = "Debe asignar una subcategoría";
            document.querySelector("span.subCategory").innerText = message;
        }else {
            document.querySelector("span.subCategory").innerText = ""
        };
    })
    
    let name = document.querySelector("input.name");
    name.addEventListener("blur", function () {
        if (name.value.length < 5){
            let message = "El nombre debe tener al menos 5 caracteres";
            document.querySelector("span.name").innerText = message;
        }else {
            document.querySelector("span.name").innerText = ""
        };
    })
    
    let price = document.querySelector("input.price");
    price.addEventListener("blur", function () {
        if (price.value.length < 1){
            let message = "Debe completar el precio";
            document.querySelector("span.price").innerText = message;
        }else {
            document.querySelector("span.price").innerText = ""
        };
    })
    
    let discount = document.querySelector("input.discount");
    discount.addEventListener("blur", function () {
        if (discount.value.length < 1){
            let message = "Debe completar el descuento aunque sea 0";
            document.querySelector("span.discount").innerText = message;
        }else {
            document.querySelector("span.discount").innerText = ""
        };
    })
    
    let description = document.querySelector("textarea.description");
    description.addEventListener("blur", function () {
        if (description.value.length < 20){
            let message = "La descripción debe tener al menos 20 caracteres";
            document.querySelector("span.description").innerText = message;
        }else {
            document.querySelector("span.description").innerText = ""
        };
    })
    
    let productForm = document.querySelector("form.productValidate");
    productForm.addEventListener("submit", function (e) {
        if (category.value < 1){document.querySelector("span.category").innerText = "Debe asignar una categoria"; e.preventDefault();}
        else if(subCategory.value < 1){document.querySelector("span.subCategory").innerText = "Debe asignar una subcategoria"; e.preventDefault();}
        else if(price.value < 1){document.querySelector("span.price").innerText = "Debe completar el precio"; e.preventDefault();}
        else if(discount.value < 1){document.querySelector("span.price").innerText = "Debe completar el descuento aunque sea 0"; e.preventDefault();}            
        else if(
            document.querySelector("span.name").innerText ||
            document.querySelector("span.description").innerText
            ) {
                e.preventDefault();
            };
        });
    })
