//реализация "показа" блок для совершения покупки через js
setTimeout(() => {
    const elBay = document.querySelectorAll('.b-card__img');
    const elBay_shadow = document.querySelectorAll('.b-card__bay');
    console.log(elBay);
    elBay.forEach((element) => {
        element.addEventListener('mouseenter', el => {
            el.target.nextElementSibling.classList.add('b-card__bay_show');
        });

    });
    elBay_shadow.forEach((element) => {
        element.addEventListener('mouseleave', el => {
            el.target.classList.remove('b-card__bay_show');
        })
    });
}, 100);
