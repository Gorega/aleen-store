import Modal from "../Modal";
import styles from "../../_styles/ProductPage.module.css";

export default function Policy({closeModal}){

    return <Modal closeModal={closeModal}>
        <div className={styles.policy}>
            <h2>سياسة الغاء الطلب</h2>
            <p>لا يمكن إلغاء الطلب ولا بأي شكل من الأشكال  ولا لأي سبب كان وفي حال أردت إلغاء الطلب يرجى العلم أنه لن يتم قبول أي طلبات لك في المستقبل</p>
            <div className={styles.more}>
                <h3>فريق خدمة العملاء لدينا على جاهزية تامة لمساعدتك، وسوف يسعد بخدمتك:</h3>
                <span>رقم الواتساب: +972597200991</span>
            </div>
            <div className={styles.close} onClick={closeModal}>
                x
            </div>
        </div>
    </Modal>
}