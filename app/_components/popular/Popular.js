"use client";

import styles from "../../_styles/Popular.module.css";
import List from '../List';

export default function Popular({products}){

    return <div className={styles.popular}>
        <h2>الأكثر شيوعا</h2>
        <List products={products.slice(0,9)} link={"/collections"} />
    </div>
}