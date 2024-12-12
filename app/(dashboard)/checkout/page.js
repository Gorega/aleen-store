import CheckoutPage from "../../_components/CheckoutPage";

export default function page(){
    if (typeof window === "undefined") {
        return null; // Avoid rendering on the server
    }
    return <CheckoutPage />
}