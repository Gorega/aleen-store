import { fetchData } from "../../../../../_util/fetchData";
import ProductPage from "../../../../../_components/productPage/ProductPage";



export default async function page({params}){
    const {section,id} = await params;
    const product = await fetchData(`api/products/product/${id}`);
    const {title} = await fetchData(`api/sections/${section}`)
    return <ProductPage product={product} sectionTitle={title} />
}