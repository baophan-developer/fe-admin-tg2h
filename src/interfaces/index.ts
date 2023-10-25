import { EOrder, EStatusShipping } from "@/enums";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    birthday: Date;
    phone: string;
    gender: boolean;
    avatar: string;
    address: { address: string }[];
}

export interface IProduct {
    _id: string;
    name: string;
    images: string[];
    desc: string;
    price: number;
    length: number;
    height: number;
    width: number;
    weight: number;
    betterCapacity: string;
    newness: number;
    owner: {
        _id: string;
        name: string;
        avatar: string;
        phone: string;
        birthday: string;
        gender: boolean;
        email: string;
    };
    sizeScreen: { size: string };
    scanFrequency: { scanFrequency: string };
    resolutionScreen: { name: string };
    typeRam: { name: string };
    capacityRam: { capacity: string };
    typeRom: { name: string };
    capacityRom: { capacity: string };
    gpu: { name: string };
    cpu: { name: string };
    os: { name: string };
    brand: { name: string };
    category: { name: string };
    approve: boolean;
    status: boolean;
}

export interface IPayment {
    name: string;
}

export interface IShipping extends IPayment {}

export interface IItemOrder {
    product: IProduct;
    discount: {
        code: string;
        percent: number;
    };
    quantity: number;
    price: number;
}

export interface IOrder {
    _id: string;
    owner: IUser;
    seller: IUser;
    shipping: IShipping;
    payment: IPayment;
    pickupAddress: string;
    deliveryAddress: string;
    items: IItemOrder[];
    totalPayment: number;
    statusPayment: boolean;
    statusShipping:
        | EStatusShipping.PENDING
        | EStatusShipping.PREPARING
        | EStatusShipping.IN_STORE
        | EStatusShipping.DELIVER_RECEIVE_ITEM
        | EStatusShipping.DELIVERING
        | EStatusShipping.DELIVERED;
    statusOrder:
        | EOrder.ORDERED
        | EOrder.CANCEL
        | EOrder.FINISH
        | EOrder.DELIVERING
        | EOrder.REQUEST_REFUND;
    reasonCancel: string;
    /** status is status order wait seller accept order */
    status: boolean;
    refund: boolean;
}
