import { useFetch } from "@/app/_util/useFetch";
import ProductPage from "../../../../../_components/productPage/ProductPage";



export default async function Product({params}){
    const {section,id} = await params;
    const product = await useFetch(`api/products/product/${id}`);
    const {title} = await useFetch(`api/sections/${section}`)
    return <ProductPage product={product} sectionTitle={title} />
}