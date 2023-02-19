import {useState} from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import ChatList from "./components/ChatList";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/Registration Form";

function App() {
  const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));
  //if don't have auth cookie it will be set to false, if do have it will be true
  const [selection, setSelection] = useState("a");

  const handleLogout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json(); //when we login and are registered we get key
    Cookies.remove("Authorization", `Token ${data.key}`); //set auth cookie and value is token with key value when logged in and registered
    //when logout, need to remove cookie
    setAuth(false);
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleRegistration = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json(); //when we login and are registered we get key
    Cookies.set("Authorization", `Token ${data.key}`); //set auth cookie and value is token with key value when logged in and registered
    //when logout, need to remove cookie
    setAuth(true);
  };

  // const handleError = (err) => {
  //   console.warn(err);
  // };



  
  //if true show Chatlist, if false show loginform
  console.log(isAuth)
  return<> 
  {isAuth ? <div><ChatList /> <button type="button" onClick={handleLogout}>Logout</button></div> : <div><LoginForm setAuth={setAuth}/> 
</div> }
{!isAuth ? <Button variant="primary" type="submit" >
  Sign Up
</Button> : null}
</>;

  
}

export default App;