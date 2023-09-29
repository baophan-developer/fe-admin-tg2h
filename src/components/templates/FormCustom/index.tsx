import React from "react";
import { Form, Button } from "antd";
import type { FormProps, FormItemProps, ButtonProps } from "antd";
import styled from "styled-components";
import { isEmpty } from "lodash";

type TProps = {
    title?: React.ReactNode;
    form: FormProps;
    fields: FormItemProps[];
    bottom?: {
        buttons?: ButtonProps[];
        item?: FormItemProps;
    };
};

const TitleStyled = styled.h2`
    margin-bottom: 30px;
    text-align: center;
`;

export default function FromCustom({ title, form, fields, bottom }: TProps) {
    return (
        <div style={{ width: "100%" }}>
            {title && <TitleStyled>{title}</TitleStyled>}
            <Form {...form}>
                {fields.map((item, index) => (
                    <Form.Item key={index} {...item} />
                ))}
                {!isEmpty(bottom) && (
                    <Form.Item {...bottom.item}>
                        {bottom.buttons?.map((item, index) => (
                            <Button key={index} {...item} />
                        ))}
                    </Form.Item>
                )}
            </Form>
        </div>
    );
}
