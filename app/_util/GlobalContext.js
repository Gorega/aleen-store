"use client"

import { createContext, useState } from "react";
import CompareView from "../_components/CompareView";

export const ContextApi = createContext();

export default function GlobalContext({children}){
    const [modal,setModal] = useState({status:false,type:null});
    const [compareProducts,setCompareProducts] = useState([]);
    const [trackChanges,setTrackChanges] = useState(null);


    const getLocalStorageItems = (name,setItems)=>{
        const items = JSON.parse(localStorage.getItem(name) || "[]");
        setItems(items)
    }

    const localStorageHandler = (name,item,id)=>{
        const existedData = JSON.parse(localStorage.getItem(name) || "[]");
        const duplicateItem = existedData.some(item => item.id === id)
        if(!duplicateItem){
            const updatedCartItems = [...existedData,item]
            localStorage.setItem(name,JSON.stringify(updatedCartItems))
        }
    }

    const addToCartHandler = (product,quantity)=>{
        const item = {
            id:product._id,
            image:product.views[0],
            title:product.title,
            price:product.price,
            quantity:quantity || 1,
        }
    
        localStorageHandler("cart",item,product._id);
        setModal({status:true,type:"CART"})
        setTrackChanges({type:"ADD_TO_CART"})
    }

    const addToFavouriteHandler = (product)=>{
        const item = {
            id:product._id,
            image:product.views[0],
            title:product.title,
            price:product.price,
        }
    
        localStorageHandler("favourite",item,product._id);
        setModal({status:true,type:"FAVOURITE"})
        setTrackChanges({type:"ADD_TO_FAVOURITE"})
    }

    const removeFormCartHandler = (id)=>{
        const items = JSON.parse(localStorage.getItem("cart"));
        const newItems = items.filter((item)=> item.id !== id);
        localStorage.setItem("cart",JSON.stringify(newItems));
        setTrackChanges({type:"REMOVE_FROM_CART"})
    } 

    const removeFormFavouriteHandler = (id)=>{
        const items = JSON.parse(localStorage.getItem("favourite"));
        const newItems = items.filter((item)=> item.id !== id);
        localStorage.setItem("favourite",JSON.stringify(newItems));
        setTrackChanges({type:"REMOVE_FROM_FAVOURITE"})
    } 

    const checkIsFavourite = (id)=>{
        const items = JSON.parse(localStorage.getItem("favourite") || "[]");
        const exist = items.some((item)=> item.id === id);
        return exist;
    }

    const checkIsInCart = (id)=>{
        const items = JSON.parse(localStorage.getItem("cart") || "[]");
        const exist = items.some((item)=> item.id === id);
        return exist;
    }

    const addToCompareProductsHandler = (product)=>{
        const checkProducts = compareProducts.some(item => item._id === product._id);
        if(!checkProducts){
            setCompareProducts(products => [...products,product])
        }
        setModal({status:true,type:"COMPARE_VIEW"})
    }


    return <ContextApi.Provider value={{
        getLocalStorageItems,
        modal,
        setModal,
        addToCartHandler,
        addToFavouriteHandler,
        checkIsFavourite,
        checkIsInCart,
        removeFormCartHandler,
        removeFormFavouriteHandler,
        compareProducts,
        setCompareProducts,
        addToCompareProductsHandler,
        trackChanges
    }}>
        {modal.type === "COMPARE_VIEW" && <CompareView />}
        {children}
    </ContextApi.Provider>
}