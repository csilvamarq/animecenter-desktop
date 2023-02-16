import type { CascaderProps } from 'antd';
import './index.css';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
} from 'antd';
import React, { useContext, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppContext from '@/context/context';

const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register: React.FC = () => {
    const [form] = Form.useForm();
    const {setLogin} = useContext(AppContext)
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        axios.post(`${import.meta.env.VITE_API_URL}/create`,{name : values.usuario,password : values.contraseña,email : values.email}).then(({data} : {data : any}) =>{ if (data.message === "success") {
            setLogin(values.usuario)
            navigate("/")
        } else {
            console.log("failed")
        } })
    };


    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    return (
        <div className="login-form">
  <h1>Bienvenido a </h1>
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'El texto introducido no es un email valido',
                    },
                    {
                        required: true,
                        message: 'Introduce un email',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                    {
                        required: true,
                        message: 'Por favor Introduce una Contraseña',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirmar Contraseña"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Confirma tu Contraseña',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Las dos contraseñas que has introducido no coinciden'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="nickname"
                label="Usuario"
                tooltip="Como quieres que los demas te llamen?"
                rules={[{ required: true, message: 'Por favor introduce tu Usuario', whitespace: true }]}
            >
                <Input />
            </Form.Item>
                Ya tienes<Link to={"/"}> Cuenta?</Link>






            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Debes aceptar los terminos')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    Acepto los <a href="">Terminos</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Registrate
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default Register;