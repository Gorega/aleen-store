"use client"

import PhoneList from "./PhoneList";
import styles from "../../_styles/Navbar.module.css";
import PlaceholderView from "./PlaceholderView";
import CartView from "./cartModal/CartView";
import SearchView from "./SearchView";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { ContextApi } from "@/app/_util/GlobalContext";


export default function Navbar({storeMenu}){
    const router = useRouter();
    const path = usePathname();
    const {modal,setModal,getLocalStorageItems,trackChanges} = useContext(ContextApi);
    const [currentPlaceholderView,setCurrentPlaceholderView] = useState(null);
    const [cartItems,setCartItems] = useState([]);
    const [favouriteItems,setFavouriteItems] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchValue,setSearchValue] = useState("");
    const [searchedProducts,setSearchedProducts] = useState([]);

    const showPhoneListHandler = ()=>{
        setModal({status:true,type:"PHONE_LIST"})
    }
    const closeModalHandler = ()=>{
        setModal({status:false,type:null})
        document.body.style.overflow = "auto"
    }

    const showPlaceholderViewHanlder = (index)=>{
        setCurrentPlaceholderView(index)
    }

    const searchBarHandler = (e)=>{
        setSearchValue(e.target.value);
        fetchSearchedProducts(e.target.value);
    }

    const fetchSearchedProducts = async(title)=>{
        setLoading(true)
        const response = await fetch(`/api/products?title=${title}`);
        const data = await response.json();
        setSearchedProducts(data);
        setLoading(false);
    }

    useEffect(()=>{

        getLocalStorageItems("cart",setCartItems);
        getLocalStorageItems("favourite",setFavouriteItems);

    },[trackChanges,modal])


    return <div className={styles.navbar} onMouseLeave={()=> setCurrentPlaceholderView(null)}>
    <nav className={`${styles.nav} ${path === "/" ? styles.transparent : ""}`}>
        <div className={styles.logo} onClick={()=> router.push("/")}>
            Aleen Store
        </div>
        <div className={styles.list}>
            <ul>
                {storeMenu?.map((li,index)=>{
                    return <li key={index} onMouseOver={()=> showPlaceholderViewHanlder(index)}>
                                <Link href={`/collections/${li.section}`}>{li.title}</Link>
                                {li.sub.length > 0 && <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg></span>}
                                {(li.sub.length > 0 && currentPlaceholderView === index) && <PlaceholderView li={storeMenu[currentPlaceholderView]} />}
                            </li>
                })}
            </ul>
        </div>
        <div className={styles.phoneListButton}>
            <span onClick={showPhoneListHandler}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg></span>
            {modal.type === "PHONE_LIST" && <PhoneList list={storeMenu} closeModal={closeModalHandler} />}
        </div>
        <div className={styles.searchBar}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" id="search" x="0px" y="0px" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
            c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
            M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
            z"></path></g></svg>
            <input name="search" type="search" placeholder="بحث عن منتجات" value={searchValue} onChange={searchBarHandler} onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    router.push(`/search?name=${searchValue}`)
                    setSearchValue("")
                }
            }} />
            {searchValue && <SearchView products={searchedProducts} loading={loading} searchValue={searchValue} setSearchValue={setSearchValue} />}
        </div>
        <div className={styles.control}>
            <ul>
                <li onClick={()=> setModal({status:true,type:"CART"})}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Shopping_Cart"><path d="M17.437,19.934c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Zm-11.217,-4.266l-0.945,-10.9c-0.03,-0.391 -0.356,-0.693 -0.749,-0.693l-0.966,-0c-0.276,-0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5l0.966,-0c0.916,-0 1.676,0.704 1.746,1.617l0.139,1.818l13.03,-0c0.885,-0 1.577,0.76 1.494,1.638l-0.668,7.52c-0.121,1.285 -1.199,2.267 -2.489,2.267l-9.069,0c-1.29,0 -2.367,-0.981 -2.489,-2.267Zm0.274,-8.158l0.722,8.066c0.073,0.77 0.719,1.359 1.493,1.359l9.069,0c0.774,0 1.42,-0.589 1.493,-1.359l0.668,-7.518c0.028,-0.294 -0.203,-0.548 -0.498,-0.548l-12.947,-0Zm4.454,12.424c-0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Z"></path></g></svg>
                    <span>{cartItems.length}</span>
                </li>
                <li onClick={()=> setModal({status:true,type:"FAVOURITE"})}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Heart"><path d="M12,20.043a.977.977,0,0,1-.7-.288L4.63,13.08A5.343,5.343,0,0,1,6.053,4.513,5.266,5.266,0,0,1,12,5.371a5.272,5.272,0,0,1,5.947-.858A5.343,5.343,0,0,1,19.37,13.08l-6.676,6.675A.977.977,0,0,1,12,20.043ZM8.355,4.963A4.015,4.015,0,0,0,6.511,5.4,4.4,4.4,0,0,0,4.122,8.643a4.345,4.345,0,0,0,1.215,3.73l6.675,6.675,6.651-6.675a4.345,4.345,0,0,0,1.215-3.73A4.4,4.4,0,0,0,17.489,5.4a4.338,4.338,0,0,0-4.968.852h0a.744.744,0,0,1-1.042,0A4.474,4.474,0,0,0,8.355,4.963Z"></path></g></svg>
                    <span>{favouriteItems.length}</span>
                </li>
                {modal.type === "CART" && <CartView closeModal={closeModalHandler} items={cartItems} />}
                {modal.type === "FAVOURITE" && <CartView closeModal={closeModalHandler} items={favouriteItems} />}
            </ul>
        </div>
    </nav>
</div>
}