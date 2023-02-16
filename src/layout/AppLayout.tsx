import React, { useContext, useEffect } from "react";
import { Layout, Menu, theme, Avatar, Dropdown, Space } from "antd";
import { UserOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd';
import AppContext from "@/context/context";
const { Header, Content, Footer, Sider } = Layout;
const AppLayout: React.FC = () => {
  const { selected, setSelected,setLogin } = useContext(AppContext)
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
      case "4": navigation("/search"); break;
    }
  }, [selected])
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
        <h2 style={{ textAlign: "center" }}>App</h2>
        <Menu
          theme="dark"
          selectedKeys={selected}
          onClick={handleRoutes}
          mode="inline"
          items={[{ name: "Usuario", icon: UserOutlined }, { name: "Anime", icon: CalendarOutlined }, { name: "Temporada", icon: CalendarOutlined }, { name: "Buscar", icon: SearchOutlined }].map(
            (item, index) => ({
              key: String(index + 1),
              icon: React.createElement(item.icon),
              label: item.name,
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, paddingLeft: "5%" }} >
          <div style={{width : "90%",float : "left"}}></div>
          <div style={{width : "10%",float : "right"}}>
          <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space >
                <Avatar size={54} icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown></div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>App ©2023 Created by Misil4</Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout