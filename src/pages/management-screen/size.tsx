import React from "react";
import styled from "styled-components";
import { Input, FormItemProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import TableView from "@/components/templates/TableView";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

const ActionStyled = styled.div`
    display: flex;
    gap: 0 10px;
`;

interface ISizeScreen {
    _id: string;
    size: number;
    createAt: Date;
    updateAt: Date;
}

const itemForm: FormItemProps = {
    name: "size",
    label: "Kích cỡ",
    rules: [
        {
            required: true,
            message: "Thông tin này là bắt buộc.",
        },
    ],
    children: <Input placeholder="Nhập kích cỡ màn hình." />,
};

const columns: ColumnsType<ISizeScreen> = [
    { title: "STT", dataIndex: "key" },
    { title: "Name", dataIndex: "size" },
    { title: "Create at", dataIndex: "createdAt" },
    { title: "Update at", dataIndex: "updatedAt" },
    {
        title: "Action",
        width: "200px",
        render: (_, record) => {
            return (
                <ColumnActions
                    updateAction={{
                        fields: [itemForm],
                        title: "Cập nhật thông tin kích cỡ màn hình",
                        data: {
                            id: record._id,
                            initialValueForm: { size: record.size },
                        },
                    }}
                    deleteAction={{
                        title: "Xóa kích cỡ màn hình",
                        children: "Bạn có muốn xóa thông tin này?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_SCREEN}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_SCREEN}
                />
            );
        },
    },
];

export default function ManagementSizeScreen() {
    return (
        <div>
            <TableView
                title="Quản lý kích cỡ màn hình"
                api={API_ENDPOINT.MANAGEMENT_SCREEN}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_SCREEN}
                columns={columns}
                create={{
                    button: { children: "Tạo mới", icon: <PlusOutlined /> },
                    req: { method: "post", api: API_ENDPOINT.MANAGEMENT_SCREEN },
                    title: "Tạo mới kích cỡ màn hình",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
