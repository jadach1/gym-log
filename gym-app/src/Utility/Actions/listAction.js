import { redirect } from "react-router-dom";
import { api_url } from "../API"

//function to delete an id
export async function exerciseListAction({request}) {
    const formData = await request.formData();

    const id = formData.get("id");
    const intent = formData.get("intent");

    const bodyPart = formData.get("bodyPart") || "all";
    let date = formData.get("date") || "all";
    const exercise = formData.get("exercise") || "all";
    const sortBy = formData.get("sortBy") || "all";

    //if date is not all convert to milliseconds
    if(date !== "all")
        date = new Date(date).getTime();

    const redirect = "/home/list/"+bodyPart+"/"+date+"/"+exercise+"/"+sortBy;
    console.log(id, intent, redirect)
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
        console.log(response)
        if(!response.ok || response.status === "422")
            throw new Response("deletion error");

        redirect(redirect);
    } catch (error) {
        console.log("errors")
        return error;
    }

 
}