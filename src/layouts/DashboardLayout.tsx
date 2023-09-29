import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button, Layout, Menu, MenuProps } from "antd";
import { getItem } from "@/components/atoms";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { CgSmartphoneRam } from "react-icons/cg";
import { MdScreenshotMonitor } from "react-icons/md";
import { AiOutlineDropbox, AiOutlineWindows } from "react-icons/ai";
import { BsCpu, BsGpuCard } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import ROUTERS from "@/constants/routers";

const { Header, Sider, Content, Footer } = Layout;

type TProps = {
    children: React.ReactNode;
};

const menuItems: MenuProps["items"] = [
    getItem("Quản lý sản phẩm", ROUTERS.HOME, <AiOutlineDropbox />),
    getItem("Quản lý người dùng", ROUTERS.MANAGEMENT.USER, <FaUser />),
    getItem(
        "Quản lý màn hình",
        ROUTERS.MANAGEMENT.SCREEN.INDEX,
        <MdScreenshotMonitor />,
        [
            getItem("Kích cỡ", ROUTERS.MANAGEMENT.SCREEN.SIZE),
            getItem("Tần số quét", ROUTERS.MANAGEMENT.SCREEN.SCAN_FREQUENCY),
        ]
    ),
    getItem("Quản lý RAM", ROUTERS.MANAGEMENT.RAM.INDEX, <CgSmartphoneRam />, [
        getItem("Dung lượng", ROUTERS.MANAGEMENT.RAM.CAPACITY),
        getItem("Loại RAM", ROUTERS.MANAGEMENT.RAM.TYPE),
    ]),
    getItem("Quản lý ROM", ROUTERS.MANAGEMENT.ROM.INDEX, <CgSmartphoneRam />, [
        getItem("Dung lượng", ROUTERS.MANAGEMENT.ROM.CAPACITY),
        getItem("Loại ROM", ROUTERS.MANAGEMENT.ROM.TYPE),
    ]),
    getItem("Quản lý GPU", ROUTERS.MANAGEMENT.GPU, <BsGpuCard />),
    getItem("Quản lý CPU", ROUTERS.MANAGEMENT.CPU, <BsCpu />),
    getItem("Quản lý hệ điều hành", ROUTERS.MANAGEMENT.OS, <AiOutlineWindows />),
    getItem("Quản lý thương hiệu", ROUTERS.MANAGEMENT.BRAND, <SiBrandfolder />),
    getItem("Quản lý nhu cầu", ROUTERS.MANAGEMENT.CATEGORY, <TbCategory />),
];

const LogoStyled = styled.div`
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
`;

const ButtonStyled = styled(Button)`
    font-size: 16px;
    height: 64px;
    width: 64px !important;
`;

const ContentStyled = styled(Content)`
    margin: 24px 16px;
    padding: 24px;
    min-height: 100vh;
    background: #fff;
`;

export default function DashboardLayout({ children }: TProps) {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const router = useRouter();
    const defaultSelectedKey = router.pathname;

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={210}
                theme="dark"
            >
                <LogoStyled></LogoStyled>
                <Menu
                    defaultSelectedKeys={[defaultSelectedKey]}
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    onClick={({ key }) => {
                        router.push(key);
                    }}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: "#fff" }}>
                    <ButtonStyled
                        type="text"
                        icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </Header>
                <ContentStyled>{children}</ContentStyled>
                <Footer style={{ textAlign: "center" }}>@tg2h.com</Footer>
            </Layout>
        </Layout>
    );
}
