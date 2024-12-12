import Header from "../_components/Header";
import Sections from "../_components/Sections";
import Shopping from "../_components/shopping/Shopping";
import Popular from "../_components/popular/Popular";
import Services from "../_components/services/Services";
import { fetchData } from "../_util/fetchData";


const sections = await fetchData("api/sections");
const products = await fetchData("api/products");

export default async function Home() {
  return (
    <>
    <Header />
    <Sections storeMenu={sections} />
    <Shopping sections={sections} />
    <Popular products={products}  />
    <Services />
    </>
  );
}
