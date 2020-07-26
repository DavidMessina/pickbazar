window.addEventListener('load', () => {

    let picks = document.querySelectorAll('.inputFile');
    let boxPiks = document.querySelectorAll('.photo');

    for (let i = 0; i < picks.length; i++) {
        picks[i].addEventListener('change', () => {
            for (let pos = 0; pos < boxPiks.length; pos++) {
                    boxPiks[i].style.backgroundColor = '#f58220';
            }
        })
    }
})