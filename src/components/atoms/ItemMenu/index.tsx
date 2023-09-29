import type { MenuProps } from "antd";

type TMenuItem = Required<MenuProps>["items"][number];

export default function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: TMenuItem[],
    type?: "group"
) {
    return {
        label,
        key,
        icon,
        children,
        type,
    } as TMenuItem;
}
