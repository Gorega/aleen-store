import styles from "../../../_styles/admin/dashboard/Body.module.css";

export default function Body(){
    return <div className={styles.body}>
        <div className={styles.in}>
            <h2>المنتجات</h2>
            <span>العدد الكلي 117 منتج</span>
            <table>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>اسم المنتج</th>
                    <th>صورة المنتج</th>
                    <th>سعر المنتج</th>
                    <th>وصف المنتج</th>
                    <th>تقييم المنتج</th>
                    <th>القسم</th>
                </tr>
                <tr>
                    <td><input type="checkbox" /></td>
                    <td>اسم المنتج</td>
                    <td>صورة المنتج</td>
                    <td>سعر المنتج</td>
                    <td>وصف المنتج</td>
                    <td>تقييم المنتج</td>
                    <td>القسم</td>
                </tr>
            </table>
        </div>
    </div>
}