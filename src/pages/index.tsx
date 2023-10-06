import React from "react";
import Link from "next/link";
import { Avatar, Image, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { IProduct } from "@/interfaces";
import { TableView } from "@/components/templates";
import { PendingStyled } from "@/components/atoms";
import { ButtonFormModel, ButtonModel } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

const columns: ColumnsType<IProduct> = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Người yêu cầu",
        render: (_, record) => (
            <div>
                <Avatar src={record.owner.avatar} /> {record.owner.name}
            </div>
        ),
    },
    {
        title: "Tên sản phẩm",
        render: (_, record) => (
            <Link style={{ color: "black" }} href={`/${record._id}`}>
                {record.name}
            </Link>
        ),
    },
    {
        title: "Giá thành",
        render: (_, record) => (
            <span>{record.price.toLocaleString("vi", { currency: "VND" })} vnd</span>
        ),
    },
    {
        title: "Mô tả sản phẩm",
        dataIndex: "desc",
    },
    {
        title: "Hình ảnh sản phẩm",
        render: (_, record) => (
            <div>
                {record.images.map((item, index) => (
                    <Image key={index} src={item} width={65} loading="eager" />
                ))}
            </div>
        ),
    },
    {
        title: "Độ mới",
        render: (_, record) => <div>{record.newness} %</div>,
    },
    {
        title: "Trạng thái",
        render: (_, record) => (
            <PendingStyled $status={record.approve}>
                {record.approve ? "Đã duyệt" : "Đang chờ duyệt"}
            </PendingStyled>
        ),
    },
    {
        title: "Hành vi",
        render: (_, record) => {
            return (
                <div style={{ display: "flex", gap: "10px" }}>
                    <ButtonFormModel
                        button={{
                            children: "Hủy",
                            type: "primary",
                            danger: true,
                            disabled: record.approve,
                        }}
                        title="Bạn có muốn từ chối sản phẩm?"
                        fields={[
                            {
                                name: "reason",
                                label: "Vui lòng nhập lý do mà bạn từ chối sản phẩm này.",
                                children: (
                                    <Input.TextArea
                                        placeholder="Lý do..."
                                        spellCheck={false}
                                    />
                                ),
                            },
                        ]}
                        req={{ method: "post", api: API_ENDPOINT.PRODUCT.REJECT }}
                        data={{ id: record._id }}
                        keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_PRODUCT}
                    />
                    <ButtonModel
                        button={{
                            children: "Duyệt",
                            type: "primary",
                            disabled: record.approve,
                        }}
                        title="Duyệt sản phẩm"
                        children="Sau khi sản phẩm được duyệt, nó sẽ được xuất hiện trên hệ thống người dùng."
                        req={{
                            method: "post",
                            api: API_ENDPOINT.PRODUCT.APPROVE,
                            id: record._id,
                        }}
                        keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_PRODUCT}
                    />
                </div>
            );
        },
    },
];

export default function Home() {
    return (
        <div>
            <TableView
                title="Quản lý sản phẩm"
                columns={columns}
                api={API_ENDPOINT.PRODUCT.GET}
                method="post"
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_PRODUCT}
            />
        </div>
    );
}
