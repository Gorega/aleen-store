"use client";

import { useRouter } from "next-nprogress-bar";
import styles from "../_styles/List.module.css";
import Item from "./Item";

export default function List({products,listViewOrder,link}){
    const router = useRouter();

    return <>
        <div className={`${styles.list} ${listViewOrder ? styles[listViewOrder] : ""}`}>
            {products?.map((product,index)=>{
                return <Item key={index} content={product} tableShape={listViewOrder === "tableView"} />
            })}
        </div>
        {products?.length > 3 && <div className={styles.more}>
                <button onClick={()=> router.push(link)}>عرض المزيد</button>
        </div>}
    </>
}