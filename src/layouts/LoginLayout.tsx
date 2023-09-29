import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Header, Footer } = Layout;

type TProps = {
    children: React.ReactNode;
};

const HeadingTwoStyled = styled.h2`
    color: #fff;
`;

const LayoutStyled = styled(Layout)`
    min-height: 100vh;
    display: grid;
    place-items: center;
`;

const ContainerStyled = styled.div`
    min-width: 390px;
    background-color: #fff;
    padding: 20px;
`;

export default function LoginLayout({ children }: TProps) {
    return (
        <Layout>
            <Header>
                <HeadingTwoStyled>TG2H Dashboard</HeadingTwoStyled>
            </Header>
            <LayoutStyled>
                <ContainerStyled>{children}</ContainerStyled>
            </LayoutStyled>
            <Footer style={{ textAlign: "center" }}>@2023 tg2h dashboard</Footer>
        </Layout>
    );
}
