import React, { useEffect, useState } from "react";
import { Carousel, Descriptions, Image, Layout } from "antd";
import { styled } from "styled-components";
import { useRouter } from "next/router";
import request from "@/services/request";
import { IProduct } from "@/interfaces";
import { API_ENDPOINT } from "@/constants/apis";
import dayjs from "dayjs";
import { PendingStyled } from "@/components/atoms";

const { Header } = Layout;

const MainStyled = styled.div`
    display: grid;
    place-items: center;
`;

const HeaderStyled = styled(Header)`
    background-color: white;
    color: black;

    & h2 {
        font-weight: 400;
    }
`;

const ContainerStyled = styled.div`
    display: flex;
    gap: 20px;
`;

const BoxSlideStyled = styled.div`
    width: 600px;
`;

const ListImagesStyled = styled.div`
    display: flex;
    justify-content: center;
`;

const InfoStyled = styled.div`
    & h3 {
        font-weight: 400;
    }
`;

export default function ProductDetail() {
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState<IProduct>();
    const carouselRef: any = React.createRef();

    const getProduct = async (id: string) => {
        try {
            const res = await request<any>("get", `${API_ENDPOINT.PRODUCT.GET}/${id}`);
            setData(res.data.item);
        } catch (error) {}
    };

    useEffect(() => {
        getProduct(id as string);
    }, [id]);

    return (
        <MainStyled>
            <HeaderStyled>
                <h2>Thông tin chi tiết sản phẩm</h2>
            </HeaderStyled>
            <ContainerStyled>
                <BoxSlideStyled>
                    <Carousel autoplay ref={carouselRef}>
                        {data?.images.map((item, index) => (
                            <Image key={index} src={item} width={600} />
                        ))}
                    </Carousel>
                    <ListImagesStyled>
                        {data?.images.map((item, index) => (
                            <Image
                                key={index}
                                src={item}
                                width={100}
                                preview={false}
                                onClick={() => carouselRef.current.goTo(index)}
                            />
                        ))}
                    </ListImagesStyled>
                </BoxSlideStyled>
                <InfoStyled>
                    <Descriptions
                        title="Thông tin người đăng"
                        size="small"
                        bordered
                        items={[
                            {
                                key: "1",
                                span: 3,
                                label: "Họ và tên",
                                children: data?.owner.name,
                            },
                            {
                                key: "2",
                                label: "Email",
                                children: data?.owner.email,
                            },
                            {
                                key: "3",
                                span: 3,
                                label: "Số điện thoại",
                                children: data?.owner.phone,
                            },
                            {
                                key: "3",
                                label: "Ngày sinh",
                                children: (
                                    <div>
                                        {dayjs(data?.owner.birthday).format("YYYY-MM-DD")}
                                    </div>
                                ),
                            },
                            {
                                key: "4",
                                label: "Giới tính",
                                children: <div>{data?.owner.gender ? "Nam" : "Nữ"}</div>,
                            },
                        ]}
                    />
                    <br />
                    <Descriptions
                        title="Thông tin sản phẩm"
                        size="small"
                        bordered
                        items={[
                            {
                                key: "1",
                                span: 3,
                                label: "Tên sản phẩm",
                                children: data?.name,
                            },
                            {
                                key: "2",
                                span: 3,
                                label: "Mô tả sản phẩm",
                                children: data?.desc,
                            },
                            {
                                key: "3",
                                span: 2,
                                label: "Giá thành",
                                children: `${data?.price.toLocaleString("vi", {
                                    currency: "VND",
                                })} vnd`,
                            },
                            { key: "4", label: "Độ mới", children: `${data?.newness} %` },
                            {
                                key: "5",
                                span: 3,
                                label: "Bộ xử lý",
                                children: data?.cpu.name,
                            },
                            {
                                key: "6",
                                span: 3,
                                label: "Bộ xử lý đồ họa",
                                children: data?.gpu.name,
                            },

                            {
                                key: "7",
                                span: 3,
                                label: "Hệ điều hành",
                                children: data?.os.name,
                            },
                            {
                                key: "8",
                                span: 3,
                                label: "Dung lượng pin",
                                children: `${data?.betterCapacity} Wh`,
                            },
                            {
                                key: "9",
                                span: 3,
                                label: "Loại",
                                children: data?.category.name,
                            },
                            {
                                key: "10",
                                span: 3,
                                label: "Thương hiệu",
                                children: data?.brand.name,
                            },
                            {
                                key: "11",
                                span: 3,
                                label: "Thông tin màn hình",
                                children: (
                                    <div>
                                        Kích thước: {data?.sizeScreen.size} <br />
                                        Độ phân giải: {data?.resolutionScreen.name} <br />
                                        Tần số quét: {data?.scanFrequency.scanFrequency}
                                    </div>
                                ),
                            },
                            {
                                key: "12",
                                span: 3,
                                label: "Thông tin RAM",
                                children: (
                                    <div>
                                        Dung lượng: {data?.capacityRam.capacity} <br />
                                        Công nghệ: {data?.typeRam.name}
                                    </div>
                                ),
                            },
                            {
                                key: "13",
                                span: 3,
                                label: "Thông tin dung lượng bộ nhớ",
                                children: (
                                    <div>
                                        Dung lượng: {data?.capacityRom.capacity} <br />
                                        Công nghệ: {data?.typeRom.name}
                                    </div>
                                ),
                            },
                            {
                                key: "14",
                                span: 3,
                                label: "Kích thước sản phẩm",
                                children: (
                                    <div>
                                        Chiều dài: {data?.length}mm <br />
                                        Chiều ngang: {data?.width}mm <br />
                                        Độ dày: {data?.height}mm <br />
                                        Cân nặng: {data?.weight}kg <br />
                                    </div>
                                ),
                            },
                            {
                                key: "15",
                                span: 3,
                                label: "Trạng thái",
                                children: (
                                    <PendingStyled $status={data?.approve}>
                                        {data?.approve ? "Đã duyệt" : "Đang chờ duyệt"}
                                    </PendingStyled>
                                ),
                            },
                        ]}
                    />
                </InfoStyled>
            </ContainerStyled>
        </MainStyled>
    );
}
