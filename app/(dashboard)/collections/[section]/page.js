import { fetchData } from "../../../_util/fetchData";
import CollectionPage from "../../../_components/CollectionPage";
import {url} from "@/mongoose/url";

const grapSection = async (section)=>{
    const response = await fetch(`${url}api/sections/${section}`);
    const data = await response.json();
    return data;
}

export default async function page({params}){
    const {section} = await params;
    const singleSection = await grapSection(section);
    const products = await fetchData(`api/products/${section}`);
    const sections = await fetchData("api/sections");    

    return <>
        <CollectionPage
            products={products}
            sections={sections}
            section={singleSection}
        />
    </>
}