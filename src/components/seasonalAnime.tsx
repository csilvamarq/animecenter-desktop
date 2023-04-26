import React, { useState, useEffect, Suspense, useContext } from "react";
import { Row, theme, Col, Image, Card } from "antd";
import { SeasonalAnimeType } from "@/types/SeasonalAnimeType";
import { useQuery } from "react-query";
import axios from 'axios'
import ShowMoreText from "react-show-more-text";
import { useNavigate } from "react-router-dom";
import AppContext from "@/context/context";

const SeasonalAnime: React.FC = () => {
    const navigation = useNavigate()
    const { setSelected,tema } = useContext(AppContext)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [seasonalAnime, setSeasonalAnime] = useState<any[]>([])
    useQuery({
        queryKey: ['lastAnime'], queryFn: async () => {
            return axios.get(`${import.meta.env.VITE_API_URL}/lastAnime`,{headers : {"Authorization" : "pc"}}).then(({ data }) => setSeasonalAnime(data))
        }
    })
    return (
        <>
            {seasonalAnime.length > 1 ?
                <div style={{ padding: 24, height: "100%", textAlign: "center", color: "black", backgroundColor: tema === "light" ? "white" : "black", overflowY: "auto" }}>
                    <h1 style={{ fontSize: "30px",color : tema === "light" ? "black" : "white" }}>Episodios Recientes</h1>
                    <Row>
                        {seasonalAnime?.map((item: SeasonalAnimeType, index: number) => {
                            return (<Col  style={{ padding: "2%",display : "flex",flexDirection : "column",color : tema === "light" ? "black" : "white" }} key={index} span={8}>
                                <h2>{<ShowMoreText lines={3}
                                    more="Leer mas" less="Leer menos" expanded={false}  width={200}>
                                    <p>{item.name}</p>
                                </ShowMoreText>}</h2>
                                    <img style={{ cursor: "pointer" }} src={item.image} onClick={() => { navigation("/anime", { state: { name: item.name, url: item.url, image: item.image, episode: item.episode } }); setSelected!(["2"]) }} width="100%" height="70%" />
                                    <p >Episodio {item.episode}</p>
                            </Col>)
                        })}
                    </Row>
                </div>
                : <div style={{ textAlign: "center",cursor : "wait" }}><img src="https://s10.gifyu.com/images/loader.gif" /></div>}
        </>
    )
}

export default SeasonalAnime