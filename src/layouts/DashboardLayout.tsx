import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PubSub from "pubsub-js";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { Avatar, Button, Layout, Menu, MenuProps, Popover, message } from "antd";
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
import request from "@/services/request";
import UserAtom from "@/stores/UserStore";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

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
            getItem("Độ phân giải", ROUTERS.MANAGEMENT.SCREEN.RESOLUTION),
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
    padding: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
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

const SiderStyled = styled(Sider)`
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    height: 100vh;
`;

const HeaderStyled = styled(Header)`
    display: flex;
    justify-content: space-between;
    padding: 0;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
`;

const UserBoxStyled = styled(Popover)`
    display: flex;
    align-items: center;
    gap: 0 10px;
    color: black;
    margin-right: 20px;
    cursor: pointer;
`;

const ContentPopoverStyled = styled.div`
    display: flex;
    flex-direction: column;

    & span {
        width: 100%;
        text-align: left;
    }
`;

export default function DashboardLayout({ children }: TProps) {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const router = useRouter();
    const [defaultSelectedKey, setDefaultSelectedKey] = useState<string>(router.pathname);
    const [user, setUser] = useRecoilState(UserAtom);

    const getUserInfo = async () => {
        try {
            const res = await request<any>("get", API_ENDPOINT.PROFILE.GET);
            setUser(res.data.item);
        } catch (error) {}
    };

    const handleLogout = async () => {
        try {
            const res = await request<any>("post", API_ENDPOINT.AUTH.LOGOUT);
            localStorage.removeItem("accessToken");
            message.success(res.data.message, 1);
            router.push(ROUTERS.LOGIN);
        } catch (error: any) {
            message.error(error.response.data.message, 1);
        }
    };

    useEffect(() => {
        getUserInfo();
        PubSub.subscribe(PUBSUB_SUBSCRIBE_NAME.GET_INFO, getUserInfo);
        return () => {
            PubSub.unsubscribe(PUBSUB_SUBSCRIBE_NAME.GET_INFO);
        };
    }, []);

    useEffect(() => {
        setDefaultSelectedKey(router.pathname);
    }, [router.pathname]);

    return (
        <Layout>
            <SiderStyled
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={210}
                theme="dark"
                style={{ position: "sticky" }}
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
            </SiderStyled>
            <Layout>
                <HeaderStyled style={{ position: "sticky" }}>
                    <ButtonStyled
                        type="text"
                        icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    <UserBoxStyled
                        content={
                            <ContentPopoverStyled>
                                <Button
                                    type="text"
                                    onClick={() => router.push(ROUTERS.PROFILE)}
                                >
                                    Tài khoản của tôi
                                </Button>
                                <Button type="text" onClick={handleLogout}>
                                    Đăng xuất
                                </Button>
                            </ContentPopoverStyled>
                        }
                        trigger="hover"
                        placement="bottomRight"
                    >
                        <Avatar src={user?.avatar} alt={user?.name} />
                        <p>{user?.name}</p>
                    </UserBoxStyled>
                </HeaderStyled>
                <ContentStyled>{children}</ContentStyled>
                <Footer style={{ textAlign: "center" }}>@tg2h.com</Footer>
            </Layout>
        </Layout>
    );
}
