import { useRouter } from "next/router";
import ROUTERS from "@/constants/routers";

export default function ManagementRom() {
    const router = useRouter();
    router.push(ROUTERS.MANAGEMENT.ROM.CAPACITY);
    return false;
}
