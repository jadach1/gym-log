import { redirect } from "react-router-dom";

export async function action({ request }) {

  /*GRABBING FORM DATA */
  const data = await request.formData();

  const eventData = {
    username: data.get("username") || "",
    password: data.get("password") || "",
    confirmPassword: data.get("confirmPassword") || "",
  };

  /*INPUT VALIDATION */
  if(eventData.confirmPassword !== eventData.password)
    return "Passwords do much match.  Come on, you're better than this."
  
    //Check to see if password is at least 6 characters long and includes a number
  const regex = /[\s]/g;
  const found = eventData.password.search(regex);
  console.log(found)
  if(found !== -1)
    return "Password cannot have white spaces."
  if(eventData.password.length < 6)
    return "Password must be longer than 6 characters"

  /*SERVER CALL */
  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "post",
      mode: 'cors',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(eventData),
    });
    const re = await response.json();

    if(!response.ok || response.status === 422)
      throw re.error;

    alert("successfully signed up now log in");
    return redirect('/login');  
  } catch (err) {
     return err;
  }
}