import { useContext } from "react";
import styles from "../_styles/CompareView.module.css";
import Modal from "./Modal";
import Image from "next/image";
import { ContextApi } from "../_util/GlobalContext";
import { useRouter } from "next-nprogress-bar";

export default function CompareView(){
    const router = useRouter();
    const {setModal,compareProducts,setCompareProducts} = useContext(ContextApi);

    const removeProductHandler = (id)=>{
        const newList = compareProducts.filter((product)=> product._id !== id)
        setCompareProducts(newList)
        if(newList.length <= 0){
            closeModal();
        }
    }

    const removeAllProductsHandler = ()=>{
        setCompareProducts([]);
        closeModal();
    }

    const closeModal = ()=>{
        setModal({status:false,type:null})
        document.body.style.overflow = "auto"
    }

    return <Modal closeModal={closeModal} opacity={".1"}>
        <div className={styles.compare}>
            <div className={styles.head}>
                <h4>مقارنة المنتجات</h4>
                <button onClick={closeModal}>اغلاق</button>
            </div>
            <div className={styles.productsContainer}>
                <div className={styles.products}>
                    {compareProducts?.map((product,index)=>{
                        return <div key={index} className={styles.product}>
                            <Image className={styles.img} src={product.views[0]} alt={product.title} width={100} height={100} />
                            <div className={styles.close} onClick={()=> removeProductHandler(product._id)}>
                                x
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className={styles.control}>
                <button onClick={removeAllProductsHandler}>حذف الكل</button>
                <button onClick={()=> router.push("/compare")}>مقارنة</button>
            </div>
        </div>
    </Modal>
}