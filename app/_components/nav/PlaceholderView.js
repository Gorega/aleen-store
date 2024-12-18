"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../_styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";

export default function PlaceholderView({li}){
    const router = useRouter();
    const array = Array.from({length:3})
    const [views,setViews] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchViews = async ()=>{
            setLoading(true)
            const response = await fetch(`/api/products?section=${li.section}`);
            const data = await response.json();
            setViews(data);
            setLoading(false)
        }
        fetchViews();
    },[])

    return <div className={styles.placeholder}>
    <div className={styles.content}>
        <ul>
            {li?.sub?.map((item,index)=>{
                return <Link key={index} href={`/collections/${li.section}`}><li>{item.title}</li></Link>
            })}
        </ul>
        {loading
        ?
        <div className={styles.spinner}>
            {array?.map((_,index)=>{
                return <div key={index} className={styles.view}>
                            <div className={styles.image}></div>
                            <div className={styles.info}>
                                <h4></h4>
                                <p></p>
                            </div>
                        </div>
            })}
        </div>
        :
        <div className={styles.views}>
            {views?.slice(0,3).map((view,index)=>{
                return <div key={index} className={styles.view} onClick={()=> {
                    router.push(`/collections/${view.section}/products/${view._id}`)
                }}>
                            <div className={styles.image}>
                                <Image className={styles.img} src={view.views[0]} alt={view.title} width={300} height={300} />
                            </div>
                            <div className={styles.info}>
                                <h4>{view.title}</h4>
                                <p>{view.price} شيكل</p>
                            </div>
                        </div>
            })}
        </div>}
    </div>
</div>
}