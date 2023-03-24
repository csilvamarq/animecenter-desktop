import React, { useContext, useEffect } from "react";
import { Layout, Menu, theme, Avatar, Dropdown, Space,Image } from "antd";
import { UserOutlined, SearchOutlined, CalendarOutlined, PlayCircleOutlined,UnorderedListOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd';
import AppContext from "@/context/context";
import { ipcRenderer } from "electron";
const { Header, Content, Footer, Sider } = Layout;
const AppLayout: React.FC = () => {
  const { selected, setSelected, setLogin, login,imagen,tema,setTema } = useContext(AppContext)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function handleRoutes(e: any) {
    if (e.key === "2") setSelected!(["3"])
    else setSelected!([e.key])
  }
  const items: MenuProps['items'] = [
    {
      label: <p onClick={() => {
        navigation("/ajustes")
      }}>Ajustes</p>,
      key: '3',
    },
    {
      label: <p onClick={() => {
        localStorage.removeItem("login")
        setLogin("")
        navigation("/")
      }}>Logout</p>,
      key: '3',
    }, 
  ];
  const navigation = useNavigate()
  useEffect(() => {
    console.log(selected)
    switch (selected![0]) {
      case "1": navigation("/usuario"); break;
      case "3": navigation("/seasonalAnime"); break;
      case "4" : navigation("/animes"); break;
      case "5" : navigation("/lista"); break;
      case "6": navigation("/search"); break;
    }
  }, [selected])
  useEffect(() => {
    ipcRenderer.on("dark-mode", () => setTema("dark"))
    ipcRenderer.on("light-mode", () => setTema("light"))
    console.log(tema)
    return () => {
      ipcRenderer.on("dark-mode", () => setTema("dark"))
      ipcRenderer.on("light-mode", () => setTema("light"))
    }
  },[ipcRenderer])
  return (
    <Layout className='container'>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <h2 style={{ textAlign: "center", color: "white" }}>AnimeCenter2</h2>
        <Menu
          theme="dark"
          selectedKeys={selected}
          onClick={handleRoutes}
          mode="inline"
          items={[{ name: "Inicio", icon: UserOutlined }, { name: "Anime", icon: PlayCircleOutlined }, { name: "Episodios Recientes", icon: CalendarOutlined },{ name: "Animes", icon: CalendarOutlined },{name : "Lista",icon : UnorderedListOutlined}, { name: "Buscar", icon: SearchOutlined }].map(
            (item, index) => ({
              key: String(index + 1),
              icon: React.createElement(item.icon),
              label: item.name,
            }),
          )}
        />
      </Sider>
      <Layout style={{ backgroundColor: tema === "light" ? "white" :"black"}}>
        <Header style={{ padding: 0, paddingLeft: "5%" }} >
          <div style={{ width: "80%", float: "left" }}></div>
          <div style={{ width: "20%", height: "90%", gap: "3%",color: tema === "light" ? "black" : "white", float: "right", paddingRight: "1%", display: "flex", justifyContent: "end", alignItems: "center" }}>
            <h3>{login}</h3>
            <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space >
                 {imagen==="" || null ? <Avatar size={44}  icon={<UserOutlined />} /> : <Image style={{objectFit : "contain"}} preview={false} width={50} height={50} src={Buffer.from(imagen, 'base64').toString()} />} 
                </Space>
              </a>
            </Dropdown></div>
        </Header>
        <Content style={{ margin: '24px 16px 0',backgroundColor: tema === "light" ? "white" :"black" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: "#001529",color : "white" }}>App ©2023 Created by Misil4</Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout