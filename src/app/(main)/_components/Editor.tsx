"use client"
import React, { useEffect } from 'react'
import "@blocknote/core/style.css"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { BlockNoteViewRaw, useCreateBlockNote } from "@blocknote/react"

interface EditorProps {
    editable?: boolean;
    initialContent?: string;
    onChange?: (value: string) => void;
}

const Editor = ({ onChange, initialContent, editable  }: EditorProps) => {
    const editor:BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        editable
    });

   
    return (
        <div>
            <BlockNoteViewRaw editor={editor} />
        </div>
    );
};

export default Editor;
