/**
 * Created by wujia_000 on 2015/4/19.
 */
function isArray(arr) {                                     //判断是否为数组
    if (arr instanceof Array){
        return true;
    }
    else {
        return false
    };
}
/*******************************是否是函数******************************************/
function isFunction(fn) {                                   //判断是否为函数
    if(typeof fn == 'function') return true;
    else return false;
}
/***************************浅拷贝与深拷贝*****************************************/
function lightClone(object){                                //浅拷贝
    var subject;
    var newObject={};
    for (subject in object){
        newObject[subject]=object[subject];
    }
    return newObject;
}
function cloneObject(object){                               //深拷贝
    var subject;
    var newObject={};
    for (subject in object){
        if(typeof  object[subject] == 'object')
            newObject[subject]=cloneObject(object[subject]); //递归调用，对象内部有对象继续深度克隆内部的对象
        else newObject[subject]=object[subject];
    }
    return newObject;
}
/****************测试用例********************************************************/
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

/*****************************去掉重复数组****************************************/
function uniqueArray(arr) {
    var targetArr = [,];
    for (var i = 0; i < arr.length; i++) {
        if (typeof arr[i] == 'number') {
            for (var j = 0; j < targetArr.length; j++) {
                if (arr[i] == targetArr[j]) {              //此处验证源数组中是否有和目标数组重复的项,如果有，则跳过原数组中这个数，继续比较
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
    if(str.match(/[\s,;、，]+/g)!=null)
        var strByWords=str.split(/[\s,;、，]+/g);
    else var strByWords=[str," "];
    var targetStr = [,];
    for (var i = 0; i < strByWords.length; i++) {
        if(strByWords[i]==""||strByWords[i]==" "||strByWords[i]=="  ") continue;
        if (typeof strByWords[i] == 'string') {
            strByWords[i]=trim(strByWords[i]);
            for (var j = 0; j < targetStr.length; j++) {
                if (strByWords[i] == targetStr[j]) {       //此处验证源数组中是否有和目标数组重复的项,如果有，则跳过原数组中这个数，继续比较
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
/*********************************去除空格Tab等**********************************/
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
/***************************参数中调用函数*************************************/
function each(arr, fn) {
    var i;
    for(i in arr) fn(arr[i]);
}
function output(item, index) {
    console.log(item)
}
/****************************对象中第一层元素的数量*****************************/
function getObjectLength(obj) {
    var i;
    var num=0
    for(i in obj){
        num++;
    }
    return num;
}
/***************************判断是否为邮箱地址******************************/
function isEmail(emailStr) {                     //以下电子邮件地址的模式是合法的
    var regexp=/^\w+[.<]?\w*@\w+\.\w+>?|^"\w+"@\w+\.\w+|^\w+@\[\d{3}\.\d{3}\.\d{3}\.\d{3}]/g      //1. qingsky@somewhere.com
    var targetStr;
    targetStr=emailStr.match(regexp);                                                                //2. qingsky.aqing@somewhere.somewhere.com
    if(targetStr!=null) return true;                                                               //3. Aqing<qingsky@somwhere.com>
    else return false;                                                                             //4. "qingsky"@somewhere.com
                                                                                                      //5. qingsky@[IP Address]
}
/**************************判断是否为手机号********************************/
function isPhoneNum(phoneArray) {
    var regexp=/^\+\d{2}[ -]?1\d{2}[ -]?\d{4}[ -]?\d{4}|1\d{2}[ -]?\d{4}[ -]?\d{4}/g;
    var targetArr;
    targetArr=phoneArray.match(regexp);
    if(targetArr!=null) return true;
    else return false;
}
/*****************添加新样式*******************************************/
                                                                 // 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(element.className.indexOf(newClassName)==-1) element.className+=" "+newClassName;
} // 移除dom中的样式oldClassName
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
function CSSRule(element,attribute,cssValue){              //可以添加样式，也可以查询返回样式
    if(cssValue){
        element.style[attribute]=cssValue;
        return;
    }
    return window.getComputedStyle(element,null)[attribute];
}
                                                               // 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(elementName, siblingNode) {
    var element=$(elementName);
    if(element.parentNode==siblingNode.parentNode)
    return true;
    else return false;
}
                                                              // 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(elementName) {                          //此时需要考虑其所有父元素以及他们的所有父元素直到根元素的所有偏移量.
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


// 实现一个简单的Query
function checkId(element,idName){
    if(idName==element.id) return true;
}
function checkClass(element,className){
    for(var i in element.classList){
        if(className==element.classList[i]) return true;           //遍历获取元素的每个class
    }
}
function checkAttribute(element,attributeName){
    for(var i in element.attributes){
        if(attributeName==element.attributes[i]) return true;      //遍历获取元素的每个attributes
    }
}
function checkTagName(element,tagName){
    if(tagName==element.tagName) return true;
}
function $(selector) {                                             //这里的思路仍然是粗暴的遍历，从根节点开始遍历
    if(!selector) return false;
    var selectByWords=selector.split(" ");                          //先将输入的字符串分组
    for(var i=0;i<selectByWords.length;i++){
        if(selectByWords[i].indexOf(".")!=-1){
            var className=selectByWords[i].split(".")[1];           //提取其中的类名，存起来
            continue;
        }
        else if(selectByWords[i].indexOf("#")!=-1){
            var idName=selectByWords[i].split("#")[1];              //提取其中的id名
            continue;
        }
        var attributeByLetter=selectByWords[i].split("");
        for(var j= 0;j<attributeByLetter.length;j++){
            if(attributeByLetter[j]=="[") {
                var attributeName = attributeByLetter.slice(1, attributeByLetter.length-1).join("");//提取其中的attribute名
                continue;
            }
        }
        var tagName=selectByWords[i].toUpperCase();           //剩余的就是标签名啦~【因为标签名没有前面的提示符~】
    }
    var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT, null, false);
    var current=document;
    for(;current!=null;current=iterator.nextNode()){         //从根节点开始遍历，做出输入元素的各种排列组合的查询。。
        if(tagName==null){                                   //复制粘贴的代码很多，本来是更多的，经过逻辑的简化变少了。。
            if(idName==null){                                //仍然不能简化，求review的哥哥给点意见~~
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
/*******************************************添加事件*******************/
function addEvent(element, event, listener) {        //本来是想用addEventListener的，然而做到后面的删除所有响应函数的时候
    if(!element) return false;
    if(!element.eventList) element.eventList=[];       //发现如果用addEventListener的话，就无法全部遍历删除了。。
    if(!element.eventList[event]){                     //于是针对每个element加入了响应事件的数组，里面保存了针对某一个事件【事件名作为下标】的所有响应函数
        element.eventList[event]=[];                   //然后修改这个函数就可以做到删除或者增加啦！
        element.eventList[event][0]=listener;          //我承认是借鉴了某篇博客，不过改进了很多呢~
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

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数

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
    if(!element.eventList) element.eventList=[];               //这里为了避免与其他"keypress"的时间下标重复，所以擅自在element.eventList[]数组的
    if(!element.eventList[event+"Enter"]){                     //下标后面加入了"enter"字符串。
        element.eventList[event+"Enter"]=[];
        element.eventList[event+"Enter"][0]=listener;
    }
    else{
        element.eventList[event+"Enter"][element.eventList[event+"Enter"].length]=listener;
    }
    function listenerFinal(){
        for(var i=0;i<element.eventList[event+"Enter"].length;i++){
            if(window.event.keyCode==13){                      //判断键值是否等于13，如果是，那么执行之前加入的事件。
                element.eventList[event+"Enter"][i].call(this);
            }
        }
    }
    element["on"+event]=listenerFinal;
}
$.click=addClickEvent;
$.enter=addEnterEvent;
/*********************************事件代理函数**********************************/
function delegateEvent(element, tag, eventName, listener) { //此时已经封装完毕了，不需要使用$("#div3")类似的语法了，直接输入selector内容就行。
    function eventHandle(e){
        e=window.event;
        var target= e.target|| e.srcElement;
        if(target.tagName.toLowerCase() === tag) {
            listener();
        }
    }
    $.on(element,eventName,eventHandle);
}
