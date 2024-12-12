import { useFetch } from "@/app/_util/useFetch";
import CollectionPage from "../../../_components/CollectionPage";
import {url} from "@/mongoose/url";

const grapSection = async (section)=>{
    const response = await fetch(`${url}/api/sections/${section}`);
    const data = await response.json();
    return data;
}

export default async function Collection({params}){
    const {section} = await params;

    const products = await useFetch(`api/products/${section}`);
    const sections = await useFetch("api/sections");
    const singleSection = await grapSection(section);

    return <>
        <CollectionPage
            products={products}
            sections={sections}
            section={singleSection}
        />
    </>
}