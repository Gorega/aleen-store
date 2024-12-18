import { useEffect } from "react";

export default function Modal({children,closeModal,opacity}){

    const handleOutsideClick = (e)=>{
        if(e.target.classList.contains("modal")){
            closeModal();
            document.body.style.overflow = "auto"
        }
    }

    useEffect(()=>{
        document.body.style.overflow = "hidden"
    },[])
    
    return <div style={{backgroundColor:`rgba(0,0,0,${opacity})`}} className="modal" onClick={handleOutsideClick}>
       {children}
    </div>
}