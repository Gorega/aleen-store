"use client"

import styles from "../../_styles/shopping/Shopping.module.css";
import Image from "next/image";
import List from "../List";
import { useRef, useState, useEffect } from "react";


export default function Shopping({tags}){
    const [products,setProducts] = useState([]);
    const [currentTag,setCurrentTag] = useState("makeup");
    const scrollAmount = 250;
    const sectionsRef = useRef();

    
    const moveToRightHandler = ()=>{
        if (sectionsRef.current) {
            sectionsRef.current.scrollLeft += scrollAmount;
          }
    }

    const moveToLeftHandler = () => {
        if (sectionsRef.current) {
          sectionsRef.current.scrollLeft -= scrollAmount;
        }
    }

    const viewDefinedProductsHandler = (dataset)=>{
        setCurrentTag(null)

        // apply async method to implement animation
        setTimeout(()=>{
            setCurrentTag(dataset)
        },0)
    }

    useEffect(()=>{
        const fetchProducts = async()=>{
            const response = await fetch(`/api/products?section=${currentTag}`);
            const products = await response.json();
            setProducts(products);
        }
        fetchProducts();
    },[currentTag])


    return <main className={styles.main}>
        <div className={styles.head}>
            <h2>تسوق من أقسامنا</h2>
            <div className={styles.holder}>
                <div className={styles.control}>
                        <span className={styles.rightArrow} onClick={moveToRightHandler}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path></svg></span>
                        <span className={styles.leftArrow} onClick={moveToLeftHandler}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg></span>
                </div>
                <div className={styles.sections} ref={sectionsRef}>
                    {tags?.map((tag,index)=>{
                        return <div className={styles.section} key={index} onClick={()=> {
                                         viewDefinedProductsHandler(tag.section)
                                }}>
                                <Image className={styles.img} src={tag.logo} width={100} height={100} alt={tag.title} />
                                <h4>{tag.title}</h4>
                            </div>
                    })}
                </div>
            </div>
        </div>
        <div className={styles.productsContainer}>
            <List products={products} link={"/collections"} />
        </div>
    </main>
}