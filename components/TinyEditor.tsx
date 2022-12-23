import { useColorModeValue } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { MutableRefObject } from "react";

interface TinyEditorProps {
  blogBody: MutableRefObject<any>;
  initialValue?: string;
}

const tinyToolbar =
  "undo redo | fontsize sizeselect | lineheight | bold italic backcolor forecolor | " +
  "alignleft aligncenter alignright alignjustify | " +
  "bullist numlist checklist outdent indent | removeformat | a11ycheck link image media code table help";

const tinyPlugins = [
  "a11ychecker",
  "advlist",
  "advcode",
  "advtable",
  "autolink",
  "checklist",
  "export",
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "powerpaste",
  "fullscreen",
  "formatpainter",
  "insertdatetime",
  "media",
  "table",
  "help",
  "wordcount",
];

const TinyEditor: React.FC<TinyEditorProps> = ({ blogBody, initialValue = "<div></div>" }) => {
  return (
    <Editor
      apiKey={process.env.TINY_EDITOR_API_KEY}
      onInit={(_, editor) => (blogBody.current = editor)}
      initialValue={initialValue}
      init={{
        skin: useColorModeValue("oxide", "oxide-dark"),
        content_css: useColorModeValue("default", "dark"),
        height: 500,
        menubar: true,
        plugins: tinyPlugins,
        toolbar: tinyToolbar,
        content_style:
          "body { font-family:Comic Sans MS,Arial,sans-serif; font-size: 18pt; line-height: 1.6 }",
        language: "ar",
        line_height_formats: "1 1.2 1.4 1.6 1.8 2",
        directionality: "rtl",
      }}
    />
  );
};

export default TinyEditor;
