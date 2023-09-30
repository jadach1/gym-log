import { api_url } from "../API"

export async function action({request}) {

    const searchParams = new URL(request.url).searchParams;
    console.log(searchParams);
    const formData = await FormData();

    const eventData = {
        bodyPart: formData.get("bodyPart")
    }

    const response = await fetch(api_url+"/exercises/:"+eventData.bodyPart, {
        method: "get",
        headers: {"content-type":"application/json"},
        credentials: "include",
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data;
}