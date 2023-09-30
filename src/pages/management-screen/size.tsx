import React from "react";
import { Layout, Input, FormItemProps } from "antd";
import styled from "styled-components";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import TableView from "@/components/templates/TableView";
import { ButtonFormModel, ButtonModel } from "@/components/molecules";
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
                <ActionStyled>
                    <ButtonModel
                        title="Xóa"
                        button={{ children: "Xóa", type: "primary", danger: true }}
                        req={{
                            method: "delete",
                            api: `${API_ENDPOINT.MANAGEMENT_SCREEN}/${record._id}`,
                        }}
                        keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_SCREEN}
                    >
                        Bạn có muốn xóa?
                    </ButtonModel>
                    <ButtonFormModel
                        title="Cập nhật"
                        button={{ children: "Cập nhật" }}
                        fields={[itemForm]}
                        req={{ method: "put", api: API_ENDPOINT.MANAGEMENT_SCREEN }}
                        data={{ id: record._id, initialValueForm: { size: record.size } }}
                        keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_SCREEN}
                    />
                </ActionStyled>
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
