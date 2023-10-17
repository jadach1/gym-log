import { api_url } from "../../../../../../Utility/API"
import { json } from "react-router-dom";

//function to delete an id
export async function DeleteItem(id) {
    const url = api_url + "/deleteExercise/"+id;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(!response.ok || response.status === "422")
            throw new Response("deletion error");

        //We have successfully deleted, now we must recreate the list
        return true;
    } catch (error) {
        return error;
    }

 
}