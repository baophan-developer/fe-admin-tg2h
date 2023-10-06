import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { Layout, Table, TableProps } from "antd";
import { styled } from "styled-components";
import request, { TRequest } from "@/services/request";
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
    getApi: { method: TRequest; api: string };
    keyPubSub: string;
    attributeQuery?: { title: string; value: string }[];
    /** create is a object for button form model create new item */
    create?: TPropsButtonFormModel;
};

interface IQuery {
    sort?: any;
    pagination: { page: number; limit: number };
}

export default function TableView({
    title,
    columns,
    getApi,
    attributeQuery,
    keyPubSub,
    create,
}: TProps) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState<IQuery>({
        pagination: {
            page: 0,
            limit: 10,
        },
    });
    const [total, setTotal] = useState<number>(10);

    const handleTableChange: TableProps<any>["onChange"] = (
        pagination,
        filters,
        sorter: any
    ) => {
        let sort: 1 | -1 | null = null;

        if (sorter.order) {
            if (sorter.order === "ascend") sort = 1;
            if (sorter.order === "descend") sort = -1;
        }

        const checkColumns = attributeQuery?.filter(
            (item) => item.title === sorter.column?.title
        )[0];

        if (checkColumns) {
            setQuery((prev) => ({
                ...prev,
                sort: {
                    [checkColumns?.value]: sort,
                },
            }));
        }

        if (pagination.current) {
            const page = pagination.current - 1;
            setQuery((prev) => ({
                ...prev,
                pagination: {
                    page: page || 0,
                    limit: pagination.pageSize || 10,
                },
            }));
        }
    };

    const getData = async () => {
        try {
            const res = await request<any>(getApi.method, getApi.api, query);
            const dataSource = res.data.list.map((item: any, index: number) => ({
                key: index + 1,
                ...item,
                createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:MM"),
                updatedAt: dayjs(item.updatedAt).format("YYYY-MM-DD HH:MM"),
            }));
            setData(dataSource);
            setTotal(res.data.total);
        } catch (error: any) {}
    };

    useEffect(() => {
        getData();
        console.log(1);
        PubSub.subscribe(keyPubSub, getData);
        return () => {
            PubSub.unsubscribe(keyPubSub);
        };
    }, [query]);

    return (
        <div>
            <HeaderStyled>
                <h2>{title}</h2>
                {!isEmpty(create) && (
                    <ButtonFormModel {...create} keyPubsub={keyPubSub} />
                )}
            </HeaderStyled>
            <Table
                columns={columns}
                dataSource={data}
                onChange={handleTableChange}
                pagination={{
                    total: total,
                }}
            />
        </div>
    );
}
