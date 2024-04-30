import React, { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import style from "./TextEditor.module.css";

const TextEditor = ({ text, setText, height = "600px", ref = null }) => {
  const [bodyMsg, setBodyMsg] = useState("");
  const editorRef = useRef(null);

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setText(data);
    const editData = data.replace(/(<([^>]+)>)/gi, "");

    if (editData === "") {
      setBodyMsg("❗️본문을 입력해주세요.");
    } else if (editData.length < 20) {
      setBodyMsg("❗️본문은 20자 이상이어야 합니다.");
    } else {
      setBodyMsg("");
    }
  };

  return (
    <div className={style.editor__container}>
      <Editor
        ref={ref ? ref : editorRef}
        initialValue={text}
        previewStyle="vertical"
        height={height}
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={onChange}
      />
      <p className={style.err__msg}>{bodyMsg}</p>
    </div>
  );
};

export default TextEditor;
