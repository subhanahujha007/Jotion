"use client"
import React, { useState } from 'react'
import "@blocknote/core/style.css"
import { useTheme } from 'next-themes'
import { Block } from '@blocknote/core'
import {
    BlockNoteEditor,
    filterSuggestionItems,
    PartialBlock,
  } from "@blocknote/core";
  import "@blocknote/core/fonts/inter.css";
  import {
    DefaultReactSuggestionItem,
    getDefaultReactSlashMenuItems,
    SuggestionMenuController,
  } from "@blocknote/react";
  import { BlockNoteView } from "@blocknote/mantine";
  import "@blocknote/mantine/style.css";
  import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useEdgeStore } from '@/lib/edgestore';
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";
 
import { BlueButton } from "./BlueButton";

 
interface EditorProps {
    editable?: boolean;
    initialContent?: string;
    
    onChange?: (value:string) => void;
}
const getCustomSlashMenuItems = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem[] => [
    ...getDefaultReactSlashMenuItems(editor),
    insertHelloWorldItem(editor),
  ];
  const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
    title: "Insert Hello World",
    onItemClick: () => {
      // Block that the text cursor is currently in.
      const currentBlock = editor.getTextCursorPosition().block;
   
      // New block we want to insert.
      const helloWorldBlock: PartialBlock = {
        type: "paragraph",
        content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
      };
   
      // Inserting the new block after the current one.
      editor.insertBlocks([helloWorldBlock], currentBlock, "after");
    },
    aliases: ["helloworld", "hw"],
    group: "Other",
    icon: <HiOutlineGlobeAlt size={18} />,
    subtext: "Used to insert a block with 'Hello World' below.",
  })

const Editor =({onChange,editable,initialContent}:EditorProps)=> {
   const {resolvedTheme}=useTheme()
   const {edgestore}=useEdgeStore()
  const uploadFile=async(file:File)=>{
    const response=await edgestore.publicFiles.upload({
        file
    })
    return response.url
  }
    const editor:BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile,
    });

   
    return (
        <div>
            <BlockNoteView editor={editor} editable={editable} 
            theme={resolvedTheme==="dark"?"dark":"light"}
             onChange={()=>onChange!(JSON.stringify(editor.document,null,2))}
            >
                
                  <SuggestionMenuController
        triggerCharacter={"/"}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
        <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <BlockTypeSelect key={"blockTypeSelect"} />
 
            {/* Extra button to toggle blue text & background */}
            <BlueButton key={"customButton"} />
 
            <FileCaptionButton key={"fileCaptionButton"} />
            <FileReplaceButton key={"replaceFileButton"} />
 
            <BasicTextStyleButton
              basicTextStyle={"bold"}
              key={"boldStyleButton"}
            />
            <BasicTextStyleButton
              basicTextStyle={"italic"}
              key={"italicStyleButton"}
            />
            <BasicTextStyleButton
              basicTextStyle={"underline"}
              key={"underlineStyleButton"}
            />
            <BasicTextStyleButton
              basicTextStyle={"strike"}
              key={"strikeStyleButton"}
            />
            {/* Extra button to toggle code styles */}
            <BasicTextStyleButton
              key={"codeStyleButton"}
              basicTextStyle={"code"}
            />
 
            <TextAlignButton
              textAlignment={"left"}
              key={"textAlignLeftButton"}
            />
            <TextAlignButton
              textAlignment={"center"}
              key={"textAlignCenterButton"}
            />
            <TextAlignButton
              textAlignment={"right"}
              key={"textAlignRightButton"}
            />
 
            <ColorStyleButton key={"colorStyleButton"} />
 
            <NestBlockButton key={"nestBlockButton"} />
            <UnnestBlockButton key={"unnestBlockButton"} />
 
            <CreateLinkButton key={"createLinkButton"} />
          </FormattingToolbar>
        )}
      />
        </BlockNoteView>
        </div>
    );
};

export default Editor;
