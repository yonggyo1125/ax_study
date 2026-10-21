'use client';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    FiBold,
    FiCode,
    FiItalic,
    FiList,
    FiRotateCcw,
    FiRotateCw,
} from 'react-icons/fi';
import { cn } from '../utils/cn';

interface TiptabEditorProps {
    content?: string;
    placeholder?: string;
    onChange?: (html: string) => void;
    className?: string;
}

export default function TiptabEditor({
    content = '<p>내용을 입력하세요...</p>',
    placeholder = '내용을 작성하세요.',
    onChange,
    className,
}: TiptabEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        immediatelyRender: false, // Next.js SSR 환경에서 Hydration mismatch 방지 핵심 옵션
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'min-h-[180px] border border-zinc-200 rounded-b-md outline-none focus:ring-1 focus:ring-blue-500',
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div
            className={cn(
                'overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors focus-within:border-blue-600',
                className,
            )}
        >
            {/* 상단 서식 툴바 */}
            <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 bg-gray-50/70 p-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                        'rounded-lg p-2 text-xs font-semibold text-gray-600 hover:bg-white hover:text-gray-900',
                        editor.isActive('bold') &&
                            'bg-white text-blue-600 shadow-sm',
                    )}
                >
                    <FiBold className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                        'rounded-lg p-2 text-xs font-semibold text-gray-600 hover:bg-white hover:text-gray-900',
                        editor.isActive('italic') &&
                            'bg-white text-blue-600 shadow-sm',
                    )}
                >
                    <FiItalic className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={cn(
                        'rounded-lg p-2 text-xs font-semibold text-gray-600 hover:bg-white hover:text-gray-900',
                        editor.isActive('bulletList') &&
                            'bg-white text-blue-600 shadow-sm',
                    )}
                >
                    <FiList className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    className={cn(
                        'rounded-lg p-2 text-xs font-semibold text-gray-600 hover:bg-white hover:text-gray-900',
                        editor.isActive('codeBlock') &&
                            'bg-white text-blue-600 shadow-sm',
                    )}
                    aria-label="코드 블록"
                >
                    <FiCode className="h-3.5 w-3.5" />
                </button>
                <div className="mx-1 h-4 w-px bg-gray-200" />
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="rounded-lg p-2 text-xs text-gray-600 hover:bg-white disabled:opacity-30"
                    aria-label="실행 취소"
                >
                    <FiRotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="rounded-lg p-2 text-xs text-gray-600 hover:bg-white disabled:opacity-30"
                    aria-label="다시 실행"
                >
                    <FiRotateCw className="h-3.5 w-3.5" />
                </button>
            </div>
            {/* 에디터 본문 영역 */}
            <EditorContent editor={editor} />
        </div>
    );
}
