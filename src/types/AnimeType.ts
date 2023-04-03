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
pages : number
episodes? : EpisodeType[]
}

export default AnimeType