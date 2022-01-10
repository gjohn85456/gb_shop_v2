'use strict'
let itemsSelected = +(document.getElementById('cartItems').textContent);
let sumPrice = 0;

let itemsInCart = {
    product: [],
    amount: [],
    priceForOne: [],
    sum: [],
    total: 0,
};

let cardPikedEl = document.querySelectorAll('.card-picked');
let shadowEl = document.querySelectorAll('.card-selected');
let productEL = document.querySelectorAll('h2');
let shoppingBasketEl = document.querySelector('.shoppingBasket');
let menuCartEl = document.querySelector('.menuCart');
let priceEl = document.querySelectorAll('.b-card__price');
let cartEl = document.querySelectorAll('.img_add_to_cart');

shoppingBasketEl.addEventListener('click', () => {
    menuCartEl.classList.toggle('menuCartHidden');
});

for (let i = 0; i < cardPikedEl.length; i++) {
    cardPikedEl[i].addEventListener('mouseover', () => {
        shadowEl[i].classList.remove('card-hidden');
    });
    cardPikedEl[i].addEventListener('mouseout', () => {
        shadowEl[i].classList.add('card-hidden');
    });
}

for (let index = 0; index < cartEl.length; index++) {
    cartEl[index].addEventListener('click', () => {
        sumPrice = sumPrice + parseFloat(priceEl[index].textContent.substr(1));
        //определяем название продукта который выбрали
        let productName = (productEL[index].textContent);
        //создаем корзину с покупок
        itemsInCart.total = sumPrice;
        //console.log(sumPrice);
        //общее количество элементов к корзине
        itemsSelected++;
        console.log(itemsSelected);
        document.getElementById('cartItems').textContent = itemsSelected;
        //console.log(productEL[index].innerHTML);

        if (!itemsInCart.product.includes(productName)) {
            let a = (itemsInCart.product.length);
            itemsInCart.product[a] = productEL[index].textContent;
            itemsInCart.amount[a] = 1;
            itemsInCart.sum[a] = parseFloat(priceEl[index].textContent.substr(1));
            itemsInCart.priceForOne[a] = itemsInCart.sum[a];
        } else {
            for (var j = 0; j < itemsInCart.product.length; j++) {
                if (itemsInCart.product[j] === productName) {
                    itemsInCart.amount[j] = itemsInCart.amount[j] + 1;
                    itemsInCart.sum[j] = itemsInCart.sum[j] + parseFloat(priceEl[index].textContent.substr(1));
                    continue;
                }
            }
        }
        console.log(itemsInCart);
        buidMenuCart(itemsInCart);
    });
}

function buidMenuCart(obj) {
    if (obj.total != 0) {
        menuCartEl.innerHTML = `
            <div class = "menuCart_header menuCart_header_bolder">
                <div> Название товара </div> 
                <div> Количество </div> 
                <div> Цена за шт. </div> 
                <div> Итого </div> 
            </div>
        `;

        for (let i = 0; i < obj.product.length; i++) {
            menuCartEl.insertAdjacentHTML('beforeend',
                `
            <br>
            <hr>
            <br>
            <div class="menuCart_header">
                <div>${itemsInCart.product[i]}</div>
                <div>${itemsInCart.amount[i]} шт.</div>
                <div>$${itemsInCart.priceForOne[i]}</div>
                <div>$${itemsInCart.sum[i]}</div>
            </div>
            `);
        }
        menuCartEl.insertAdjacentHTML('beforeend',
            `
            <br>
            <hr>
            <br>
            <div class="menuCartTotal">Товаров в корзине на сумму: $${itemsInCart.total}</div>
        `);
    }

}