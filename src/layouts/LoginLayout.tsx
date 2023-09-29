import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

type TProps = {
    children: React.ReactNode;
};

export default function LoginLayout({ children }: TProps) {
    return (
        <Layout>
            <Header></Header>
            <Layout>{children}</Layout>
        </Layout>
    );
}
