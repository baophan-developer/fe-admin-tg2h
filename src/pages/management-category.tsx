import React from "react";
import { Input, FormItemProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import TableView from "@/components/templates/TableView";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

interface ICategory {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "name",
    label: "Nhu cầu người dùng",
    rules: [
        {
            required: true,
            message: "Thông tin này là bắt buộc.",
        },
    ],
    children: <Input placeholder="Nhập nhu cầu người dùng." />,
};

const columns: ColumnsType<ICategory> = [
    { title: "STT", dataIndex: "key" },
    { title: "Nhu cầu người dùng", dataIndex: "name" },
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
                        title: "Cập nhật nhu cầu người dùng.",
                        data: {
                            id: record._id,
                            initialValueForm: { name: record.name },
                        },
                    }}
                    deleteAction={{
                        title: "Xóa nhu cầu người dùng",
                        children: "Bạn có muốn xóa nhu cầu người dùng?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_CATEGORY}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_CATEGORY}
                />
            );
        },
    },
];

export default function ManagementSizeScreen() {
    return (
        <div>
            <TableView
                title="Quản lý nhu cầu người dùng"
                api={API_ENDPOINT.MANAGEMENT_CATEGORY}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_CATEGORY}
                columns={columns}
                create={{
                    button: { children: "Thêm mới", icon: <PlusOutlined /> },
                    req: { method: "post", api: API_ENDPOINT.MANAGEMENT_CATEGORY },
                    title: "Thêm mới hệ điều hành",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
