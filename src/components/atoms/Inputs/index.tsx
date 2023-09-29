import { emailRegex, phoneRegex } from "@/regex";
import { Input, Checkbox } from "antd";
import type { InputProps, FormItemProps, CheckboxProps } from "antd";

export const getInputEmail = (inputProps?: InputProps): FormItemProps => {
    return {
        name: "email",
        label: "Email",
        rules: [
            { required: true, message: "Email là bắt buộc." },
            { pattern: emailRegex, message: "Không đúng định dạng email." },
        ],
        children: <Input {...inputProps} placeholder="Nhập địa chỉ email" />,
    };
};

export const getInputPassword = (inputProps?: InputProps): FormItemProps => {
    return {
        name: "password",
        label: "Mật khẩu",
        rules: [
            { required: true, message: "Mật khẩu là bắt buộc." },
            { min: 6, message: "Mật khẩu không ít hơn 6 ký tự." },
            { max: 12, message: "Mật khẩu không quá 12 ký tự." },
        ],
        children: (
            <Input.Password {...inputProps} allowClear placeholder="Nhập mật khẩu." />
        ),
    };
};

export const getInputRememberMe = (checkboxProps?: CheckboxProps): FormItemProps => {
    return {
        name: "remember",
        valuePropName: "checked",
        children: <Checkbox {...checkboxProps}>Nhớ tôi</Checkbox>,
    };
};
