import styles from "../_styles/List.module.css";
import Item from "./Item";

export default function List({products,listViewOrder}){

    return <>
        <div className={`${styles.list} ${listViewOrder ? styles[listViewOrder] : ""}`}>
            {products?.map((product,index)=>{
                return <Item key={index} content={product} tableShape={listViewOrder === "tableView"} />
            })}
        </div>
        {products?.length > 2 && <div className={styles.more}>
                <button>عرض المزيد</button>
        </div>}
    </>
}