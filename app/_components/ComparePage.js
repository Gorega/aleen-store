"use client";

import { useContext, useEffect } from "react";
import styles from "../_styles/ComparePage.module.css";
import Image from "next/image";
import { ContextApi } from "../_util/globalContext";

export default function ComparePage(){
    const {compareProducts,addToCartHandler,removeFormCartHandler,checkIsInCart} = useContext(ContextApi);

    return <div className={`${styles.compare} container`}>
        {compareProducts.length > 0
        ?
        <table>
            <tr className={styles.tags}>
                <th></th>
                <th>التوفر</th>
                <th>القسم</th>
                <th>التقييم</th>
                <th>اضف الى عربة التسوق</th>
                <th>السعر</th>
            </tr>
            {compareProducts?.map((product,index)=>{
                return <tr key={index}>
                    <td>
                        <div className={styles.view}>
                            <Image className={styles.img} src={product.views[0]} alt={product.title} width={100} height={100} />
                        </div>
                        {product.title}
                    </td>
                    <td data-title="التوفر">في المخزون</td>
                    <td data-title="القسم">{product.section}</td>
                    <td data-title="التقييم">{product.stars}</td>
                    <td data-title="اضف الى عربة التسوق">
                        {checkIsInCart(product._id)
                        ?
                        <button onClick={()=> removeFormCartHandler(product._id)}>حذف من عربة التسوق</button>
                        :
                        <button onClick={()=> addToCartHandler(product,1)}>أضف الى عربة التسوق</button>}
                    </td>
                    <td data-title="السعر">{product.price} شيكل</td>
                </tr>
            })}
        </table>
        :
        <div className={styles.empty}>
            <span>
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z"></path><path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z"></path></svg>
            </span>
            <h1>قائمة المقارنة فارغة</h1>
            <p>
                لا توجد منتجات مضافة في قائمة المقارنة. يجب إضافة بعض المنتجات لمقارنتها.
                <br />
                <br />
                ستجد الكثير من المنتجات الشيقة في متجرنا
            </p>
        </div>}
    </div>
}