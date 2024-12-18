import CollectionsPage from "../../_components/CollectionsPage";
// import { url } from "@/mongoose/url";

// const fetchCollectionsData = async ()=>{
//     const response = await fetch(`${url}api/sections`);
//     const data = await response.json();
//     return data;
// }

export default async function Collections(){
    // const collections = await fetchCollectionsData();
    return <CollectionsPage collections={[]} />
}