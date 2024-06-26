
import {create} from 'zustand'

export type ModalType = "CreateServer"

interface ModalStore {

    type:ModalType | null,
    isOpen:boolean,
    onOpen:(type:ModalType) => void,
    onClose:()=> void
    
}

export const useModal = create<ModalStore>((set)=>{
  
    return {
        type:null,
        isOpen:false,
        onOpen: (type)=>set({isOpen:true, type}), // ask for the type before opening
        onClose:()=>set({type:null ,isOpen:false})
    }
    
})