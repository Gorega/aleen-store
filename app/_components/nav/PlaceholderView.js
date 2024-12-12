"use client"

import styles from "../../_styles/Navbar.module.css";
import Image from "next/image";

export default function PlaceholderView({li}){
    return <div className={styles.placeholder}>
    <div className={styles.content}>
        <ul>
            {li?.sub?.map((li,index)=>{
                return <li key={index}>{li.title}</li>
            })}
        </ul>
        <div className={styles.views}>
            {li?.views?.map((view,index)=>{
                return <div key={index} className={styles.view}>
                            <div className={styles.image}>
                                <Image className={styles.img} src={view.logo} alt="image" width={300} height={300} />
                            </div>
                            <div className={styles.info}>
                                <h4>{view.title}</h4>
                                <p>{view.price}</p>
                            </div>
                        </div>
            })}
        </div>
    </div>
</div>
}