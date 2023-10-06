import React from "react";
import { Input, FormItemProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import TableView from "@/components/templates/TableView";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import { method } from "lodash";

interface IGpu {
    _id: string;
    name: number;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "name",
    label: "Tên CPU",
    rules: [
        {
            required: true,
            message: "Thông tin này là bắt buộc.",
        },
    ],
    children: <Input placeholder="Nhập tên CPU." />,
};

const columns: ColumnsType<IGpu> = [
    { title: "STT", dataIndex: "key" },
    { title: "Tên CPU", dataIndex: "name" },
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
                        title: "Cập nhật thông tin CPU",
                        data: {
                            id: record._id,
                            initialValueForm: { name: record.name },
                        },
                    }}
                    deleteAction={{
                        title: "Xóa CPU",
                        children: "Bạn có muốn xóa thông tin CPU này?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_CPU}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_CPU}
                />
            );
        },
    },
];

export default function ManagementSizeScreen() {
    return (
        <div>
            <TableView
                title="Quản lý CPU"
                getApi={{ method: "get", api: API_ENDPOINT.MANAGEMENT_CPU }}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_CPU}
                columns={columns}
                create={{
                    button: { children: "Thêm mới", icon: <PlusOutlined /> },
                    req: { method: "post", api: API_ENDPOINT.MANAGEMENT_CPU },
                    title: "Thêm mới CPU",
                    fields: [itemForm],
                }}
            />
        </div>
    );
}
