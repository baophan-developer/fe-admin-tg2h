import React from "react";
import { Input, FormItemProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import TableView from "@/components/templates/TableView";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

interface ISizeScreen {
    _id: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
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
    { title: "Kích cỡ", dataIndex: "size" },
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
                        title: "Cập nhật kích cỡ màn hình",
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
                    api={API_ENDPOINT.MANAGEMENT_SIZE_SCREEN}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_SIZE_SCREEN}
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
                getApi={{ method: "get", api: API_ENDPOINT.MANAGEMENT_SIZE_SCREEN }}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_SIZE_SCREEN}
                columns={columns}
                create={{
                    button: { children: "Thêm mới", icon: <PlusOutlined /> },
                    req: { method: "post", api: API_ENDPOINT.MANAGEMENT_SIZE_SCREEN },
                    title: "Thêm mới kích cỡ màn hình",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
