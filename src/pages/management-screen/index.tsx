import { useRouter } from "next/router";
import ROUTERS from "@/constants/routers";

export default function ManagementScreen() {
    const router = useRouter();
    router.push(ROUTERS.MANAGEMENT.SCREEN.SCAN_FREQUENCY);
    return false;
}
