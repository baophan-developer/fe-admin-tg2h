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
};