"use client";

import { useContext, useLayoutEffect, useState } from "react";
import styles from "../_styles/Checkout.module.css";
import Image from "next/image";
import { ContextApi } from "../_util/GlobalContext";
import {url} from "../../mongoose/url";

export default function CheckoutPage(){

    const [products,setProducts] = useState([]);
    const [discountCode,setDiscountCode] = useState("");
    const [formDataStatus,setFormDataStatus] = useState({});
    const [formErrors,setFormErrors] = useState({});
    const {getLocalStorageItems} = useContext(ContextApi);

    const deliveryPlaces = [{
        id:"west_bank",
        value:"west_bank",
        name:"place",
        label:"كامل مناطق الضفة الغربية",
        price:"15 شيكل",
        checked:true
    },{
        id:"jerusalem",
        value:"jerusalem",
        name:"place",
        label:"القدس",
        price:"15 شيكل",
        checked:false
    },{
        id:"48_territories",
        value:"48_territories",
        name:"place",
        label:"الداخل المحتل",
        price:"15 شيكل",
        checked:false
    }]

    const formDataHandler = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const country = formData.get("country");
        const firstName = formData.get("first_name");
        const lastName = formData.get("last_name");
        const phone = formData.get("phone");
        const neighbourhood = formData.get("neighbourhood");
        const address = formData.get("address");
        const city = formData.get("city");
        const place = formData.get("place");
        const payment = formData.get("payment");

        setFormDataStatus({status:"pending"})
        setFormErrors({})
        const response = await fetch(`${url}/api/orders`,{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(
                {country,
                firstName,
                lastName,
                phone,
                neighbourhood,
                address,
                city,
                place,
                paymentMethod:payment,
                products:products,
                discountCode}
            )
        })
        if(!response.ok){
            const data = await response.json();
            if(data.error){
                setFormErrors(data.details);
            }
            setFormDataStatus({status:"error",message:"الرجاء التأكد من تعبئة الحقول المطلوبة بشكل سليم !"})
        }else{
            setFormErrors({})
            setFormDataStatus({status:"success",message:"تم ارسال الطلب بنجاح, شكرا لثقتك بمتجرنا"})
        }
    }

    const itemsTotalPriceHandler = ()=>{
        const total = products?.reduce((total,product) => {
            return total + product.price * product.quantity;
        },0)
        return total;
    }


    useLayoutEffect(()=>{
        if (typeof window !== "undefined") {
            getLocalStorageItems("cart", setProducts);
        }
    },[])

    if(!products || products.length === 0){
        return <div className={`${styles.empty} container`}>
            <div className={styles.content}>
                <span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Shopping_Cart"><path d="M17.437,19.934c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Zm-11.217,-4.266l-0.945,-10.9c-0.03,-0.391 -0.356,-0.693 -0.749,-0.693l-0.966,-0c-0.276,-0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5l0.966,-0c0.916,-0 1.676,0.704 1.746,1.617l0.139,1.818l13.03,-0c0.885,-0 1.577,0.76 1.494,1.638l-0.668,7.52c-0.121,1.285 -1.199,2.267 -2.489,2.267l-9.069,0c-1.29,0 -2.367,-0.981 -2.489,-2.267Zm0.274,-8.158l0.722,8.066c0.073,0.77 0.719,1.359 1.493,1.359l9.069,0c0.774,0 1.42,-0.589 1.493,-1.359l0.668,-7.518c0.028,-0.294 -0.203,-0.548 -0.498,-0.548l-12.947,-0Zm4.454,12.424c-0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c-0,-0.552 0.448,-1 1,-1c0.552,0 1,0.448 1,1Z"></path></g></svg></span>
                <h2>عربة التسوق فارغة</h2>
                <p>ليس لديك أي منتجات في عربة التسوق حتى الان للقيام بطلبها.</p>
            </div>
        </div>
    }


    return <div className={`${styles.checkout} container`}>
        <form>
            <div className={styles.field}>
                <label>معلومات الاتصالات</label>
                <input className={formErrors?.phone ? styles.error : ""} type="text" name="phone" placeholder="رقم الهاتف" />
                {formErrors
                &&
                <div className={styles.error}>
                    {formErrors.phone}
                </div>}
            </div>
            <div className={styles.fields}>
                <label>معلومات التوصيل</label>
                <div className={styles.field}>
                    <select name="country">
                        <option value="palestine">فلسطين</option>
                        <option value="48_territories">اراضي الداخل 48</option>
                    </select>
                </div>
                <div className={styles.fieldContainer}>
                    <div className={styles.field}>
                        <input className={formErrors?.firstName ? styles.error : ""} type="text" name="first_name" placeholder="الاسم الاول" />
                        {formErrors
                        &&
                        <div className={styles.error}>
                            {formErrors.firstName}
                        </div>}
                    </div>
                    <div className={styles.field}>
                        <input className={formErrors?.lastName ? styles.error : ""} type="text" name="last_name" placeholder="الاسم الاخير" />
                        {formErrors
                        &&
                        <div className={styles.error}>
                            {formErrors.lastName}
                        </div>}
                    </div>
                </div>
                <div className={styles.field}>
                    <input className={formErrors?.neighbourhood ? styles.error : ""} type="text" name="neighbourhood" placeholder="القرية / المخيم / المنطقة" />
                    {formErrors
                    &&
                    <div className={styles.error}>
                        {formErrors.neighbourhood}
                    </div>}
                </div>
                <div className={styles.field}>
                    <input type="text" name="address" placeholder="العنوان بالتفصيل" />
                </div>
                <div className={styles.field}>
                    <input className={formErrors?.city ? styles.error : ""} type="text" name="city" placeholder="المدينة" />
                    {formErrors
                    &&
                    <div className={styles.error}>
                        {formErrors.city}
                    </div>}
                </div>
            </div>
            <div className={styles.place}>
                <label>منطقة الشحن</label>
                {deliveryPlaces?.map((place,index)=>{
                    const {name,value,id,label,price,checked} = place
                    return <div key={index} className={styles.radioField}>
                        <input type="radio" name={name} id={id} value={value} checked={checked} required />
                        <div className={styles.info}>
                            <label>{label}</label>
                            <span>{price}</span>
                        </div>
                    </div>
                })}
            </div>
            <div className={styles.payment}>
                <label>الدفع</label>
                <span>جميع المعاملات آمنة ومشفرة</span>
                <div className={styles.radioField}>
                    <input type="radio" name="payment" id="cod" value="cod" checked required />
                    <label>الدفع عند الاستلام</label>
                </div>
            </div>
            <button type="submit" className={formDataStatus?.status === "pending" && styles.inactive}>
                {formDataStatus?.status === "pending" ? "جاري ارسال الطلب ..." : "اكمال الطلب"}
            </button>
            <div className={`${styles.message} ${formDataStatus?.status === "error" ? styles.error : styles.success}`}>
                {formDataStatus?.status === "error" && formDataStatus.message}
                {formDataStatus?.status === "success" && formDataStatus.message}
            </div>
        </form>
        <div className={styles.listedItems}>
            <div className={styles.items}>
                {products?.map((product,index)=>{
                    return <div key={index} className={styles.item}>
                        <div className={styles.image}>
                            <Image className={styles.img} src={product.image} width={100} height={100} alt={product.title} />
                            <div className={styles.quantity}>
                                {product.quantity}
                            </div>
                        </div>
                        <h4>{product.title}</h4>
                        <span>{product.price} شيكل</span>
                    </div>
                })}
            </div>
            <div className={styles.discount}>
                <input type="text" placeholder="كود الخصم ( غير متاح حاليا )" value={discountCode} onChange={(e)=> setDiscountCode(e.target.value)} disabled />
                <button>
                    اضافة
                </button>
            </div>
            <div className={styles.info}>
                <div className={styles.total}>
                    <h4>مجموع المنتجات {products.length}</h4>
                    <span>{itemsTotalPriceHandler()} شيكل</span>
                </div>
                <div className={styles.total}>
                    <h4>الشحن</h4>
                    <span>15 شيكل</span>
                </div>
                <div className={styles.total}>
                    <h4>المجموع</h4>
                    <span>{itemsTotalPriceHandler() + 15} شيكل</span>
                </div>
            </div>
        </div>
    </div>
}