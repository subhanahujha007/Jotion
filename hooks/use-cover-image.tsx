import { create } from "zustand";
type coverimagestore={
    isopen:boolean;
    onOpen:()=>void;
    onclose:()=>void;
};
export const useCoverimageStore=create<coverimagestore>((set)=>({
    isopen:false,
    onOpen:()=>set({isopen:true}),
    onclose:()=>set({isopen:false})
}));