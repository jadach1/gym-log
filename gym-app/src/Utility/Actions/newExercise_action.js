import { api_url } from "../API";
import {json} from 'react-router-dom'

export async function action({request}) {
    let formData = await request.formData();

    const data = {
        username: localStorage.getItem("username"),
        bodypart: formData.get("body-part"),
        date:  new Date(formData.get("date")).getTime(),
        exercise: formData.get("exercise"),
        weight: parseInt(formData.get("weight")),
        metric: formData.get("metric"),
        description: formData.get("description"),
    }

    data.exercise = data.exercise.toLowerCase();

    try {
            //fetch request, post to server
    const response = await fetch(api_url+"/create",{
        method: "post",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!response.ok || response.status===422)
        throw json({error: "Error server side.  Could not add new Exercise"})
    return data;
    } catch (error) {
        throw new Response("Oops, there was a problem",{statusText: error, status: 422});
    }

}