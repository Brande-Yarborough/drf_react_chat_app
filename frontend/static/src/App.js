import {useState} from "react";
import Cookies from "js-cookie";
import ChatList from "./components/ChatList";
import LoginForm from "./components/LoginForm";

function App() {
  const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));
  //if don't have auth cookie it will be set to false, if do have it will be true

  //if true show booklist, if false show loginform
  return<> {isAuth ? <ChatList /> : <LoginForm setAuth={setAuth} />}</>;

}

export default App;