export interface IUser {
    email: string;
    name: string;
    birthday: Date;
    phone: string;
    gender: boolean;
    avatar: string;
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
