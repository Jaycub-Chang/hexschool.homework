export default {
    template: `<div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 id="exampleModalLabel" class="modal-title">
                <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group" >
                        <label for="imageUrl">輸入圖片網址</label>
                        <input id="imageUrl" v-model="tempProduct.imageUrl[0]" type="text"
                            class="form-control" placeholder="請輸入圖片連結">
                    </div>
                    <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt>
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="title">標題</label>
                        <input id="title" v-model="tempProduct.title" type="text" class="form-control"
                            placeholder="請輸入標題">
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input id="category" v-model="tempProduct.category" type="text"
                                class="form-control" placeholder="請輸入分類">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control"
                                placeholder="請輸入單位">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="origin_price">原價</label>
                            <input id="origin_price" v-model="tempProduct.origin_price" type="number"
                                class="form-control" placeholder="請輸入原價">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input id="price" v-model="tempProduct.price" type="number"
                                class="form-control" placeholder="請輸入售價">
                        </div>
                    </div>
                    <hr>

                    <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea id="description" v-model="tempProduct.description" type="text"
                            class="form-control" placeholder="請輸入產品描述">
        </textarea>
                    </div>
                    <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea id="description" v-model="tempProduct.content" type="text"
                            class="form-control" placeholder="請輸入說明內容">
        </textarea>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input id="enabled" v-model="tempProduct.enabled"
                                class="form-check-input" type="checkbox" :true-value=true
                                :false-value=false >
                            <label class="form-check-label" for="enabled">是否啟用</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="updateProduct">
                確認
            </button>
        </div>
    </div>
</div>`,
    props: ['tempProduct','apiPath','uuid','products'],
    methods: {
        updateProduct(){
            const vm = this;
            if (vm.tempProduct.id){
                let url = `${vm.apiPath}${vm.uuid}/admin/ec/product/${vm.tempProduct.id}`;
                axios.patch(url,vm.tempProduct)
                .then((res)=>{
                    console.log(res);
                    vm.$emit('update');
                })
            }else{
                let newurl = `${vm.apiPath}${vm.uuid}/admin/ec/product`;
                let id = new Date().getTime();
                vm.tempProduct.id = id;
                axios.post( newurl ,vm.tempProduct)
                    .then((res)=>{
                        console.log(res);
                        vm.$emit('update');
                    });
            };
        },
    },
};