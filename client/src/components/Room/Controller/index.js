import styled from "styled-components";
import { HiChatAlt2, HiMicrophone, HiVideoCamera } from "react-icons/hi";

import IconBtn from "./IconButton";

const Container = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${(props) =>
    props.backgroundIsLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.1)"};
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 16;
  transform: translateX(-50%);
  > *:not(:last-child) {
    border-right: ${(props) => `solid 1px ${props.theme.colors.paper}`};
  }
  transition: all 0.2s;
  > *:first-child {
    border-top-left-radius: 10px;
  }
  > *:last-child {
    border-top-right-radius: 10px;
  }
`;

export default function Controller({
  setChatOpen,
  chatOpen,
  myAudioStream,
  myVideoStream,
  backgroundIsLight,
  audioIsEnabled,
  setAudioIsEnabled,
  videoIsEnabled,
  setVideoIsEnabled,
  audioDevices,
  videoDevices,
}) {
  function onAudioChange() {
    console.log(audioDevices);
    if (myAudioStream.getAudioTracks()[0].enabled) {
      myAudioStream.getAudioTracks()[0].enabled = false;
    } else {
      myAudioStream.getAudioTracks()[0].enabled = true;
    }
    setAudioIsEnabled((isEnabled) => !isEnabled);
  }

  function onVideoChange() {
    if (myVideoStream.getVideoTracks()[0].enabled === false) {
      myVideoStream.getVideoTracks()[0].enabled = true;
    } else {
      myVideoStream.getVideoTracks()[0].enabled = false;
    }
    console.log(myVideoStream.getVideoTracks()[0]);
    setVideoIsEnabled((isEnabled) => !isEnabled);
  }

  return (
    <Container backgroundIsLight={backgroundIsLight}>
      <IconBtn
        onClick={() => setChatOpen((open) => !open)}
        isOn={true}
        icon={<HiChatAlt2 />}
      >
        {chatOpen ? "Close Chat" : "Open Chat"}
      </IconBtn>

      {/* <IconBtn
        isOn={audioIsEnabled}
        disabled={audioDevices.length === 0 ? true : false}
        onClick={onAudioChange}
        icon={<HiMicrophone />}
        disabled={audioDevices.length === 0 ? true : false}
      >
        {audioIsEnabled ? "Mute Audio" : "Unmute Audio"}
      </IconBtn>

      <IconBtn
        isOn={videoIsEnabled}
        disabled={videoDevices.length === 0 ? true : false}
        icon={<HiVideoCamera />}
        onClick={onVideoChange}
      >
        {videoIsEnabled ? "Pause Video" : "Resume Video"}
      </IconBtn> */}
    </Container>
  );
}
