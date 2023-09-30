import FromCustom from "@/components/templates/FormCustom";
import request, { TRequest } from "@/services/request";
import { Button, ButtonProps, Form, FormItemProps, Modal, message } from "antd";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";

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
};

export default function ButtonFormModel({
    title,
    button,
    req,
    keyPubsub,
    data,
    fields = [],
}: TPropsButtonFormModel) {
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
