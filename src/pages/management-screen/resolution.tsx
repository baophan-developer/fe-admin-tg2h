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
    label: "Độ phân giải",
    rules: [
        {
            required: true,
            message: "Thông tin này là bắt buộc.",
        },
    ],
    children: <Input placeholder="Nhập độ phân giải." />,
};

const columns: ColumnsType<IBrand> = [
    { title: "STT", dataIndex: "key" },
    { title: "Độ phân giải màn hình", dataIndex: "name" },
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
                        title: "Cập nhật độ phân giải màn hình.",
                        data: {
                            id: record._id,
                            initialValueForm: { name: record.name },
                        },
                    }}
                    deleteAction={{
                        title: "Xóa độ phân giải màn hình",
                        children: "Bạn có muốn xóa độ phân giải màn hình này?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_RESOLUTION_SCREEN}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_RESOLUTION_SCREEN}
                />
            );
        },
    },
];

export default function ManagementSizeScreen() {
    return (
        <div>
            <TableView
                title="Quản lý độ phân giải màn hình"
                getApi={{ method: "get", api: API_ENDPOINT.MANAGEMENT_RESOLUTION_SCREEN }}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_RESOLUTION_SCREEN}
                columns={columns}
                create={{
                    button: { children: "Thêm mới", icon: <PlusOutlined /> },
                    req: {
                        method: "post",
                        api: API_ENDPOINT.MANAGEMENT_RESOLUTION_SCREEN,
                    },
                    title: "Thêm mới độ phân giải màn hình",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
