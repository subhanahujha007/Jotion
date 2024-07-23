"use client"

import { useTheme,ThemeProvider } from "next-themes";
import EmojiPicker, {Theme} from "emoji-picker-react"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
interface iconpickerprops{
    onchange:(icon:string)=>void;
    children:React.ReactNode;
    aschild?:boolean
}

export const Iconpicker=({
    onchange,
    children,
    aschild
}:iconpickerprops)=>{
const {resolvedTheme}=useTheme()
const currtheme=(resolvedTheme || "light") as keyof typeof themeMap
const themeMap={
    "dark":Theme.DARK,
    "light":Theme.LIGHT,
    "Auto":Theme.AUTO
}
const theme=themeMap[currtheme]
return(
    <Popover>
        <PopoverTrigger asChild={aschild}>
{children}
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full border-none shadow-none">
<EmojiPicker
height={350}
theme={theme}
onEmojiClick={(data)=>{onchange(data.emoji)}}
/>
        </PopoverContent>
    </Popover>
) 
}