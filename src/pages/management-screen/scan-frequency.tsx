import React from "react";
import { FormItemProps, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { TableView } from "@/components/templates";
import { ColumnActions } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

interface IScanFrequencyScreen {
    _id: string;
    scanFrequency: string;
    createdAt: Date;
    updatedAt: Date;
}

const itemForm: FormItemProps = {
    name: "scanFrequency",
    label: "Tần số quét",
    rules: [{ required: true, message: "Thông tin là bắt buộc." }],
    children: <Input placeholder="Nhập tần số quét" />,
};

const columns: ColumnsType<IScanFrequencyScreen> = [
    { title: "STT", dataIndex: "key" },
    { title: "Tần số quét", dataIndex: "scanFrequency" },
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
                            initialValueForm: { scanFrequency: record.scanFrequency },
                        },
                        fields: [itemForm],
                        title: "Cập nhật thông tin quét màn hình.",
                    }}
                    deleteAction={{
                        idUpdate: record._id,
                        title: "Xóa tần số quét màn hình",
                        children: "Bạn có muốn xóa tần số quét màn hình?",
                    }}
                    api={API_ENDPOINT.MANAGEMENT_SCAN_FREQUENCY_SCREEN}
                    keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_SCAN_FREQUENCY}
                />
            );
        },
    },
];

export default function ManagementScanFrequencyScreen() {
    return (
        <TableView
            title="Quản lý tần số quét màn hình"
            columns={columns}
            getApi={{ method: "get", api: API_ENDPOINT.MANAGEMENT_SCAN_FREQUENCY_SCREEN }}
            keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_SCAN_FREQUENCY}
            create={{
                title: "Thêm mới tần số quét màn hình",
                button: { children: "Thêm mới", icon: <PlusOutlined /> },
                req: {
                    method: "post",
                    api: API_ENDPOINT.MANAGEMENT_SCAN_FREQUENCY_SCREEN,
                },
                fields: [itemForm],
            }}
        />
    );
}
