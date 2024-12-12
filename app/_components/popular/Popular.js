"use client";

import styles from "../../_styles/Popular.module.css";
import List from '../List';

export default async function Popular({products}){

    return <div className={`${styles.popular} container`}>
        <h2>الأكثر شيوعا <span>هذا الاسبوع</span></h2>
        <List products={products} />
    </div>
}