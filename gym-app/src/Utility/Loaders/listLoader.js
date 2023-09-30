import { api_url } from "../API"

export async function listLoader({request}) {
    //Fetch PArameters from Form
    let params = new URL(request.url);
    const bodyPart = params.searchParams.get("bodyPart") || "all";
    let date = params.searchParams.get("date") || "all";
    const exercise = params.searchParams.get("exercise") || "all";
    const sortBy = params.searchParams.get("sortBy") || "date";

    //if date is not all convert to milliseconds
    if(date !== "all")
        date = new Date(date).getTime();

    // build url
    let url = api_url + "/exercises/"+exercise+"/"+bodyPart+"/"+date+"/"+sortBy;

    console.log(url)
    try {
        const response = await fetch(url, {
            method: "get",
            headers: {"content-type":"application/json"},
            credentials: "include",
        })
        const data = await response.json()
        return data;
    } catch (error) {
        throw new Response("Server is not responding ", {status: 500}, {statusText: error});
    }

   
}