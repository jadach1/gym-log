import { api_url } from "../API";
export async function exerciseLoader({request, params}) {

    const url = api_url + "/getExercise/" + params.id;
    try {
        const response = await fetch(url, {
            method: "get",
            mode: "cors",
            credentials: "include",
            headers: {"content-type": "application-json"}
        })
    
        if(!response.ok || response.status === 422 )
            throw new Response("Error upon fetching exercise data", {status: response.status},{statusText: response.statusText})
    
        const data = await response.json();
        
        return data;
    } catch (error) {
        throw new Response("Error upon fetching exercise data", {status: 500},{statusText: error})
    }
}