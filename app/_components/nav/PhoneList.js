"use client"

import { useState } from "react";
import styles from "../../_styles/Navbar.module.css";
import Modal from "../Modal";
import { useRouter } from "next/navigation";


export default function PhoneList({list,closeModal}){
    const router = useRouter();
    const [subMenuIndex,setSubMenuIndex] = useState(null)
    const [showSubMenu,setShowSubMenu] = useState(false);

    const showSubMenuHandler = (index)=>{
        setSubMenuIndex(index)
        setShowSubMenu(!showSubMenu)
    }

    return <Modal closeModal={closeModal}>
        <div className={styles.phoneList}>
            <h3>القائمة</h3>
            <ul>
                {list?.map((li,index)=>{
                    return <li key={index} onClick={()=> {
                        if(li.sub.length > 0){
                            showSubMenuHandler(index)
                        }else{
                            router.push(`/collections/${li.section}`)
                            closeModal();
                        }
                    }}>
                    {li.title} {li.sub?.length > 0 && <span className={(showSubMenu && subMenuIndex === index) ? styles.active : ""}>+</span>}
                    {(li.sub?.length > 0 && subMenuIndex === index && showSubMenu)
                    &&
                    <ul className={`${styles.submenu} ${showSubMenu ? styles.active : ""}`}>
                        {li.sub?.map((item,index)=>{
                            return <li key={index} onClick={()=>{
                                router.push(`/collections/${li.section}`);
                                closeModal();
                            }}>{item.title}</li>
                        })}
                    </ul>
                    }
            </li>
                })}
                <li style={{borderBottom:"none"}}>
                    <svg
                        stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" id="search" x="0px" y="0px" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
                        c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
                        M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
                        z"></path></g>
                    </svg>
                    بحث 
                </li>
                <li style={{borderBottom:"none"}}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Shopping_Cart"><path d="M17.437,19.934c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Zm-11.217,-4.266l-0.945,-10.9c-0.03,-0.391 -0.356,-0.693 -0.749,-0.693l-0.966,-0c-0.276,-0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5l0.966,-0c0.916,-0 1.676,0.704 1.746,1.617l0.139,1.818l13.03,-0c0.885,-0 1.577,0.76 1.494,1.638l-0.668,7.52c-0.121,1.285 -1.199,2.267 -2.489,2.267l-9.069,0c-1.29,0 -2.367,-0.981 -2.489,-2.267Zm0.274,-8.158l0.722,8.066c0.073,0.77 0.719,1.359 1.493,1.359l9.069,0c0.774,0 1.42,-0.589 1.493,-1.359l0.668,-7.518c0.028,-0.294 -0.203,-0.548 -0.498,-0.548l-12.947,-0Zm4.454,12.424c-0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Z"></path></g></svg>عربة التسوق</li>
            </ul>
            <div className={styles.close} onClick={closeModal}>
                x
            </div>
        </div>
    </Modal>
}