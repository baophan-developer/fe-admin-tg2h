import React from "react";
import LoginLayout from "@/layouts/LoginLayout";

export default function Login() {
    return <div>This is login page</div>;
}

Login.getLayout = function getLayout(page: React.ReactElement) {
    return <LoginLayout>{page}</LoginLayout>;
};
