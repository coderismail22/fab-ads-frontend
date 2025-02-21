import { useRef } from "react";
import JoditEditor from "jodit-react";

interface RichTextEditorProps {
  content: string; // or your specific content type
  onChangeContent: (newContent: string) => void; // specify the function type
}

const RichTextEditor = ({ content, onChangeContent }: RichTextEditorProps) => {
  const editor = useRef(null);
  // {
  //   console.log("richtexteditor", content);
  // }

  return (
    <JoditEditor
      // config={config}
      ref={editor}
      value={content}
      // tabIndex={1} // tabIndex of textarea
      onChange={(newContent) => onChangeContent(newContent)}
    />
  );
};

export default RichTextEditor;
