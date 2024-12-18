import { useRouter } from "next-nprogress-bar";
import styles from "../../_styles/Navbar.module.css";
import Image from "next/image";

export default function SearchView({products,loading,searchValue,setSearchValue}){

    const views = Array.from({length:4});
    const router = useRouter();

    return <div className={styles.searchView}>
            {loading
            ?
            <div className={styles.products}>
                {views?.map((_,index)=>{
                    return <div key={index} className={styles.view}>
                            <div className={styles.image}></div>
                            <div className={styles.info}>
                                <h4></h4>
                                <span></span>
                            </div>
                        </div>
                    })}
            </div>
            :
            products.length <= 0
            ?
            <div className={styles.empty}>
                لا يوجد منتجات مشابهة ...
            </div>
            :
            <div className={styles.products}>
                {products?.map((product,index)=>{
                    return <div key={index} className={styles.product} onClick={()=> {
                        router.push(`/collections/${product.section}/products/${product._id}`)
                        setSearchValue("");
                    }}>
                        <div className={styles.image}>
                            <Image src={product.views[0]} alt={product.title} width={60} height={60} />
                        </div>
                        <div className={styles.info}>
                            <h4>{product.title}</h4>
                            <span>{product.price} شيكل</span>
                        </div>
                    </div>
                })}
                <div className={styles.more} role="button" onClick={()=> {
                    router.push(`/search?name=${searchValue}`);
                    setSearchValue("");
                }}>
                    ابحث عن &quot;{searchValue}&quot;
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"></path></svg>
                </div>
            </div>}
        </div>
    }