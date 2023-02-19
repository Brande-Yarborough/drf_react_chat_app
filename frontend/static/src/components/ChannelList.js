import { useState, useEffect } from "react";
import Cookies from "js-cookie";

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
    <div className="App">
      <h1>Sup Instant Messenger</h1>
      {channelsHTML}
      <button type="button" onClick={addChannel}>
        Add channel
      </button>
    </div>
  );
}

export default ChannelList;
