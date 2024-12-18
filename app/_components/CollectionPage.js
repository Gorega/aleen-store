"use client";

import styles from "../_styles/CollectionPage.module.css";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import Filter from "./Filter";
import Link from "next/link";
import List from "./List";

export default function Collection({products,sections,section}){
    const router = useRouter();
    const listRef = useRef(null);
    const scrollAmount = 250;
    const [listViewOrder,setListViewOrder] = useState("");
    const [filteredProducts,setFilteredProducts] = useState(products);

    const moveToRightHandler = ()=>{
        if(listRef.current) {
            listRef.current.scrollLeft += scrollAmount;
          }
    }

    const moveToLeftHandler = () => {
        if(listRef.current) {
            listRef.current.scrollLeft -= scrollAmount;
        }
    }


    return <div className={styles.collection}>
        <h2>{section.title}</h2>
        <span><Link href="/">الرئيسية</Link> /  {section.title}</span>
        <div className={styles.sections}>
            <div className={styles.tags}>
                <button className={styles.rightArrow} onClick={moveToRightHandler}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg></button>
                <ul className={styles.list} ref={listRef}>
                    {sections?.map((li,index)=>{
                        return <li key={index} onClick={()=> router.push(`/collections/${li.section}`)}>{li.title}</li>
                     })}
                </ul>
                <button className={styles.leftArrow} onClick={moveToLeftHandler}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg></button>
            </div>
        </div>
        {products.length <= 0
        ?
        <div className={styles.empty}>
            لا يوجد اي منتجات حاليا...
        </div>
        :
        <>
        <Suspense>
             <Filter section={section} setListViewOrder={setListViewOrder} setFilteredProducts={setFilteredProducts} sortBy={true} />
        </Suspense>
        <List products={filteredProducts} listViewOrder={listViewOrder} />
        </>}
    </div>
}