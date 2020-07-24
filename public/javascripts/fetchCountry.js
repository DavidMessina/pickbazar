window.addEventListener("load", function () {

    fetch("https://restcountries.eu/rest/v2/region/americas")
      .then(data=>{
         return data.json();
      })
      .then(data=>{
         let list = document.querySelector('select.country');
         data.forEach(country => {
            if (country.subregion == "South America") {
               list.innerHTML += "<option>"+country.name+"</option>"   
            }
             
         });
      })
      .catch(error=>{
         console.log(error);
      })
})