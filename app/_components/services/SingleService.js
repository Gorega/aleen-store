import styles from "../../_styles/Services.module.css";

export default function SingleService({content}){
    return <div className={styles.section}>
                <div className={styles.shape}>
                    {content.logo}
                </div>
                <div className={styles.content}>
                    <h3>{content.title}</h3>
                    <p>{content.description}</p>
                </div>
            </div>
}