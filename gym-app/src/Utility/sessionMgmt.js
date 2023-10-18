/*
Stricly function calls for dealing with local and session Storage
*/

export function createSessionLocal(username, level) {
    // Set local storage for username, level and expiration after successful login
    localStorage.setItem('username',username);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 6);
    localStorage.setItem('expiration',expiration.toISOString());
    localStorage.setItem('level', level);
}

export function checkAndCreateSessionLocal(username, level) {
    if(localStorage.getItem("username"))
        console.log("user is signed in, no need to create duplicate session")
    else
        createSessionLocal(username, level);   
}

export function removeSessionLocal(){
    localStorage.removeItem("username")
    localStorage.removeItem("expiration")
    localStorage.removeItem("level")
}