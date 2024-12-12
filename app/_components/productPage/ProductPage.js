"use client";

import styles from "../../_styles/ProductPage.module.css";
import Image from "next/image";
import Policy from "./Policy";
import Form from "./Form";
import { useContext, useState } from "react";
import Link from "next/link";
import { ContextApi } from "@/app/_util/GlobalContext";
import Counter from "../Counter";
import { useRouter } from "next/navigation";

export default function ProductPage({product,sectionTitle}){

    const router = useRouter();
    const [currentView,setCurrentView] = useState(0);
    const [currentTag,setCurrentTag] = useState(0);
    const [currentList,setCurrentList] = useState(0);
    const [currentCounterValue,setCurrentCounterValue] = useState(1);
    const {addToCartHandler,
            addToFavouriteHandler,
            removeFormCartHandler,
            checkIsFavourite,
            checkIsInCart,
            addToCompareProductsHandler,
            modal,
            setModal} = useContext(ContextApi);

    const views = product.views;

    const closeModalHandler = ()=>{
        setModal({status:false,type:null})
        document.body.style.overflow = "auto"
    }

    const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: product.title,
              text: `Check out this product: ${product.title}`,
              url: window.location.href,
            });
            console.log("Product shared successfully!");
          } catch (error) {
            console.error("Error sharing product:", error);
          }
        } else {
          alert("Web Share API not supported in this browser.");
    }};

    return <div className={`${styles.container} container`}>
    <div className={styles.navigator}>
        <Link href="/">الرئيسية</Link> / <Link href={`/collections/${product.section}`}>{sectionTitle}</Link> / {product.title}
    </div>
    <div className={styles.product}>
        <div className={styles.images}>
                {views?.map((view,index)=>{
                    return <div key={index} className={styles.view} onClick={()=> setCurrentView(index)}>
                        {currentView === index ? "" : <div className={styles.overlay}></div>}
                        <Image className={styles.img} src={view} width={100} height={100} alt={product.title} />
                        </div>
                })}
        </div>
        <div className={styles.view}>
                <Image className={styles.img} src={views[currentView]} width={400} height={400} alt={views[currentView].title} />
        </div>
        <div className={styles.content}>
            <div className={styles.head}>
                <h2>{product.title}</h2>
                <span>{product.price} شيكل</span>
            </div>
            <div className={styles.more}>
                <p>{product.desc}</p>
                <div className={styles.quantity}>
                    <Counter value={currentCounterValue} setValue={setCurrentCounterValue} />
                    <button onClick={()=> {
                        if(checkIsInCart(product._id)){
                            removeFormCartHandler(product._id)
                        }else{
                            addToCartHandler(product,currentCounterValue)
                        }
                    }}>{checkIsInCart(product._id) ? "حذف من عربة التسوق" : "اضف الى عربة التسوق"}</button>
                </div>
                <div className={styles.buy}>
                    <button onClick={()=> router.push("/checkout")}>اشتر الان</button>
                </div>
                <div className={styles.query}>
                    <ul>
                        <li className={checkIsFavourite(product._id) ? styles.active : ""} onClick={()=> addToFavouriteHandler(product)}>
                            <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Heart"><path d="M12,20.043a.977.977,0,0,1-.7-.288L4.63,13.08A5.343,5.343,0,0,1,6.053,4.513,5.266,5.266,0,0,1,12,5.371a5.272,5.272,0,0,1,5.947-.858A5.343,5.343,0,0,1,19.37,13.08l-6.676,6.675A.977.977,0,0,1,12,20.043ZM8.355,4.963A4.015,4.015,0,0,0,6.511,5.4,4.4,4.4,0,0,0,4.122,8.643a4.345,4.345,0,0,0,1.215,3.73l6.675,6.675,6.651-6.675a4.345,4.345,0,0,0,1.215-3.73A4.4,4.4,0,0,0,17.489,5.4a4.338,4.338,0,0,0-4.968.852h0a.744.744,0,0,1-1.042,0A4.474,4.474,0,0,0,8.355,4.963Z"></path></g></svg></span>
                            اضف لقائمة الامنيات
                        </li>
                        <li onClick={()=> addToCompareProductsHandler(product)}>
                            <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M233.9 328.1c-2.6-2.6-6.1-4.1-9.9-4.1-3.7 0-7.3 1.4-9.9 4.1-2.6 2.6-4.1 6.1-4.1 9.9 0 3.7 1.4 7.3 4.1 9.9l.1.1 41.1 40.1H166c-20.4 0-33.6-7.5-41.6-23.5-8.4-17-9.4-41.5-9.4-58.5V170.8c15-2.8 28.7-10.5 39-21.9 11.6-12.9 18-29.5 18-46.9 0-38.6-31.4-70-70-70s-70 31.4-70 70c0 17 6.2 33.3 17.3 46.1 9.9 11.3 23.1 19.1 37.7 22.3V306c0 14.7 0 42.1 9.4 65.3 11.9 29.3 36 44.7 69.6 44.7h89.7L216 456.2c-5.4 5.4-5.4 14.3 0 19.8l.1.1c2.7 2.5 6.2 3.9 9.8 3.9 3.8 0 7.3-1.4 9.9-4.1l57.6-57.4c4.2-4.2 6.5-9.8 6.5-15.7 0-5.9-2.3-11.3-6.5-15.5l-59.5-59.2zM102 144c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM425 341.6V206c0-14.7 0-42.1-9.4-65.3-11.9-29.2-36-44.7-69.6-44.7h-89.7L296 55.8c5.4-5.4 5.4-14.3 0-19.8l-.1-.1c-2.7-2.5-6.2-3.9-9.8-3.9-3.8 0-7.3 1.4-9.9 4.1l-57.6 57.4c-4.2 4.2-6.5 9.8-6.5 15.7 0 5.9 2.3 11.3 6.5 15.5l59.6 59.4c2.6 2.6 6.1 4.1 9.9 4.1 3.7 0 7.3-1.4 9.9-4.1 2.6-2.6 4.1-6.1 4.1-9.9 0-3.7-1.4-7.3-4.1-9.9l-.1-.1-41.2-40.2H346c20.4 0 33.6 7.5 41.6 23.5 8.4 17 9.4 41.5 9.4 58.5v135.2c-15 2.8-28.7 10.5-39 21.9-11.6 12.9-18 29.5-18 46.9 0 38.6 31.4 70 70 70s70-31.4 70-70c0-17-6.2-33.3-17.3-46.1-9.9-11.3-23.2-19.1-37.7-22.3zM410 452c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42z"></path></svg></span>
                            مقارنة
                        </li>
                    </ul>
                </div>
                <div className={styles.query}>
                    <ul>
                        <li onClick={()=> setModal({status:true,type:"POLICY"})}>
                            <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Delivery_Truck"><g><path d="M21.47,11.185l-1.03-1.43a2.5,2.5,0,0,0-2.03-1.05H14.03V6.565a2.5,2.5,0,0,0-2.5-2.5H4.56a2.507,2.507,0,0,0-2.5,2.5v9.94a1.5,1.5,0,0,0,1.5,1.5H4.78a2.242,2.242,0,0,0,4.44,0h5.56a2.242,2.242,0,0,0,4.44,0h1.22a1.5,1.5,0,0,0,1.5-1.5v-3.87A2.508,2.508,0,0,0,21.47,11.185ZM7,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,7,18.935Zm6.03-1.93H9.15a2.257,2.257,0,0,0-4.3,0H3.56a.5.5,0,0,1-.5-.5V6.565a1.5,1.5,0,0,1,1.5-1.5h6.97a1.5,1.5,0,0,1,1.5,1.5ZM17,18.935a1.25,1.25,0,1,1,1.25-1.25A1.25,1.25,0,0,1,17,18.935Zm3.94-2.43a.5.5,0,0,1-.5.5H19.15a2.257,2.257,0,0,0-4.3,0h-.82v-7.3h4.38a1.516,1.516,0,0,1,1.22.63l1.03,1.43a1.527,1.527,0,0,1,.28.87Z"></path><path d="M18.029,12.205h-2a.5.5,0,0,1,0-1h2a.5.5,0,0,1,0,1Z"></path></g></g></svg></span>
                            الشحن والارجاع
                        </li>
                        <li onClick={()=> setModal({status:true,type:"FORM"})}>
                            <span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"></path><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path><path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"></path><path d="M20 22v.01"></path></svg></span>
                            اسال سؤالا
                        </li>
                    </ul>
                    {modal.type === "POLICY" && <Policy closeModal={closeModalHandler} />}
                    {modal.type === "FORM" && <Form product={product} closeModal={closeModalHandler} />}
                </div>
                <div className={styles.share}>
                    شارك عبر:
                    <ul>
                        <li onClick={handleShare}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Facebook"><path d="M19.02,4.975A9.93,9.93,0,0,0,2.07,12,9.935,9.935,0,0,0,12,21.935a9.98,9.98,0,0,0,3.8-.75,10.189,10.189,0,0,0,3.22-2.16,9.934,9.934,0,0,0,0-14.05Zm-.7,13.34A8.921,8.921,0,0,1,13,20.885v-6.56h1.88a1,1,0,0,0,0-2H13V9.585a1,1,0,0,1,1-1h1.2a1,1,0,0,0,0-2H13.5a2.5,2.5,0,0,0-2.5,2.5v3.24H9.13a1,1,0,1,0,0,2H11v6.56a8.919,8.919,0,1,1,9.26-5.47A9.061,9.061,0,0,1,18.32,18.315Z"></path></g></svg></li>
                        <li onClick={handleShare}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Instagram"><g><path d="M18.437,20.937H5.563a2.5,2.5,0,0,1-2.5-2.5V5.563a2.5,2.5,0,0,1,2.5-2.5H18.437a2.5,2.5,0,0,1,2.5,2.5V18.437A2.5,2.5,0,0,1,18.437,20.937ZM5.563,4.063a1.5,1.5,0,0,0-1.5,1.5V18.437a1.5,1.5,0,0,0,1.5,1.5H18.437a1.5,1.5,0,0,0,1.5-1.5V5.563a1.5,1.5,0,0,0-1.5-1.5Z"></path><path d="M12,16.594A4.595,4.595,0,1,1,16.6,12,4.6,4.6,0,0,1,12,16.594ZM12,8.4A3.595,3.595,0,1,0,15.6,12,3.6,3.6,0,0,0,12,8.4Z"></path><circle cx="17.2" cy="6.83" r="1.075"></circle></g></g></svg></li>
                        <li onClick={handleShare}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className={styles.info}>
        <div className={styles.tags}>
            <ul>
                <li className={currentTag === 0 ? styles.active : ""} onClick={()=> setCurrentTag(0)}>الوصف</li>
                <li className={currentTag === 1 ? styles.active : ""} onClick={()=> setCurrentTag(1)}>تقييمات</li>
            </ul>
        </div>
        <div className={styles.rendered}>
            {currentTag === 0
            ?
            <div className={styles.desc}>
                {product.desc}
            </div>
            :
            <div className={styles.stars}>
                
            </div>
            }
        </div>
    </div>
    <div className={styles.extra}>
        <ul>
            <li className={currentList === 0 ? styles.active : ""} onClick={()=> setCurrentList(0)}>منتجات قد تعجبك ايضا</li>
            <li className={currentList === 1 ? styles.active : ""} onClick={()=> setCurrentList(1)}>شاهدت مؤخراً</li>
        </ul>
        <div className={styles.list}>
            
        </div>
    </div>
</div>
}