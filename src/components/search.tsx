import AppContext from "@/context/context";
import useLazyQuery from "@/hooks/useLazyQuery";
import SearchType from "@/types/SearchType";
import { Col, Image, Row } from "antd";
import Search from "antd/es/input/Search";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

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
            <Col span={8} style={{ padding: "2%",marginTop: "15%" }}>
                <h1>{item.name}</h1>
                <Image preview={false} onClick={() => {  navigate("/anime",{state : {name : item.name,enlace : item.url,image : item.imagen}});setSelected!(["2"])}} src={item.imagen} width="100%" height="90%" />
            </Col>
        )
    })}
  </Row>
  </>
  ) : loading && <div style={{ textAlign: "center" }}><img src="/loader.gif" /></div>}
  </>

)
}
export default SearchAnime