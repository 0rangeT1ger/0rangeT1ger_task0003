/**
 * Created by 0rangeT1ger on 2015/4/27.
 * ���Ӧ���У����õĶ����������㼶��task��todo�¼���
 * һ��task�����ж��todo�¼�����task���Ծ��в�ͬ�����͡�
 * ���ñ��ش洢������Ҫ�õ���ȫ�ֱ�����ÿ�δ�ʱ����Ƿ��д洢��ľ�еĻ��ͷ���̡̳�
 */
alert("Must Input Chinese! There will be bug if you input Chinese..like this:     ���");
if(!localStorage.getItem("data")){
    var task0003_Global=Object.create(null);       //Ψһ��ȫ�ֶ��󣬷�ֹȫ�ֶ�����Ⱦ
    task0003_Global.tasks=Object.create(null);                //ȫ�ֵ����Ͷ������ڱ���һ������������Щtask,��ű����������
    task0003_Global.ifInput=false;          //�ж��Ƿ��ڽ�������
    task0003_Global.ifSelectType=false;     //�ж��Ƿ��Ѿ�ѡ����һ������
    task0003_Global.ifEdit=false;
    task0003_Global.finishTagStatus="all";
}
else{
    var task0003_Global=Object.create(null);       //Ψһ��ȫ�ֶ��󣬷�ֹȫ�ֶ�����Ⱦ
    task0003_Global=JSON.parse(localStorage.getItem("data"));
    task0003_Global.ifInput=false;
    task0003_Global.ifSelectType=false;
    task0003_Global.ifEdit=false;
    task0003_Global.finishTagStatus="all";
}
console.log(task0003_Global);
function todo(){                        //һ��todo�¼��Ĺ��캯��
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
    if(task0003_Global.ifSelectType===false){                    //�����δѡ��һ�������ô��������Ϊ���һ�����
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
            task0003_Global.tasks[type]=[,];                 //�˴�ʹ�����͵���������������±꣬����ѡ��
            var newDiv=document.createElement("div");
            newDiv.innerHTML=type;
            addClass(newDiv,"typeList");
            $("#col1").removeChild($("#newInput"));
            $.click(newDiv,selectType);
            $("#col1").insertBefore(newDiv,$(".newType"));
            var deleteTag = document.createElement("div");  //����ɾ��С��
            addClass(deleteTag,"deleteTag");
            deleteTag.innerHTML="x";
            $.on(deleteTag,"click",deleteType);
            newDiv.appendChild(deleteTag);
            task0003_Global.ifInput=false;
        }
    }
    else if(task0003_Global.ifSelectType===true){                     //����Ѿ�ѡ����һ�������ôӦ����ӵ�������е�һ��task��Ŀ
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
            else{                                         //�������task��Ŀ.
                $(".newType").innerHTML="New Task";
                var newTask=document.createElement("div");
                addClass(newTask,"taskList");
                newTask.innerHTML = $("#newInput").value;
                var tempTask=new task();
                tempTask.title=$("#newInput").value;
                tempTask.type=$(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0];
                console.log(task0003_Global.tasks,$(".active").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]);
                task0003_Global.tasks[$(".active").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]][task0003_Global.tasks[$(".active").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]].length]=tempTask;//���¼����taskѡ�е�����£�
                $("#col1").removeChild($("#newInput"));
                $.click(newTask,selectType);
                $("#col1").insertBefore(newTask,$(".active").nextSibling);    //���ɾ����ť�����¼���
                var deleteTag = document.createElement("div");  //����ɾ��С��
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
function selectType(){                                                    //�����������ѡ���ȡ����һ������չʾ����Ҫ�ֱ���дЧ�� unfinished ��Ҫ������д�߼���
    var target=window.event.target||window.event.srcElement;
    console.log(target.className,task0003_Global.ifSelectType);
    if(target.className.indexOf("deleteTag")!=-1){
        return;
    }
    if(task0003_Global.ifSelectType===false){                             //��û���Ѿ�ѡ�е����͵�ʱ��ѡ��һ�����ͣ���ô��Ҫ������������µ�����task
        $(".newType").innerHTML="New Task";                           //�ı���ʽ�����������û����������task��Ŀ��
        if(target.className.indexOf("taskList")!=-1){               //����������task��Ŀ������activeTask���Ͳ�����ʾ���task�µ�����todo��Ŀ��
            addClass(target,"activeTask active");
            var typeNode = findActiveType();
            addClass(typeNode,"activeType");
            refreshCol_2();
            refreshCol3();
        }
        if(target.className.indexOf("typeList")!=-1){               //�������ĵ���һ��type��Ŀ,����activeType���͡�����ɾ���ڶ���������.
            var typeList_List = document.querySelectorAll(".typeList");   //ֻ�������һ��activeType
            for(var i=0;i<typeList_List.length;i++){
                var tempNode = typeList_List[i].nextSibling;
                if(tempNode&&tempNode.className){
                    while(tempNode.className.indexOf("taskList")!=-1){         //��������type�µ�����task��Ŀ���˴�����CSS���أ�Ӧ��ɾ���ڵ㡾unfinished��
                        CSSRule(tempNode,"display","none");
                        tempNode=tempNode.nextSibling;
                    }
                }
                removeClass(typeList_List[i],"activeType");
                removeClass(typeList_List[i],"active");
            }
            addClass(target,"activeType active");
            var tempNode=target.nextSibling;
            while(tempNode){           //��ô��ʾ���type�µ�����task
                if(tempNode.className&&tempNode.className.indexOf("taskList")!=-1){
                    CSSRule(tempNode,"display","block");                       //�˴����Ų���CSSRule���أ�Ӧ�����ӽڵ㡣��unfinished��
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
    else if(task0003_Global.ifSelectType===true){                                                                  //�����Ѿ�ѡ��һ�����͵�ʱ�򣬵��Ӧ��ȡ����ʾ�Ѿ���ʾ��task(������$(".active"))����������������
        if(target.className.indexOf("active")!=-1){                        //���ѡ����һ��active����,��ô�Ƴ�����active���ԡ�
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
            if(target.className.indexOf("typeList")!=-1){                 //���ѡ�е���һ���Ѿ�ѡ�е�type��Ŀ,��ô�����task��Ŀ��activeTask���Ծ�Ҫ�Ƴ�
                var tempNode=target.nextSibling;;
                while(tempNode&&tempNode.className.indexOf("taskList")!=-1){         //�������type�µ�����task��Ŀ
                    CSSRule(tempNode,"display","none");
                    tempNode=tempNode.nextSibling;
                }
            }
            task0003_Global.ifSelectType=false;
        }
        else if(target.className.indexOf("active")===-1){                                            //���ѡ����һ������active�Ķ���
            removeClass($(".active"),"active");
            if(target.className.indexOf("typeList")!=-1){               //�������ĵ���һ��type��Ŀ,����activeType���͡�
                var typeList_List = document.querySelectorAll(".typeList");   //ֻ�������һ��activeType
                for(var i=0;i<typeList_List.length;i++){
                    var tempNode = typeList_List[i].nextSibling;
                    if(tempNode&&tempNode.className){
                        while(tempNode.className.indexOf("taskList")!=-1){         //��������type�µ�����task��Ŀ
                            CSSRule(tempNode,"display","none");
                            removeClass(tempNode,"activeTask");
                            tempNode=tempNode.nextSibling;
                        }
                    }
                    removeClass(typeList_List[i],"activeType");
                }
                var tempNode=target.nextSibling;
                while(tempNode.className.indexOf("taskList")!=-1){           //��ô��ʾ���type�µ�����task
                    CSSRule(tempNode,"display","block");
                    tempNode=tempNode.nextSibling;
                }
                addClass(target,"activeType active");
            }
            if(target.className.indexOf("taskList")!=-1){               //����������task��Ŀ������activeTask���ͣ�����ˢ�µڶ������ݣ�ɾ������������
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
//�����ǵڶ�����ť���¼���Ӧ����
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
            if(!currentTask.dateList[currentDate]){              //����������Ѿ����������ڣ���ô����һ�������б�
                var newDateDiv=document.createElement("div");
                addClass(newDateDiv,"dateList");
                newDateDiv.innerHTML=currentDate;
                currentTask.dateList[currentDate] = []; //�����б�Ľű���������ڣ������Ƕ��todo�¼���ɵĶ���
                newDateDiv.id=currentDate;
                $("#col2").insertBefore(newDateDiv,$(".newTodo"));

                var newTodo=document.createElement("div");//���ﴴ����todo�������������빦�ܣ���Ϊ�����ڵ��������޸ĺ����롣
                addClass(newTodo,"todoList");
                newTodo.innerHTML="Input Title";
                newTodo.id="newInputTitle";                     //��ס��һ���ǵ��ڱ�����֮���޸�newtodo��id��Ӧ����todo��Ŀ��title��
                $("#col2").insertBefore(newTodo,$(".newTodo"));
                editTodo();
            }
            else{
                var newTodo=document.createElement("div");//����Ѿ����������У���ôֱ�Ӵ���todo��Ŀ��
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
        //����ѡ�е�todo����
        var currentTodo = findActiveTodo()[0];
        toStandardDateString();
        if(task0003_Global.ifEdit===false){                //����Ѿ�ѡ����һ��todo��Ŀ������û�н�������״̬����ôӦ���޸����todo�¼���
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
        else{                                                //����Ѿ���������״̬�ˣ���ôӦ�����浱ǰinput���ڵ����ݣ�����ˢ�µڶ������ݡ�
            if(currentTodo.date["toLocaleDateString"]){                                       //�����date����
                var oldDate=currentTodo.date.toLocaleString().split(" ")[0];                 //�����޸�ǰ��todo����//
                }
            else if(currentTodo.date.match(/\d+-\d+-\d+/)){                               //�����chrome�����
                var oldDateList = currentTodo.date.match(/\d+-\d+-\d+/).toLocaleString().split("-");
                if(oldDateList[1].split("")[0]==0){
                    oldDateList[1]=oldDateList[1].split("")[1];
                }
                if(oldDateList[2].split("")[0]==0){
                    oldDateList[2]=oldDateList[2].split("")[1];
                }
                var oldDate=oldDateList.join("/");
            }
            else{                                             //�����ie�����

            }
            var oldTitle=currentTodo.title;
            for(var i=0; i<currentTask.dateList[oldDate].length;i++){           //������ɾ���ɵ�task��dateList�µ�todo����
                var newTitle = currentTask.dateList[oldDate][i]?currentTask.dateList[oldDate][i].title:false;
                if(newTitle===oldTitle){
                    delete currentTask.dateList[oldDate][i];
                }
            }
            currentTodo.title=$("#titleInput").value;
            currentTodo.date=new Date();
            var newDateInput=$("#dateInput").value.match(/\d+/g).toLocaleString().split(",");
            currentTodo.date.setFullYear(newDateInput[0]);   //���浱ǰ����������ݣ��޸ĵ�ǰѡ��todo����ĸ������ԡ�
            currentTodo.date.setMonth(newDateInput[1]-1);
            currentTodo.date.setDate(newDateInput[2]);
            currentTodo.project=$("#detailInput").value;
            if(!currentTask.dateList[currentTodo.date.toLocaleString().split(" ")[0]]){            //�����������������б��򴴽�һ���µġ�
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

            //������ˢ�µڶ��������ݡ�
            refreshCol_2();
            removeClass($(".activeTodo"),"activeTodo");    //������todo�¼��ļ���״̬��
            $(".editButton").innerHTML="Edit";
            task0003_Global.ifEdit=false;            //�����༭״̬.
            //δ�������
        }
    }
    else{                                                    //�����δѡ���κ�һ��todo��Ŀ����ô��������һ��todo��Ŀ����ע��!Ϊ���û��Ѻã���Ҫ��ʱ�޸����Ͻǰ�ť�����֣���
        if(task0003_Global.ifEdit===false){                 //���û�д�������״̬����ô��������״̬��
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
            titleInput.value=newTodo.title;   //������һ������Ϊ�˸ı����ڵĸ�ʽ������date����������ʽ���ƣ����Ҫ�ж����С��ʮҪ��ǰ�����0
            var conputedDate=newTodo.date.toLocaleString().split(" ")[0];
            dateInput.value=conputedDate;
            detailInput.value=newTodo.project;
            $("#col3").insertBefore(titleInput,$("#col3_end"));
            $("#col3").insertBefore(dateInput,$("#col3_end"));
            $("#col3").insertBefore(detailInput,$("#col3_end"));
            titleInput.focus();
            task0003_Global.ifEdit=true;
            //�����û���Ѿ����ڼ���״̬��todo��Ŀ����ô���Ǵ��ڴ�����todo�¼��С�����һ��todo�¼����µ�todo����
        }
        else{                                                            //����Ѿ�������״̬�ˣ���ô���ݵ�ǰ�����������ɾ�̬div ���ұ������todo�¼���
            currentTask = findActiveTask()[0];
            var currentTaskNum = findActiveTask()[1]
            var newTodo=new todo();                                      //�����µ�todo����
            var newDateInput=$("#dateInput").value.match(/\d+/g).toLocaleString().split(",");
            newTodo.date.setFullYear(newDateInput[0]);//�����µ�todo����ĸ������ԡ�
            newTodo.date.setMonth(newDateInput[1]-1);
            newTodo.date.setDate(newDateInput[2]);
            newTodo.title=$("#titleInput").value;
            newTodo.project=$("#detailInput").value;
            if(!currentTask.todoList){
                currentTask.todoList=[];
            }
            currentTask.todoList[currentTask.todoList.length]=newTodo;
            if(!currentTask.dateList[newTodo.date.toLocaleString().split(" ")[0]]){            //�����������������б��򴴽�һ���µġ�
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
                                                                           //�˴�ˢ�µڶ��������ݡ�
            refreshCol_2();
            $(".editButton").innerHTML="Edit";
            task0003_Global.ifEdit=false;            //�����༭״̬.
            //����Ѿ���������״̬����ô���°������ᱣ�浱ǰ��todo�¼��ĸ������ԡ�
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
    var target = window.event.target||window.event.srcElement;{                                                    //���ѡ�е���һ��todoList��Ŀ����ôӦ�����ұ���ʾ���todo��Ŀ���������ݡ�
        console.log(target.className);
        if(target.className.indexOf("Delete")!==-1||target.className.indexOf("Finish")!==-1||target.className.indexOf("dateList")!==-1){
            return;
        }
        if($(".activeTodo")){
            if(target.className.indexOf("activeTodo")==-1){  //���ѡ�еĲ���һ���Ѿ������todo��Ŀ����ô��ʾ���todo��Ŀ�ĸ������ݣ�������������"activeTodo"
                removeClass($(".activeTodo").lastChild,"todoDeleteTagSlideIn");
                removeClass($(".activeTodo").firstChild.nextSibling,"todoFinishTagSlideIn");
                removeClass($(".activeTodo"),"activeTodo");
            }
            else{                                        //���ѡ�е���һ���Ѿ������todo��Ŀ����ôɾ������active���ԣ�������յ����������ݡ�
                removeClass($(".activeTodo").lastChild,"todoDeleteTagSlideIn");
                removeClass($(".activeTodo").firstChild.nextSibling,"todoFinishTagSlideIn");
                removeClass($(".activeTodo"),"activeTodo");
                return;
            }
        }
        addClass(target,"activeTodo");                   //������ǣ���ô��Ӷ�������ʾdeleteTag
        addClass(target.lastChild,"todoDeleteTagSlideIn");//��Ӷ�����ʾfinishTag
        console.log(target.childNodes);
        addClass(target.firstChild.nextSibling,"todoFinishTagSlideIn");//warning!�п��ܳ���
        var currentTodo = findActiveTodo()[0];
        //����ˢ�µ��������ݡ�
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
        //��������ѡ�е�task����
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
                currentTask.todoList[j].isFinish=!currentTask.todoList[j].isFinish;                                       //ɾ����ǰtaskList �µ�todo����
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
                            currentTask.dateList[k][l].isFinish=!currentTask.dateList[k][l].isFinish;                             //ɾ����ǰdateList �µ�todo����
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
    //����������һ���µ����⣬ˢ�µڶ�����ʱ��Ӧ���жϵ�ǰ��״̬�����ڵڶ���tag��״̬���ֱ���ʾ��ͬ�����ݡ����selectFinishTag�Ǹ���Ӧ����Ӧ�������ı�״̬Ȼ��ˢ�µڶ������ɡ�
}
function deleteTodo(){
    if($(".activeTask")&&$(".activeType")){
        var currentTaskList=task0003_Global.tasks[$(".activeType").innerHTML.match(/^[\w\s]+/).toLocaleString().split(" ")[0]];
        var currentTask=new task();
        var currentTodoTitle=$(".activeTodo").innerHTML.match(/^[\w\s]+/).toLocaleString();
                                                     //��������ѡ�е�task����
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
                delete currentTask.todoList[j];                                       //ɾ����ǰtaskList �µ�todo����
                break;
            }
        }
        for(var k in currentTask.dateList){
            if(currentTask.dateList[k]) {
                for (var l = 0; l < currentTask.dateList[k].length; l++) {
                    if(currentTask.dateList[k][l]){
                        if (currentTask.dateList[k][l].title === currentTodoTitle) {
                            delete currentTask.dateList[k][l];                             //ɾ����ǰdateList �µ�todo����
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
function findActiveType(){    //���ݵ�ǰѡ�е�task�ҳ��������͡�
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
        //��������ѡ�е�todo����
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
                currentTodo=currentTask.todoList[j];        //currentTodo���ǵ�ǰѡ���˵�todo����
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
    while(tempNode){                              //���col1���������ݡ�
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
function refreshCol_2(){                             //ˢ�µڶ������ݣ�ͨ����ȡ�洢���ļ�ʵ�֡�
    if($(".activeTask")){
        var currentTask=findActiveTask()[0];
        var currentNode=$(".finishTagContainer").nextSibling.nextSibling;                             //���еڶ����������ò��ɼ�������������ݡ�
        while(currentNode&&currentNode.className.indexOf("newType")==-1&&currentNode.tagName=="DIV"){
            CSSRule(currentNode,"display","none");
            currentNode=currentNode.nextSibling;
        }
        for(var i in currentTask.dateList){                         //�Ե�ǰtask��dateList������ݱ�����ʾ
            var searchRule=/\d+\/\d+\/\d+|\d+/g;
            var ifDateListBlank = true;
            for (var k = 0; k<currentTask.dateList[i].length;k++){
                if(currentTask.dateList[i][k]) ifDateListBlank = false;
            }
            if(searchRule.test(i)==true&&(!ifDateListBlank)){
                var newDateDiv=document.createElement("div");//���ȴ���һ������Ϊ���ڵ�div
                addClass(newDateDiv,"dateList");
                newDateDiv.innerHTML=i;
                CSSRule(newDateDiv,"display","block");
                $.click(newDateDiv,selectTodoListener);
                $("#col2").insertBefore(newDateDiv,$(".newTodo"));
                for(var j = 0;j<currentTask.dateList[i].length;j++){      //Ȼ�󴴽�һ������Ϊtodo��Ŀ��title��div
                    if(currentTask.dateList[i][j]&&(currentTask.dateList[i][j].isFinish===task0003_Global.finishTagStatus||task0003_Global.finishTagStatus==="all")){
                        var newTodoDiv=document.createElement("div");                    //����ʾ���ϵ�ǰfinish�߼���todo��Ŀ��
                        addClass(newTodoDiv,"todoList");
                        newTodoDiv.innerHTML=currentTask.dateList[i][j].title;
                        if(!newTodoDiv.todo){
                            newTodoDiv.todo=[];
                        }
                        newTodoDiv.todo[newTodoDiv.todo.length]=currentTask.dateList[i][j];
                        CSSRule(newTodoDiv,"display","block");
                        $.click(newTodoDiv,selectTodoListener);
                        if(currentTask.dateList[i][j].isFinish===true&&task0003_Global.finishTagStatus==="all"){//�Ѿ���ɵ����ֳ��ֻ�ɫ
                            CSSRule(newTodoDiv,"color","#aaaaaa");
                        }
                        $("#col2").insertBefore(newTodoDiv,$(".newTodo"));
                        var deleteTag = document.createElement("div");         //����ɾ����ť
                        addClass(deleteTag,"todoDeleteTag");
                        deleteTag.innerHTML="x";
                        $.click(deleteTag,deleteTodo);
                        newTodoDiv.appendChild(deleteTag);
                        var finishTag = document.createElement("div");      //������ɶȰ�ť
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
        var currentNode=$(".finishTagContainer").nextSibling.nextSibling;                             //���еڶ����������ò��ɼ���
        while(currentNode&&currentNode.className.indexOf("newType")==-1&&currentNode.tagName=="DIV"){
            CSSRule(currentNode,"display","none");
            currentNode=currentNode.nextSibling;
        }
    }
}
function refreshCol3(){
    if($(".activeTodo")&&task0003_Global.ifEdit===false){    //������ڼ����todo��Ŀ������û�д����޸�״̬����ôˢ�µ����������ݡ�
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
    else if(!$(".activeTodo")&&task0003_Global.ifEdit===false){   //��������ڼ����todo��Ŀ������û�д��ڼ���״̬����ôɾ�������������ݡ�
        $(".todoTitle").innerHTML=" ";
        $(".todoDate").innerHTML=" ";
        $(".editWindow").innerHTML=" ";
    }
    return false;
}
function saveData(){//��������������
    console.log("saving!");
    localStorage.setItem("data",JSON.stringify(task0003_Global))
}
function reset(){
    localStorage.removeItem("data");
    task0003_Global=Object.create(null);
    task0003_Global.tasks=Object.create(null);                //ȫ�ֵ����Ͷ������ڱ���һ������������Щtask,��ű����������
    task0003_Global.ifInput=false;          //�ж��Ƿ��ڽ�������
    task0003_Global.ifSelectType=false;     //�ж��Ƿ��Ѿ�ѡ����һ������
    task0003_Global.ifEdit=false;
    refreshCol1();
    refreshCol_2();
    refreshCol3();

}
$.click($(".resetButton"),reset);
function toStandardDateString(){
    var currentTodo = findActiveTodo()[0];
    if(currentTodo.date&&currentTodo.date["toLocalDateString"]) return;
    var dateToConvert = currentTodo.date.toLocaleString().match(/\d+/g).toLocaleString().split(",");             //�����������͸�ʽ�ȡ�
    currentTodo.date = new Date();
    currentTodo.date.setFullYear(dateToConvert[0]);
    currentTodo.date.setMonth(dateToConvert[1]-1);
    currentTodo.date.setDate(dateToConvert[2]);
}
$.click($("nav"),saveData);
$.on(window,"unload",saveData);