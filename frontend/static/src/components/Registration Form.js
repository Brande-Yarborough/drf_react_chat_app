import { useState } from "react";

const INITIAL_STATE = {
  username: "",
  email: "",
  password1: "",
  password2: "",
};

function RegistrationForm(props) {
  const [state, setState] = useState(INITIAL_STATE);
}
