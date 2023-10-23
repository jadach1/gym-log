/* this functions main purpose is to create an 
element which we will append to a Form we will 
be sending forth to an action*/
export function createElement(name, value){
    const element = document.createElement("Input");
        element.setAttribute("id", name);
        element.setAttribute("name",name);
        element.setAttribute("value",value);
        element.setAttribute("hidden",true);
    return element;
}