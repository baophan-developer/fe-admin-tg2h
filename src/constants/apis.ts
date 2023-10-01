export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ENDPOINT = {
    AUTH: {
        LOGIN: "auth/admin-login",
        LOGOUT: "auth/logout",
        REFRESH_TOKEN: "auth/refresh-token",
    },
    PROFILE: {
        GET: "/profile",
    },
    MANAGEMENT_SIZE_SCREEN: "/size-screen",
    MANAGEMENT_SCAN_FREQUENCY_SCREEN: "/scan-frequency-screen",
    MANAGEMENT_TYPE_ROM: "/type-rom",
    MANAGEMENT_CAPACITY_ROM: "/capacity-rom",
    MANAGEMENT_TYPE_RAM: "/type-ram",
    MANAGEMENT_CAPACITY_RAM: "/capacity-ram",
    MANAGEMENT_GPU: "/gpu",
    MANAGEMENT_CPU: "/cpu",
};
