var test = {
    name: false,
    email: false,
    password: false,
    confirmed: false,
    gender: false
};
var inputInformation = {
    name: 'null',
    email: 'null',
    password: 'null',
    confirmed: 'null',
    gender: 'null'
};
//get parent of element 
// getParent = function(element,selector) {
//     while (element.parentElement){
//         if (element.parentElement.matches(selector)){
//             return element.parentElement
//         }else{
//             element = element.parentElement
//         }
//     }
// }

function valid(element) {
    if (element.value) {
        element.classList.remove('red')
        element.parentElement.querySelector('.footer').innerText = ''
    }
}

function invalid(element,message) {
    if(element.value == '') {
        element.classList.add('red')
        element.parentElement.querySelector('.footer').innerText = 'Không được để trống ô này'
    }else if(test.name == false || test.email == false || test.password == false || test.confirmed == false || test.gender == false) {
        element.classList.add('red')
        element.parentElement.querySelector('.footer').innerText = message
    }
}

handleElement = function(element) {
    var getInput = form1.querySelector(element.selector);
    getInput.onblur = function () {
        element.logic(getInput)
        console.log(test)
    }
    getInput.oninput = function() {
        getInput.classList.remove('red')
        getInput.parentElement.querySelector('.footer').innerText = ''
    }
}

// function getKeyByValue(object, value) {
//     return Object.keys(object).find(key => object[key] === value);
// }

function validator(obj) {
    var getRule = obj.rule
        form1 = document.querySelector(obj.form)
    //handle onblur
    getRule.forEach(handleElement)

    //handle onclick
    const btn = form1.querySelector('.btn')
    btn.addEventListener('click',(e) =>{
        getRule.forEach(function(element) {
            var getInput = form1.querySelector(element.selector);
            element.logic(getInput)
        })
        e.preventDefault();
        if (Object.values(test).every((e) => {return e == true})){
            console.log(inputInformation)
        }else{console.log('have error')}
    })
}

validator.isName = function(input,message) {
    return {
        selector: input,
        logic: function(element) {
            if (element.value.trim().length > 6){
                valid(element)
                inputInformation.name = element.value
                test.name = true
            }else{
                test.name = false;
                invalid(element,message)
            }
        }
    }
}

validator.isEmail = function(input,message) {
    return {
        selector: input,
        logic: function(element) {
            if (element.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                valid(element)
                inputInformation.email = element.value
                test.email = true
            }else {
                test.email = false;
                invalid(element,message)
            }
        
        }
    }
}

var pass = ''
validator.isPassword = function(input,message) {
    return {
        selector: input,
        logic: function(element) {
            if (element.value.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/)) {
                pass = element.value
                inputInformation.password = pass
                valid(element)
                test.password = true
            }else {
                test.password = false;
                invalid(element,message)
            }
        }
    }
}
validator.isconfirmed = function(input,message) {
    return {
        selector: input,
        logic: function(element) {
            if (element.value === pass && element.value !==''){
                valid(element)
                inputInformation.confirmed = element.value
                test.confirmed = true
            }else{
                test.confirmed = false;
                invalid(element,message)
            }
        }
    }
}
validator.ischecked = function(input,message) {
    return{
        selector: input,
        logic: function(element) {
            var checkBox = element.querySelectorAll('.box')
            if (Array.from(checkBox).every((e) => {return e.checked == false})){
                test.gender = false
                invalid(element,message)
            }else{
                test.gender = true
                inputInformation.gender = Array.from(checkBox).find((e)=>{return e.checked == true})
                valid(element)
            }
        }
    }
}