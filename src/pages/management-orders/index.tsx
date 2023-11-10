import React, { useEffect, useState } from "react";
import { TableColumnsType, Table, Select, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableView } from "@/components/templates";
import { IItemOrder, IOrder } from "@/interfaces";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import { EOrder, EStatusShipping } from "@/enums";
import request from "@/services/request";

const options = [
    { label: EStatusShipping.PREPARING, value: EStatusShipping.PREPARING },
    { label: EStatusShipping.IN_STORE, value: EStatusShipping.IN_STORE },
    {
        label: EStatusShipping.DELIVER_RECEIVE_ITEM,
        value: EStatusShipping.DELIVER_RECEIVE_ITEM,
    },
    { label: EStatusShipping.DELIVERING, value: EStatusShipping.DELIVERING },
    { label: EStatusShipping.DELIVERED, value: EStatusShipping.DELIVERED },
];

const ChangeStatusShipping = ({ record }: { record: IOrder }) => {
    const [defaultVal, setDefaultVal] = useState<EStatusShipping>();

    const handleUpdateStatusShipping = async (value: string) => {
        try {
            const res = await request<any>("post", API_ENDPOINT.ORDER.CHANGE_SHIPPING, {
                orderId: record._id,
                shipping: value,
            });
            message.success(res.data.message);
            PubSub.publishSync(PUBSUB_SUBSCRIBE_NAME.GET_ORDER);
        } catch (error: any) {
            message.error(error.response.data.message);
        }
    };

    useEffect(() => {
        setDefaultVal(record.statusShipping);
    }, [record.statusShipping]);

    return (
        <Select
            disabled={
                record.statusShipping === EStatusShipping.DELIVERED ||
                record.statusOrder === EOrder.CANCEL
            }
            style={{ width: "100%" }}
            value={defaultVal}
            options={options}
            onChange={(value) => handleUpdateStatusShipping(value)}
        />
    );
};

const columns: ColumnsType<IOrder> = [
    {
        title: "STT",
        dataIndex: "key",
        width: 50,
    },
    {
        title: "Người mua",
        render: (_, record) => {
            return <div>{record.owner.name}</div>;
        },
    },
    {
        title: "Người bán",
        render: (_, record) => {
            return <div>{record.seller.name}</div>;
        },
    },
    {
        title: "Tổng thanh toán",
        render: (_, record) => {
            return <div>{record.totalPayment.toLocaleString("vi")}</div>;
        },
    },
    {
        title: "Hình thức thanh toán",
        render: (_, record) => {
            return <div>{record.payment.name}</div>;
        },
        width: 200,
    },
    {
        title: "Hình thức vận chuyển",
        render: (_, record) => {
            return <div>{record.shipping.name}</div>;
        },
        width: 160,
    },
    {
        title: "Trạng thái đơn",
        dataIndex: "statusOrder",
    },
    {
        title: "Ngày tạo đơn",
        dataIndex: "createdAt",
    },
    {
        title: "Cập nhật gần nhất",
        dataIndex: "updatedAt",
    },
    {
        title: "Trạng thái vận chuyển",
        render: (_, record) => <ChangeStatusShipping record={record} />,
        width: 250,
        fixed: "right",
    },
];

const expandedRowRender = (record: IOrder) => {
    const columns: TableColumnsType<IItemOrder> = [
        {
            title: "Tên sản phẩm",
            render: (_, record) => <div>{record.product.name}</div>,
            width: 300,
        },
        {
            title: "Giá thành",
            render: (_, record) => <div>{record.product.price.toLocaleString("vi")}</div>,
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Mã giảm giá",
            render: (_, record) => (
                <div>{record?.discount?.code ? record.discount.code : "Không có"}</div>
            ),
        },
        {
            title: "Tổng tiền",
            render: (_, record) => <div>{record.price.toLocaleString("vi")}</div>,
        },
    ];
    return (
        <Table
            size="small"
            columns={columns}
            dataSource={record.items}
            pagination={false}
        />
    );
};

export default function ManagementOrders() {
    return (
        <div>
            <TableView
                title="Quản lý đơn hàng"
                columns={columns}
                expandedRowRender={expandedRowRender}
                getApi={{ method: "post", api: API_ENDPOINT.ORDER.GET }}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_ORDER}
                scroll={{ x: 1600 }}
            />
        </div>
    );
}
