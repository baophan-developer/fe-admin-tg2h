import React from "react";
import { Input, FormItemProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import TableView from "@/components/templates/TableView";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

interface IOs {
    _id: string;
    name: number;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "name",
    label: "Tên hệ điều hành",
    rules: [
        {
            required: true,
            message: "Thông tin này là bắt buộc.",
        },
    ],
    children: <Input placeholder="Nhập tên hệ điều hành." />,
};

const columns: ColumnsType<IOs> = [
    { title: "STT", dataIndex: "key" },
    { title: "Tên hệ điều hành", dataIndex: "name" },
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
                        title: "Cập nhật thông tin hệ điều hành.",
                        data: {
                            id: record._id,
                            initialValueForm: { name: record.name },
                        },
                    }}
                    deleteAction={{
                        title: "Xóa thông tin hệ điều hành",
                        children: "Bạn có muốn xóa thông tin hệ điều hành này?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_OS}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_OS}
                />
            );
        },
    },
];

export default function ManagementSizeScreen() {
    return (
        <div>
            <TableView
                title="Quản lý thông tin hệ điều hành"
                api={API_ENDPOINT.MANAGEMENT_OS}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_OS}
                columns={columns}
                create={{
                    button: { children: "Thêm mới", icon: <PlusOutlined /> },
                    req: { method: "post", api: API_ENDPOINT.MANAGEMENT_OS },
                    title: "Thêm mới hệ điều hành",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
