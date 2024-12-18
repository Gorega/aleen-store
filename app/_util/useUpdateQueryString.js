import { useRouter, useSearchParams } from "next/navigation";


export default function useUpdateQueryString(){
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateSearchParams = (key, value)=>{
        const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value); // Add or update the query parameter
            } else {
                params.delete(key); // Remove query if value is null
            }

        router.push(`?${params.toString()}`,{scroll:false});
    }

    return {updateSearchParams};
}