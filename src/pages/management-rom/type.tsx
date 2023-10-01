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
    label: "Tên công nghệ ROM",
    rules: [{ required: true, message: "Thông tin này là bắt buộc." }],
    children: <Input placeholder="Nhập tên công nghệ ROM." />,
};

const columns: ColumnsType<ITypeRom> = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên công nghệ ROM",
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
                        title: "Cập nhật công nghệ ROM",
                    }}
                    deleteAction={{
                        title: "Xóa công nghệ ROM",
                        children: "Bạn có muốn xóa công nghệ ROM?",
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
            title="Quản lý công nghệ ROM"
            api={API_ENDPOINT.MANAGEMENT_TYPE_ROM}
            keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_TYPE_ROM}
            columns={columns}
            create={{
                button: { children: "Thêm mới", icon: <PlusOutlined /> },
                req: { method: "post", api: API_ENDPOINT.MANAGEMENT_TYPE_ROM },
                title: "Thêm mới công nghệ ROM",
                fields: [itemForm],
            }}
        />
    );
}
