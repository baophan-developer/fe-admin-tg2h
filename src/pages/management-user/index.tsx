import React from "react";
import { TableView } from "@/components/templates";
import { ColumnsType } from "antd/es/table";
import { IUser } from "@/interfaces";
import { PendingStyled } from "@/components/atoms";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import Link from "next/link";
import ROUTERS from "@/constants/routers";

const columns: ColumnsType<IUser> = [
    {
        title: "STT",
        dataIndex: "key",
    },
    {
        title: "Tên người dùng",
        sorter: true,
        render: (_, record) => (
            <Link
                style={{ color: "black" }}
                href={`${ROUTERS.MANAGEMENT.USER}/${record._id}`}
            >
                {record.name}
            </Link>
        ),
    },
    {
        title: "Email",
        dataIndex: "email",
        sorter: true,
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone",
    },
    {
        title: "Giới tính",
        render: (_, record) => (
            <PendingStyled $status={record.gender}>
                {record.gender ? "Nam" : "Nữ"}
            </PendingStyled>
        ),
        sorter: true,
    },
];

export default function ManagementUsers() {
    return (
        <div>
            <TableView
                title="Quản lý người dùng"
                columns={columns}
                getApi={{ method: "post", api: API_ENDPOINT.USER.GET }}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_USER}
                attributeQuery={[
                    { title: "Tên người dùng", value: "name" },
                    { title: "Email", value: "email" },
                    { title: "Giới tính", value: "gender" },
                ]}
            />
        </div>
    );
}
