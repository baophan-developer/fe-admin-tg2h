import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import request from "@/services/request";
import { useRouter } from "next/router";
import { IUser } from "@/interfaces";
import { API_ENDPOINT } from "@/constants/apis";
import { Descriptions, Image } from "antd";
import { TableView } from "@/components/templates";
import columnsProducts from "@/configs/product-columns";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

const ContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: 5%;

    & h2 {
        font-weight: 400;
    }
`;

const LeftStyled = styled.div`
    padding-top: 20px;
    width: 200px;
    display: grid;
    gap: 20px;
    place-items: center;
    max-height: 200px;
`;

const RightStyled = styled.div`
    width: 1000px;
`;

export default function UserDetail() {
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState<IUser>();

    const getData = async (id: string) => {
        try {
            const res = await request<any>("get", `${API_ENDPOINT.USER.GET}/${id}`);
            setData(res.data.item);
        } catch (error) {}
    };

    useEffect(() => {
        getData(id as string);
    }, [id]);

    return (
        <ContainerStyled>
            <LeftStyled>
                <Image
                    src={data?.avatar}
                    width={200}
                    alt={data?.name}
                    preview={false}
                    style={{ borderRadius: "50%" }}
                />
                <h2>{data?.name}</h2>
            </LeftStyled>
            <RightStyled>
                <Descriptions
                    title="Thông tin liên hệ"
                    bordered
                    size="small"
                    items={[
                        { key: "1", label: "Email", children: data?.email, span: 2 },
                        { key: "2", label: "Số điện thoại", children: data?.phone },
                        {
                            key: "3",
                            label: "Ngày sinh",
                            children: dayjs(data?.birthday).format("YYYY-MM-DD"),
                            span: 2,
                        },
                        {
                            key: "4",
                            label: "Giới tính",
                            children: data?.gender ? "Nam" : "Nữ",
                        },
                        {
                            key: "5",
                            label: "Địa chỉ",
                            children: (
                                <div>
                                    {data?.address.map((item, index: number) => (
                                        <div key={index}>
                                            Địa chỉ số {index + 1}: {item.address}
                                        </div>
                                    ))}
                                </div>
                            ),
                        },
                    ]}
                />
                <TableView
                    title={
                        <div style={{ fontSize: "16px", fontWeight: 600 }}>
                            Danh sách sản phẩm
                        </div>
                    }
                    columns={columnsProducts.filter(
                        (item) =>
                            item.title !== "Hành vi" && item.title !== "Người yêu cầu"
                    )}
                    getApi={{ method: "post", api: API_ENDPOINT.PRODUCT.GET }}
                    keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_PRODUCT}
                    attributeQuery={[
                        { title: "Tên sản phẩm", value: "name" },
                        { title: "Giá thành", value: "price" },
                        { title: "Độ mới", value: "newness" },
                        { title: "Trạng thái", value: "approve" },
                    ]}
                    scroll={{ x: 700 }}
                    filters={{ owner: data?._id }}
                />
            </RightStyled>
        </ContainerStyled>
    );
}
