var contain=document.querySelector(".todo-container");
var inputVal=document.querySelector(".input-filed");
var addButton=document.querySelector(".input-button");
var ref=document.querySelector("#refresh");


if (window.localStorage.getItem("list")==undefined){
    var list=[]
    window.localStorage.setItem("list",JSON.stringify(list));
}

var temp=window.localStorage.getItem("list");
var list=JSON.parse(temp);

class Items{
    constructor(name){
        this.createItem(name);
    }
    createItem(name){
        var box=document.createElement("div");
        box.classList.add("box-container");

        var input=document.createElement("input");
        input.type="text";
        input.disabled=true;
        input.value=name;
        input.classList.add("enter-field");

        var edit_btn=document.createElement("button");
        edit_btn.classList.add("edit-button");
        edit_btn.innerHTML="<i class='fal fa-edit' aria-hidden='true'>";
        edit_btn.addEventListener("click",()=> this.edit_btn(input,name));

        var delete_btn= document.createElement("button");
        delete_btn.classList.add("del-button");
        delete_btn.innerHTML="<i class='fas fa-trash' aria-hidden='true'>";
        delete_btn.addEventListener("click", ()=> this.delete_btn(box,name));


        contain.appendChild(box);
        box.appendChild(input);
        box.appendChild(edit_btn);
        box.appendChild(delete_btn);

    }

    edit_btn(input,name){
        if (input.disabled==true){
            input.disabled=!input.disabled;
            console.log("clicked")
        }
        else{
            input.disabled=!input.disabled;
            let index=list.indexOf(name);
            list[index]=input.value;

            window.localStorage.setItem("list",JSON.stringify(list));
        }
    }
    delete_btn(box,name){
        box.parentNode.removeChild(box);
        let index=list.indexOf(name);
        list.splice(index,1);
        window.localStorage.setItem('list',JSON.stringify(list));
    }
}

// window.localStorage.setItem()

addButton.addEventListener('click',function(){
    if (inputVal.value!=""){
        // console.log("clicked")
        new Items(inputVal.value);
        list.push(inputVal.value);
        window.localStorage.setItem("list",JSON.stringify(list));
        inputVal.value ="";
    }
})
ref.addEventListener("click",()=> {
    localStorage.clear();
    location.reload(true);
})

for (let i=0; i<list.length; i++){
    new Items([list[i]]);
}