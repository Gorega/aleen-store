import Header from "../_components/Header";
import Sections from "../_components/Sections";
import Shopping from "../_components/shopping/Shopping";
import Popular from "../_components/popular/Popular";
import Services from "../_components/services/Services";
// import { fetchData } from "../_util/fetchData";


export default async function page() {

  // const sections = await fetchData("api/sections");
  // const tags = await fetchData("api/tags");
  // const products = await fetchData("api/products");

  return (
    <>
    <Header />
    <Sections storeMenu={[]} />
    <Shopping tags={[]} />
    <Popular products={[]}  />
    <Services />
    </>
  );
}
