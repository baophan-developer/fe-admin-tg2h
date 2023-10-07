import React from "react";
import { TableView } from "@/components/templates";
import { API_ENDPOINT } from "@/constants/apis";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import columnsProducts from "@/configs/product-columns";

export default function Home() {
    return (
        <div>
            <TableView
                title="Quản lý sản phẩm"
                columns={columnsProducts}
                getApi={{ method: "post", api: API_ENDPOINT.PRODUCT.GET }}
                keyPubSub={PUBSUB_SUBSCRIBE_NAME.GET_PRODUCT}
                attributeQuery={[
                    { title: "Tên sản phẩm", value: "name" },
                    { title: "Giá thành", value: "price" },
                    { title: "Độ mới", value: "newness" },
                    { title: "Trạng thái", value: "approve" },
                ]}
                scroll={{ x: 1300 }}
            />
        </div>
    );
}
