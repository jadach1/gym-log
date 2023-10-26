//React Pacakges
import { api_url } from "../API";

//Utility Function
import { createSessionLocal } from "../sessionMgmt";

//Code
export async function action({ request }) {

  const data = await request.formData();
  const type = data.get("type") || "";

  //Pull request data from form object
  const eventData = {
    username: data.get("username") || "",
    password: data.get("password") || "",
    confirmPassword: data.get("confirmPassword") || "",
  };

  const options = {
    method: "post",
    //credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  };

  /*DEPENDING ON WHETHER WE ARE LOGGING IN OR SIGNING UP */
  if (type === "Login") 
    options.credentials = "include";
  else // Signup Verification
  {
    /*INPUT VALIDATION */
    if (eventData.confirmPassword !== eventData.password)
      return {
        status: "error",
        error: "Passwords do much match.  Come on, you're better than this.",
      };

    //Check to see if password is at least 6 characters long and includes a number
    const regex = /[\s]/g;
    const found = eventData.password.search(regex);
    if (found !== -1)
      return { status: "error", error: "Password cannot have white spaces." };
    if (eventData.password.length < 6)
      return {
        status: "error",
        error: "Password must be longer than 6 characters",
      };
  }

  try {
    // // Attempt to fetch the data from backend server
    const response = await fetch(api_url + "/" + type, options);
    const re = await response.json();
    if (!response.ok || response.status === 422) throw re.error;

    // Set local storage for username, level and expiration after successful login
    if (type === "Login") {
      createSessionLocal(re.username, re.level);
      return { status: "success login" };
    }

    return { status: "success signup", username: eventData.username };
  } catch (err) {
    return { status: "error", error: err };
  }
}
