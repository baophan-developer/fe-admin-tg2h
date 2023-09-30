import React from "react";
import { FormItemProps, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import { TableView } from "@/components/templates";
import { PlusOutlined } from "@ant-design/icons";

interface ITypeRom {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "name",
    label: "Tên loại ROM",
    rules: [{ required: true, message: "Thông tin này là bắt buộc." }],
    children: <Input placeholder="Nhập tên loại ROM." />,
};

const columns: ColumnsType<ITypeRom> = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên loại ROM",
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
                        title: "Cập nhật loại ROM",
                    }}
                    deleteAction={{
                        title: "Xóa loại rom",
                        children: "Bạn có muốn xóa loại rom",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_TYPE_ROM}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_TYPE_ROM}
                />
            );
        },
    },
];

export default function ManagementCapacityRom() {
    return (
        <TableView
            title="Quản lý loại ROM"
            api={API_ENDPOINT.MANAGEMENT_TYPE_ROM}
            keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_TYPE_ROM}
            columns={columns}
            create={{
                button: { children: "Tạo mới", icon: <PlusOutlined /> },
                req: { method: "post", api: API_ENDPOINT.MANAGEMENT_TYPE_ROM },
                title: "Tạo mới loại ROM",
                fields: [itemForm],
            }}
        />
    );
}
