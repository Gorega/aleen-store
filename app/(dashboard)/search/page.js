import { Suspense } from "react";
import SearchPage from "../../_components/SearchPage";

export default function Page(){
    return <Suspense>
        <SearchPage />
    </Suspense>
}