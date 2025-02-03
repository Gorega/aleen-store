
import Link from "next/link";
import styles from "../_styles/Footer.module.css";

export default function Footer({storeMenu}){

    return <footer className={styles.footer}>
        <div className={styles.sections}>
            <div className={styles.section}>
                <h2>Aleen Store</h2>
                <p>متجر Aleen صنع خصيصا لذوات الذوق الرفيع في اختيار منتجات العناية بالبشرة والجمال والرقة افضل موقع في فلسطين للمنتجات الكورية للمكياج والعناية بالبشرة</p>
                <div className={styles.social}>
                    <h2>تابعنا على</h2>
                    <div className={styles.icons}>
                        <ul>
                            <li><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g id="Facebook"><path d="M19.02,4.975A9.93,9.93,0,0,0,2.07,12,9.935,9.935,0,0,0,12,21.935a9.98,9.98,0,0,0,3.8-.75,10.189,10.189,0,0,0,3.22-2.16,9.934,9.934,0,0,0,0-14.05Zm-.7,13.34A8.921,8.921,0,0,1,13,20.885v-6.56h1.88a1,1,0,0,0,0-2H13V9.585a1,1,0,0,1,1-1h1.2a1,1,0,0,0,0-2H13.5a2.5,2.5,0,0,0-2.5,2.5v3.24H9.13a1,1,0,1,0,0,2H11v6.56a8.919,8.919,0,1,1,9.26-5.47A9.061,9.061,0,0,1,18.32,18.315Z"></path></g></svg></li>
                            <li><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><g id="Instagram"><g><path d="M18.437,20.937H5.563a2.5,2.5,0,0,1-2.5-2.5V5.563a2.5,2.5,0,0,1,2.5-2.5H18.437a2.5,2.5,0,0,1,2.5,2.5V18.437A2.5,2.5,0,0,1,18.437,20.937ZM5.563,4.063a1.5,1.5,0,0,0-1.5,1.5V18.437a1.5,1.5,0,0,0,1.5,1.5H18.437a1.5,1.5,0,0,0,1.5-1.5V5.563a1.5,1.5,0,0,0-1.5-1.5Z"></path><path d="M12,16.594A4.595,4.595,0,1,1,16.6,12,4.6,4.6,0,0,1,12,16.594ZM12,8.4A3.595,3.595,0,1,0,15.6,12,3.6,3.6,0,0,0,12,8.4Z"></path><circle cx="17.2" cy="6.83" r="1.075"></circle></g></g></svg></li>
                            <li><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <h4>اختصارات</h4>
                <ul>
                    {storeMenu?.map((li,index)=>{
                        return <Link key={index} href={`/collections/${li.section}`}><li>{li.title}</li></Link>
                    })}
                </ul>
            </div>
            <div className={styles.section}>
                <h4>سياسات المتجر</h4>
                <ul>
                    <li>سياسة إلغاء الطلب</li>
                    <li>سياسة الإستبدال</li>
                    <li>سياسة الشحن والتوصيل</li>
                </ul>
            </div>
            <div className={styles.section}>
                <h4>ابقى على اطلاع</h4>
                <p>إشترك لتصلك أخر العروض والمنتجات عبر بريدك الإلكتروني</p>
                <div className={styles.form}>
                    <input type="email" placeholder="بريدك الالكتروني" />
                    <button>ارسال</button>
                </div>
            </div>
        </div>
        <div className={styles.outer}>
            <span>تصميم وتطوير Gorega</span>
        </div>
    </footer>
}