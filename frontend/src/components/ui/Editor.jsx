import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";


// ==========================================
// DECODE HTML ENTITIES
// ==========================================

const decodeHtml = (html = "") => {
  if (!html) return "";

  // Sirf encoded HTML ko decode karo
  if (
    !html.includes("&lt;") &&
    !html.includes("&gt;") &&
    !html.includes("&amp;")
  ) {
    return html;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;

  return textarea.value;
};


export default function Editor({
  label,
  value,
  onChange,
}) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: decodeHtml(value || ""),

    editorProps: {
      attributes: {
        class:
          "min-h-[450px] rounded-2xl border border-[#E8E2D9] bg-white p-6 focus:outline-none prose prose-lg max-w-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });


  // ==========================================
  // SYNC FORM VALUE -> EDITOR
  // ==========================================

  useEffect(() => {
    if (!editor) return;

    const normalizedValue = decodeHtml(value || "");
    const currentHtml = editor.getHTML();

    if (normalizedValue !== currentHtml) {
      editor.commands.setContent(
        normalizedValue,
        false
      );
    }
  }, [value, editor]);


  if (!editor) return null;


  return (
    <div className="space-y-3">

      {label && (
        <label className="text-sm font-medium text-[#12312B]">
          {label}
        </label>
      )}


      <div className="overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white">

        {/* =========================================
            TOOLBAR
        ========================================= */}

        <div className="flex flex-wrap gap-2 border-b bg-[#FCFBF8] p-3">

          {/* BOLD */}

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
            className={`rounded-lg px-3 py-2 text-sm ${
              editor.isActive("bold")
                ? "bg-[#12312B] text-white"
                : "hover:bg-[#F3F3F3]"
            }`}
          >
            Bold
          </button>


          {/* ITALIC */}

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
            className={`rounded-lg px-3 py-2 text-sm ${
              editor.isActive("italic")
                ? "bg-[#12312B] text-white"
                : "hover:bg-[#F3F3F3]"
            }`}
          >
            Italic
          </button>


          {/* H2 */}

          <button
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .run()
            }
            className={`rounded-lg px-3 py-2 text-sm ${
              editor.isActive("heading", { level: 2 })
                ? "bg-[#12312B] text-white"
                : "hover:bg-[#F3F3F3]"
            }`}
          >
            H2
          </button>


          {/* BULLET LIST */}

          <button
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            className={`rounded-lg px-3 py-2 text-sm ${
              editor.isActive("bulletList")
                ? "bg-[#12312B] text-white"
                : "hover:bg-[#F3F3F3]"
            }`}
          >
            Bullet List
          </button>

        </div>


        {/* EDITOR */}

        <EditorContent editor={editor} />

      </div>

    </div>
  );
}