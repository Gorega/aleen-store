"use client";

import { useContext, useState } from "react";
import styles from "../../../_styles/Navbar.module.css"
import { ContextApi } from "../../../_util/GlobalContext";
import Image from "next/image";
import Counter from "../../Counter";

export default function Item({item,updateQuantity}){
    const {modal,removeFormCartHandler,removeFormFavouriteHandler} = useContext(ContextApi);
    const [currentCounterValue,setCurrentCounterValue] = useState(item.quantity);


    return <div className={styles.item}>
        <div className={styles.image}>
            <Image className={styles.img} src={item.image} width={100} height={100} alt={item.title} />
        </div>
        <div className={styles.content}>
            <h4>{item.title}</h4>
            <span>{item.price} شيكل</span>
            {modal.type === "CART"
            &&
            <div className={styles.counter}>
                <Counter value={currentCounterValue} setValue={setCurrentCounterValue} updateQuantity={updateQuantity} id={item.id} />
                {currentCounterValue > 1 && <span className={styles.addedPrice}>{item.price * currentCounterValue} شيكل</span>}
            </div>
            }
        </div>
        {modal.type === "CART"
        &&
        <div className={styles.control} onClick={()=> removeFormCartHandler(item.id)}>
            x
        </div>}
        {modal.type === "FAVOURITE"
        &&
        <div className={styles.control} onClick={()=> removeFormFavouriteHandler(item.id)}>
            x
        </div>}
    </div>
}