import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const INITIAL_STATE = {
  username: "",
  password1: "",
  password2: "",
  email: "",
};

function RegistrationForm(props) {
  const [state, setState] = useState(INITIAL_STATE);

  // const [name, setName] = useState("Brande");

  //   for password1, password2 error
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target; //value of this inside event listener is event.target, value of this in fat arrow is LoginForm
    setState((prevState) => ({
      //previous changes to state will be executed in correct order, that is why we use function here
      //go get previous object, and now I'm going to update it
      //you would lose other properties if didn't spread out prevState
      ...prevState,
      [name]: value,
    }));
  };
  const handleError = (err) => {
    console.warn(err);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.password1 !== state.password2) {
      setError("Passwords do not match!");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state), //state is object that has all properties to send up on post request: name, email, pass
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
    props.setPage("channelList");
  };
  return (
    <>
      <h1>Sup Instant Messenger</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            //   id="username"
            type="text"
            placeholder="Enter username"
            name="username"
            value={state.username}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password 1</Form.Label>
          <Form.Control
            //   id="password"
            type="password"
            id="password1"
            placeholder="Enter password 1"
            name="password1"
            value={state.password1}
            onChange={handleInput}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password 2</Form.Label>
          <Form.Control
            //   id="password"
            type="password"
            id="password2"
            placeholder="Enter password 2"
            name="password2"
            value={state.password2}
            onChange={handleInput}
            required
          />
          <div style={{ color: "red" }}>{error}</div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            //   id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            value={state.email}
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}

export default RegistrationForm;
