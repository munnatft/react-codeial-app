
export const getFormBody = (params)=>{
    let formBody = [];
    for(let property in params){
        let encodekey = encodeURIComponent(property);
        let encodeValue = encodeURIComponent(params[property]);
        formBody.push(encodekey+'='+encodeValue);
    }
    return formBody.join('&');
}

export const setItemInLocalStorage = (key,value)=>{
    if(!key || !value){
        return console.log("Cannot Store in localstorage")
    }

    let valueToStore = typeof value != 'string'?JSON.stringify(value):value;
    localStorage.setItem(key,valueToStore);
}

export const getItemFromLocalStorage = (key) =>{
    if(!key){
        return console.log("Cannot get Item from localstorage")
    }
    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key)=>{
    if(!key){
        return console.log("Cannot get Item from localstorage")
    }
    localStorage.removeItem(key);
}