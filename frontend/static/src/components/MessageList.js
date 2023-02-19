import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function MessageList() {
  const [messages, setMessages] = useState([]);

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
    <li key={message.id}>{message.title}</li>
  ));

  const addMessage = async () => {
    const message = {
      text: "Welcome to the channel.",
      channel: 1,
      author: 1,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(message),
    };

    const response = await fetch("/api_v1/chats/messages/", options);
    if (!response.ok) {
      throw new Error("Network response not OK");
    }

    const data = await response.json();
    console.log({ data });
    setMessages([...messages, data]);
  };

  return (
    <div className="App">
      <h1>Sup Instant Messenger</h1>
      {messagesHTML}
      <button type="button" onClick={addMessage}>
        Add message
      </button>
    </div>
  );
}

export default MessageList;
