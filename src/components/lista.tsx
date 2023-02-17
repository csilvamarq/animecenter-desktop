import AppContext from "@/context/context";
import SearchType from "@/types/SearchType";
import { Button, Col, Empty, Modal, Row, Form, Input, Card, Image, Select } from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowMoreText from "react-show-more-text";


const ListaAnime: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const { setSelected } = useContext(AppContext)
    const [searchLoad, setSearchLoad] = useState<boolean>(false)
    const [search, setSearch] = useState<any[]>([])
    const [animes, setAnimes] = useState<any[]>([])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (values: any) => {
        console.log(values)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setAnimes([])
        setSearch([])
    };
    const handleClear = () => {
        setSearch([])
    }
    const onChange = (value : any) => {
        console.log(animes)
         const filtered = search.filter(item => item.label === value.label)[0]
         console.log(filtered)
        setAnimes(current => [...current,{imagen : filtered.imagen,url : filtered.value,name : value.label}])
    };
    const onSelect = (value: any) => {
        setSearchLoad(true)
        if (value.keyCode === 13) {
            axios.get(`${import.meta.env.VITE_API_URL}/search/${value.target.value}`).then(({ data }: { data: SearchType[] }) => {
                let arr: any[] = []
                data.map((item => arr.push({ value: item.url, label: item.name,imagen : item.imagen })))
                setSearch(arr)
                setSearchLoad(false)
            })
        }
    }
    const lista = localStorage.getItem("listas")
    return (
        <Row>
            <Col style={{ padding: "3%" }}>
                <h1 style={{ fontSize: "25px" }}>Mis listas</h1>
                {lista ? <p>tienes</p> : <div>
                    <Empty description={
                        <span>aun no tienes ninguna lista</span>

                    }>  <Button onClick={showModal}>Nueva Lista</Button></Empty>
                    <Modal width={"50%"}  title="Nueva Lista" okText="Crear Lista" cancelText="Cancelar" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
                        <Form form={form} onFinish={handleOk} >
                            <Form.Item label="Nombre" name="nombre">
                                <Input required placeholder="nombre" />
                            </Form.Item>
                            <Form.Item label="Descripción" name="descripción">
                                <Input required placeholder="nombre" />
                            </Form.Item>
                            <Form.Item label="Animes" name="Animes">
                                <Select
                                allowClear
                                    showSearch
                                    labelInValue
                                    loading={searchLoad}
                                    onClear={handleClear}
                                    onSelect={onChange}
                                    onKeyDown={onSelect}
                                    options={(search || []).map((d) => ({
                                        imagen : d.imagen,
                                        value: d.value,
                                        label: d.label,
                                    }))}
                         />
                            </Form.Item>
                        </Form>
                        <Row>
                            {animes.map((item) => {
                                return (
                                    <Col span={8} style={{ padding: "2%" }}>
                                        <Card  hoverable style={{ cursor: "pointer",display: "inline-block" }}><p><ShowMoreText lines={3}
                                            more="Leer mas" less="Leer menos" expanded={false}>
                                            <p>{item.name}</p>
                                        </ShowMoreText></p>
                                            <Image preview={false} onClick={() => { navigate("/anime", { state: { name: item.name, enlace: item.url, image: item.imagen } }); setSelected!(["2"]) }} src={item.imagen} width="100%" height="90%" />
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Modal>
                </div>}
            </Col>
        </Row>
    )
}

export default ListaAnime