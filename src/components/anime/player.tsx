import { Button } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { shell } from "electron";
import AppContext from "@/context/context";
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'


const AnimePlayer: React.FC = () => {
  const { state } = useLocation()
  const [dowload, setDowload] = useState<boolean>(false)
  const [currentEpisode, setCurrentEpisode] = useState<number>(state.episode)
  const [options, setOptions] = useState<string[]>([])
  const [option,setOption] = useState<number>(0)
  const { tema } = useContext(AppContext)
  const [episode, setEpisode] = useState<string>("")
  const lastIndex = state.anime.lastIndexOf(`-episodio`)
  const getAnimeUrl = async () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/dowload/${state.anime.substring(29, lastIndex)}/${currentEpisode}`)
      .then((response) => shell.openExternal(response.data))
      .catch(error => console.error(error))

  }
  useEffect(() => {
    if (dowload) {
      getAnimeUrl()
      setDowload(false)
    }
  }, [dowload])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/url/${state.anime.substring(29, lastIndex)}/${currentEpisode}`)
    .then(({data}) => { 
      setEpisode(data[option])
      const parsedData = data.map((element : any) =>
        element.replace(/.+\/\/|www.|\..+/g, ''),
      );
    setOptions(parsedData)
    })
    .catch(error => console.error(error))
  },[currentEpisode,option])
  return (
    <>
      {episode.length > 1 ? (
        <div style={{ width: "100%", height: "100%", objectFit: "fill", overflow: "auto", color: tema === "light" ? "black" : "white" }}>
          <div style={{ display: "flex", gap: "2%", alignItems: "center" }}><AiFillLeftCircle color={currentEpisode < 2 ? "grey" : "black"} onClick={() => { if (currentEpisode > 1) { setCurrentEpisode(currentEpisode - 1); setEpisode("") } }} size={30} /><h1>{state.name} {currentEpisode}</h1><AiFillRightCircle size={30} color={currentEpisode < state.total ? "black" : "grey"} onClick={() => { if (currentEpisode < state.total) { setCurrentEpisode(currentEpisode + 1); setEpisode("") } }} /> <Button onClick={() => setDowload(true)}>Descargar</Button></div>
          <div style={{display : "flex",flexDirection : "row"}}>
            {options.map((element,index) =>{
              console.log(element);
              return (
                <Button onClick={() => setOption(index)}>{element}</Button>
              )
            })}

          </div>
          <iframe loading="lazy" width="100%" height="100%" sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"  allow="encrypted-media" src={episode}>

          </iframe></div>) : <div style={{ textAlign: "center", cursor: "wait" }}><img src="https://s10.gifyu.com/images/loader.gif" /></div>}
    </>
  )
}

export default AnimePlayer