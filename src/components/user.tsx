import AppContext from "@/context/context";
import { Row,Col, Typography, Avatar,Image } from "antd";
import {UserOutlined} from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
const { Title } = Typography;
const User : React.FC = () => {

    const {login,imagen,tema} = useContext(AppContext)
    const [animeNews,setAnimeNews] = useState<any[]>([])
    // useQuery({
    //     queryKey: ['lastAnime'], queryFn: async () => {
    //         return axios.get(`${import.meta.env.VITE_API_URL}/lastAnimeNews`).then(({data}) => setAnimeNews(data))
    //     }
    // })
return (
    <Row style={{padding : "2%"}}>
        <Col>
        <Title style={{color : tema === "light" ? "black" : "white"}}>Bienvenido de nuevo {login}</Title>
        {imagen==="" || null ? <Avatar shape="square" size={100}  icon={<UserOutlined />} /> : <Image preview={false} width={200} style={{objectFit : "contain"}} height={200} src={Buffer.from(imagen, 'base64').toString()} />} 
        <Row>
        {animeNews.map((item) => {
            return (
                <Col>
                <Image src={item.image} />
                </Col>
            )
        })}
        </Row>
        </Col>
    </Row>
)
}

export default User