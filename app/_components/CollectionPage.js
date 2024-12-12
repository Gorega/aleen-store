"use client";

import styles from "../_styles/CollectionPage.module.css";
import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import List from "./List";

export default function Collection({products,sections,section}){
    const router = useRouter();
    const searchParams = useSearchParams();
    const listRef = useRef(null);
    const moveAmount = 250;
    const [listViewOrder,setListViewOrder] = useState("");
    const [filteredProducts,setFilteredProducts] = useState(products);
    const orderList = [{
        name:"list",
        view:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.41 34.69"><rect width="10.09" height="10.09"></rect><rect y="12.3" width="10.09" height="10.09"></rect> <rect y="24.61" width="10.09" height="10.09"></rect> <rect x="12.16" width="10.09" height="10.09"></rect> <rect x="12.16" y="12.3" width="10.09" height="10.09"></rect> <rect x="12.16" y="24.61" width="10.09" height="10.09"></rect> <rect x="24.32" width="10.09" height="10.09"></rect> <rect x="24.32" y="12.3" width="10.09" height="10.09"></rect> <rect x="24.32" y="24.61" width="10.09" height="10.09"></rect> </svg>,
    },{
        name:"forthView",
        view:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.57 34.69"><rect width="10.09" height="10.09"></rect> <rect y="12.3" width="10.09" height="10.09"></rect> <rect y="24.61" width="10.09" height="10.09"></rect> <rect x="12.16" width="10.09" height="10.09"></rect> <rect x="12.16" y="12.3" width="10.09" height="10.09"></rect> <rect x="12.16" y="24.61" width="10.09" height="10.09"></rect> <rect x="24.32" width="10.09" height="10.09"></rect> <rect x="24.32" y="12.3" width="10.09" height="10.09"></rect> <rect x="24.32" y="24.61" width="10.09" height="10.09"></rect> <rect x="36.48" width="10.09" height="10.09"></rect> <rect x="36.48" y="12.3" width="10.09" height="10.09"></rect> <rect x="36.48" y="24.61" width="10.09" height="10.09"></rect> </svg>,
    },{
        name:"fifthView",
        view:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.73 34.69"><rect width="10.09" height="10.09"></rect><rect y="12.3" width="10.09" height="10.09"></rect><rect y="24.61" width="10.09" height="10.09"></rect><rect x="12.16" width="10.09" height="10.09"></rect><rect x="12.16" y="12.3" width="10.09" height="10.09"></rect><rect x="12.16" y="24.61" width="10.09" height="10.09"></rect><rect x="24.32" width="10.09" height="10.09"></rect><rect x="24.32" y="12.3" width="10.09" height="10.09"></rect><rect x="24.32" y="24.61" width="10.09" height="10.09"></rect><rect x="36.48" width="10.09" height="10.09"></rect><rect x="36.48" y="12.3" width="10.09" height="10.09"></rect><rect x="36.48" y="24.61" width="10.09" height="10.09"></rect><rect x="48.64" width="10.09" height="10.09"></rect><rect x="48.64" y="12.3" width="10.09" height="10.09"></rect><rect x="48.64" y="24.61" width="10.09" height="10.09"></rect></svg>,
    },{
        name:"tableView",
        view:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.73 34.69"><rect width="10.09" height="10.09"></rect><rect y="12.3" width="10.09" height="10.09"></rect><rect y="24.61" width="10.09" height="10.09"></rect><rect x="12.16" y="3.91" width="46.57" height="2.26"></rect><rect x="12.16" y="16.22" width="46.57" height="2.26"></rect><rect x="12.16" y="28.52" width="46.57" height="2.26"></rect></svg>,
    }]

    const moveToRightHandler = ()=>{
        listRef.current.scrollBy({
            left:+moveAmount,
            behavior:"smooth"
        })
    }

    const moveToLeftHanlder = ()=>{
        listRef.current.scrollBy({
            left:-moveAmount,
            behavior:"smooth"
        })
    }

    const updateQueryString = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value); // Add or update the query parameter
        } else {
            params.delete(key); // Remove query if value is null
        }

        router.push(`?${params.toString()}`,{scroll:false});
    };

    const filterHandler = async (e)=>{
        const response = await fetch(`/api/products/${section.section}?sort_by=${e.target.value}`);
        const data = await response.json();
        setFilteredProducts(data);
        updateQueryString("sort_by",e.target.value)
    }


    return <div className={`${styles.collection} container`}>
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
                <button className={styles.leftArrow} onClick={moveToLeftHanlder}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg></button>
            </div>
        </div>
        <div className={styles.filter}>
            <div className={styles.symbol}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Filter"><path d="M14.037,20.937a1.015,1.015,0,0,1-.518-.145l-3.334-2a2.551,2.551,0,0,1-1.233-2.176V12.091a1.526,1.526,0,0,0-.284-.891L4.013,4.658a1.01,1.01,0,0,1,.822-1.6h14.33a1.009,1.009,0,0,1,.822,1.6h0L15.332,11.2a1.527,1.527,0,0,0-.285.891v7.834a1.013,1.013,0,0,1-1.01,1.012ZM4.835,4.063,9.482,10.62a2.515,2.515,0,0,1,.47,1.471v4.524a1.543,1.543,0,0,0,.747,1.318l3.334,2,.014-7.843a2.516,2.516,0,0,1,.471-1.471l4.654-6.542,0,0Z"></path></g></svg> فلتر
            </div>
            <div className={styles.order}>
                <ul>
                    {orderList?.map((li,index)=>{
                        return <li key={index} onClick={()=> {
                            setListViewOrder(li.name)
                        }}>{li.view}</li>
                    })}
                </ul>
                <div className={styles.more}>
                    <select onChange={filterHandler}>
                    <option value="created_at">الأحدث</option>
                    <option value="">الاكثر مبيعا</option>
                    <option value="title">ابجدي من أ - ي</option>
                    <option value="-title">ابجدي من ي - أ</option>
                    <option value="price">السعر, من الاقل الى الاعلى</option>
                    <option value="-price">السعر, من الاعلى الى الاقل</option>
                    <option value="created_at">التاريخ, من القديم الى الجديد</option>
                    <option value="-created_at">التاريخ, من الجديد الى القديم</option>
                    </select>
                </div>
            </div>
        </div>
        <List products={filteredProducts} listViewOrder={listViewOrder} />
    </div>
}