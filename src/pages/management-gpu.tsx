import React from "react";
import { Input, FormItemProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import TableView from "@/components/templates/TableView";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

interface IGpu {
    _id: string;
    name: number;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "name",
    label: "Tên GPU",
    rules: [
        {
            required: true,
            message: "Thông tin này là bắt buộc.",
        },
    ],
    children: <Input placeholder="Nhập tên GPU." />,
};

const columns: ColumnsType<IGpu> = [
    { title: "STT", dataIndex: "key" },
    { title: "Tên GPU", dataIndex: "name" },
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
                        title: "Cập nhật thông tin kích cỡ màn hình",
                        data: {
                            id: record._id,
                            initialValueForm: { name: record.name },
                        },
                    }}
                    deleteAction={{
                        title: "Xóa gpu",
                        children: "Bạn có muốn xóa thông tin GPU này?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_GPU}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_GPU}
                />
            );
        },
    },
];

export default function ManagementSizeScreen() {
    return (
        <div>
            <TableView
                title="Quản lý GPU"
                api={API_ENDPOINT.MANAGEMENT_GPU}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_GPU}
                columns={columns}
                create={{
                    button: { children: "Tạo mới", icon: <PlusOutlined /> },
                    req: { method: "post", api: API_ENDPOINT.MANAGEMENT_GPU },
                    title: "Tạo mới GPU",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
