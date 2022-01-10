Vue.component('search', {
    data() {
        return { userSearch: '' }
    },
    template: `<form action="#" class="search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input type="text" class="search_field" v-model="userSearch">
                    <button class="search_btn" type="submit"></button>
                </form>
                `
    /*
    template: `
    <form action="#" class="search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <input type="text" class="search_field" v-model="userSearch">
        <button class="search_btn" type="submit"></button>
    </form>
       `
    */
});