import { Image, Rate, Row, Col, Card, Pagination, Button, Modal, Select } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import AnimeType from "@/types/AnimeType";
import ShowMoreText from "react-show-more-text";
import { NotificationManager, NotificationContainer } from 'react-notifications'

const Anime: React.FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [minIndex, setMinIndex] = useState<number>(0)
    const [placeHolder, setPlaceHolder] = useState<string>("Busca una lista")
    const [maxIndex, setMaxIndex] = useState<number>(30)
    const [value, setValue] = useState<number | undefined>(3);
    const [anime, setAnime] = useState<AnimeType>({ info: {}, episodes: [] })
    const lastIndex = state.url ? state.url.indexOf(`/${state.episode}`) : state.enlace.lastIndexOf(`-sub`)
    const { refetch } = useQuery({
        queryKey: ['Anime'], queryFn: async () => {
            return axios.get(`${import.meta.env.VITE_API_URL}/episodes/${state?.enlace ? state.enlace.substring(31, lastIndex) : state.url.substring(20, lastIndex)}`).then(({ data }: { data: AnimeType }) => {
                setValue(data.info.score)
                setAnime(data)
            })
        }
    })

    const handleChange = (page: any) => {
        setCurrentPage(page)
        setMinIndex((page - 1) * 30)
        setMaxIndex(page * 30)
    }

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
    }
    const handleSelect = (value: any) => {
        console.log(value)
        const current = JSON.parse(localStorage.getItem("listas")!)
            current.map((item: any) => {
                if (item.name === value && item.animes.find((anime : any) => anime.name === state.name) === undefined) {
                    item.animes = [
                        ...item.animes,
                        { imagen: state.image, url: state.url, name: state.name },
                    ]
                }
            })
            localStorage.setItem("listas", JSON.stringify(current));
            NotificationManager.success("Anime añadido a la lista correctamente")
    }
    return (
        <>
            {anime.episodes?.length! > 1 ? (
                <div style={{ overflowY: "auto", width: "100%", height: "100%", textAlign: "center" }}>
                    <h1>{state.name}</h1>
                    <Image src={state.image} width="100%" height="100%" style={{ objectFit: "contain" }} />
                    <h1>Descripción  </h1>
                    <ShowMoreText width={200} lines={3}
                        less="Leer menos"
                        more="Leer mas" expanded={false}>
                        <p>{anime.info.descripcion}</p>
                    </ShowMoreText>
                    <p></p>
                    {localStorage.getItem("listas") && <Button onClick={handleModalOpen}>Añadir a la lista</Button>}
                    <Row>
                        <Col span={12}>
                            <h1>Puntuacion</h1>
                            <span>
                                <Rate onChange={setValue} value={value} />
                                {value ? <span style={{ color: "#E1AD01", fontSize: 20, paddingLeft: "10px" }}>{value}</span> : ''}
                            </span>

                        </Col>
                        <Col span={12}>
                            <h1>Estado</h1>
                            <span>
                                {anime.info.estado}
                            </span>
                        </Col>
                    </Row>
                    <h1>Episodios</h1>
                    <Row>
                        {anime.episodes?.map((item, index) => {
                            return index >= minIndex &&
                                index < maxIndex && (
                                    <Col onClick={() => navigate("/ver", { state: { name: state.name, anime: item.enlace, episode: index + 1 } })} key={index} span={12} style={{ padding: "1%" }}>
                                        <Card hoverable style={{ cursor: "pointer" }}>
                                            <h3>Episodio {index + 1} </h3>
                                            <Image preview={false} width={"100%"} height={"100%"} src={item.imagen} />
                                        </Card>
                                    </Col>
                                )
                        })}
                    </Row>
                    <Pagination pageSize={maxIndex}
                        current={currentPage}
                        total={anime.episodes?.length}
                        onChange={handleChange} />
                    <Modal
                        width={"50%"}
                        title="Agregar anime a Lista"
                        okText="Agregar"
                        cancelText="Cancelar"
                        open={isModalOpen}
                        onCancel={handleModalClose}
                    >
                        <Select allowClear
                            showSearch
                            placeholder={"Busca una lista"}
                            onSelect={handleSelect}
                            options={localStorage.getItem("listas") ? JSON.parse(localStorage.getItem("listas")!).map((item: any) => ({
                                value: item.name,
                                label: item.name,
                            })) : []} />
                    </Modal>
                </div>
            ) : <div style={{
                display: "flex",
                justifyContent: "center", alignItems: "center", textAlign: "center", cursor: "wait"
            }}><img src="/loader.gif" /></div>
            }
            <NotificationContainer />
        </>
    )
}

export default Anime