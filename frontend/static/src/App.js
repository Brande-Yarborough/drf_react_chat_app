import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import ChannelList from "./components/ChannelList";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import MessageList from "./components/MessageList";

function App() {
  // const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));
  const [selectedChannel, setSelectedChannel] = useState(null);
  //if don't have auth cookie it will be set to false, if do have it will be true
  //for toggle button on sign up-take to registration form
  // const [signUp, setSignUp] = useState(true);
  // const [selection, setSelection] = useState("a");
  const [page, setPage] = useState(
    !!Cookies.get("Authorization") ? "login" : "channelList"
  );

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
    setPage("login");
  };

  const handleError = (err) => {
    console.warn(err);
  };

  // const handleSignUp = async () => {
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": Cookies.get("csrftoken"),
  //     },
  //   };
  //   const response = await fetch("/dj-rest-auth/registration/", options).catch(
  //     handleError
  //   );
  //   if (!response.ok) {
  //     throw new Error("Network response was not OK");
  //   }
  //   const data = await response.json(); //when we login and are registered we get key
  //   Cookies.set("Authorization", `Token ${data.key}`); //set auth cookie and value is token with key value when logged in and registered
  //   //when logout, need to remove cookie
  //   setAuth(true);
  // };

  // const handleError = (err) => {
  //   console.warn(err);
  // };

  //if true show Chatlist, if false show loginform
  return (
    <>
      {page === "login" && <LoginForm setPage={setPage} />}
      {page === "registration" && <RegistrationForm setPage={setPage} />}
      {page === "channelList" && (
        <div>
          <ChannelList setSelectedChannel={setSelectedChannel} />{" "}
          {selectedChannel && <MessageList selectedChannel={selectedChannel} />}
          <Button variant="primary" type="button" onClick={handleLogout}>
            Logout
          </Button>{" "}
        </div>
      )}
    </>
  );
}

export default App;
