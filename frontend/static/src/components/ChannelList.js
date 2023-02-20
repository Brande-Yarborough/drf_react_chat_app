import "../App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import icon1 from "../assets/sup.jpg";
import Nav from "react-bootstrap/Nav";

function ChannelList() {
  // const [chats, setChats] = useState(null); //use null because it is falsy
  //shows channel list from fetch request
  const [channels, setChannels] = useState(null);
  //for handleNewChannel
  const [channel, setChannel] = useState("");

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
    // const channel = {
    //   title: "A channel added from React",
    // };
    const newChannel = {
      title: channel,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newChannel),
    };

    const response = await fetch("/api_v1/chats/channels/", options);
    if (!response.ok) {
      throw new Error("Network response not OK");
    }

    const data = await response.json();
    // console.log({ data });
    setChannels([...channels, data]);
    setChannel(""); //reset state
  };

  if (!channels) {
    return <div>Fetching data ...</div>;
  }

  const channelsHTML = channels.map((channel) => (
    // <li key={channel.id}>{channel.title}</li>
    // <div key={channel.id}>
    <Nav.Item key={channel.id}>
      <Nav.Link>{channel.title}</Nav.Link>
    </Nav.Item>
    // </div>
  ));

  const handleNewChannel = (event) => {
    setChannel(event.target.value);
  };

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
      <Nav>{channelsHTML}</Nav>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Channel"
            value={channel}
            onChange={handleNewChannel}
          />
        </Form.Group>

        <Button type="button" variant="primary" onClick={addChannel}>
          Add Channel
        </Button>
      </Form>
    </>
  );
}

export default ChannelList;
