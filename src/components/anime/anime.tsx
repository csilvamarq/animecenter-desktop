import {
  Image,
  Rate,
  Row,
  Col,
  Card,
  Pagination,
  Button,
  Modal,
  Select,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import AnimeType from "@/types/AnimeType";
import ShowMoreText from "react-show-more-text";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import AppContext from "@/context/context";
import { useMediaQuery } from "react-responsive";

const Anime: React.FC = () => {
  const { tema } = useContext(AppContext);
  const smallSize = useMediaQuery({maxWidth: 768})
  const spanValue = smallSize ? 24 : 12; // Cambia el valor de span en base al tamaño de la pantalla
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(30);
  const [value, setValue] = useState<number | undefined>(3);
  const [anime, setAnime] = useState<AnimeType>({ info: {}, episodes: [] });
  const lastIndex =
    state.enlace !== undefined
      ? state.enlace.lastIndexOf(`-sub`)
      : state.url.lastIndexOf(`-episodio`);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/episodes/${
          state?.enlace !== undefined
            ? state.enlace.substring(31, lastIndex)
            : state.url.substring(29, lastIndex)
        }/${currentPage}`,{headers : {"Authorization" : "pc"}}
      )
      .then(({ data }: { data: AnimeType }) => {
        console.log(data);
        setValue(data.info?.score || 0);
        setAnime(data);
      });
  }, [currentPage]);

  const handleChange = (page: any) => {
    setCurrentPage(page);
    setMinIndex((page - 1) * 30);
    setMaxIndex(page * 30);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSelect = (value: any) => {
    const current = JSON.parse(localStorage.getItem("listas")!);
    current.map((item: any) => {
      if (
        item.name === value &&
        item.animes.find((anime: any) => anime.name === state.name) ===
          undefined
      ) {
        item.animes = [
          ...item.animes,
          { imagen: state.image, url: state.url, name: state.name },
        ];
      }
    });
    localStorage.setItem("listas", JSON.stringify(current));
    NotificationManager.success("Anime añadido a la lista correctamente");
  };
  return (
    <>
      {anime.episodes?.length! > 0 ? (
        <div
          style={{
            overflowY: "auto",
            width: "100%",
            height: "100%",
            textAlign: "center",
            color: tema === "light" ? "black" : "white",
          }}
        >
          <h1>{state.name}</h1>
          <Image
            src={state.image}
            width="100%"
            height="100%"
            style={{ objectFit: "contain" }}
          />
          <h1>Descripción </h1>
          <ShowMoreText
            width={200}
            lines={3}
            less="Leer menos"
            more="Leer mas"
            expanded={false}
          >
            <p>{anime.info.descripcion}</p>
          </ShowMoreText>
          <p></p>
          {localStorage.getItem("listas") && (
            <Button onClick={handleModalOpen}>Añadir a la lista</Button>
          )}
          <Row>
            <Col span={12}>
              <h1>Puntuacion</h1>
              <span>
                <Rate disabled onChange={setValue} value={value} />
                {value ? (
                  <span
                    style={{
                      color: "#E1AD01",
                      fontSize: 20,
                      paddingLeft: "10px",
                    }}
                  >
                    {value}
                  </span>
                ) : (
                  ""
                )}
              </span>
            </Col>
            <Col span={12}>
              <h1>Estado</h1>
              <span>{anime.info.estado}</span>
            </Col>
          </Row>
          <h1>Episodios</h1>
          <Row>
            {anime.episodes?.map((item, index) => {
              return (
                <Col
                  onClick={() =>
                    navigate("/ver", {
                      state: {
                        name: state.name,
                        anime: item.enlace,
                        episode: (currentPage - 1) * 30 + index + 1,
                        total:
                          anime.episodes?.length! > 30
                            ? currentPage * 30
                            : anime.episodes?.length,
                      },
                    })
                  }
                  key={index}
                  span={spanValue}
                  style={{ padding: "1%" }}
                >
                  <Card
                    style={{
                      cursor: "pointer",
                      backgroundColor: tema === "light" ? "white" : "black",
                      color: tema === "light" ? "black" : "white",
                    }}
                  >
                    <h3>Episodio {(currentPage - 1) * 30 + index + 1} </h3>
                    <Image
                      preview={false}
                      width={"100%"}
                      height={"100%"}
                      src={item.imagen}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
          <p>{(anime.pages)}</p>
          <Pagination
            current={currentPage}
            total={
              (anime.episodes?.length! * anime.pages === 0 ? 1 : anime.pages) /
              2
            }
            onChange={handleChange}
          />
          <Modal
            width={"50%"}
            title="Agregar anime a Lista"
            okText="Agregar"
            cancelText="Cancelar"
            open={isModalOpen}
            onCancel={handleModalClose}
          >
            <Select
              allowClear
              showSearch
              placeholder={"Busca una lista"}
              onSelect={handleSelect}
              options={
                localStorage.getItem("listas")
                  ? JSON.parse(localStorage.getItem("listas")!).map(
                      (item: any) => ({
                        value: item.name,
                        label: item.name,
                      })
                    )
                  : []
              }
            />
          </Modal>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "wait",
          }}
        >
          <img src="https://s10.gifyu.com/images/loader.gif" />
        </div>
      )}
      <NotificationContainer />
    </>
  );
};

export default Anime;
