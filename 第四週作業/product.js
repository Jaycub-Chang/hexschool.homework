import pagination from './pagination.js';
import modal from './modal.js';
import delmodal from './delmodal.js';
Vue.component('pagination', pagination);
Vue.component('modal', modal);
Vue.component('delmodal',delmodal);

new Vue({
    el: '#app2',
    data: {
        products: [],
        tempProduct: {imageUrl:[]},
        pagination: [],
        uuid: 'e16291ef-83f7-412e-b265-c5543d568b60',
        apiPath: 'https://course-ec-api.hexschool.io/api/',
        token: '',
    },
    methods: {
        getProducts(num = 1) {
            const vm = this;
            const url = `${vm.apiPath}${vm.uuid}/ec/products?page=${num}`;
            axios.get(url)
                .then((response) => {
                    vm.products = response.data.data;
                      console.log(vm.products);
                    //   console.log(response);
                    //   console.log(num);
                    vm.pagination = response.data.meta.pagination;
                    if(vm.tempProduct.id){
                        vm.tempProduct = {imageUrl:[]} ;
                        $('#productModal').modal('hide');
                        $('#delProductModal').modal('hide');
                    };
                });
        },
        triggermodal(status, item) {
            const vm = this;
            switch (status) {
                case 'new':
                    vm.tempProduct = {imageUrl:[]};
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    const url = `${vm.apiPath}${vm.uuid}/ec/product/${item.id}`;
                    axios.get(url)
                        .then((response) => {
                            // console.log(response);
                            vm.tempProduct = response.data.data ;
                            $('#productModal').modal('show');
                        });
                            break;
                case 'del':
                    vm.tempProduct = JSON.parse(JSON.stringify(item));
                    $('#delProductModal').modal('show');
                    break;
                default:
                    break;
            };
        },
        deletedata() {
            if (this.tempProduct.id) {
                const id = this.tempProduct.id;
                this.products.forEach((item, i) => {
                    if (item.id === id)
                        this.products.splice(i, 1);
                    this.tempProduct = {};
                });
            };
            $('#delProductModal').modal('hide');
        },
        signout() {
            document.cookie = `hexToken=; expires=`;
            window.location = 'login.html';
        },
    },
    created() {
        const vm = this;
        vm.token = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common['Authorization'] = `Bearer ${vm.token}`;
        vm.getProducts();
    },
});
