import { EditorContent, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extensions';
import { useEffect } from 'react';
import { FaBold } from 'react-icons/fa6';
import { FaItalic } from 'react-icons/fa6';

const extensions = [StarterKit, Placeholder.configure({
  placeholder: 'Write your review here...',
})];

function MenuBar({ editor }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold') ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
      isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
      isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
      isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
    }),
  });

  const buttonClass = (isActive) =>
    `p-2 rounded-lg cursor-pointer text-emerald-50 hover:bg-emerald-950 ${
      isActive ? 'bg-emerald-700' : 'bg-emerald-900'
    }`;

  return (
    <div className="m-2">
      <div className="flex gap-1 flex-wrap">
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={buttonClass(editorState.isBold)}
        >
          <FaBold />
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={buttonClass(editorState.isItalic)}
        >
          <FaItalic />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
          className={buttonClass(editorState.isHeading3)}
        >
          H3
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().setHeading({ level: 4 }).run()}
          className={buttonClass(editorState.isHeading4)}
        >
          H4
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().setHeading({ level: 5 }).run()}
          className={buttonClass(editorState.isHeading5)}
        >
          H5
        </button>

        <button
          type='button'
          onClick={() => editor.chain().focus().setHeading({ level: 6 }).run()}
          className={buttonClass(editorState.isHeading6)}
        >
          H6
        </button>
      </div>
    </div>
  );
}

export default function TipTap({ onEditorReady, initialContent = ''}) {
  const editor = useEditor({
    extensions,
    content: initialContent,
  });

  useEffect(() => {
    if (editor) {
      onEditorReady?.(editor);
    }
  }, [editor, onEditorReady]);

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div className='border rounded-lg p-2'>
      <MenuBar editor={editor} />
      <div className='border border-gray-700 m-3'></div>
      <EditorContent className="p-4 m" editor={editor} />
    </div>
  );
}
