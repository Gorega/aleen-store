"use client"

import styles from "../_styles/Header.module.css";
import BodyCareImg from "../../public/body-care-header-background.jpg";
import FaceCareImg from "../../public/face-care-header-background.jpg";
import MakeupImg from "../../public/makeup-header-background.jpg";
import { useState } from "react";

export default function Header(){
    const [currentView,setCurrentView] = useState(0);
    const showViewHandler = (index)=>{
        setCurrentView(index)
    }

    const dashIcon = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path></svg>
    const views = [{
        backgroundImg:BodyCareImg.src,
        title:"منتجات العناية بالجسم",
        link:"/"
    },{
        backgroundImg:FaceCareImg.src,
        title:"منتجات العناية بالبشرة",
        link:"/"
    },{
        backgroundImg:MakeupImg.src,
        title:"منتجات الميك اب",
        link:"/"
    }]

    return <header className={styles.header} style={{backgroundImage:`url(${views[currentView].backgroundImg})`}}>
        <div className={styles.overlay}></div>
        <main className={styles.main}>
            <div className={styles.content}>
                <h2>{views[currentView].title}</h2>
                <button>تسوق الان</button>
            </div>
            <div className={styles.pages}>
                <ul>
                    {views?.map((_,index)=>{
                        return <li key={index} className={index === currentView ? styles.active : ""} onClick={()=> showViewHandler(index)}>{dashIcon}</li>
                    })}
                </ul>
            </div>
        </main>
    </header>
}