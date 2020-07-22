const todoData = [];

//資料存取
function addList(){
    const newTodo = document.querySelector("#newTodo").value;
    const newObj ={
        context: newTodo,
    };
    todoData.push(newObj);
    renew ();
    //console.log(todoData);
};

function clearAll(){
    todoData.splice(0,todoData.length);
    renew();
};

function remove(e){
    if(e.target.nodeName !== 'A'){return}
    let listIndex = e.path[1].dataset.num;
    todoData.splice(listIndex,1);
    //console.log(e);
    renew();
};

//事件監聽
const addTodo = document.getElementById('addTodo');
const clear = document.getElementById('clearTask');
const removeOne = document.querySelector('#todoList');
addTodo.addEventListener('click',addList,false);
clear.addEventListener('click',clearAll,false);
removeOne.addEventListener('click',remove,false);


//版面更新
function renew (){
    let todoList = document.getElementById('todoList');
    let newList = '';
    let newCount = document.getElementById('taskCount');
    todoData.forEach(function (item,index){
        let words = item.context;
        newList += `<li data-num="${index}">
        <input type="checkbox" class="checkInput" } >
        <label class="controlLab">${words}</label>
        <a class="remove" href="#"> X </a></li>`;
    });
    todoList.innerHTML = newList;
    newCount.innerHTML = todoData.length;
    document.querySelector("#newTodo").value = '';
};

