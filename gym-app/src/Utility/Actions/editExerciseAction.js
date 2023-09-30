import { api_url } from "../API";
export async function editExerciseAction({request}) {
    const formData = await request.formData();

    const data = {
        id: formData.get("id"),
        username: formData.get("user"),
        bodypart: formData.get("body-part"),
        date:  new Date(formData.get("date")).getTime(),
        exercise: formData.get("exercise"),
        weight: parseInt(formData.get("weight")),
        metric: formData.get("metric"),
        description: formData.get("description"),
    }

    data.exercise = data.exercise.toLowerCase();

    console.log(data)
    const url = api_url + "/edit"
    try{
        const response = await fetch(url, {
            method: "put",
            mode: "cors",
            credentials: "include",
            headers: {"content-type":"application/json"},
            body: JSON.stringify(data)
        })

        if(!response.ok || response.status === 422)
            throw new Response("Error Editing Exercise",{status: response.status}, {statusText: response.statusText})

        console.log(await response.json())
        return true;
    } catch (error) {
        throw new Response("Error Editing Exercise",{status: 500}, {statusText: error})
    }
}