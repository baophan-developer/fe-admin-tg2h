import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Button, Form, Image, UploadFile, Upload, message } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import UserAtom from "@/stores/UserStore";
import request from "@/services/request";
import { FormCustom } from "@/components/templates";
import {
    getInputChooseDay,
    getInputEmail,
    getInputGender,
    getInputName,
    getInputPhoneNumber,
} from "@/components/atoms";
import PUBSUB_SUBSCRIBE_NAME from "@/constants/pubsub";
import { API_ENDPOINT } from "@/constants/apis";
import { ACCEPT_IMAGE_SIZE, IMAGE_TYPE } from "@/constants/image";

const TitleStyled = styled.div`
    margin-bottom: 20px;
    font-size: 1.5em;
    text-align: center;
`;

const ContentStyled = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BoxAvatarStyled = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px 0;
`;

const UploadButtonStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export default function Profile() {
    const user = useRecoilValue(UserAtom);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<UploadFile | Blob>();
    const [imgUrl, setImgUrl] = useState<string>();

    const handleUploadAvatar = async () => {
        setLoading(true);
        try {
            if (file) {
                const form = new FormData();
                form.append("avatar", file as Blob);
                const res = await request<any>(
                    "put",
                    API_ENDPOINT.PROFILE.UPDATE_AVATAR,
                    form
                );
                message.success(res.data.message, 1);
                PubSub.publishSync(PUBSUB_SUBSCRIBE_NAME.GET_INFO);
            } else {
                message.info("Bạn chưa chọn ảnh đại diện mới.");
            }
        } catch (error: any) {
            message.error(error.response.data.message, 1);
        }
        setLoading(false);
    };

    const handleOnChangeUpload = (info: UploadChangeParam<UploadFile>) => {
        const file = info.fileList[0];
        let checkSize = false;
        let checkType = false;

        if (file.size && file.type) {
            checkSize = file.size < ACCEPT_IMAGE_SIZE;
            checkType = [IMAGE_TYPE.JPEG, IMAGE_TYPE.PNG].includes(file.type);
        }

        if (!checkSize) {
            message.error(
                `Hình ảnh chỉ được phép dưới ${ACCEPT_IMAGE_SIZE / (1024 * 2)}MB`
            );
            info.fileList.pop();
            return;
        }

        if (!checkType) {
            message.error(
                `Chỉ chấp nhận các tệp ảnh có định dạng là ${IMAGE_TYPE.JPEG} và ${IMAGE_TYPE.PNG}`
            );
            info.fileList.pop();
            return;
        }

        if (file.originFileObj) {
            getBase64(file.originFileObj as RcFile, (url) => {
                setImgUrl(url);
            });
        }
        setFile(file.originFileObj);
        info.fileList.pop();
    };

    const updateInfo = async (value: any) => {
        setLoading(true);
        try {
            const res = await request("put", API_ENDPOINT.PROFILE.UPDATE_PROFILE, {
                ...value,
                birthday: dayjs(value.birthday).format("YYYY-MM-DD"),
            });
            message.success(res.data.message);
            PubSub.publishSync(PUBSUB_SUBSCRIBE_NAME.GET_INFO);
        } catch (error: any) {
            message.error(error.response.data.message, 1);
        }
        setLoading(false);
    };

    const handleResetForm = () => {
        form.setFieldsValue({ ...user, birthday: dayjs(user.birthday) });
    };

    useEffect(() => {
        form.setFieldsValue({ ...user, birthday: dayjs(user.birthday) });
        setImgUrl(user.avatar);
    }, [user]);

    return (
        <div>
            <TitleStyled>Thông tin cá nhân</TitleStyled>
            <ContentStyled>
                <BoxAvatarStyled>
                    <Upload
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleOnChangeUpload}
                        accept="image/*"
                    >
                        <UploadButtonStyled>
                            <Image
                                src={imgUrl}
                                alt={user.name}
                                width={200}
                                height={200}
                                preview={false}
                                style={{ cursor: "pointer", objectFit: "cover" }}
                            />
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </UploadButtonStyled>
                    </Upload>
                    <Button loading={loading} type="primary" onClick={handleUploadAvatar}>
                        Lưu
                    </Button>
                </BoxAvatarStyled>
                <div style={{ width: "50%" }}>
                    <FormCustom
                        form={{
                            form: form,
                            onFinish: updateInfo,
                            labelCol: { span: 5 },
                            wrapperCol: { span: 16 },
                            style: { width: "100%" },
                        }}
                        fields={[
                            getInputEmail({ disabled: true }),
                            getInputName(),
                            getInputPhoneNumber(),
                            getInputChooseDay(),
                            getInputGender(),
                        ]}
                        bottom={{
                            item: { wrapperCol: { offset: 5 } },
                            buttons: [
                                {
                                    htmlType: "submit",
                                    children: "Cập nhật",
                                    type: "primary",
                                    loading: loading,
                                },
                                {
                                    type: "default",
                                    children: "Hủy",
                                    style: { marginLeft: "5px" },
                                    onClick: handleResetForm,
                                },
                            ],
                        }}
                    />
                </div>
            </ContentStyled>
        </div>
    );
}
