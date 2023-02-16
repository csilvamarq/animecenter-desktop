type EpisodeType = {
    enlace : string,
    imagen : string
}

type AnimeType = {
info : {
    descripcion? : string,
    estado? : string,
    portada? : string,
    score? : number
},
episodes? : EpisodeType[]
}

export default AnimeType