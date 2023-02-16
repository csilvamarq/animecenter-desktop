import React, { useState, useEffect, Suspense, useContext } from "react";
import { Row, theme, Col, Image } from "antd";
import { SeasonalAnimeType } from "@/types/SeasonalAnimeType";
import { useQuery } from "react-query";
import axios from 'axios'
import ShowMoreText from "react-show-more-text";
import { useNavigate } from "react-router-dom";
import AppContext from "@/context/context";

const SeasonalAnime: React.FC = () => {
    const navigation = useNavigate()
    const {setSelected} = useContext(AppContext)
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [seasonalAnime, setSeasonalAnime] = useState<any[]>([])
    useQuery({
        queryKey: ['lastAnime'], queryFn: async () => {
            return axios.get(`${import.meta.env.VITE_API_URL}/lastAnime`).then(({ data }) => setSeasonalAnime(data))
        }
    })
    return (
        <>
            {seasonalAnime.length > 1 ?
                <div style={{ padding: 24, height: "100%", textAlign: "center", color: "black", background: colorBgContainer, overflowY: "auto" }}>
                    <Row>
                        {seasonalAnime?.map((item: SeasonalAnimeType, index: number) => {
                            return (<Col style={{ padding: "2%",marginTop: "15%" }} key={index} span={8}>
                                <h2>{<ShowMoreText lines={3}
                                    more="Leer mas" expanded={false}>
                                    <p>{item.name}</p>
                                </ShowMoreText>}</h2>
                                <img src={item.image} onClick={() =>{  navigation("/anime",{state : {name : item.name,url : item.url,image : item.image,episode : item.episode}});setSelected!(["2"])}} width="100%" height="80%" />
                                <p >Episodio {item.episode}</p>
                            </Col>)
                        })}
                    </Row>
                </div>
                : <div style={{ textAlign: "center", }}><img src="/loader.gif" /></div>}
        </>
    )
}

export default SeasonalAnime