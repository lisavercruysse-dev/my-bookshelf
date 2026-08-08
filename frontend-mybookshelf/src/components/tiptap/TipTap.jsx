import { EditorContent, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@tiptap/react';
import { Placeholder } from '@tiptap/extensions';
import { useEffect } from 'react';
import { FaBold, FaItalic } from 'react-icons/fa6';

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
    }),
  });

  const buttonClass = (isActive) =>
    `flex items-center justify-center h-8 w-8 rounded-lg cursor-pointer 
    font-display text-xs font-bold transition-colors
    ${isActive
        ? 'bg-main text-white'
        : 'bg-transparent text-gray-500 hover:bg-[#F3F6EE] hover:text-main'
    }`;

  return (
    <div className='flex items-center gap-1 flex-wrap pb-2 mb-3 border-b border-black/5'>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={buttonClass(editorState.isBold)}
      >
        <FaBold size={13} />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={buttonClass(editorState.isItalic)}
      >
        <FaItalic size={13} />
      </button>

    </div>
  );
}

export default function TipTap({ onEditorReady, initialContent = '' }) {
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
    <div className='bg-white p-4 rounded-2xl shadow-sm border border-black/5
      focus-none
      transition-shadow'>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
      />
    </div>
  );
}