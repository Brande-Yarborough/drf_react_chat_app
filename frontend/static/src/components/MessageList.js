import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function MessageList() {
  const [messages, setMessages] = useState([]);
  //for handleNewMessage
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch("/api_v1/chats/messages/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get Messages
      setMessages(data);
    };
    //call getMessages
    getMessages();
  }, []);

  const messagesHTML = messages.map((message) => (
    <div key={message.id}>{message.text}</div>
  ));

  const addMessage = async () => {
    // const message = {
    //   text: "Welcome to the channel.",
    //   channel: 1,
    //   author: 1,
    // };
    const newMessage = {
      text: message,
      channel: 1,
      author: 1,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newMessage),
    };

    const response = await fetch("/api_v1/chats/messages/", options);
    if (!response.ok) {
      throw new Error("Network response not OK");
    }

    const data = await response.json();
    console.log({ data });
    setMessages([...messages, data]);
    //clears new message form back out
    setMessage("");
  };

  const handleNewMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      {/* <div className="App">
        <h1>Sup Instant Messenger</h1>
      {messagesHTML}
      <button type="button" onClick={addMessage}>
        Add message
      </button>
      </div> */}

      {messagesHTML}
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          {/* <Form.Label>Example textarea</Form.Label> */}
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message"
            value={message}
            onChange={handleNewMessage}
          />
        </Form.Group>

        <Button type="button" variant="primary" onClick={addMessage}>
          Send
        </Button>
      </Form>
    </>
  );
}

export default MessageList;
