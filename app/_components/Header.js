"use client"

import styles from "../_styles/Header.module.css";
import makeupImg from "../../public/img/header_makeup.webp";
import hairImg from "../../public/img/header_hair.jpg";
import bodyImg from "../../public/img/header_body.jpg";
import { useEffect, useState } from "react";
import { useRouter } from "next-nprogress-bar";

export default function Header(){
    const router = useRouter();
    const [currentView,setCurrentView] = useState(0);
    const showViewHandler = (index)=>{
        setCurrentView(index)
    }

    const dashIcon = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path></svg>
    const views = [{
        backgroundImg:hairImg.src,
        title:"منتجات العناية بالشعر",
        link:"/collections/hair",
    },{
        backgroundImg:bodyImg.src,
        title:"منتجات العناية بالبشرة",
        link:"/collections/skin",
    },{
        backgroundImg:makeupImg.src,
        title:"منتجات الميك اب",
        link:"/collections/makeup",
    }]

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrentView(currentView => (currentView + 1) % views.length)
        },3000)

        return ()=> clearInterval(interval);
    },[])

    return <header className={styles.header} style={{backgroundImage:`url(${views[currentView].backgroundImg})`}}>
        <div className={styles.overlay}></div>
        <main className={styles.main}>
            <div className={styles.content}>
                <h2>{views[currentView].title}</h2>
                <button onClick={()=> router.push(views[currentView].link)}>تسوق الان</button>
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