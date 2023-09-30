//React Pacakges
import { json, redirect } from "react-router-dom";
import { api_url } from "../API";

//Utility Function
import {createSessionLocal} from '../sessionMgmt';

//Code
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const data = await request.formData();

  //Pull request data from form object
  const eventData = {
    username: data.get("username"),
    password: data.get("password"),
  };
 
  // searchParams.forEach( e => console.log(e))
  try {
    // // Attempt to fetch the data from backend server
    const response = await fetch(api_url + "/login", {
                    method: "post",
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventData)
                    });
    const re = await response.json();              
    if(!response.ok || response.status===422)
      throw re.error;
    // Set local storage for username, level and expiration after successful login
    createSessionLocal(re.username,re.level);
    return redirect("/home");

  } catch (err) {
    return err;
  }

 
}
