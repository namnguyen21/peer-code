import { useState, useEffect, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import styled from "styled-components";

// THEMES
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/base16-light.css";

// LANGUAGES
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/htmlmixed/htmlmixed";

import Select from "../util/Select";

import "./CodeEditor.css";

const Container = styled.section`
  height: 100%;
  width: ${(props) => (props.chatOpen ? "100%" : "100vw")};
  transition: all 0.2s;
`;

const EditorContainer = styled.div`
  width: 100%;
  height: ${(props) => `calc(100vh - ${props.topBarHeight}px)`};
`;

const Settings = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightGrey};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: ${(props) => `${props.topBarHeight}px`};
`;

const Label = styled.label`
  font-size: 0.9rem;
`;

const ENDPOINT = "localhost:3001";

export default function CodeEditor({ roomId, name, topBarHeight, chatOpen }) {
  const [editorValue, setEditorValue] = useState("");
  const [theme, setTheme] = useState("ayu-dark");
  const [mode, setMode] = useState("javascript");
  const modesRef = useRef([
    { display: "JavaScript", value: "javascript" },
    { display: "Python", value: "python" },
    { display: "Java", value: "java" },
    { display: "HTML", value: "html-mixed" },
  ]);
  const themesRef = useRef([
    { display: "Ayu Dark", value: "ayu-dark" },
    { display: "Darcula", value: "darcula" },
    { display: "Monokai", value: "monokai" },
    { display: "Material Darker", value: "material-darker" },
    { display: "Material Ocean", value: "material-ocean" },
    { display: "Material Palenight", value: "material-palenight" },
    { display: "Nord", value: "nord" },
    { display: "Elegant", value: "elegant" },
    { display: "Base16 Light", value: "base16-light" },
  ]);
  const editorRef = useRef();
  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(`peer-code-${roomId}`, ydoc, {
      signaling: ["wss://y-webrtc-signaling-us.herokuapp.com"],
    });
    provider.awareness.setLocalStateField("user", {
      name,
    });
    const yText = ydoc.getText("codemirror");
    const binding = new CodemirrorBinding(
      yText,
      editorRef.current,
      provider.awareness
    );
    return () => {
      binding.destroy();
      provider.destroy();
    };
  }, []);

  function handleChange(editor, data, value) {
    setEditorValue(value);
  }

  console.log(editorRef);

  return (
    <Container chatOpen={chatOpen} className="code-container">
      <Settings topBarHeight={topBarHeight}>
        <div>
          <Label>Theme: </Label>
          <Select
            value={theme}
            setValue={setTheme}
            options={themesRef.current}
          />
        </div>
        <div>
          <Label>Language: </Label>
          <Select value={mode} setValue={setMode} options={modesRef.current} />
        </div>
      </Settings>
      <EditorContainer topBarHeight={topBarHeight}>
        <CodeMirror
          ref={() => editorRef}
          style={{ width: "100%", minHeight: "100%" }}
          editorDidMount={(editor) => (editorRef.current = editor)}
          value={editorValue}
          onBeforeChange={(editor, data, value) =>
            handleChange(editor, data, value)
          }
          options={{
            mode: mode,
            lineNumbers: true,
            theme: theme,
            autoCloseBrackets: true,
            matchBrackets: true,
          }}
        />
      </EditorContainer>
    </Container>
  );
}
