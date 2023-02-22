import AppContext from "@/context/context";
import SearchType from "@/types/SearchType";
import {
    Button,
    Col,
    Empty,
    Modal,
    Row,
    Form,
    Input,
    Card,
    Image,
    Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { NotificationManager,NotificationContainer } from "react-notifications";

const ListaAnime: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lista, setLista] = useState(localStorage.getItem("listas"))
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { setSelected } = useContext(AppContext);
    const [searchLoad, setSearchLoad] = useState<boolean>(false);
    const [search, setSearch] = useState<any[]>([]);
    const [animes, setAnimes] = useState<any[]>([]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (values: any) => {
        if (lista) {
            const list = JSON.parse(lista);
            list.push({
                name: values.nombre,
                descripcion: values.descripcion,
                animes: animes,
            });
            localStorage.setItem("listas", JSON.stringify(list));
            setLista(JSON.stringify(list))
            setAnimes([]);
        } else {
            const arr = [];
            arr.push({
                name: values.nombre,
                descripcion: values.descripcion,
                animes: animes,
            });
            localStorage.setItem("listas", JSON.stringify(arr));
            setAnimes([]);
        }
        NotificationManager.success("Lista creada con exito")
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setAnimes([]);
        setSearch([]);
    };
    const handleClear = () => {
        setSearch([]);
    };

    const onChange = (value: any) => {
        const filtered = search.filter((item) => item.label === value.label)[0];
        if (animes.find((item) => item.name === value.label) === undefined) {
            setAnimes((current) => [
                ...current,
                { imagen: filtered.imagen, url: filtered.value, name: value.label },
            ]);
        }
    };
    const onSelect = (value: any) => {
        setSearchLoad(true);
        if (value.keyCode === 13) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/search/${value.target.value}`)
                .then(({ data }: { data: SearchType[] }) => {
                    let arr: any[] = [];
                    data.map((item) =>
                        arr.push({ value: item.url, label: item.name, imagen: item.imagen })
                    );
                    setSearch(arr);
                    setSearchLoad(false);
                });
        }
    };
    useEffect(() => {
        setLista(lista ? JSON.parse(lista).length === 0 ? null : lista : null)
    }, [])
    return (
        <div style={{ overflow: "auto", height: "100%" }}>
            <h1 style={{ fontSize: "5vw" }}>Mis listas  {lista ? <Button onClick={showModal}>Nueva Lista</Button> : ""}</h1>
            {lista ? (
                <Row >
                    {JSON.parse(lista).map((item: any) => {
                        return <Col span={24}>
                            <h1>{item.name}  <DeleteOutlined onClick={() => {
                                const newList = JSON.parse(lista).filter((lista: any) => lista.name !== item.name)
                                localStorage.setItem("listas", JSON.stringify(newList))
                                setLista(newList.length === 0 ? null : JSON.stringify(newList))
                            }} /></h1>
                            <Row   >
                                {item.animes.map((anime: any) => {
                                    return (
                                        <Col style={{ display: "flex", flexDirection: "column", padding: "2%",width: "fit-content" }} span={24 / item.animes.length}>
                                            <Row><Col span={16}><ShowMoreText
                                                lines={2}
                                                more="Leer mas"
                                                less="Leer menos"
                                                width={200}
                                                expanded={false}
                                            >
                                                <p>{anime.name}</p>
                                            </ShowMoreText>
                                            </Col>
                                            <Col span={8}>
                                            <DeleteOutlined style={{cursor : "pointer"}} size={40} />
                                            </Col>
                                            </Row>
                                            <Image onClick={() => { navigate("/anime", { state: { name: anime.name, enlace: anime.url, image: anime.imagen } }); setSelected!(["2"]) }} preview={false} height={"100%"} width={"70%"} src={anime.imagen} />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                    })}
                </Row>
            ) : (
                <div>
                    <Empty description={<span>aun no tienes ninguna lista</span>}>
                        {" "}
                        <Button onClick={showModal}>Nueva Lista</Button>
                    </Empty>
                </div>
            )}
            <Modal
                width={"50%"}
                title="Nueva Lista"
                okText="Crear Lista"
                cancelText="Cancelar"
                open={isModalOpen}
                onOk={form.submit}
                onCancel={handleCancel}
            >
                <Form form={form} onFinish={handleOk}>
                    <Form.Item label="Nombre" name="nombre">
                        <Input required placeholder="nombre" />
                    </Form.Item>
                    <Form.Item label="Descripción" name="descripción">
                        <Input required placeholder="descripcion" />
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
                                imagen: d.imagen,
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
                                <Card
                                    hoverable
                                    style={{ cursor: "pointer", display: "inline-block" }}
                                >
                                    <Row>
                                        <Col span={22}>
                                            <p>
                                                <ShowMoreText
                                                    lines={3}
                                                    more="Leer mas"
                                                    less="Leer menos"
                                                    expanded={false}
                                                >
                                                    <p>{item.name}</p>
                                                </ShowMoreText>
                                            </p>
                                        </Col>
                                        <Col
                                            style={{
                                                flex: 1,
                                                display: "flex",
                                                flexWrap: "wrap",
                                                justifyContent: "center",
                                                alignSelf: "flex-end",
                                                height: "30px",
                                            }}
                                            span={2}
                                        >
                                            <DeleteOutlined
                                                onMouseOver={() => setHover(true)}
                                                onMouseLeave={() => setHover(false)}
                                                style={{ color: hover ? "red" : "black" }}
                                                onClick={() => {
                                                    setHover(false);
                                                    setAnimes(
                                                        animes.filter(
                                                            (anime) => anime.name !== item.name
                                                        )
                                                    );
                                                }}
                                                size={40}
                                            />
                                        </Col>
                                    </Row>
                                    <Image
                                        preview={false}
                                        onClick={() => {
                                            navigate("/anime", {
                                                state: {
                                                    name: item.name,
                                                    enlace: item.url,
                                                    image: item.imagen,
                                                },
                                            });
                                            setSelected!(["2"]);
                                        }}
                                        src={item.imagen}
                                        width="100%"
                                        height="90%"
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Modal>
            <NotificationContainer />
        </div>
    );
};

export default ListaAnime;
