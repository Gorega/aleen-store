import Header from "../_components/Header";
import Sections from "../_components/Sections";
import Shopping from "../_components/shopping/Shopping";
import Popular from "../_components/popular/Popular";
import Services from "../_components/services/Services";
import { useFetch } from "../_util/useFetch";

export default async function Home() {
  const sections = await useFetch("api/sections");
  const products = await useFetch("api/products");

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
