import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Modal from "../util/Modal";

export default function RoomCreate() {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const createRoomId = async () => {
      const { data } = await axios.get("http://localhost:3001/room/create");
      setRoomId(data.roomID);
    };
    createRoomId();
  }, []);

  if (roomId.length === 0) {
    return (
      <div>
        <Modal isOpen={roomId.length > 0 ? false : true} />
      </div>
    );
  } else {
    return <Redirect to={`/room/${roomId}`} />;
  }
}