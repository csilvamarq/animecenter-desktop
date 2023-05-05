import React, { useEffect, useState } from "react";
import { Route, Routes, HashRouter, BrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import SeasonalAnime from "./components/seasonalAnime";
import AppContext from "./context/context";
import User from "./components/user";
import { QueryClient, QueryClientProvider } from "react-query";
import Anime from "./components/anime/anime";
import AnimePlayer from "./components/anime/player";
import SearchAnime from "./components/search";
import { ipcRenderer } from "electron";
import Login from "./auth/login";
import Register from "./auth/register";
import Settings from "./components/settings";
import ListaAnime from "./components/lista";
import Animes from "./components/animes";

const App: React.FC = () => {
  const [selected, setSelected] = useState<string[]>(["1"]);
  const [password, setPassword] = useState("");
  const [tema, setTema] = useState("light");
  const [imagen, setImagen] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 1 * 60 * 60 * 1000,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 1,
      },
    },
  });
  useEffect(() => {
    if (localStorage.getItem("login")) {
      setLogin(localStorage.getItem("login")!);
      setPassword(localStorage.getItem("password")!);
      setImagen(localStorage.getItem("imagen")!);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          selected,
          setSelected,
          login,
          setLogin,
          setPassword,
          password,
          imagen,
          setImagen,
          tema,
          setTema,
        }}
      >
        <HashRouter>
          <Routes>
            {login !== "" || localStorage.getItem("login") ? (
              <Route path="/" element={<AppLayout />}>
                <Route path="usuario" element={<User />} />
                <Route path="seasonalAnime" index element={<SeasonalAnime />} />
                <Route path="anime" element={<Anime />} />
                <Route path="animes" element={<Animes />} />
                <Route path="ver" element={<AnimePlayer />} />
                <Route path="search" element={<SearchAnime />} />
                <Route path="lista" element={<ListaAnime />} />
                <Route path="ajustes" element={<Settings />} />
              </Route>
            ) : (
              <>
                <Route index path="*" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </HashRouter>
      </AppContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
