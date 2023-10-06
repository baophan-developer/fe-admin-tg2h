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
    };
    sizeScreen: string;
    scanFrequency: string;
    resolutionScreen: string;
    typeRam: string;
    capacityRam: string;
    typeRom: string;
    capacityRom: string;
    gpu: string;
    cpu: string;
    os: string;
    brand: string;
    category: string;
    approve: boolean;
    status: boolean;
}
