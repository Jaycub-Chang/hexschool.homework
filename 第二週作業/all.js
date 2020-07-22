let token = 'yTQp3ut5xeZ1FuDOLme8PVxMRU44Cq1e9Fpy4DS33akiASmYsXxbVKqtDDLV';
axios.defaults.headers['Authorization'] = `Bearer ${token}`;
let obj = {
  data: {
    uuid: 'e16291ef-83f7-412e-b265-c5543d568b60',
    products: [],
  },
  getData: function() {
    let vm = this;
    let url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/ec/products`;

    axios.get(url)
      .then(function (response) {
      vm.data.products = response.data.data;
      vm.render();
      console.log(vm.data);
    })
  },
  postData: function() {
    let vm = this;
    let url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/admin/ec/product`;
    let newdata = {
      title: '海鮮拉麵',
      category: 'food',
      content: '鮮甜美味',
      description: '昆布湯頭',
      imageUrl: [
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
      ],
      enabled: true,
      origin_price: 320,
      price: 270,
      unit: '碗',
    };
    axios.post(url,newdata)
      .then(function (response) {
      console.log(response);
    })
  },
  patchData: function(){
    let vm = this;
    let url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/admin/ec/product/7t7zs4CAjVJ7nvJEOuozx9NE3leTNBSd5LYox8WgQPkeksqbnLVuezex7JnLhLmH`;
    let newdata = {
      title: '炙燒叉燒飯',
      category: 'food',
      content: '黯然消魂',
      description: '噴槍炙燒',
      imageUrl: [
        'https://images.unsplash.com/photo-1574095443374-6748e7dd6c84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
      ],
      enabled: true,
      origin_price: 290,
      price: 240,
      unit: '碗',
    };
    axios.patch(url,newdata)
      .then(function (response) {
      console.log(response);
    })
  },
  deleteData: function(){
    let vm = this;
    let url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/admin/ec/product/lMru07pyrJyo84xZIHrrYXzKAgfwjNip2nP8b8EjwVeeriRbewFvFJplgH8uvzxS`;
    axios.delete(url)
      .then(function (response) {
      vm.data.products = response.data.data;
      vm.render();
    })
  },
  render: function() {
    let app = document.getElementById('app');
    let products = this.data.products;
    let str = '';
    products.forEach(function(item) {
      str += `
      <div class="card">
      <img src="${ item.imageUrl[0] }" class="card-img-top">
      <div class="card-body">
      <h5 class="card-title">${ item.title }</h5>
      <p class="card-text">口味 ： ${ item.content } </p>
      <p class="ori-price"> 原價 ： ${ item.origin_price } </p>
      <p class="price"> 特價 ： ${ item.price } </p>
      </div>
      <a href="#">加入購物車</a>
      </div>`;
    });
    app.innerHTML = str;
  }
}

//obj.deleteData();
obj.postData();



