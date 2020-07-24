window.addEventListener('load', () => {

    let smallImages = document.querySelectorAll('.img-s');
    let boxSmalleImages = document.querySelectorAll('.img-small');
    let contador = 0;
    let imgActual;
    let mainImg = document.querySelector('#img1');

    for (let i = 0; i < smallImages.length; i++) {
        smallImages[i].addEventListener('click', () => {
            imgActual = smallImages[i].src;
            mainImg.src = imgActual;
            smallImages[i].classList.add('selected')
            for (let pos = 0; pos < smallImages.length; pos++) {
                if (smallImages[pos] != smallImages[i]) {
                    smallImages[pos].classList.remove('selected')
                }
            }
        })
    }
    smallImages.forEach((img) => {
        if (img.src == 'http://localhost:3000/images/products/logo-pickBazar.jpg') {
            contador++;
        }
    })
    if (contador == 1) {
        boxSmalleImages[2].style.display = 'none';
    } else if (contador == 2) {
        boxSmalleImages[2].style.display = 'none';
        boxSmalleImages[1].style.display = 'none';
    } else if (contador == 3) {
        boxSmalleImages[2].style.display = 'none';
        boxSmalleImages[1].style.display = 'none';
        boxSmalleImages[0].style.display = 'none';
    }

})