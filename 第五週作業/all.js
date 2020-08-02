import zh from './zh_TW.js';
VeeValidate.localize('tw', zh);
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
VeeValidate.configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
    }
});

Vue.component('loading', VueLoading);
new Vue({
    el: '#app3',
    data: {
        products: [],
        tempProduct: {
            num: 0,
        },
        pagination: [],
        uuid: 'e16291ef-83f7-412e-b265-c5543d568b60',
        apiPath: 'https://course-ec-api.hexschool.io/api/',
        token: '',
        isLoading: false,
        status: {
            loadingItem: '',
        },
        form: {
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: '',
        },
        cart: {},
        cartTotalPay: 0,
    },
    created() {
        this.getProducts();
        this.getCart();
        this.getOrderList();
    },
    methods: {
        getProducts(page = 1) {
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/products?page=${page}`;
            vm.isLoading = true;
            axios.get(url)
                .then((response) => {
                    console.log(response);
                    vm.products = response.data.data;
                    vm.isLoading = false;
                });
        },
        getDetailed(id) {
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/product/${id}`;
            vm.isLoading = true;
            vm.status.loadingItem = id;
            axios.get(url)
                .then((response) => {
                    console.log(response);
                    vm.tempProduct = response.data.data;
                    vm.isLoading = false;
                    $('#productModal').modal('show');
                    vm.$set(vm.tempProduct, 'num', 0)
                    vm.status.loadingItem = '';
                });
        },
        addToCart(item, quantity = 1) {
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/shopping`;
            const cart = {
                product: item.id,
                quantity,
            };
            vm.status.loadingItem = item.id;
            axios.post(url,cart)
                .then((response) => {
                    console.log(response);
                    $('#productModal').modal('hide');
                    vm.status.loadingItem = '';
                    vm.getCart();
                }).catch((error)=>{
                    console.log(error.response.data.errors);
                    alert(error.response.data.errors);
                    $('#productModal').modal('hide');
                    vm.status.loadingItem = '';
                });
        },
        getCart(){
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/shopping`;
            vm.cartTotalPay =0;
            vm.isLoading = true;
            axios.get(url)
                .then((response) => {
                    console.log(response);
                    vm.cart = response.data.data;
                    vm.cart.forEach((item)=>{
                        vm.cartTotalPay += item.product.price*item.quantity;
                    });
                    vm.isLoading = false;
                }).catch((error)=>{
                    console.log(error.response.data.errors);
                });
        },
        removeAllCartItem(){
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/shopping/all/product`;
            vm.isLoading = true;
            axios.delete(url)
                .then((response) => {
                    console.log(response);
                    vm.getCart();
                    vm.isLoading = false;
                }).catch((error)=>{
                    console.log(error.response.data.errors);
                    vm.isLoading = false;
                });
        },
        removeCartItem(id){
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/shopping/${id}`;
            vm.isLoading = true;
            axios.delete(url)
                .then((response) => {
                    console.log(response);
                    vm.getCart();
                    vm.isLoading = false;
                }).catch((error)=>{
                    console.log(error.response.data.errors);
                    vm.isLoading = false;
                });
        },
        quantityUpdata(id,num){
            if (num <= 0) return;
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/shopping`;
            const data = {
                product: id,
                quantity: num,
            };
            axios.patch(url,data)
                .then((response) => {
                    console.log(response);
                    vm.getCart();
                }).catch((error)=>{
                    console.log(error.response.data.errors);
                });
        },
        createOrder(){
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/orders`;
            vm.isLoading = true;
            const order = vm.form;
            axios.post(url,order)
                .then((response) => {
                    console.log(response);
                    $('#orderModal').modal('show');
                    vm.getCart();
                    vm.getOrderList();
                    vm.isLoading = false;
                }).catch((error)=>{
                    console.log(error.response.data.errors);
                    vm.isLoading = false;
                });
        },
        /* 取得訂單 */ 
        getOrderList(){
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/orders`;
            vm.isLoading = true;
            axios.get(url)
                .then((response) => {
                    console.log(response);
                    vm.isLoading = false;
                }).catch((error)=>{
                    console.log(error.response.data.errors);
                    vm.isLoading = false;
                });
        },
    },
});
