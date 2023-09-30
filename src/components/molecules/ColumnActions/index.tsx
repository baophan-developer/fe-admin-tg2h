import React from "react";
import styled from "styled-components";
import { ButtonFormModel, ButtonModel } from "..";
import { FormItemProps } from "antd";

type TProps = {
    updateAction: {
        title: string;
        data: { id: string; initialValueForm: any };
        fields: FormItemProps[];
    };
    deleteAction: {
        title: string;
        idUpdate: string;
        children: React.ReactNode;
    };
    keyPubsub: string;
    api: string;
};

const ActionStyled = styled.div`
    display: flex;
    gap: 0 10px;
`;

export default function ColumnActions({
    updateAction,
    deleteAction,
    keyPubsub,
    api,
}: TProps) {
    return (
        <ActionStyled>
            <ButtonFormModel
                title={updateAction.title}
                fields={updateAction.fields}
                req={{
                    method: "put",
                    api: api,
                }}
                data={updateAction.data}
                button={{ children: "Cập nhật" }}
                keyPubsub={keyPubsub}
            />
            <ButtonModel
                title={deleteAction.title}
                button={{ children: "Xóa", type: "primary", danger: true }}
                req={{
                    method: "delete",
                    api: `${api}/${deleteAction.idUpdate}`,
                }}
                keyPubsub={keyPubsub}
            >
                {deleteAction.children}
            </ButtonModel>
        </ActionStyled>
    );
}
