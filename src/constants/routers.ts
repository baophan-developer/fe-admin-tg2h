const ROUTERS = {
    HOME: "/",
    LOGIN: "/login",
    PROFILE: "/profile",
    MANAGEMENT: {
        USER: "/management-user",
        GPU: "/management-gpu",
        CPU: "/management-cpu",
        OS: "/management-os",
        BRAND: "/management-brand",
        CATEGORY: "/management-category",
        SCREEN: {
            INDEX: "/management-screen",
            SIZE: "/management-screen/size",
            SCAN_FREQUENCY: "/management-screen/scan-frequency",
            RESOLUTION: "/management-screen/resolution",
        },
        RAM: {
            INDEX: "/management-ram",
            TYPE: "/management-ram/type",
            CAPACITY: "/management-ram/capacity",
        },
        ROM: {
            INDEX: "/management-rom",
            TYPE: "/management-rom/type",
            CAPACITY: "/management-rom/capacity",
        },
    },
};

export default ROUTERS;
