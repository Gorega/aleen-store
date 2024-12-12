import styles from "../../_styles/admin/Login.module.css";

export default function Login(){
    return <div className={styles.login}>
        <div className={styles.logo}>
            Aleen Store
        </div>
        <form>
            <h2>الدخول للمسؤول</h2>
            <div className={styles.field}>
                <label>اسم المستخدم</label>
                <input type="text" />
            </div>
            <div className={styles.field}>
                <label>كلمة السر</label>
                <input type="password" />
            </div>
            <div className={styles.forget}>
                Forget Password ?
            </div>
            <button>تسجيل الدخول</button>
        </form>
    </div>
}