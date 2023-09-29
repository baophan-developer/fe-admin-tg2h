import ROUTERS from "@/constants/routers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type TProps = {
    children: React.ReactNode;
};

export default function PrivateRoutes({ children }: TProps) {
    const route = useRouter();
    const [authorized, setAuthorized] = useState<boolean>(false);

    let token: string | null | undefined = null;

    if (typeof window !== "undefined") token = localStorage.getItem("accessToken");

    const authCheck = (url: string) => {
        const publicPaths = [ROUTERS.LOGIN];

        const path = url.split("?")[0];

        if (!token && !publicPaths.includes(path)) route.push(ROUTERS.LOGIN);
        else setAuthorized(true);
    };

    useEffect(() => {
        // check auth
        authCheck(route.asPath);

        // on route change completed
        route.events.on("routeChangeComplete", authCheck);

        return () => {
            route.events.off("routeChangeComplete", authCheck);
        };
    }, [token]);

    return authorized && children;
}
