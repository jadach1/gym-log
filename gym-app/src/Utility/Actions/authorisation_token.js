import { redirect, json } from "react-router-dom";
import { api_url } from "../API";

//Utility Code
import {checkAndCreateSessionLocal, removeSessionLocal} from '../sessionMgmt'

export async function getAuthTokenFromServer() {
  try {
    const response = await fetch(api_url + "/isAuthorised", {
      method: "GET",
      headers: { test: "test1", jacob: "bocaj" },
      credentials: "include",
      mode: "cors"
    });

    // Check to see if user has a valid session, session will be stored
    if(!response.ok || response.status === 422) return null;
    // grab session details
     const user = await response.json();
    // check to see if localstorage persists
     checkAndCreateSessionLocal(user.username, user.level);
    // check to see if successful
     const token = getAuthToken();
    if (!token) return null;
    console.log(token)
    //Tell user we have tested the server and have successfully logged in
    sessionStorage.setItem("serverCalled","true");
    return token;
  } catch (error) {
    console.error(error)
    throw new Response("Server is not responding ", {status: 500}, {statusText: error});
  }
}

/*
  We will check localStorage to see if we have logged in and
  double check to make sure the expiration hasn't lapsed
*/
export function getAuthToken() {
  const token = localStorage.getItem('username');
  if(!token)
    return null;
  const isExpired =  new Date(localStorage.getItem('expiration')) - new Date(Date.now());
  if(isExpired <= 0){
    removeSessionLocal();
  }
  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

  /*if this is the first instance of the browser session 
    we will make a call to the server, save a session variable
    indicating we tested this session and all subsequent 
    calls to check authorisation shall be done through localStorage
  */
export async function checkAuthToken() {
  const firstCall = sessionStorage.getItem("serverCalled");
  let token = null;
  
  if(!firstCall)
      token =  await getAuthTokenFromServer();
  else
      token = getAuthToken();
  
  if(!token) return redirect("/login");
  return token;
}
