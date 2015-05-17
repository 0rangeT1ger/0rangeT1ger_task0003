/**
 * Created by 0rangeT1ger on 2015/4/27.
 * 这个应用中，所用的对象有两个层级：task和todo事件。
 * 一个task可以有多个todo事件，而task可以具有不同的类型。
 * 利用本地存储存下需要用到的全局变量，每次打开时检测是否有存储，木有的话就放入教程。
 */
alert("Must Input Chinese! There will be bug if you input Chinese..like this:     你好");
if(!localStorage.getItem("data")){
    var task0003_Global=Object.create(null);       //唯一的全局对象，防止全局对象污染
    task0003_Global.tasks=Object.create(null);                //全局的类型对象，用于保存一个类型中有哪些task,其脚标就是其类型
    task0003_Global.ifInput=false;          //判断是否在进行输入
    task0003_Global.ifSelectType=false;     //判断是否已经选中了一个类型
    task0003_Global.ifEdit=false;
    task0003_Global.finishTagStatus="all";
}
else{
    var task0003_Global=Object.create(null);       //唯一的全局对象，防止全局对象污染
    task0003_Global=JSON.parse(localStorage.getItem("data"));
    task0003_Global.ifInput=false;
    task0003_Global.ifSelectType=false;
    task0003_Global.ifEdit=false;
    task0003_Global.finishTagStatus="all";
}
console.log(task0003_Global);
function todo(){                        //一个todo事件的构造函数
    this.date=new Date();
    this.title="Input Title";
    this.isFinish=false;
    this.project="Input Task";
    return this;
}
function task(){
    this.todoList = [];
    this.title = new String();
    this.type = new String();
    this.dateList = Object.create(null);
}
function initial(){
    refreshCol1();
    refreshCol_2();
}
initial();
function creatTypeListener(){
    if(task0003_Global.ifSelectType===false){                    //如果并未选中一个类别，那么点击添加视为添加一个类别
        if(task0003_Global.ifInput===false){
            $(".newType").innerHTML="Done";
            task0003_Global.ifInput=true;
            var newInput=document.createElement("input");
            newInput.type="text";
            newInput.id="newInput";
            addClass(newInput,"typeList");
            $("#col1").insertBefore(newInput,$(".newType"));
            addClass(newInput,"newTaskInput-animation");
            newInput.focus();
            $.enter(newInput,creatTypeListener);
        }
        else if(task0003_Global.ifInput===true){
            $(".newType").innerHTML="New Type";
            var type=$("#newInput").value;
            if(task0003_Global.tasks[type]!==undefined){
                alert("Already have this type!");
                return;
            }
            if(type===""){
                alert("Please Input Something!");
                return;
            }
            task0003_Global.tasks[type]=[,];                 //此处使用类型的名称来做数组的下标，方便选择
            var newDiv=document.createElement("div");
            newDiv.innerHTML=type;
            addClass(newDiv,"typeList");
            $("#col1").removeChild($("#newInput"));
            $.click(newDiv,selectType);
            $("#col1").insertBefore(newDiv,$(".newType"));
            var deleteTag = document.createElement("div");  //加入删除小框
            addClass(deleteTag,"deleteTag");
            deleteTag.innerHTML="x";
            $.on(deleteTag,"click",deleteType);
            newDiv.appendChild(deleteTag);
            task0003_Global.ifInput=false;
        }
    }
    else if(task0003_Global.ifSelectType===true){                     //如果已经选中了一个类别，那么应当添加的是类别中的一个task项目
        if($(".active").className.indexOf("taskList")==-1){
            if(task0003_Global.ifInput===false){
                $(".newType").innerHTML="Done";
                var newInput=document.createElement("input");
                newInput.type="text";
                newInput.id="newInput";
                addClass(newInput,"taskList");
                $("#col1").insertBefore(newInput,$(".active").nextSibling);
                addClass(newInput,"newTaskInput-animation");
                newInput.focus();
                $.enter(newInput,creatTypeListener);
                task0003_Global.ifInput=true;
            }
            else{                                         //保存这个task项目.
                $(".newType").innerHTML="New Task";
                var newTask=document.createElement("div");
                addClass(newTask,"taskList");
                newTask.innerHTML = $("#newInput").value;
                var tempTask=new task();
                tempTask.title=$("#newInput").value;
                tempTask.type=$(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0];
                console.log(task0003_Global.tasks,$(".active").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]);
                task0003_Global.tasks[$(".active").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]][task0003_Global.tasks[$(".active").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]].length]=tempTask;//将新加入的task选中的类别下！
                $("#col1").removeChild($("#newInput"));
                $.click(newTask,selectType);
                $("#col1").insertBefore(newTask,$(".active").nextSibling);    //添加删除按钮及其事件！
                var deleteTag = document.createElement("div");  //加入删除小框
                addClass(deleteTag,"deleteTag");
                deleteTag.innerHTML="x";
                $.on(deleteTag,"click",deleteType);
                newTask.appendChild(deleteTag);
                task0003_Global.ifInput=false;
            }
        }
        else alert("You can't create a task under a task!                       Please select a type!");
    }
}
$.click($(".newType"),creatTypeListener);
$.enter($(".newType"),creatTypeListener);
function selectType(){                                                    //这里仅仅是做选择和取消的一个动画展示，需要分别填写效果 unfinished 需要彻底重写逻辑！
    var target=window.event.target||window.event.srcElement;
    console.log(target.className,task0003_Global.ifSelectType);
    if(target.className.indexOf("deleteTag")!=-1){
        return;
    }
    if(task0003_Global.ifSelectType===false){                             //当没有已经选中的类型的时候，选中一个类型，那么需要弹出这个类型下的所有task
        $(".newType").innerHTML="New Task";                           //改变样式和文字提醒用户，可以添加task项目。
        if(target.className.indexOf("taskList")!=-1){               //如果点击的是task项目，增加activeTask类型并且显示这个task下的所有todo项目。
            addClass(target,"activeTask active");
            var typeNode = findActiveType();
            addClass(typeNode,"activeType");
            refreshCol_2();
            refreshCol3();
        }
        if(target.className.indexOf("typeList")!=-1){               //如果点击的的是一个type项目,增加activeType类型。并且删除第二栏的内容.
            var typeList_List = document.querySelectorAll(".typeList");   //只允许存在一个activeType
            for(var i=0;i<typeList_List.length;i++){
                var tempNode = typeList_List[i].nextSibling;
                if(tempNode&&tempNode.className){
                    while(tempNode.className.indexOf("taskList")!=-1){         //隐藏其他type下的所有task项目，此处不用CSS隐藏，应当删除节点【unfinished】
                        CSSRule(tempNode,"display","none");
                        tempNode=tempNode.nextSibling;
                    }
                }
                removeClass(typeList_List[i],"activeType");
                removeClass(typeList_List[i],"active");
            }
            addClass(target,"activeType active");
            var tempNode=target.nextSibling;
            while(tempNode){           //那么显示这个type下的所有task
                if(tempNode.className&&tempNode.className.indexOf("taskList")!=-1){
                    CSSRule(tempNode,"display","block");                       //此处试着不用CSSRule隐藏，应当增加节点。【unfinished】
                    tempNode=tempNode.nextSibling;
                    removeClass(tempNode,"active");
                    removeClass(tempNode,"activeTask");
                }
                if(tempNode.className&&(tempNode.className.indexOf("typeList")!=-1||tempNode.className.indexOf("newType")!=-1)){
                    break;
                }
            }
            refreshCol_2();
            refreshCol3();
        }
        task0003_Global.ifSelectType=true;
    }
    else if(task0003_Global.ifSelectType===true){                                                                  //而当已经选中一个类型的时候，点击应当取消显示已经显示的task(归属于$(".active"))，将他们收起来。
        if(target.className.indexOf("active")!=-1){                        //如果选中了一个active对象,那么移除它的active属性。
            $(".newType").innerHTML="New Type";
            if($(".active")){
                removeClass($(".active"),"active");
                if($(".activeTask")){
                    removeClass($(".activeTask"),"activeTask");
                }
                if($(".activeType")){
                    removeClass($(".activeType"),"activeType");
                }
            }
            if(target.className.indexOf("typeList")!=-1){                 //如果选中的是一个已经选中的type项目,那么下面的task项目的activeTask属性均要移除
                var tempNode=target.nextSibling;;
                while(tempNode&&tempNode.className.indexOf("taskList")!=-1){         //隐藏这个type下的所有task项目
                    CSSRule(tempNode,"display","none");
                    tempNode=tempNode.nextSibling;
                }
            }
            task0003_Global.ifSelectType=false;
        }
        else if(target.className.indexOf("active")===-1){                                            //如果选中了一个不是active的对象。
            removeClass($(".active"),"active");
            if(target.className.indexOf("typeList")!=-1){               //如果点击的的是一个type项目,增加activeType类型。
                var typeList_List = document.querySelectorAll(".typeList");   //只允许存在一个activeType
                for(var i=0;i<typeList_List.length;i++){
                    var tempNode = typeList_List[i].nextSibling;
                    if(tempNode&&tempNode.className){
                        while(tempNode.className.indexOf("taskList")!=-1){         //隐藏其他type下的所有task项目
                            CSSRule(tempNode,"display","none");
                            removeClass(tempNode,"activeTask");
                            tempNode=tempNode.nextSibling;
                        }
                    }
                    removeClass(typeList_List[i],"activeType");
                }
                var tempNode=target.nextSibling;
                while(tempNode.className.indexOf("taskList")!=-1){           //那么显示这个type下的所有task
                    CSSRule(tempNode,"display","block");
                    tempNode=tempNode.nextSibling;
                }
                addClass(target,"activeType active");
            }
            if(target.className.indexOf("taskList")!=-1){               //如果点击的是task项目，增加activeTask类型，并且刷新第二栏内容，删除第三栏内容
                if($(".activeTask")){
                    removeClass($(".activeTask"),"activeTask");
                }
                addClass(target,"activeTask active");
                var currentType=findActiveType();
                addClass(currentType,"activeType");
                refreshCol_2();
                refreshCol3();
            }
        }
    }
    console.log(target.className,task0003_Global.ifSelectType);
}
function deleteType(){
    var target = window.event.target||window.event.srcElement;
    var elementToDelete = target.parentNode;
    addClass(elementToDelete,"deleteType-animation");
    if(elementToDelete.className.indexOf("taskList")!=-1){
        var targetTaskTitle = elementToDelete.innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0];
        var targetType = $(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0];
        for(var i = 0;i<task0003_Global.tasks[targetType].length;i++){
            if(task0003_Global.tasks[targetType][i]){
                if(task0003_Global.tasks[targetType][i].title===targetTaskTitle){
                    setTimeout(dismiss(elementToDelete),200);
                    delete task0003_Global.tasks[targetType][i];
                }
            }
        }
    }
    else if(elementToDelete.className.indexOf("typeList")!=-1){
        delete task0003_Global.tasks[elementToDelete.innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]];
        task0003_Global.ifSelectType = false;
        task0003_Global.ifEdit = false;
        task0003_Global.ifInput = false;
        setTimeout("refreshCol1()",200);
    }
}
function dismiss(element){
    CSSRule(element,"display","none");
}
//以下是第二栏按钮的事件响应函数
function newTodoListener(){
    if($(".activeTodo")){
        alert("Please tap EDIT to edit the task!");
        return;
    }
    if(!$(".active")||$(".active").className.indexOf("taskList")===-1){
        alert("Please select a task!");
        return;
    }
    else{
        if(task0003_Global.ifEdit==false){
            var currentTask=new task();
            currentTask=findActiveTask()[0];
            var currentDate= new Date().toLocaleString().split(" ")[0];
            if(!currentTask.dateList[currentDate]){              //如果不存在已经创建的日期，那么创建一个日期列表
                var newDateDiv=document.createElement("div");
                addClass(newDateDiv,"dateList");
                newDateDiv.innerHTML=currentDate;
                currentTask.dateList[currentDate] = []; //日期列表的脚标就是其日期，内容是多个todo事件组成的对象
                newDateDiv.id=currentDate;
                $("#col2").insertBefore(newDateDiv,$(".newTodo"));

                var newTodo=document.createElement("div");//这里创建的todo栏并不包含输入功能，因为可以在第三栏中修改和输入。
                addClass(newTodo,"todoList");
                newTodo.innerHTML="Input Title";
                newTodo.id="newInputTitle";                     //记住！一定记得在保存了之后修改newtodo的id！应当是todo项目的title！
                $("#col2").insertBefore(newTodo,$(".newTodo"));
                editTodo();
            }
            else{
                var newTodo=document.createElement("div");//如果已经存在日期列，那么直接创建todo项目。
                addClass(newTodo,"todoList");
                newTodo.innerHTML="Input Title";
                newTodo.id="newInputTitle";
                $("#col2").insertBefore(newTodo,$(".newTodo"));
                editTodo();
            }
        }
        else{
            editTodo();
        }
    }
}
$.on($(".newTodo"),"click",newTodoListener);
$.click($("#finishTag_All"),selectFinishTagListener);
$.click($("#finishTag_Unfinished"),selectFinishTagListener);
$.click($("#finishTag_Finished"),selectFinishTagListener);
function editTodo(){
    var title=$(".todoTitle");
    var date=$(".todoDate");
    var detail=$(".editWindow");
    if($(".activeTodo")){
        var currentTask=new task();
        currentTask = findActiveTask()[0];
        //查找选中的todo对象。
        var currentTodo = findActiveTodo()[0];
        toStandardDateString();
        if(task0003_Global.ifEdit===false){                //如果已经选中了一个todo项目，并且没有进入输入状态，那么应当修改这个todo事件。
            $("#col3").removeChild(title);
            $("#col3").removeChild(date);
            $("#col3").removeChild(detail);
            var titleInput=document.createElement("input");
            var dateInput=document.createElement("input");
            var detailInput=document.createElement("input");
            titleInput.type="text";
            dateInput.type="text";
            detailInput.type="text";
            titleInput.id="titleInput";
            dateInput.id="dateInput";
            detailInput.id="detailInput";
            addClass(titleInput,"todoTitle");
            addClass(dateInput,"todoTitle");
            addClass(dateInput,"todoDate");
            addClass(detailInput,"editWindow");
            $(".editButton").innerHTML="Done";
            titleInput.value=currentTodo.title;
            if(currentTodo.date["toLocaleDateString"]){
                var conputedDate=currentTodo.date.toLocaleString().split(" ")[0];
            }
            else {
                var conputedDate=currentTodo.date.match(/\d+-\d+-\d+/).toLocaleString().split("-").join("/");
            }
            dateInput.value=conputedDate;
            detailInput.value=currentTodo.project;
            $("#col3").insertBefore(titleInput,$("#col3_end"));
            $("#col3").insertBefore(dateInput,$("#col3_end"));
            $("#col3").insertBefore(detailInput,$("#col3_end"));
            titleInput.focus();
            task0003_Global.ifEdit=true;
        }
        else{                                                //如果已经进入输入状态了，那么应当保存当前input框内的内容，并且刷新第二栏内容。
            if(currentTodo.date["toLocaleDateString"]){                                       //如果是date对象
                var oldDate=currentTodo.date.toLocaleString().split(" ")[0];                 //保存修改前的todo对象。//
                }
            else if(currentTodo.date.match(/\d+-\d+-\d+/)){                               //如果是chrome浏览器
                var oldDateList = currentTodo.date.match(/\d+-\d+-\d+/).toLocaleString().split("-");
                if(oldDateList[1].split("")[0]==0){
                    oldDateList[1]=oldDateList[1].split("")[1];
                }
                if(oldDateList[2].split("")[0]==0){
                    oldDateList[2]=oldDateList[2].split("")[1];
                }
                var oldDate=oldDateList.join("/");
            }
            else{                                             //如果是ie浏览器

            }
            var oldTitle=currentTodo.title;
            for(var i=0; i<currentTask.dateList[oldDate].length;i++){           //遍历，删除旧的task下dateList下的todo对象。
                var newTitle = currentTask.dateList[oldDate][i]?currentTask.dateList[oldDate][i].title:false;
                if(newTitle===oldTitle){
                    delete currentTask.dateList[oldDate][i];
                }
            }
            currentTodo.title=$("#titleInput").value;
            currentTodo.date=new Date();
            var newDateInput=$("#dateInput").value.match(/\d+/g).toLocaleString().split(",");
            currentTodo.date.setFullYear(newDateInput[0]);   //保存当前输入框内内容，修改当前选中todo对象的各种属性。
            currentTodo.date.setMonth(newDateInput[1]-1);
            currentTodo.date.setDate(newDateInput[2]);
            currentTodo.project=$("#detailInput").value;
            if(!currentTask.dateList[currentTodo.date.toLocaleString().split(" ")[0]]){            //如果不存在这个日期列表，则创建一个新的。
                currentTask.dateList[currentTodo.date.toLocaleString().split(" ")[0]]=[];
            }
            currentTask.dateList[currentTodo.date.toLocaleString().split(" ")[0]][currentTask.dateList[currentTodo.date.toLocaleString().split(" ")[0]].length]=currentTodo;
            var titleDiv=document.createElement("div");
            var dateDiv=document.createElement("div");
            var detailDiv=document.createElement("div");
            addClass(titleDiv,"todoTitle");
            addClass(dateDiv,"todoTitle");
            addClass(dateDiv,"todoDate");
            addClass(detailDiv,"editWindow");
            titleDiv.innerHTML=currentTodo.title;
            dateDiv.innerHTML=currentTodo.date.toLocaleString().split(" ")[0];
            detailDiv.innerHTML=currentTodo.project;

            $("#col3").removeChild($("#titleInput"));
            $("#col3").removeChild($("#dateInput"));
            $("#col3").removeChild($("#detailInput"));
            $("#col3").appendChild(titleDiv);
            $("#col3").appendChild(dateDiv);
            $("#col3").appendChild(detailDiv);

            //接下来刷新第二栏的内容。
            refreshCol_2();
            removeClass($(".activeTodo"),"activeTodo");    //结束该todo事件的激活状态。
            $(".editButton").innerHTML="Edit";
            task0003_Global.ifEdit=false;            //结束编辑状态.
            //未完待续。
        }
    }
    else{                                                    //如果并未选中任何一个todo项目，那么视作新增一个todo项目。【注意!为了用户友好，需要及时修改右上角按钮内文字！】
        if(task0003_Global.ifEdit===false){                 //如果没有处在输入状态，那么进入输入状态。
            $("#col3").removeChild(title);
            $("#col3").removeChild(date);
            $("#col3").removeChild(detail);
            var titleInput=document.createElement("input");
            var dateInput=document.createElement("input");
            var detailInput=document.createElement("input");
            titleInput.type="text";
            dateInput.type="text";
            detailInput.type="text";
            titleInput.id="titleInput";
            dateInput.id="dateInput";
            detailInput.id="detailInput";
            addClass(titleInput,"todoTitle");
            addClass(dateInput,"todoTitle");
            addClass(dateInput,"todoDate");
            addClass(detailInput,"editWindow");
            $(".editButton").innerHTML="Done";
            var newTodo=new todo();
            titleInput.value=newTodo.title;   //下面这一长串是为了改变日期的格式，由于date类型输入框格式限制，因而要判断如果小于十要在前面加上0
            var conputedDate=newTodo.date.toLocaleString().split(" ")[0];
            dateInput.value=conputedDate;
            detailInput.value=newTodo.project;
            $("#col3").insertBefore(titleInput,$("#col3_end"));
            $("#col3").insertBefore(dateInput,$("#col3_end"));
            $("#col3").insertBefore(detailInput,$("#col3_end"));
            titleInput.focus();
            task0003_Global.ifEdit=true;
            //如果并没有已经处在激活状态的todo项目，那么就是处于创建新todo事件中。创建一个todo事件和新的todo对象。
        }
        else{                                                            //如果已经在输入状态了，那么根据当前输入内容生成静态div 并且保存这个todo事件。
            currentTask = findActiveTask()[0];
            var currentTaskNum = findActiveTask()[1]
            var newTodo=new todo();                                      //创建新的todo对象。
            var newDateInput=$("#dateInput").value.match(/\d+/g).toLocaleString().split(",");
            newTodo.date.setFullYear(newDateInput[0]);//设置新的todo对象的各项属性。
            newTodo.date.setMonth(newDateInput[1]-1);
            newTodo.date.setDate(newDateInput[2]);
            newTodo.title=$("#titleInput").value;
            newTodo.project=$("#detailInput").value;
            if(!currentTask.todoList){
                currentTask.todoList=[];
            }
            currentTask.todoList[currentTask.todoList.length]=newTodo;
            if(!currentTask.dateList[newTodo.date.toLocaleString().split(" ")[0]]){            //如果不存在这个日期列表，则创建一个新的。
                currentTask.dateList[newTodo.date.toLocaleString().split(" ")[0]]=[];
            }
            currentTask.dateList[newTodo.date.toLocaleString().split(" ")[0]][currentTask.dateList[newTodo.date.toLocaleString().split(" ")[0]].length]=newTodo;
            var titleDiv=document.createElement("div");
            var dateDiv=document.createElement("div");
            var detailDiv=document.createElement("div");
            addClass(titleDiv,"todoTitle");
            addClass(dateDiv,"todoTitle");
            addClass(dateDiv,"todoDate");
            addClass(detailDiv,"editWindow");
            titleDiv.innerHTML=newTodo.title;
            dateDiv.innerHTML=newTodo.date.toLocaleString().split(" ")[0];
            detailDiv.innerHTML=newTodo.project;
            $("#col3").removeChild($(".todoTitle"));
            $("#col3").removeChild($(".todoTitle"));
            $("#col3").removeChild($(".editWindow"));
            $("#col3").appendChild(titleDiv);
            $("#col3").appendChild(dateDiv);
            $("#col3").appendChild(detailDiv);
                                                                           //此处刷新第二栏的内容。
            refreshCol_2();
            $(".editButton").innerHTML="Edit";
            task0003_Global.ifEdit=false;            //结束编辑状态.
            //如果已经处在输入状态，那么按下按键将会保存当前的todo事件的各项属性。
        }
    }
}
function editButtonListener(){
    if(task0003_Global.ifEdit==true){
        editTodo();
    }
    else if(!$(".activeTodo")){
        alert("Please Select a to-do Item");
    }
    else{
        editTodo();
    }
}
function selectTodoListener(){
    var target = window.event.target||window.event.srcElement;{                                                    //如果选中的是一个todoList项目，那么应当在右边显示这个todo项目的所有内容。
        console.log(target.className);
        if(target.className.indexOf("Delete")!==-1||target.className.indexOf("Finish")!==-1||target.className.indexOf("dateList")!==-1){
            return;
        }
        if($(".activeTodo")){
            if(target.className.indexOf("activeTodo")==-1){  //如果选中的不是一个已经激活的todo项目，那么显示这个todo项目的各项内容，并且增添类型"activeTodo"
                removeClass($(".activeTodo").lastChild,"todoDeleteTagSlideIn");
                removeClass($(".activeTodo").firstChild.nextSibling,"todoFinishTagSlideIn");
                removeClass($(".activeTodo"),"activeTodo");
            }
            else{                                        //如果选中的是一个已经激活的todo项目，那么删除它的active属性，并且清空第三栏的内容。
                removeClass($(".activeTodo").lastChild,"todoDeleteTagSlideIn");
                removeClass($(".activeTodo").firstChild.nextSibling,"todoFinishTagSlideIn");
                removeClass($(".activeTodo"),"activeTodo");
                return;
            }
        }
        addClass(target,"activeTodo");                   //如果不是，那么添加动画，显示deleteTag
        addClass(target.lastChild,"todoDeleteTagSlideIn");//添加动画显示finishTag
        console.log(target.childNodes);
        addClass(target.firstChild.nextSibling,"todoFinishTagSlideIn");//warning!有可能出错
        var currentTodo = findActiveTodo()[0];
        //以下刷新第三栏内容。
        toStandardDateString();
        $("#col3").removeChild($(".todoTitle"));
        $("#col3").removeChild($(".todoDate"));
        $("#col3").removeChild($(".editWindow"));
        var titleDiv=document.createElement("div");
        var dateDiv=document.createElement("div");
        var detailDiv=document.createElement("div");
        titleDiv.id="titleInput";
        dateDiv.id="dateInput";
        detailDiv.id="detailInput";
        addClass(titleDiv,"todoTitle");
        addClass(dateDiv,"todoTitle");
        addClass(dateDiv,"todoDate");
        addClass(detailDiv,"editWindow");
        titleDiv.innerHTML=currentTodo.title;
        if(currentTodo.date["toLocaleDateString"]){
            var conputedDate=currentTodo.date.toLocaleString().split(" ")[0];
        }
        else{
            var conputedDate=currentTodo.date.match(/\d+-\d+-\d+/).toLocaleString().split("-").join("/");
        }
        dateDiv.innerHTML=conputedDate;
        detailDiv.innerHTML=currentTodo.project;
        $("#col3").insertBefore(titleDiv,$("#col3_end"));
        $("#col3").insertBefore(dateDiv,$("#col3_end"));
        $("#col3").insertBefore(detailDiv,$("#col3_end"));
    }
}
function selectFinishTagListener(){
    var target=window.event.target||window.event.srcElement;
    if (target.className.indexOf("activeTag")!==-1){
        return;
    }
    else{
        if($(".activeTag")){
            removeClass($(".activeTag"),"activeTag");
        }
        addClass(target,"activeTag");
        if(target.id.toLocaleString().indexOf("All")!==-1){
            task0003_Global.finishTagStatus="all";
        }
        else if(target.id.toLocaleString().indexOf("Finished")!==-1){
            task0003_Global.finishTagStatus = true;
        }
        else{
            task0003_Global.finishTagStatus = false;
        }
    }
    refreshCol_2();
}
function finishTodo(){
    var target=window.event.target||window.event.srcElement;
    if($(".activeTask")&&$(".activeType")){
        var currentTaskList=task0003_Global.tasks[$(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]];
        var currentTask=new task();
        var currentTodoTitle=$(".activeTodo").innerHTML.match(/^[\w\s]+/).toLocaleString();
        //遍历查找选中的task对象。
        for(var i in currentTaskList){
            if(currentTaskList&&currentTaskList.hasOwnProperty&&currentTaskList.hasOwnProperty(i)){
                if(currentTaskList[i]){
                    if(currentTaskList[i].title===$(".activeTask").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]){
                        currentTask=currentTaskList[i];
                        break;
                    }
                }
            }
        }
        for(var j=0;j<currentTask.todoList.length;j++){
            if(currentTask.todoList[j]&&currentTask.todoList[j].title==currentTodoTitle){
                console.log(currentTask.todoList[j]);
                currentTask.todoList[j].isFinish=!currentTask.todoList[j].isFinish;                                       //删除当前taskList 下的todo对象。
                console.log(currentTask.todoList[j]);
                break;
            }
        }
        for(var k in currentTask.dateList){
            if(currentTask.dateList[k]) {
                for (var l = 0; l < currentTask.dateList[k].length; l++) {
                    if(currentTask.dateList[k][l]){
                        if (currentTask.dateList[k][l].title === currentTodoTitle&&currentTask.todoList[j].isFinish!=currentTask.dateList[k][l].isFinish) {
                            console.log(currentTask.dateList[k][l]);
                            currentTask.dateList[k][l].isFinish=!currentTask.dateList[k][l].isFinish;                             //删除当前dateList 下的todo对象。
                            console.log(currentTask.dateList[k][l]);
                            break;
                        }
                    }
                }
            }
        }
        removeClass(target,"activeTodo");
    }
    refreshCol_2();
    return true;
    //这里饮入了一个新的问题，刷新第二栏的时候应当判断当前的状态。对于第二栏tag的状态，分别显示不同的内容。因此selectFinishTag那个响应函数应当仅仅改变状态然后刷新第二栏即可。
}
function deleteTodo(){
    if($(".activeTask")&&$(".activeType")){
        var currentTaskList=task0003_Global.tasks[$(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]];
        var currentTask=new task();
        var currentTodoTitle=$(".activeTodo").innerHTML.match(/^[\w\s]+/).toLocaleString();
                                                     //遍历查找选中的task对象。
        for(var i in currentTaskList){
            if(currentTaskList&&currentTaskList.hasOwnProperty&&currentTaskList.hasOwnProperty(i)){
                if(currentTaskList[i]){
                    if(currentTaskList[i].title===$(".activeTask").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]){
                        currentTask=currentTaskList[i];
                        break;
                    }
                }
            }
        }
        for(var j=0;j<currentTask.todoList.length;j++){
            if(currentTask.todoList[j]&&currentTask.todoList[j].title==currentTodoTitle){
                delete currentTask.todoList[j];                                       //删除当前taskList 下的todo对象。
                break;
            }
        }
        for(var k in currentTask.dateList){
            if(currentTask.dateList[k]) {
                for (var l = 0; l < currentTask.dateList[k].length; l++) {
                    if(currentTask.dateList[k][l]){
                        if (currentTask.dateList[k][l].title === currentTodoTitle) {
                            delete currentTask.dateList[k][l];                             //删除当前dateList 下的todo对象。
                            break;
                        }
                    }
                }
            }
        }
    }
    refreshCol_2();
    refreshCol3();
    return true;
}
function findActiveTask(){
    var currentTaskList=task0003_Global.tasks[$(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]];
    var currentTask=new task();
    for(var i in currentTaskList){
        if(currentTaskList&&currentTaskList.hasOwnProperty(i)){
            if(currentTaskList[i]){
                if(currentTaskList[i].title===$(".activeTask").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]){
                    currentTask=currentTaskList[i];
                    break;
                }
            }
        }
    }
    return [currentTask,i];
}
function findActiveType(){    //根据当前选中的task找出他的类型。
    var activeTypeName,tempNode=$("#col1").firstChild;
    for(var i in task0003_Global.tasks){
        for(var j in task0003_Global.tasks[i]){
            if(task0003_Global.tasks[i][j]){
                if(task0003_Global.tasks[i].hasOwnProperty(j)&&task0003_Global.tasks[i][j].title==$(".activeTask").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]){
                    activeTypeName = i;
                }
            }
        }
    }
    while(tempNode){
        var inner =  tempNode.innerHTML?tempNode.innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]:false;
        if(inner===activeTypeName){
            return tempNode;
        }
        tempNode = tempNode.nextSibling;
    }
}
function findActiveTodo(){
    if($(".activeTask")&&$(".activeType")){
        var currentTaskList=task0003_Global.tasks[$(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]];
        var currentTask=new task();
        var currentTodo=new todo();
        var currentTodo2=new todo();
        var currentTodoTitle=$(".activeTodo").innerHTML.match(/^[\w\s]+/).toLocaleString();
        //遍历查找选中的todo对象。
        for(var i in currentTaskList){
            if(currentTaskList&&currentTaskList.hasOwnProperty(i)){
                if(currentTaskList[i]){
                    if(currentTaskList[i].title===$(".activeTask").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]){
                        currentTask=currentTaskList[i];
                        break;
                    }
                }
            }
        }
        for(var j=0;j<currentTask.todoList.length;j++){
            if(currentTask.todoList[j]&&currentTask.todoList[j].title==currentTodoTitle){
                currentTodo=currentTask.todoList[j];        //currentTodo就是当前选中了的todo对象。
                break;
            }
        }
        for(var k in currentTask.dateList){
            if(currentTask.dateList.hasOwnProperty&&currentTask.dateList.hasOwnProperty(k)&&currentTask.dateList[k]["length"]){
                for(var l=0; l<currentTask.dateList[k].length; l++){
                    if(currentTask.dateList[k][l]&&currentTask.dateList[k][l].title===currentTodoTitle){
                        currentTodo2=currentTask.dateList[k][l];
                    }
                }
            }
        }
    }
    return [currentTodo,j,currentTodo2];
}
$.click($(".editButton"),editButtonListener);
function refreshCol1(){
    var tempNode = $("#col1").firstChild;
    while(tempNode){                              //清除col1内所有内容。
        if(tempNode.className&&tempNode.className.indexOf("newType")!=-1){
            break;
        }
        var tempNode2 = tempNode.nextSibling;
        $("#col1").removeChild(tempNode);
        tempNode = tempNode2;
    }
    for(var i in task0003_Global.tasks){
        if(task0003_Global.tasks.hasOwnProperty(i)){
            var typeDiv = document.createElement("div");
            addClass(typeDiv,"typeList");
            typeDiv.innerHTML=i;
            $.click(typeDiv,selectType);
            $("#col1").insertBefore(typeDiv,$(".newType"));
            var deleteTag = document.createElement("div");
            addClass(deleteTag,"deleteTag");
            deleteTag.innerHTML="x";
            $.on(deleteTag,"click",deleteType);
            typeDiv.appendChild(deleteTag);
            for(var j in task0003_Global.tasks[i]){
                var taskDiv = document.createElement("div");
                addClass(taskDiv,"taskList");
                if(task0003_Global.tasks[i][j]){
                    taskDiv.innerHTML=task0003_Global.tasks[i][j].title;
                    CSSRule(taskDiv,"display","none");
                    $("#col1").insertBefore(taskDiv,$(".newType"));
                    $.click(taskDiv,selectType);
                    var deleteTag = document.createElement("div");
                    addClass(deleteTag,"deleteTag");
                    deleteTag.innerHTML="x";
                    $.on(deleteTag,"click",deleteType);
                    taskDiv.appendChild(deleteTag);
                }
            }
        }
    }
}
function refreshCol_2(){                             //刷新第二栏内容，通过读取存储的文件实现。
    if($(".activeTask")){
        var currentTask=findActiveTask()[0];
        var currentNode=$(".finishTagContainer").nextSibling.nextSibling;                             //所有第二栏内容设置不可见。重新添加内容。
        while(currentNode&&currentNode.className.indexOf("newType")==-1&&currentNode.tagName=="DIV"){
            CSSRule(currentNode,"display","none");
            currentNode=currentNode.nextSibling;
        }
        for(var i in currentTask.dateList){                         //对当前task下dateList里的内容遍历显示
            var searchRule=/\d+\/\d+\/\d+|\d+/g;
            var ifDateListBlank = true;
            for (var k = 0; k<currentTask.dateList[i].length;k++){
                if(currentTask.dateList[i][k]) ifDateListBlank = false;
            }
            if(searchRule.test(i)==true&&(!ifDateListBlank)){
                var newDateDiv=document.createElement("div");//首先创建一个内容为日期的div
                addClass(newDateDiv,"dateList");
                newDateDiv.innerHTML=i;
                CSSRule(newDateDiv,"display","block");
                $.click(newDateDiv,selectTodoListener);
                $("#col2").insertBefore(newDateDiv,$(".newTodo"));
                for(var j = 0;j<currentTask.dateList[i].length;j++){      //然后创建一个内容为todo项目的title的div
                    if(currentTask.dateList[i][j]&&(currentTask.dateList[i][j].isFinish===task0003_Global.finishTagStatus||task0003_Global.finishTagStatus==="all")){
                        var newTodoDiv=document.createElement("div");                    //仅显示符合当前finish逻辑的todo项目。
                        addClass(newTodoDiv,"todoList");
                        newTodoDiv.innerHTML=currentTask.dateList[i][j].title;
                        if(!newTodoDiv.todo){
                            newTodoDiv.todo=[];
                        }
                        newTodoDiv.todo[newTodoDiv.todo.length]=currentTask.dateList[i][j];
                        CSSRule(newTodoDiv,"display","block");
                        $.click(newTodoDiv,selectTodoListener);
                        if(currentTask.dateList[i][j].isFinish===true&&task0003_Global.finishTagStatus==="all"){//已经完成的文字呈现灰色
                            CSSRule(newTodoDiv,"color","#aaaaaa");
                        }
                        $("#col2").insertBefore(newTodoDiv,$(".newTodo"));
                        var deleteTag = document.createElement("div");         //插入删除按钮
                        addClass(deleteTag,"todoDeleteTag");
                        deleteTag.innerHTML="x";
                        $.click(deleteTag,deleteTodo);
                        newTodoDiv.appendChild(deleteTag);
                        var finishTag = document.createElement("div");      //插入完成度按钮
                        addClass(finishTag,"todoFinishTag");
                        if(currentTask.dateList[i][j].isFinish===false){
                            finishTag.innerHTML="Done";
                        }
                        else{
                            finishTag.innerHTML="UnDo";
                        }
                        $.click(finishTag,finishTodo);
                        newTodoDiv.insertBefore(finishTag,deleteTag);
                        if($("activeTodo")){
                            removeClass($(".activeTodo"),"activeTodo");
                        }
                    }
                }
            }
        }
    }
    else if(!$(".activeTask")){
        var currentNode=$(".finishTagContainer").nextSibling.nextSibling;                             //所有第二栏内容设置不可见。
        while(currentNode&&currentNode.className.indexOf("newType")==-1&&currentNode.tagName=="DIV"){
            CSSRule(currentNode,"display","none");
            currentNode=currentNode.nextSibling;
        }
    }
}
function refreshCol3(){
    if($(".activeTodo")&&task0003_Global.ifEdit===false){    //如果存在激活的todo项目，并且没有处在修改状态，那么刷新第三栏的内容。
        var currentTodo = findActiveTodo()[0];
        if(!currentTodo){
            $(".todoTitle").innerHTML="";
            $(".todoDate").innerHTML="";
            $(".editWindow").innerHTML="";
            return;
        }
        $(".todoTitle").innerHTML=currentTodo.title;
        if(currentTodo.date["toLocaleString"]){
            var conputedDate=currentTodo.date.toLocaleString().split(" ")[0];
        }
        else {
            var conputedDate=currentTodo.date.match(/\d+\/\d+\/\d+/);
        }
        $(".todoDate").innerHTML=conputedDate;
        $(".editWindow").innerHTML=currentTodo.project;
        return true;
    }
    else if(!$(".activeTodo")&&task0003_Global.ifEdit===false){   //如果不存在激活的todo项目，并且没有处在激活状态，那么删除第三栏的内容。
        $(".todoTitle").innerHTML=" ";
        $(".todoDate").innerHTML=" ";
        $(".editWindow").innerHTML=" ";
    }
    return false;
}
function saveData(){//做到这里啦！！
    console.log("saving!");
    localStorage.setItem("data",JSON.stringify(task0003_Global))
}
function reset(){
    localStorage.removeItem("data");
    task0003_Global=Object.create(null);
    task0003_Global.tasks=Object.create(null);                //全局的类型对象，用于保存一个类型中有哪些task,其脚标就是其类型
    task0003_Global.ifInput=false;          //判断是否在进行输入
    task0003_Global.ifSelectType=false;     //判断是否已经选中了一个类型
    task0003_Global.ifEdit=false;
    refreshCol1();
    refreshCol_2();
    refreshCol3();

}
$.click($(".resetButton"),reset);
function toStandardDateString(){
    var currentTodo = findActiveTodo()[0];
    if(currentTodo.date&&currentTodo.date["toLocalDateString"]) return;
    var dateToConvert = currentTodo.date.toLocaleString().match(/\d+/g).toLocaleString().split(",");             //修正日期类型格式等。
    currentTodo.date = new Date();
    currentTodo.date.setFullYear(dateToConvert[0]);
    currentTodo.date.setMonth(dateToConvert[1]-1);
    currentTodo.date.setDate(dateToConvert[2]);
}
$.click($("nav"),saveData);
$.on(window,"unload",saveData);