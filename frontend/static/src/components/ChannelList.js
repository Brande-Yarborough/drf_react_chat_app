import "../App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import icon1 from "../assets/sup.jpg";

function ChannelList() {
  // const [chats, setChats] = useState(null); //use null because it is falsy
  const [channels, setChannels] = useState(null);

  useEffect(() => {
    const getChannels = async () => {
      const response = await fetch("/api_v1/chats/channels/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get Chats
      setChannels(data);
    };
    //call getChats
    getChannels();
  }, []);

  const addChannel = async () => {
    const channel = {
      title: "A channel added from React",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(channel),
    };

    const response = await fetch("/api_v1/chats/channels/", options);
    if (!response.ok) {
      throw new Error("Network response not OK");
    }

    const data = await response.json();
    // console.log({ data });
    setChannels([...channels, data]);
  };

  if (!channels) {
    return <div>Fetching data ...</div>;
  }

  const channelsHTML = channels.map((channel) => (
    <li key={channel.id}>{channel.title}</li>
  ));

  return (
    <>
      {/* <div className="App">
      <h1>Sup Instant Messenger</h1>
      {channelsHTML}
      <button type="button" onClick={addChannel}>
        Add channel
      </button>
    </div> */}

      <h1>
        <img className="sup-icon" src={icon1} alt="sup icon" />
        Sup Instant Messenger
      </h1>

      {channelsHTML}

      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={2} placeholder="Channel" />
        </Form.Group>

        <Button type="button" variant="primary" onClick={addChannel}>
          Add Channel
        </Button>
      </Form>
    </>
  );
}

export default ChannelList;
