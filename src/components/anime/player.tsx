import { Button } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { shell } from "electron";
import AppContext from "@/context/context";

const AnimePlayer: React.FC = () => {
  const [dowload,setDowload] = useState<boolean>(false)
  const {tema} = useContext(AppContext)
  const { state } = useLocation()
  const [episode, setEpisode] = useState<string>("")
  const lastIndex = state.anime.lastIndexOf(`-sub`)
  const getAnimeUrl = async () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/dowload/${state.anime.substring(29,state.anime.length-12)}/${state.episode}`)
        .then((response) =>shell.openExternal(response.data) )
        .catch(error => console.error(error))

}
  useEffect(() => {
  if (dowload) {
    getAnimeUrl()
    setDowload(false)
  }
  },[dowload])
  useQuery({
    queryKey: ['Episode'], queryFn: async () => {
      console.log(`${import.meta.env.VITE_API_URL}/url/${state.anime.substring(29, state.anime.length - 12)}/${state.episode}`)
      return axios.get(`${import.meta.env.VITE_API_URL}/url/${state.anime.substring(29, state.anime.length - 12)}/${state.episode}`)
        .then(response => { setEpisode(response.data);console.log(response.data) })
        .catch(error => console.error(error))
    }
  })
  return (
    <>
      {episode.length > 1 ? (
        <div style={{ width: "100%", height: "100%", objectFit: "fill",overflow : "auto",color : tema === "light" ? "black" : "white"}}>
          <div style={{ display: "flex", gap: "2%", alignItems: "center" }}><h1>{state.name} {state.episode}</h1> <Button onClick={() => setDowload(true) }>Descargar</Button></div>
          <iframe width="100%" height="100%" src={episode}>

          </iframe></div>) :<div style={{ textAlign: "center",cursor : "wait" }}><img src="https://s10.gifyu.com/images/loader.gif" /></div>}
    </>
  )
}

export default AnimePlayer