"use client"

import { useRouter } from "next-nprogress-bar";
import styles from "../_styles/Sections.module.css";
import Image from "next/image";

export default function Sections({storeMenu}){

    const router = useRouter();
    
    return <main className={styles.main}>
        <h2>الأقسام</h2>
        <div className={styles.sections}>
            {storeMenu?.map((li,index)=>{
                return <div className={styles.section} key={index} onClick={()=> router.push(`/collections/${li.section}`)}>
                        <div className={styles.image}>
                            <Image className={styles.img} src={li.logo} width={300} height={300} alt="image" />
                        </div>
                         <h3>{li.title}</h3>
                    </div>
            })}
        </div>
    </main>
}