/**
 * Created by wujia_000 on 2015/4/19.
 */
function isArray(arr) {                                     //�ж��Ƿ�Ϊ����
    if (arr instanceof Array){
        return true;
    }
    else {
        return false
    };
}
/*******************************�Ƿ��Ǻ���******************************************/
function isFunction(fn) {                                   //�ж��Ƿ�Ϊ����
    if(typeof fn == 'function') return true;
    else return false;
}
/***************************ǳ���������*****************************************/
function lightClone(object){                                //ǳ����
    var subject;
    var newObject={};
    for (subject in object){
        newObject[subject]=object[subject];
    }
    return newObject;
}
function cloneObject(object){                               //���
    var subject;
    var newObject={};
    for (subject in object){
        if(typeof  object[subject] == 'object')
            newObject[subject]=cloneObject(object[subject]); //�ݹ���ã������ڲ��ж��������ȿ�¡�ڲ��Ķ���
        else newObject[subject]=object[subject];
    }
    return newObject;
}
/****************��������********************************************************/
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

/*****************************ȥ���ظ�����****************************************/
function uniqueArray(arr) {
    var targetArr = [,];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] == 'number') {
            for (var j = 0; j < targetArr.length; j++) {
                if (arr[i] == targetArr[j]) {              //�˴���֤Դ�������Ƿ��к�Ŀ�������ظ�����,����У�������ԭ������������������Ƚ�
                    break;
                }
                else if (j == targetArr.length - 1) {
                    targetArr.push(arr[i]);
                }
            }
        }
    }
    return targetArr;
}
function uniqueStr(str) {
    if(str.match(/[\s,;����]+/g)!=null)
        var strByWords=str.split(/[\s,;����]+/g);
    else var strByWords=[str," "];
    var targetStr = [,];
    for (var i = 0; i < strByWords.length; i++) {
        if(strByWords[i]==""||strByWords[i]==" "||strByWords[i]=="  ") continue;
        if (typeof strByWords[i] == 'string') {
            strByWords[i]=trim(strByWords[i]);
            for (var j = 0; j < targetStr.length; j++) {
                if (strByWords[i] == targetStr[j]) {       //�˴���֤Դ�������Ƿ��к�Ŀ�������ظ�����,����У�������ԭ������������������Ƚ�
                    break;
                }
                else if (j == targetStr.length - 1) {
                    targetStr.push(strByWords[i]);
                }
            }
        }
    }
    return targetStr;
}
/*********************************ȥ���ո�Tab��**********************************/
function trim(str) {
    if (str=="") return null;
    var tempStr = str.split("");
    var targetStr=[];
    var i,j=0;
    for(i in tempStr){
        if (tempStr[i]==" "||tempStr[i]=="  "||tempStr[i]=="")
        continue;
        targetStr[j] = tempStr[i];
        j++;
        }
    return targetStr.join("");
}
/***************************�����е��ú���*************************************/
function each(arr, fn) {
    var i;
    for(i in arr) fn(arr[i]);
}
function output(item, index) {
    console.log(item)
}
/****************************�����е�һ��Ԫ�ص�����*****************************/
function getObjectLength(obj) {
    var i;
    var num=0
    for(i in obj){
        num++;
    }
    return num;
}
/***************************�ж��Ƿ�Ϊ�����ַ******************************/
function isEmail(emailStr) {                     //���µ����ʼ���ַ��ģʽ�ǺϷ���
    var regexp=/^\w+[.<]?\w*@\w+\.\w+>?|^"\w+"@\w+\.\w+|^\w+@\[\d{3}\.\d{3}\.\d{3}\.\d{3}]/g      //1. qingsky@somewhere.com
    var targetStr;
    targetStr=emailStr.match(regexp);                                                                //2. qingsky.aqing@somewhere.somewhere.com
    if(targetStr!=null) return true;                                                               //3. Aqing<qingsky@somwhere.com>
    else return false;                                                                             //4. "qingsky"@somewhere.com
                                                                                                      //5. qingsky@[IP Address]
}
/**************************�ж��Ƿ�Ϊ�ֻ���********************************/
function isPhoneNum(phoneArray) {
    var regexp=/^\+\d{2}[ -]?1\d{2}[ -]?\d{4}[ -]?\d{4}|1\d{2}[ -]?\d{4}[ -]?\d{4}/g;
    var targetArr;
    targetArr=phoneArray.match(regexp);
    if(targetArr!=null) return true;
    else return false;
}
/*****************�������ʽ*******************************************/
                                                                 // Ϊdom����һ����ʽ��ΪnewClassName������ʽ
function addClass(element, newClassName) {
    if(element.className.indexOf(newClassName)==-1) element.className+=" "+newClassName;
} // �Ƴ�dom�е���ʽoldClassName
function removeClass(element, oldClassName) {
    var  classNameByWord=element.className.split(" ");
    for(var i in classNameByWord){
        if(classNameByWord[i]==oldClassName) {
            classNameByWord[i]=" ";
            element.className=classNameByWord.join(" ");
            break;
        }
    }
}
function CSSRule(element,attribute,cssValue){              //���������ʽ��Ҳ���Բ�ѯ������ʽ
    if(cssValue){
        element.style[attribute]=cssValue;
        return;
    }
    return window.getComputedStyle(element,null)[attribute];
}
                                                               // �ж�siblingNode��dom�Ƿ�Ϊͬһ����Ԫ���µ�ͬһ����Ԫ�أ�����boolֵ
function isSiblingNode(elementName, siblingNode) {
    var element=$(elementName);
    if(element.parentNode==siblingNode.parentNode)
    return true;
    else return false;
}
                                                              // ��ȡdom�������������ڵ�λ�ã�����һ������{x, y}
function getPosition(elementName) {                          //��ʱ��Ҫ���������и�Ԫ���Լ����ǵ����и�Ԫ��ֱ����Ԫ�ص�����ƫ����.
    var element=$(elementName);
    var x=element.offsetLeft;
    var y=element.offsetTop;
    var current=element.offsetParent;

    while(current!=null){
        x+=current.offsetLeft;
        y+=current.offsetTop;
        current=current.offsetParent;
    }
    return [x,y];
}


// ʵ��һ���򵥵�Query
function checkId(element,idName){
    if(idName==element.id) return true;
}
function checkClass(element,className){
    for(var i in element.classList){
        if(className==element.classList[i]) return true;           //������ȡԪ�ص�ÿ��class
    }
}
function checkAttribute(element,attributeName){
    for(var i in element.attributes){
        if(attributeName==element.attributes[i]) return true;      //������ȡԪ�ص�ÿ��attributes
    }
}
function checkTagName(element,tagName){
    if(tagName==element.tagName) return true;
}
function $(selector) {                                             //�����˼·��Ȼ�Ǵֱ��ı������Ӹ��ڵ㿪ʼ����
    if(!selector) return false;
    var selectByWords=selector.split(" ");                          //�Ƚ�������ַ�������
    for(var i=0;i<selectByWords.length;i++){
        if(selectByWords[i].indexOf(".")!=-1){
            var className=selectByWords[i].split(".")[1];           //��ȡ���е�������������
            continue;
        }
        else if(selectByWords[i].indexOf("#")!=-1){
            var idName=selectByWords[i].split("#")[1];              //��ȡ���е�id��
            continue;
        }
        var attributeByLetter=selectByWords[i].split("");
        for(var j= 0;j<attributeByLetter.length;j++){
            if(attributeByLetter[j]=="[") {
                var attributeName = attributeByLetter.slice(1, attributeByLetter.length-1).join("");//��ȡ���е�attribute��
                continue;
            }
        }
        var tagName=selectByWords[i].toUpperCase();           //ʣ��ľ��Ǳ�ǩ����~����Ϊ��ǩ��û��ǰ�����ʾ��~��
    }
    var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT, null, false);
    var current=document;
    for(;current!=null;current=iterator.nextNode()){         //�Ӹ��ڵ㿪ʼ��������������Ԫ�صĸ���������ϵĲ�ѯ����
        if(tagName==null){                                   //����ճ���Ĵ���ܶ࣬�����Ǹ���ģ������߼��ļ򻯱����ˡ���
            if(idName==null){                                //��Ȼ���ܼ򻯣���review�ĸ��������~~
                if(className==null){
                    if(attributeName==null){
                        console.log("error:WTF?");
                        return false;
                    }
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
            else if(idName!=null&checkId(current,idName)){
                if(className==null){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
        }
        if(tagName!=null&checkTagName(current,tagName)){
            if(idName==null){
                if(className==null){
                    if(attributeName==null){
                        return current;
                    }
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
            else if(idName!=null&checkId(current,idName)){
                if(className==null){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
                else if(className!=null&checkClass(current,className)){
                    if(attributeName==null) return current;
                    else if(attributeName!=null&checkAttribute(current,attributeName)) return current;
                }
            }
        }
    }
}
/*******************************************����¼�*******************/
function addEvent(element, event, listener) {        //����������addEventListener�ģ�Ȼ�����������ɾ��������Ӧ������ʱ��
    if(!element) return false;
    if(!element.eventList) element.eventList=[];       //���������addEventListener�Ļ������޷�ȫ������ɾ���ˡ���
    if(!element.eventList[event]){                     //�������ÿ��element��������Ӧ�¼������飬���汣�������ĳһ���¼����¼�����Ϊ�±꡿��������Ӧ����
        element.eventList[event]=[];                   //Ȼ���޸���������Ϳ�������ɾ��������������
        element.eventList[event][0]=listener;          //�ҳ����ǽ����ĳƪ���ͣ������Ľ��˺ܶ���~
    }
    else{
        element.eventList[event][element.eventList[event].length]=listener;
    }
    function listenerFinal(){
        for(var i=0;i<element.eventList[event].length;i++){
            element.eventList[event][i].call(this);
        }
    }
    element["on"+event]=listenerFinal;
}

$.on=addEvent;

// �Ƴ�dom�������event�¼�����ʱִ��listener����Ӧ����listenerΪ��ʱ���Ƴ�������Ӧ����

function removeEvent(elementName, event, listener) {
    var element= $(elementName);
    if(arguments[2]==null) {
        element.eventList[event]=null;
    }
    else{
        if(!element.eventList) return;
        else if(!element.eventList[element]) return;
        else{
            for(var i in element.eventList[event]){
                if(element.eventList[event][i]==listener){
                    delete element.eventList[event][i];
                    return;
                }
            }
        }
    }
}
$.off=removeEvent;
/****************clickEvent*************************/
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}
function addEnterEvent(element, listener){
    var event="keypress";
    if(!element.eventList) element.eventList=[];               //����Ϊ�˱���������"keypress"��ʱ���±��ظ�������������element.eventList[]�����
    if(!element.eventList[event+"Enter"]){                     //�±���������"enter"�ַ�����
        element.eventList[event+"Enter"]=[];
        element.eventList[event+"Enter"][0]=listener;
    }
    else{
        element.eventList[event+"Enter"][element.eventList[event+"Enter"].length]=listener;
    }
    function listenerFinal(){
        for(var i=0;i<element.eventList[event+"Enter"].length;i++){
            if(window.event.keyCode==13){                      //�жϼ�ֵ�Ƿ����13������ǣ���ôִ��֮ǰ������¼���
                element.eventList[event+"Enter"][i].call(this);
            }
        }
    }
    element["on"+event]=listenerFinal;
}
$.click=addClickEvent;
$.enter=addEnterEvent;
/*********************************�¼�������**********************************/
function delegateEvent(element, tag, eventName, listener) { //��ʱ�Ѿ���װ����ˣ�����Ҫʹ��$("#div3")���Ƶ��﷨�ˣ�ֱ������selector���ݾ��С�
    function eventHandle(e){
        e=window.event;
        var target= e.target|| e.srcElement;
        if(target.tagName.toLowerCase() === tag) {
            listener();
        }
    }
    $.on(element,eventName,eventHandle);
}
