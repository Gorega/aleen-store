import Nav from "./Nav";
import Head from "./Head";
import Body from "./Body";
import styles from "../../../_styles/admin/dashboard/Dashboard.module.css";

export default function Dashboard(){
    return <div className={styles.dashboard}>
        <Nav />
        <Head />
        <Body />
    </div>
}