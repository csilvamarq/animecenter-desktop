import AppContext from "@/context/context";
import SearchType from "@/types/SearchType";
import { Card, Col, Image, Row } from "antd";
import Search from "antd/es/input/Search";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowMoreText from "react-show-more-text";

const SearchAnime : React.FC = () => {
    const {setSelected} = useContext(AppContext)
    const navigate = useNavigate()
    const [search,setSearch] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false)
    const [searchData,setSearchData] = useState<SearchType[]>()
        useEffect(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/search/${search}`).then(({ data } : {data : SearchType[]}) => {setSearchData(data);setLoading(false)})
        },[search])
        
    const onSearch = (value: string) => { setSearchData(undefined);setLoading(true);setSearch(value)}
return (<>
    <Search
    placeholder="escribe un anime para buscar"
    allowClear
    enterButton="Buscar"
    size="large"
    onSearch={onSearch}
  />
  {searchData!?.length>1 ? (
    <>
  <p>{searchData?.length} resultados encontrados</p>
  <Row style={{textAlign : "center",width : "100%", height : "100%", overflowY : "auto"}}>
    {searchData?.map((item,index) =>{
        return (
            <Col span={8} style={{display : "flex",flexDirection : "column", padding: "2%"}}>
                <h1><ShowMoreText  width={200} lines={3}
                                    more="Leer mas" less="Leer menos" expanded={false}>
                                    <p>{item.name}</p>
                                </ShowMoreText></h1>
                <Image style={{ cursor: "pointer" }} preview={false} onClick={() => {  navigate("/anime",{state : {name : item.name,enlace : item.url,image : item.imagen}});setSelected!(["2"])}} src={item.imagen} width="100%" height="100%" />
            </Col>
        )
    })}
  </Row>
  </>
  ) : loading && <div style={{ textAlign: "center",cursor : "wait" }}><img src="/loader.gif" /></div>}
  </>

)
}
export default SearchAnime