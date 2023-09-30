import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Layout, Table } from "antd";
import { styled } from "styled-components";
import request from "@/services/request";
import { ButtonFormModel } from "@/components/molecules";
import type { TPropsButtonFormModel } from "@/components/molecules";

const { Header } = Layout;

const HeaderStyled = styled(Header)`
    height: fit-content;
    background-color: #fff;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h2 {
        font-weight: 400;
    }
`;

type TProps = {
    title: React.ReactNode;
    columns: any;
    api: string;
    keyPubSub: string;
    /** create is a object for button form model create new item */
    create: TPropsButtonFormModel;
};

export default function TableView({ title, columns, api, keyPubSub, create }: TProps) {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await request<any>("get", api);
            const dataSource = res.data.list.map((item: any, index: number) => ({
                key: index + 1,
                ...item,
                createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:MM"),
                updatedAt: dayjs(item.updatedAt).format("YYYY-MM-DD HH:MM"),
            }));
            setData(dataSource);
        } catch (error: any) {}
    };

    useEffect(() => {
        getData();
        PubSub.subscribe(keyPubSub, getData);
        return () => {
            PubSub.unsubscribe(keyPubSub);
        };
    }, []);

    return (
        <div>
            <HeaderStyled>
                <h2>{title}</h2>
                <ButtonFormModel {...create} keyPubsub={keyPubSub} />
            </HeaderStyled>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}
