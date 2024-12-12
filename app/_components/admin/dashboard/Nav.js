import styles from "../../../_styles/admin/dashboard/Nav.module.css";
import Image from "next/image";

export default function Nav(){
    const adminControlList = [{
        title:"الرئيسية",
        link:"/",
        icon:""
    },{
        title:"الأقسام",
        link:"/",
        icon:""
    },{
        title:"المنتجات",
        link:"/",
        icon:""
    },{
        title:"المشتريات",
        link:"/",
        icon:""
    },{
        title:"المبيعات",
        link:"/",
        icon:""
    },{
        title:"الطلبات الواردة",
        link:"/",
        icon:""
    }]

    return <div className={styles.nav}>
        <div className={styles.logo}>
            Aleen Store
        </div>
        <div className={styles.list}>
            <ul>
                {adminControlList?.map((li,index)=>{
                    return <li key={index}>{li.title}</li>
                })}
            </ul>
        </div>
        <div className={styles.profile}>
            <div className={styles.avatar}>
                <Image className={styles.img} src="" alt="" width={100} height={100} />
            </div>
            <h4>Profile Name</h4>
            <span>aleen@gmail.com</span>
        </div>
    </div>
}