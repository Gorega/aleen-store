export default function Modal({children,closeModal,opacity}){

    const handleOutsideClick = (e)=>{
        if(e.target.classList.contains("modal")){
            closeModal();
        }
    }
    
    return <div style={{backgroundColor:`rgba(0,0,0,${opacity})`}} className="modal" onClick={handleOutsideClick}>
        {children}
    </div>
}