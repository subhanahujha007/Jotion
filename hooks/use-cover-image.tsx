import { create } from "zustand";
type coverimagestore={
    url?:string;
    isopen:boolean;
    onOpen:()=>void;
    onclose:()=>void;
    onReplace:(url:string)=>void;
};
export const useCoverimageStore=create<coverimagestore>((set)=>({
    isopen:false,
    onOpen:()=>set({isopen:true,url:undefined}),
    onclose:()=>set({isopen:false,url:undefined}),
    onReplace:(url:string)=>set({isopen:true,url})
}));