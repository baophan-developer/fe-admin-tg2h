import React from "react";
import { FormItemProps, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import { TableView } from "@/components/templates";
import { PlusOutlined } from "@ant-design/icons";

interface ICapacityRom {
    _id: string;
    capacity: string;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "capacity",
    label: "Dung lượng ROM",
    rules: [{ required: true, message: "Thông tin này là bắt buộc." }],
    children: <Input placeholder="Nhập dung lượng ROM." />,
};

const columns: ColumnsType<ICapacityRom> = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Dung lượng ROM",
        dataIndex: "capacity",
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
                            initialValueForm: { capacity: record.capacity },
                        },
                        fields: [itemForm],
                        title: "Cập nhật dung lượng ROM",
                    }}
                    deleteAction={{
                        title: "Xóa dung lượng ROM",
                        children: "Bạn có muốn xóa dung lượng ROM?",
                        idUpdate: record._id,
                    }}
                    api={API_ENDPOINT.MANAGEMENT_CAPACITY_ROM}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_CAPACITY_ROM}
                />
            );
        },
    },
];

export default function ManagementCapacityRom() {
    return (
        <TableView
            title="Quản lý dung lượng ROM"
            getApi={{ method: "get", api: API_ENDPOINT.MANAGEMENT_CAPACITY_ROM }}
            keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_CAPACITY_ROM}
            columns={columns}
            create={{
                button: { children: "Thêm mới", icon: <PlusOutlined /> },
                req: { method: "post", api: API_ENDPOINT.MANAGEMENT_CAPACITY_ROM },
                title: "Thêm mới dung lượng ROM",
                fields: [itemForm],
            }}
        />
    );
}
