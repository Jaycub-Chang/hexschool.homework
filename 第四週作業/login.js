const uuid = 'e16291ef-83f7-412e-b265-c5543d568b60';
const apiPath = 'https://course-ec-api.hexschool.io/api/';

new Vue({
    el: '#app',
    data: {
        user: {
            email: '',
            password: '',
        },
        token: '',
    },
    methods: {
        signin() {
            const vm = this;
            const api = `${apiPath}auth/login`;
            axios.post(api, vm.user).then((response) => {
                console.log(response);
                const token = response.data.token;
                const expired = response.data.expired;
                document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}`;
                window.location = 'product.html';
            }).catch((error) => {
                console.log(error);
            });
        },
        signout() {
            document.cookie = `hexToken=; expires=`;
        },
    },
});
