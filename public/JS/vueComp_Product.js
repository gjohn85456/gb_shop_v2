Vue.component('products', {
    data() {
        return {
            products: [],
            filtered: [],
            imgCatalog: 'assets/',
            btnBay: false,
        }
    },
    methods: {
        filter(userSearch) {
            const regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: ` <div class="b-catalog b-catalog_adaptive">
                    <card v-for="item of filtered"
                    :key="item.id_product"
                    :product="item"
                    :img="item.img_product"
                    @add-product="$parent.$refs.cart.addProduct">
                    </card>
                </div>
                `
});

Vue.component('card', {
    data() {
        return {
            btnBay: false,

        }
    },
    props: ['product', 'img'],
    /*
    template: ` <div class="b-card">
                    <img class="b-card__img" :src="img" alst="imgCard"">
                    <div class="b-card__bay">
                        <button class="b-card__btn"></button>
                    </div>
                    {{btnBay}}
                    <div class="b-card__container">
                        <h3 class="b-card__heading">{{product.product_name}}</h3>
                        <p class="b-card__text">{{product.description}}</p>
                        <p class="b-card__price">{{product.price}}</p>
                    </div>
                </div>
                `
    */

    template: ` <div class="b-card">
                    <img :src="img" alst="imgCard" @mouseenter="btnBay=true">
                    <div class="b-card__bay" v-show="btnBay" @mouseleave="btnBay=false">
                        <button class="b-card__btn" @click="$emit('add-product', product)"></button>
                    </div>
                    <div class="b-card__container">
                        <h3 class="b-card__heading">{{product.product_name}}</h3>
                        <p class="b-card__text">{{product.description}}</p>
                        <p class="b-card__price">{{product.price}}</p>
                    </div>
                </div>
             `

});

