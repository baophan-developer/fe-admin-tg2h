import FromCustom from "@/components/templates/FormCustom";
import { useSocket } from "@/contexts/SocketContext";
import request, { TRequest } from "@/services/request";
import UserAtom from "@/stores/UserStore";
import { Button, ButtonProps, Form, FormItemProps, Modal, message } from "antd";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export type TPropsButtonFormModel = {
    title: string;
    button: ButtonProps;
    req: { api: string; method: TRequest };
    keyPubsub?: string;
    data?: {
        /** id use for update data */
        id?: any;
        initialValueForm?: any;
    };
    fields?: FormItemProps[];
    createNotification?: any;
};

export default function ButtonFormModel({
    title,
    button,
    req,
    keyPubsub,
    data,
    fields = [],
    createNotification,
}: TPropsButtonFormModel) {
    const user = useRecoilValue(UserAtom);
    const socket = useSocket();
    const [form] = Form.useForm();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (value: any) => {
        setLoading(true);
        try {
            const check = isEqual(value, data?.initialValueForm);
            if (check) {
                message.info("Chưa nhập thông tin mới.");
                setLoading(false);
                return;
            }
            const res = await request<any>(req.method, req.api, {
                id: data?.id,
                ...value,
            });

            if (createNotification)
                socket.emit("notification", {
                    title: "Sản phẩm của bạn đã bị từ chối",
                    message: `Sản phẩm ${createNotification.name} đã bị từ chối bởi ${user.name}`,
                    userReceive: createNotification.owner._id,
                });

            message.success(res.data.message);
        } catch (error: any) {
            message.error(error.response.data.message);
            // if receive a error, It do not close
            return;
        }
        keyPubsub && PubSub.publishSync(keyPubsub);
        form.resetFields();
        setLoading(false);
        setOpen(false);
    };

    useEffect(() => {
        form.setFieldsValue(data?.initialValueForm);
    }, [open]);

    return (
        <div>
            <Button {...button} onClick={() => setOpen(true)} />
            <Modal
                title={title}
                open={open}
                okText="Xác nhận"
                cancelText="Hủy"
                okButtonProps={{ loading: loading }}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    setOpen(false);
                    setLoading(false);
                }}
            >
                <FromCustom
                    form={{
                        layout: "vertical",
                        form: form,
                        initialValues: data?.initialValueForm,
                        onFinish: onFinish,
                    }}
                    fields={fields}
                />
            </Modal>
        </div>
    );
}
