import Link from "next/link";
import { Avatar, Image, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { IProduct } from "@/interfaces";
import { PendingStyled } from "@/components/atoms";
import { ButtonFormModel, ButtonModel } from "@/components/molecules";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";

const columnsProducts: ColumnsType<IProduct> = [
    {
        title: "STT",
        width: 60,
        dataIndex: "key",
        fixed: "left",
    },
    {
        title: "Người yêu cầu",
        fixed: "left",
        ellipsis: true,
        width: 170,
        render: (_, record) => (
            <div>
                <Avatar src={record.owner.avatar} /> {record.owner.name}
            </div>
        ),
    },
    {
        title: "Tên sản phẩm",
        sorter: true,
        ellipsis: true,
        render: (_, record) => (
            <Link style={{ color: "black" }} href={`/${record._id}`}>
                {record.name}
            </Link>
        ),
        width: 150,
    },
    {
        title: "Giá thành",
        sorter: true,
        render: (_, record) => (
            <span>{record.price.toLocaleString("vi", { currency: "VND" })} vnd</span>
        ),
        width: 150,
    },
    {
        title: "Mô tả sản phẩm",
        ellipsis: true,
        dataIndex: "desc",
        width: 200,
    },
    {
        title: "Hình ảnh sản phẩm",
        width: 200,
        render: (_, record) => (
            <div>
                {record.images.slice(0, 2).map((item, index) => (
                    <Image
                        preview={false}
                        key={index}
                        src={item}
                        width={65}
                        loading="eager"
                    />
                ))}
            </div>
        ),
    },
    {
        title: "Độ mới",
        sorter: true,
        render: (_, record) => <div>{record.newness} %</div>,
        width: 100,
    },
    {
        title: "Đã bán",
        dataIndex: "sold",
        width: 100,
    },
    {
        title: "Đánh giá",
        dataIndex: "reviews",
        width: 100,
    },
    {
        title: "Xếp hạng",
        dataIndex: "rating",
        width: 100,
        render: (_, record) => <>{record.rating.toFixed(2)}/5</>,
    },
    {
        title: "Trạng thái",
        fixed: "right",
        sorter: true,
        width: 150,
        render: (_, record) => (
            <PendingStyled $status={record.approve}>
                {record.approve ? "Đã duyệt" : "Đang chờ duyệt"}
            </PendingStyled>
        ),
    },
    {
        title: "Rao bán",
        fixed: "right",
        sorter: true,
        width: 150,
        render: (_, record) => (
            <PendingStyled $status={record.status}>
                {record.status
                    ? "Đang rao bán"
                    : record.approve
                    ? "Ngừng bán"
                    : "Đang chờ duyệt"}
            </PendingStyled>
        ),
    },
    {
        title: "Hành vi",
        width: 160,
        fixed: "right",
        render: (_, record) => {
            return (
                <div style={{ display: "flex", gap: "10px" }}>
                    <ButtonFormModel
                        button={{
                            children: "Hủy",
                            type: "primary",
                            danger: true,
                            disabled: record.approve,
                        }}
                        title="Bạn có muốn từ chối sản phẩm?"
                        fields={[
                            {
                                name: "reason",
                                label: "Vui lòng nhập lý do mà bạn từ chối sản phẩm này.",
                                children: (
                                    <Input.TextArea
                                        placeholder="Lý do..."
                                        spellCheck={false}
                                    />
                                ),
                            },
                        ]}
                        req={{ method: "put", api: API_ENDPOINT.PRODUCT.REJECT }}
                        data={{ id: record._id }}
                        keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_PRODUCT}
                        createNotification={record}
                    />
                    <ButtonModel
                        button={{
                            children: "Duyệt",
                            type: "primary",
                            disabled: record.approve,
                        }}
                        title="Duyệt sản phẩm"
                        children="Sau khi sản phẩm được duyệt, nó sẽ được xuất hiện trên hệ thống người dùng."
                        req={{
                            method: "put",
                            api: API_ENDPOINT.PRODUCT.APPROVE,
                            id: record._id,
                        }}
                        keyPubsub={PUBSUB_SUBSCRIBE_NAME.GET_PRODUCT}
                        createNotification={record}
                    />
                </div>
            );
        },
    },
];

export default columnsProducts;
