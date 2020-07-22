new Vue({
    el: "#app",
    data: {
        //這邊是產品資料庫陣列
        products: [  
            {
                id: 1586934917210,
                unit: '碗',
                category: '麵食',
                title: '豚骨拉麵',
                origin_price: 320,
                price: 280,
                description: '美味好吃',
                content: '大骨白湯底',
                is_enabled: 1,
                imageUrl: 'https://12561.cyberbiz.tw/media/W1siZiIsIjEyNTYxL3Byb2R1Y3RzLzMwMDYwODI1L1x1OGM1YVx1OWFhOFx1NjJjOVx1OWViNVx1OTk5Nlx1NTcxNjAyXzUyMTNlNDBmMjg5YWJlM2RjNDdiLmpwZWciXSxbInAiLCJ0aHVtYiIsIjYwMHg2MDAiXV0.jpeg?sha=ed6500d5b5a500b6',
            },
            {
                id: 1196934917910,
                unit: '碗',
                category: '飯食',
                title: '炙燒叉燒飯',
                origin_price: 250,
                description: '黯然消魂',
                content: '噴槍炙燒',
                price: 220,
                is_enabled: 0,
                imageUrl: 'https://images.unsplash.com/photo-1574095443374-6748e7dd6c84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
            },
        ],
        //這邊是當前台開啟modal時，所選取的物件or新增的物件。
        tempProduct: {},
    },
    methods:{
        //這是確認新增or修改產品的功能函式，藉由tempProduct的id與products中的id進行比對，
        //若有id相同者，將前端tempProduct的資料賦值到products內更新。
        //若無id者，我們將之認定為新物件，並以timestamp的方式給他獨立的序號，並將tempProduct的資料push新的物件至products陣列內。
        //完成後，我們希望tempProduct下次打開時指向新的物件，這樣下次送出時才不會因傳參考路徑的關係而修改到之前的物件。
        addoreditdata(){
            if (this.tempProduct.id){
                const id = this.tempProduct.id;
                this.products.forEach((item,i) => {
                    if( item.id === id){
                        this.products[i] = this.tempProduct;
                    }
                });
            }else{
                const id = new Date().getTime();
                this.tempProduct.id = id;
                this.products.push(this.tempProduct);
            }
            this.tempProduct = {};
            $('#productModal').modal('hide');
        },
        //下方是打開modal的功能函式，藉由參數的帶入不同，用switch的方式，視情況去v-on綁定頁面的按鈕。
        //打開modal若是新增新物件，則須讓tempProduct指向空物件。
        //若是修改或者刪除，則須讓tempProduct以深層or潛層複製products的對應物件。
        //這邊的item對應的是前台頁面 v-for 所帶出的物件。
        triggermodal(status,item){
            switch(status){
                case 'new':
                    this.tempProduct = {};
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    this.tempProduct = JSON.parse(JSON.stringify(item));
                    $('#productModal').modal('show');
                    break;
                case 'del':
                    this.tempProduct = JSON.parse(JSON.stringify(item));
                    $('#delProductModal').modal('show');
                    break;
                default:
                    break;
            };
        },
        //以下是刪除的功能函式
        deletedata(){
            if(this.tempProduct.id){
                const id = this.tempProduct.id;
                this.products.forEach((item,i)=>{
                    if(item.id === id)
                    this.products.splice(i,1);
                    this.tempProduct = {};
                });
            };
            $('#delProductModal').modal('hide');
        },
    },
});

