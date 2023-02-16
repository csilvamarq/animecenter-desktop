import AppContext from "@/context/context";
import { Row,Col, Typography, Avatar } from "antd";
import {UserOutlined} from '@ant-design/icons';
import React, { useContext } from "react";
const { Title } = Typography;
const User : React.FC = () => {

    const {login} = useContext(AppContext)
return (
    <Row style={{padding : "2%"}}>
        <Col>
        <Title>Bienvenido de nuevo {login}</Title>
        <Avatar shape="square" size={100} icon={<UserOutlined />} />
        </Col>
    </Row>
)
}

export default User