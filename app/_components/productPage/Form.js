import Modal from "../Modal";
import Image from "next/image";
import styles from "../../_styles/ProductPage.module.css";

export default function Form({product,closeModal}){
    return <Modal closeModal={closeModal}>
        <div className={styles.question}>
            <div className={styles.product}>
                <div className={styles.image}>
                    <Image className={styles.img} src={product.views[0]} width={200} height={200} alt={product.title} />
                </div>
                <div className={styles.content}>
                    <h4>{product.title}</h4>
                    <span>{product.price} شيكل</span>
                </div>
            </div>
            <div className={styles.form}>
                <h2>اسال سؤال</h2>
                <form>
                    <div className={styles.field}>
                        <input type="text" placeholder="اسمك" />
                        <input type="email" placeholder="بريدك الالكتروني" />
                    </div>
                    <div className={styles.field}>
                        <input type="text" placeholder="رقم هاتفك" />
                    </div>
                    <div className={styles.field}>
                        <textarea placeholder="رسالتك ..." />
                    </div>
                    <button type="submit">ارسال</button>
                </form>
            </div>
            <div className={styles.close} onClick={closeModal}>
                x
            </div>
    </div>
    </Modal>
}