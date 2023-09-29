import { useRouter } from "next/router";
import ROUTERS from "@/constants/routers";

export default function ManagementRam() {
    const router = useRouter();
    router.push(ROUTERS.MANAGEMENT.RAM.CAPACITY);
    return false;
}
