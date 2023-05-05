import { Col, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const Animes = () => {
  const [animes, setAnimes] = React.useState<any>([]);
  useQuery({
    queryKey: ["lastSeries"],
    queryFn: async () => {
      const response: any = await axios.get(
        `${import.meta.env.VITE_API_URL}/lastCurrentSeries`,{headers : {"Authorization" : "pc"}}
      );
      console.log(response.data);
      setAnimes(response.data);
    },
  });
  return (
    <>
      <Title>En emision</Title>
      <Row style={{ height: "80%", overflowY: "auto" }}>
        {animes.map((anime: any, index: number) => {
          return (
            <Col
              span={8}
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                resize : "both",
                padding: "2%",
              }}
            >
              <h3>{anime.name}</h3>
              <Image src={anime.image} />
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex",fontWeight : "bold" }}>
                  <p style={{ width: "60%" }}>Tipo</p>
                  <p style={{ width: "40%" }}>Estado</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ width: "60%" }}>{anime.type}</p>
                  <p style={{ width: "40%" }}>{anime.estado}</p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Animes;
