import React from "react";
import { FormItemProps, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import { TableView } from "@/components/templates";
import { PlusOutlined } from "@ant-design/icons";

interface ITypeRam {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "name",
    label: "Tên loại RAM",
    rules: [{ required: true, message: "Thông tin này là bắt buộc." }],
    children: <Input placeholder="Nhập tên loại RAM." />,
};

const columns: ColumnsType<ITypeRam> = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên loại RAM",
        dataIndex: "name",
    },
    { title: "Ngày tạo", dataIndex: "createdAt" },
    { title: "Ngày cập nhật", dataIndex: "updatedAt" },
    {
        title: "Hành vi",
        width: "200px",
        render: (_, record) => {
            return (
                <ColumnActions
                    updateAction={{
                        data: {
                            id: record._id,
                            initialValueForm: { name: record.name },
                        },
                        fields: [itemForm],
                        title: "Cập nhật loại RAM",
                    }}
                    deleteAction={{
                        title: "Xóa loại rom",
                        children: "Bạn có muốn xóa loại RAM",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_TYPE_RAM}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_TYPE_RAM}
                />
            );
        },
    },
];

export default function ManagementCapacityRom() {
    return (
        <TableView
            title="Quản lý loại RAM"
            api={API_ENDPOINT.MANAGEMENT_TYPE_RAM}
            keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_TYPE_RAM}
            columns={columns}
            create={{
                button: { children: "Tạo mới", icon: <PlusOutlined /> },
                req: { method: "post", api: API_ENDPOINT.MANAGEMENT_TYPE_RAM },
                title: "Tạo mới loại ROM",
                fields: [itemForm],
            }}
        />
    );
}
