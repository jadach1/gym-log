import { api_url } from "../API";
import { json, redirect } from "react-router-dom";
//Logout user
export async function action(){

    try{
        localStorage.removeItem('username');
        localStorage.removeItem('level');
        localStorage.removeItem('expiration');
        const response = await fetch(api_url+"/logout", {
            method: 'post',
            mode: 'cors',
            credentials: 'include'
        });
        
        if(!response.ok || response.status !== 201)
            throw json({error: "Error logging out"})

        const reply = await response.json();
        console.log(reply);
        return redirect('/login');
    } catch (error) {
        console.log(error)
        throw new Response("Server is not responding to logout", {status: 500}, {statusText: error});
    }
}
