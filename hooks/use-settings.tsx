import {create} from "zustand"
type Settingstore={
    onopen:boolean,
    isopen:()=>void,
    isclose:()=>void
} 


export const Usersetting=create<Settingstore>((set)=>({
    onopen:false,
    isopen:()=>set({onopen:true}),
    isclose:()=>set({onopen:false})
}))