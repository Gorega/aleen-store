import Modal from "./Modal";
import Image from "next/image";
import styles from "../_styles/ItemView.module.css";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ContextApi } from "../_util/GlobalContext";
import Counter from "./Counter";


export default function ItemView({product,closeModal}){
    const router = useRouter();
    const [currentCounterValue,setCurrentCounterValue] = useState(1);
    const {addToCartHandler,
            addToFavouriteHandler,
            productQuantity,
            checkIsFavourite,
            checkIsInCart,
            removeFormCartHandler} = useContext(ContextApi);

    return <Modal closeModal={closeModal} opacity={".1"}>
        <div className={styles.item}>
            <div className={styles.view}>
                <Image className={styles.image} src={product.views[0]} alt={product.title} width={300} height={300} />
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h4>{product.title}</h4>
                    <span>{product.price} شيكل</span>
                </div>
                <p>{product.desc}</p>
                <div className={styles.cart}>
                    <Counter value={currentCounterValue} setValue={setCurrentCounterValue} />
                    {checkIsInCart(product._id)
                    ?
                    <button onClick={()=>removeFormCartHandler(product._id)}>حذف من عربة التسوق</button>
                    :
                    <button onClick={()=>addToCartHandler(product,productQuantity)}>اضف الى عربة التسوق</button>}
                </div>
                <div className={styles.control}>
                    <div className={`${styles.sec} ${checkIsFavourite(product._id) ? styles.active : ""}`} onClick={()=> {
                        addToFavouriteHandler(product);
                        checkIsFavourite(product._id);
                    }}>
                        <span>
                         <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Heart"><path d="M12,20.043a.977.977,0,0,1-.7-.288L4.63,13.08A5.343,5.343,0,0,1,6.053,4.513,5.266,5.266,0,0,1,12,5.371a5.272,5.272,0,0,1,5.947-.858A5.343,5.343,0,0,1,19.37,13.08l-6.676,6.675A.977.977,0,0,1,12,20.043ZM8.355,4.963A4.015,4.015,0,0,0,6.511,5.4,4.4,4.4,0,0,0,4.122,8.643a4.345,4.345,0,0,0,1.215,3.73l6.675,6.675,6.651-6.675a4.345,4.345,0,0,0,1.215-3.73A4.4,4.4,0,0,0,17.489,5.4a4.338,4.338,0,0,0-4.968.852h0a.744.744,0,0,1-1.042,0A4.474,4.474,0,0,0,8.355,4.963Z"></path></g></svg>
                        </span>
                        اضف لقائمة الامنيات
                    </div>
                </div>
                <div className={styles.more} onClick={()=> router.push(`/collections/${product.section}/products/${product._id}`)}>
                    عرض بقية التفاصيل
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"></path></svg>
                </div>
            </div>
            <div className={styles.close} onClick={closeModal}>
                x
            </div>
        </div>
    </Modal>
}