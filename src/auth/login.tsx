import React, { useContext } from 'react';
import './index.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppContext from '@/context/context';

const Login = () => {
 const {setLogin,setPassword,setImagen} = useContext(AppContext)
  const onFinish = (values: any) => {
    axios.post(`${import.meta.env.VITE_API_URL}/login`,{name : values.usuario,password : values.contraseña}).then(({data} : {data : any}) =>{
       if (data.data.length>0) { 
        if (values.recordar) {
          console.log(data.data[0])
          localStorage.setItem("login",data.data[0].name)
          localStorage.setItem("password",data.data[0].password)
          localStorage.setItem("imagen",data.data[0].avatar)
        }
        setImagen(data.data[0].avatar)
        setPassword(data.data[0].password)
        setLogin(data.data[0].name)}}).catch(error => console.error(error))
};
  return (
    <div className="login-form">
    <h1>Bienvenido a </h1>
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
       onFinish={onFinish}
    >
      <Form.Item
        name="usuario"
        rules={[
          {
            required: true,
            message: 'Introduce tu usuario',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
      </Form.Item>
      <Form.Item
        name="contraseña"
        rules={[
          {
            required: true,
            message: 'Introduce tu contraseña',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="recordar" valuePropName="checked" noStyle>
          <Checkbox>Recuerdame</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Iniciar Sesion
        </Button>
        o <Link to={"/register"}>Registrate</Link>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login