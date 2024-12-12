
import Link from "next/link";
import styles from "../_styles/CollectionsPage.module.css";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function CollectionsPage({collections}){

    return <div className={styles.collectionsPage}>
        <div className={styles.head}>
            <h2>المتجر</h2>
            <span><Link href={"/"}>الرئيسية</Link> / المتجر</span>
        </div>
        <div className={styles.collections}>
            {collections && collections?.map((collection,index)=>{
                return <div key={index} className={styles.collection}>
                    <Image className={styles.view} src={collection.logo} alt={collection.title} width={300} height={300} />
                    <div className={styles.label}>
                        {collection.title}
                    </div>
                </div>
            })}
        </div>
        <button>تحميل المزيد</button>
    </div>
}