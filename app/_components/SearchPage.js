"use client";

import { useEffect, useState } from "react";
import styles from "../_styles/SearchPage.module.css";
import List from "./List";
import Filter from "./Filter";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSearchParams } from "next/navigation";
import UpdateQueryString from "../_util/UpdateQueryString";

export default function SearchPage(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchValue,setSearchValue] = useState(null);
    const [searchedProducts,setSearchedProducts] = useState([]);
    const [listViewOrder,setListViewOrder] = useState("");
    const [loading,setLoading] = useState(false);
    const searchParamsValue = searchParams.get("name");


    const searchHandler = async (name)=>{
        setLoading(true)
        const response = await fetch(`/api/products?title=${name}`);
        const data = await response.json();
        setSearchedProducts(data);
        setLoading(false);
    }

    const clearSearchHandler = ()=>{
        setSearchedProducts([])
        router.push(pathname)
    }

    useEffect(()=>{
        searchHandler(searchParamsValue)
    },[searchParamsValue])

    return <div className={styles.search}>
        <div className={styles.head}>
            {searchedProducts.length <= 0
            ?
            "ابحث عبر متجرنا"
            :
            <div className={styles.found}>
                <span>{searchedProducts.length} نتائح البحث عن &quot;{searchValue || searchParamsValue}&quot;</span>
                <button onClick={clearSearchHandler}>البحث من جديد</button>
            </div>}
        </div>
        {loading ? <div className={styles.suspense}> الرجاء الانتظار ...</div> : searchedProducts.length <= 0
        ?
        <div className={styles.searchBar}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" id="search" x="0px" y="0px" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
            c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
            M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
            z"></path></g></svg>
            <input type="search" name="search" placeholder="بحث" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    searchHandler(searchValue)
                    UpdateQueryString("name",searchValue)
                }
            }} />
        </div>
        :
        <>
            <Filter setListViewOrder={setListViewOrder} setFilteredProducts={setSearchedProducts} sortBy={false}  />
            <List products={searchedProducts} listViewOrder={listViewOrder} />
        </>}
    </div>
}