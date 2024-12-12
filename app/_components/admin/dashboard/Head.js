import styles from "../../../_styles/admin/dashboard/Head.module.css";

export default function Head(){
    return <div className={styles.head}>
        <div className={styles.in}>
            <div className={styles.searchBar}>
                <input type="search" />
            </div>
            <div className={styles.control}>
                <ul>    
                    <li>Notifications</li>
                    <li>Sign out</li>
                </ul>
            </div>
        </div>
    </div>
}