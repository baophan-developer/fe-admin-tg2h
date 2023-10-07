import { emailRegex, phoneRegex } from "@/regex";
import { Input, Checkbox, Switch, DatePicker } from "antd";
import type { InputProps, FormItemProps, CheckboxProps, DatePickerProps } from "antd";

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

export const getInputName = (inputProps?: InputProps): FormItemProps => {
    return {
        name: "name",
        label: "Họ và tên",
        rules: [
            { required: true, message: "Chưa nhập họ và tên" },
            { min: 12, message: "Họ và tên không ít hơn 12 ký tự." },
            { max: 56, message: "Họ và tên không lớn hơn 56 ký tự." },
        ],
        children: <Input {...inputProps} placeholder="Nhập họ và tên" />,
    };
};

export const getInputPhoneNumber = (inputProps?: InputProps): FormItemProps => {
    return {
        name: "phone",
        label: "Số điện thoại",
        rules: [
            { required: true, message: "Bạn phải nhập số điện thoại." },
            { pattern: phoneRegex, message: "Chưa đúng định dạng số điện thoại." },
        ],
        children: <Input {...inputProps} placeholder="Nhập số điện thoại." />,
    };
};

export const getInputGender = (): FormItemProps => {
    return {
        name: "gender",
        label: "Giới tính",
        valuePropName: "checked",
        children: <Switch checkedChildren="Nam" unCheckedChildren="Nữ" />,
    };
};

export const getInputChooseDay = (dateProps?: DatePickerProps): FormItemProps => {
    return {
        name: "birthday",
        label: "Ngày sinh",
        children: <DatePicker {...dateProps} />,
    };
};
