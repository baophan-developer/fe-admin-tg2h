export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ENDPOINT = {
    AUTH: {
        LOGIN: "auth/admin-login",
        LOGOUT: "auth/logout",
        REFRESH_TOKEN: "auth/refresh-token",
    },
    PROFILE: {
        GET: "/profile",
        UPDATE_AVATAR: "/profile/update-avatar",
        UPDATE_PROFILE: "/profile/update-profile",
    },
    PRODUCT: {
        GET: "/product",
        REJECT: "/product/reject",
        APPROVE: "/product/approve",
    },
    USER: {
        GET: "/user",
    },
    MANAGEMENT_SIZE_SCREEN: "/size-screen",
    MANAGEMENT_SCAN_FREQUENCY_SCREEN: "/scan-frequency-screen",
    MANAGEMENT_RESOLUTION_SCREEN: "/resolution-screen",
    MANAGEMENT_TYPE_ROM: "/type-rom",
    MANAGEMENT_CAPACITY_ROM: "/capacity-rom",
    MANAGEMENT_TYPE_RAM: "/type-ram",
    MANAGEMENT_CAPACITY_RAM: "/capacity-ram",
    MANAGEMENT_GPU: "/gpu",
    MANAGEMENT_CPU: "/cpu",
    MANAGEMENT_OS: "/os",
    MANAGEMENT_CATEGORY: "/category",
    MANAGEMENT_BRAND: "/brand",
};
