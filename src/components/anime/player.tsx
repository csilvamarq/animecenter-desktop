import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

const AnimePlayer : React.FC = () => {
  const  {state} = useLocation()
  const [episode,setEpisode] = useState<string>("")
  console.log(episode)
  useQuery({
    queryKey: ['Episode'], queryFn: async () => {
        return   axios.get(`https://animecenter-api.vercel.app/url/${state.anime.substring(29,state.anime.length-11)}/${state.episode}`)
        .then(response => {setEpisode(response.data)})
         .catch(error => console.error(error))
    }
})
return (
    <>
    {episode.length>1 ? (
    <iframe width="100%" height="100%" src={episode}>

    </iframe>) : <div style={{ textAlign: "center" }}><img src="/loader.gif" /></div>}
    </>
)
}

export default AnimePlayer