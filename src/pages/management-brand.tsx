import React from "react";
import { Input, FormItemProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import TableView from "@/components/templates/TableView";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

interface IBrand {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "name",
    label: "Tên thương hiệu",
    rules: [
        {
            required: true,
            message: "Thông tin này là bắt buộc.",
        },
    ],
    children: <Input placeholder="Nhập tên thương hiệu." />,
};

const columns: ColumnsType<IBrand> = [
    { title: "STT", dataIndex: "key" },
    { title: "Thương hiệu", dataIndex: "name" },
    { title: "Ngày tạo", dataIndex: "createdAt" },
    { title: "Ngày cập nhật", dataIndex: "updatedAt" },
    {
        title: "Hành vi",
        width: "200px",
        render: (_, record) => {
            return (
                <ColumnActions
                    updateAction={{
                        fields: [itemForm],
                        title: "Cập nhật tên thương hiệu.",
                        data: {
                            id: record._id,
                            initialValueForm: { name: record.name },
                        },
                    }}
                    deleteAction={{
                        title: "Xóa thông tin thương hiệu",
                        children: "Bạn có muốn xóa thương hiệu này?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_BRAND}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_BRAND}
                />
            );
        },
    },
];

export default function ManagementSizeScreen() {
    return (
        <div>
            <TableView
                title="Quản lý thông tin thương hiệu"
                api={API_ENDPOINT.MANAGEMENT_BRAND}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_BRAND}
                columns={columns}
                create={{
                    button: { children: "Thêm mới", icon: <PlusOutlined /> },
                    req: { method: "post", api: API_ENDPOINT.MANAGEMENT_BRAND },
                    title: "Thêm mới thương hiệu",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
