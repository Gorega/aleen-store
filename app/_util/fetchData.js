import {url} from "../../mongoose/url";

export async function fetchData(endpoint){
    const response = await fetch(`${url}${endpoint}`);
    const data = await response.json();
    return data;
}