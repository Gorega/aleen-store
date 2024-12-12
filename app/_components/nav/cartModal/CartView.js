"use client"

import styles from "../../../_styles/Navbar.module.css";
import Modal from "../../Modal";
import Form from "./Form";
import {useContext, useState } from "react";
import { ContextApi } from "@/app/_util/GlobalContext";
import Item from "./Item";
import { useRouter } from "next/navigation";

export default function CartView({closeModal,items}){
    const router = useRouter();
    const [showForm,setShowForm] = useState({status:false,type:null})
    const {modal,setModal} = useContext(ContextApi);
    const [quantities, setQuantities] = useState({});


    const closeFormHandler = ()=>{
        setShowForm({status:false,type:null})
    }

    const switchBetweenTags = (type)=>{
        setModal({type})
    }

    // Callback to update quantity from child components
    const updateQuantity = (id, quantity) => {
        setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: quantity,
        }));

        // remove the item that its quantity has been updated
        const newProducts = items.filter(item => item.id !== id);

        // return the item that has been just removed
        const product = items.find(item => item.id === id);

        // create new list of array that return all the products and add the updated item and update its qunatity
        const newItems = ([...newProducts,{...product,quantity}]);
        
        return localStorage.setItem("cart",JSON.stringify(newItems))
    };

    const itemsTotalPriceHandler = ()=>{
        const total = items.reduce((total,item) => {
            return total + item.price * (quantities[item.id] || item.quantity);
        },0)
        return total;
    }

    return <Modal closeModal={closeModal}>
        <div className={styles.cart}>
            <div className={styles.top}>
                <div className={styles.head}>
                    <h3>
                        {modal.type === "CART" && "عربة المشتريات"}
                        {modal.type === "FAVOURITE" && "قائمة الامنيات"} 
                    </h3>
                    <button onClick={closeModal}>x</button>
                </div>
                <div className={styles.menu}>
                    <ul>
                        <li onClick={()=> switchBetweenTags("CART")} className={modal.type === "CART" ? styles.active : ""}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Shopping_Cart"><path d="M17.437,19.934c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Zm-11.217,-4.266l-0.945,-10.9c-0.03,-0.391 -0.356,-0.693 -0.749,-0.693l-0.966,-0c-0.276,-0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5l0.966,-0c0.916,-0 1.676,0.704 1.746,1.617l0.139,1.818l13.03,-0c0.885,-0 1.577,0.76 1.494,1.638l-0.668,7.52c-0.121,1.285 -1.199,2.267 -2.489,2.267l-9.069,0c-1.29,0 -2.367,-0.981 -2.489,-2.267Zm0.274,-8.158l0.722,8.066c0.073,0.77 0.719,1.359 1.493,1.359l9.069,0c0.774,0 1.42,-0.589 1.493,-1.359l0.668,-7.518c0.028,-0.294 -0.203,-0.548 -0.498,-0.548l-12.947,-0Zm4.454,12.424c-0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Z"></path></g></svg></li>
                        <li onClick={()=> switchBetweenTags("FAVOURITE")} className={modal.type === "FAVOURITE" ? styles.active : ""}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Heart"><path d="M12,20.043a.977.977,0,0,1-.7-.288L4.63,13.08A5.343,5.343,0,0,1,6.053,4.513,5.266,5.266,0,0,1,12,5.371a5.272,5.272,0,0,1,5.947-.858A5.343,5.343,0,0,1,19.37,13.08l-6.676,6.675A.977.977,0,0,1,12,20.043ZM8.355,4.963A4.015,4.015,0,0,0,6.511,5.4,4.4,4.4,0,0,0,4.122,8.643a4.345,4.345,0,0,0,1.215,3.73l6.675,6.675,6.651-6.675a4.345,4.345,0,0,0,1.215-3.73A4.4,4.4,0,0,0,17.489,5.4a4.338,4.338,0,0,0-4.968.852h0a.744.744,0,0,1-1.042,0A4.474,4.474,0,0,0,8.355,4.963Z"></path></g></svg></li>
                    </ul>
                </div>
            </div>
            {items.length <= 0
            ?
            <div className={styles.empty}>
                {modal.type === "CART"
                &&
                <div className={styles.content}>
                    <h4>عربة التسوق فارغة</h4>
                    <button onClick={()=> {
                        router.push("/collections")
                        setModal({status:false,type:null})
                    }}>العودة الى المتجر</button>
                </div>}
                {modal.type === "FAVOURITE"
                &&
                <div className={styles.content}>
                    <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Heart"><path d="M12,20.043a.977.977,0,0,1-.7-.288L4.63,13.08A5.343,5.343,0,0,1,6.053,4.513,5.266,5.266,0,0,1,12,5.371a5.272,5.272,0,0,1,5.947-.858A5.343,5.343,0,0,1,19.37,13.08l-6.676,6.675A.977.977,0,0,1,12,20.043ZM8.355,4.963A4.015,4.015,0,0,0,6.511,5.4,4.4,4.4,0,0,0,4.122,8.643a4.345,4.345,0,0,0,1.215,3.73l6.675,6.675,6.651-6.675a4.345,4.345,0,0,0,1.215-3.73A4.4,4.4,0,0,0,17.489,5.4a4.338,4.338,0,0,0-4.968.852h0a.744.744,0,0,1-1.042,0A4.474,4.474,0,0,0,8.355,4.963Z"></path></g></svg></span>
                    <p>ليس لديك اي منتجات تحبها</p>
                </div>}
            </div>
            :
            <>
            <div className={styles.body}>
                <div className={styles.items} style={{height:modal.type === "FAVOURITE" && 650}}>
                    {items?.map((item,index)=>{
                        return <Item key={index} item={item} updateQuantity={updateQuantity} />
                    })}
                    {modal.type === "CART"
                    &&
                    <div className={styles.advantages}>
                        <ul>
                            <li onClick={()=> setShowForm({status:true,type:"NOTE"})}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Sticky_Note"><path d="M18.44,3.065H5.56a2.507,2.507,0,0,0-2.5,2.5v12.87a2.507,2.507,0,0,0,2.5,2.5h8.68A2.482,2.482,0,0,0,16,20.2l4.21-4.2a2.505,2.505,0,0,0,.73-1.77V5.565A2.5,2.5,0,0,0,18.44,3.065Zm-4.38,13.5v3.37H5.56a1.5,1.5,0,0,1-1.5-1.5V5.565a1.5,1.5,0,0,1,1.5-1.5H18.44a1.5,1.5,0,0,1,1.5,1.5v8.5H16.56A2.507,2.507,0,0,0,14.06,16.565Zm1,3.13v-3.13a1.5,1.5,0,0,1,1.5-1.5h3.13Z"></path></g></svg></li>
                            <li onClick={()=> setShowForm({status:true,type:"DISCOUNT"})}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.79 21 3 11.21v2c0 .53.21 1.04.59 1.41l7.79 7.79c.78.78 2.05.78 2.83 0l6.21-6.21c.78-.78.78-2.05 0-2.83L12.79 21z"></path><path d="M11.38 17.41c.39.39.9.59 1.41.59.51 0 1.02-.2 1.41-.59l6.21-6.21c.78-.78.78-2.05 0-2.83L12.62.58C12.25.21 11.74 0 11.21 0H5C3.9 0 3 .9 3 2v6.21c0 .53.21 1.04.59 1.41l7.79 7.79zM5 2h6.21L19 9.79 12.79 16 5 8.21V2z"></path><circle cx="7.25" cy="4.25" r="1.25"></circle></svg></li>
                        </ul>
                    </div>}
                </div>
            </div>
            {modal.type === "CART"
            &&
            <div className={styles.payment}>
                <div className={styles.total}>
                    <h4>المجموع الفرعي:</h4>
                    <span>
                        {itemsTotalPriceHandler()} شيكل
                    </span>
                </div>
                <div className={styles.submit}>
                    <button className={items.length <= 0 ? styles.inactive : ""} onClick={()=> {
                        if(items.length > 0){
                            router.push("/checkout")
                        }
                    }}>الدفع</button>
                </div>
            </div>}
            </>}
            {showForm.status && showForm.type === "NOTE" && <Form title="أضف ملاحظات للبائع:" desc="" closeForm={closeFormHandler} type={showForm.type} />}
            {showForm.status && showForm.type === "DISCOUNT" && <Form title="إضافة كود خصم" desc="كود الخصم سيعمل في صفحة الدفع" closeForm={closeFormHandler} type={showForm.type} />}
        </div>
    </Modal>
}