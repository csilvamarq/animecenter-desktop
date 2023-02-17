import AppContext from "@/context/context";
import { Row,Col, Typography, Avatar,Image } from "antd";
import {UserOutlined} from '@ant-design/icons';
import React, { useContext } from "react";
const { Title } = Typography;
const User : React.FC = () => {

    const {login,imagen} = useContext(AppContext)
return (
    <Row style={{padding : "2%"}}>
        <Col>
        <Title>Bienvenido de nuevo {login}</Title>
        {imagen==="" ? <Avatar shape="square" size={100}  icon={<UserOutlined />} /> : <Image preview={false} width={200} style={{objectFit : "contain"}} height={200} src={Buffer.from(imagen, 'base64').toString()} />} 
        </Col>
    </Row>
)
}

export default User