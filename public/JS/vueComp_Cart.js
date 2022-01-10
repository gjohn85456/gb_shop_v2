Vue.component('cart', {
    data() {
        return {
            // imgCatalog: 'assets/',
            // catalogUrl: '/products.json',
            cartItems: [],
            showCart: false,
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            // let find = this.cartItems.find(el => el.id === item.id);
            // if (find) {
            //     find.quantity++;
            // } else {
            //     const prod = Object.assign({ quantity: 1 }, item);
            //     this.cartItems.push(prod);
            // }

            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find.quantity > 1) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity--;
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.deleteJson(`/api/cart/`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(prod), 1);
                        }
                    })
            }
            console.log(find);
            console.log(find.quantity);

            /*
            if (item.quantity > 1) {

            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
            */
        }
    },
    template: ` <div class="b-cart">
                    <button class="b-cart__btn" type="button" @click="showCart= !showCart"></button>
                    <div class="b-cart__form" v-show="showCart">
                        <p class="b-cart__form__content b-cart__text" v-if="!cartItems.length">
                            Пусто
                        </p>
                        <div class="b-cart__form__content" v-if="cartItems.length">
                            <cartitem v-for="item of cartItems" 
                            :key="item.id" 
                            :img="item.img_product" 
                            :cartitem="item"
                            @remove="remove">
                            </cartitem>
                        </div>
                    </div>
                </div>
              `
});

Vue.component('cartitem', {
    props: ['cartitem', 'img'],
    template: `
           <div class="b-cart__item">
               <img :src="img" alt="some_img" width="70px" height="80px">
               <div class="b-cart__item__center">
                   <p>{{cartitem.title}}</p>
                   <p>Quantity: {{cartitem.quantity}}</p>
                   <p>{{cartitem.price}} &#8381;</p>
               </div>
               <div class="b-cart__item__end">
                   <div>{{cartitem.price*cartitem.quantity}}</div>
                   <button class="b-cart__item__btn"
                   @click="$emit('remove', cartitem)">&times</button></button>
               </div>
           </div>
           `
})