import React, { useState } from "react";
import LoginLayout from "@/layouts/LoginLayout";
import FromCustom from "@/components/templates/FormCustom";
import { getInputEmail, getInputPassword, getInputRememberMe } from "@/components/atoms";
import { message } from "antd";
import request from "@/services/request";
import { API_ENDPOINT } from "@/constants/apis";
import { useRouter } from "next/router";
import ROUTERS from "@/constants/routers";

export default function Login() {
    const route = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (value: any) => {
        setLoading(true);
        try {
            const res = await request("post", API_ENDPOINT.AUTH.LOGIN, value);
            // save token
            localStorage.setItem("accessToken", res.data.accessToken);
            message.success(res.data.message, 1);
            route.push(ROUTERS.HOME);
        } catch (error: any) {
            message.error(error.response.data.message, 1);
        }
        setLoading(false);
    };

    return (
        <FromCustom
            title="Đăng nhập"
            form={{ layout: "vertical", onFinish: onFinish }}
            fields={[getInputEmail(), getInputPassword(), getInputRememberMe()]}
            bottom={{
                buttons: [
                    {
                        type: "primary",
                        htmlType: "submit",
                        children: "Đăng nhập",
                        style: { width: "100%" },
                        loading: loading,
                    },
                ],
            }}
        />
    );
}

Login.getLayout = function getLayout(page: React.ReactElement) {
    return <LoginLayout>{page}</LoginLayout>;
};
