import React, { useState } from "react";
import { isEmpty } from "lodash";
import request, { TRequest } from "@/services/request";
import { Button, ButtonProps, Modal, message } from "antd";

type TProps = {
    title?: React.ReactNode;
    button?: ButtonProps;
    req?: { method: TRequest; api: string; id?: string | number };
    children?: React.ReactNode;
    keyPubsub?: string;
};

export default function ButtonModel({ title, button, req, children, keyPubsub }: TProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleOk = async () => {
        setLoading(true);
        if (!isEmpty(req)) {
            try {
                const res = await request<any>(req?.method, req?.api, { id: req.id });
                keyPubsub && PubSub.publishSync(keyPubsub);
                message.success(res.data.message);
            } catch (error: any) {
                message.error(error.response.data.message);
                // If receive error, then do not close
                return;
            }
        }
        setLoading(false);
        setOpen(false);
    };

    return (
        <div>
            <Button {...button} onClick={() => setOpen(true)} />
            <Modal
                open={open}
                title={title}
                okText="Xác nhận"
                cancelText="Hủy"
                onCancel={() => setOpen(false)}
                onOk={handleOk}
                okButtonProps={{ loading: loading, type: "primary", danger: true }}
            >
                {children}
            </Modal>
        </div>
    );
}
