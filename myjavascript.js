var calcButtens = [
    {
        value:"0",
        type: "screen",
        widthScale: 4,
        heightScale: 2
    },
    {
        value: "CE",
        type: "oper",
        widthScale: 2,
        heightScale: 1
    },
    {
        value: "\u21E4",
        type: "oper",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "\u00F7",
        type: "oper",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "7",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "8",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "9",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "x",
        type: "oper",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "4",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "5",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "6",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "-",
        type: "oper",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "1",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "2",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "3",
        type: "number",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "+",
        type: "oper",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "0",
        type: "number",
        widthScale: 2,
        heightScale: 1
    },
    {
        value: ".",
        type: "dot",
        widthScale: 1,
        heightScale: 1
    },
    {
        value: "=",
        type: "oper",
        widthScale: 1,
        heightScale: 1
    }
    
];
const mother = document.getElementById("calc-parent");
mother.style.cssText = "box-sizing:border-box; user-select:none; width:202px; display:flex; flex-wrap:wrap; border-radius:7px; border:1px solid #7f8082; overflow:hidden; margin:0 auto"
const itemWidth = 50;
const itemHeight = 50;
const operColor = "orange";
const numberColor = "silver";
const numberBtnStyle = "cursor:pointer; margin:0; border:1px solid #7f8082; font-size:25px; text-align:center; padding-top:10px; color:black; box-sizing:border-box";
const screenStyle = "background-color:#43464a; text-align:right; padding-top:25px; margin:0; color:#b3bcc7; font-size:30px; box-sizing:border-box; border:1px solid #7f8082; border-bottom:none";
let ekran;
let ekraniArjeq = "0";
let gorcoxVayr = [];
let backspaceEnable = false;
let equalLogic = true;
for (let i=0, length = calcButtens.length ;  i<length ; i++){
    const itemBtn = calcButtens[i];
    const btn = document.createElement("p");
    btn.innerText = itemBtn.value;
    switch (itemBtn.type){
        case "number":
            btn.style.cssText= numberBtnStyle;
            btn.style.backgroundColor = numberColor;
            btn.addEventListener("click", updateVal, false)
            btn.addEventListener("mouseover", numberHover, false)
            btn.addEventListener("mouseout", numberOut, false)
        break;
        case "oper":
            btn.style.cssText= numberBtnStyle;
            btn.style.backgroundColor = operColor;
            btn.addEventListener("click", gorcoxutyun, false)
            btn.addEventListener("mouseover", operHover, false)
            btn.addEventListener("mouseout", operOut, false)
        break;
        case "screen":
            btn.style.cssText = screenStyle;
            ekran = btn;
        break;
        case "dot":
            btn.style.cssText = numberBtnStyle;
            btn.style.backgroundColor = numberColor;
            btn.addEventListener("click", dotHandler, false)
            btn.addEventListener("mouseover", dotHover, false)
            btn.addEventListener("mouseout", dotOut, false)
    }
    btn.style.width = itemWidth*itemBtn.widthScale + "px";
    btn.style.height = `${itemHeight*itemBtn.heightScale}px`;
    mother.appendChild(btn);
}

function updateVal(ev){
    backspaceEnable = true;
    logic();
    if (ekraniArjeq === "0" ){
        ekraniArjeq="";
    }
    const valText = ev.target.innerHTML;
    ekraniArjeq += valText;
    ekran.innerText=ekraniArjeq;
}

function calc(operator){
    backspaceEnable = false;
    if (ekraniArjeq === "0"){
        if(gorcoxVayr.length == 2){
            gorcoxVayr[1] = operator
        } 
        else{           
            ekran.innerText = ekraniArjeq;
        }
    }
    else{
        gorcoxVayr.push(ekraniArjeq);
        if (gorcoxVayr.length == 1){
            gorcoxVayr.push(operator)
        }
        else{
            var arjeq = eval(gorcoxVayr.join(" "));
            ekraniArjeq = arjeq + "";
            ekran.innerHTML = ekraniArjeq;
            gorcoxVayr = [ekraniArjeq,operator];
        }
    }
    ekraniArjeq = "0";
}

function equal(){
    gorcoxVayr.push(ekraniArjeq);
    const arjeq = eval(gorcoxVayr.join(""));
    ekraniArjeq = arjeq + "";
    ekran.innerHTML = ekraniArjeq;
    gorcoxVayr=[];
    backspaceEnable = false;
    equalLogic = false;
}

function logic(){
    if (!equalLogic){
        ekraniArjeq = "0";
        equalLogic = true;
    }
}

function clear(){
    emptyCalulatorState();
    ekran.innerText = ekraniArjeq;
}

function backspace(){
    if (!backspaceEnable){
        return;
    }
    ekraniArjeq = ekran.innerHTML;
    ekraniArjeq = ekraniArjeq.slice(0,ekraniArjeq.length-1)
    if (ekraniArjeq.length<1){
        ekraniArjeq = "0";
    }
    ekran.innerText = ekraniArjeq;
}

function emptyCalulatorState() {
    ekraniArjeq = "0";
    gorcoxVayr = [];
}

function gorcoxutyun(objgor){
    var operator = objgor.target.innerHTML;
    const operatorMap = {
        "+": "+",
        "-": "-",
        "x": "*",
        "\u00F7": "/",
    };

    switch (operator){
        case "+":
        case "-":
        case "x":
        case "\u00F7":
            calc(operatorMap[operator]);
            break;
        case "=":
            equal();
            break;
        case "CE":
            clear()
            break;
        case "\u21E4":
            backspace()
            break;
    }
}

function dotHandler() {
    logic();
    if (ekraniArjeq.includes(".")) { 
        return;
    }
    ekraniArjeq += ".";
    ekran.innerHTML = ekraniArjeq;
    backspaceEnable = true;
}

function numberHover(ev){
    ev.target.style.backgroundColor = "blue";
}

function operHover(ev){
    ev.target.style.backgroundColor = "blue";
}

function dotHover(ev){
    ev.target.style.backgroundColor = "blue";
}

function numberOut(ev){
    ev.target.style.backgroundColor = "silver";
}

function operOut(ev){
    ev.target.style.backgroundColor = "orange";
}

function dotOut(ev){
    ev.target.style.backgroundColor = "silver";
}