"use client";

import styles from "../../../_styles/Navbar.module.css";

export default function Form({title,desc,closeForm,type}){


    const handleClickOutside = (e)=>{
        if(e.target.classList.contains("form")){
            closeForm();
        }
    }

    return <div className={`${styles.form} form`} onClick={handleClickOutside}>
        <div className={styles.in}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <form>
                {type === "NOTE" && <textarea />}
                {type === "DISCOUNT" && <input placeholder="كود الخصم" />}
                <button className={styles.save} type="submit">حفظ</button>
                <button className={styles.cancel} onClick={closeForm}>الغاء</button>
            </form>
        </div>
    </div>
}