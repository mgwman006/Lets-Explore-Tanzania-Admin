import { Button, Col, Flex, Progress, Row,Image, Layout, Menu, Drawer, Typography, Avatar, notification, MenuProps, Dropdown, Space } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LikeOutlined, MenuOutlined, MessageOutlined, ShoppingCartOutlined, StarOutlined, MailOutlined, LogoutOutlined, SettingOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { UserStatus } from '../models/auth';


export default function Home() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { userStatus, user} = useUserContext(); // Get user status and login state from context

  useEffect(
    () =>
    {
      if (userStatus === UserStatus.Unknown) return;
      if( userStatus === UserStatus.LoggedOut)
      {
        navigate("/login");
      }
    }
    ,
    [userStatus]
  );

  const handLogOut = () => {
    localStorage.setItem("userStatus",JSON.stringify(UserStatus.LoggedOut));
    navigate("/login");
  }

  const mobileItems = [
    {
      key: '1',
      label: <Link to="/" ><b>Home</b></Link>,
    },
    {
      key: '2',
      label: <Link to="tours" ><b>Tours</b></Link>,
    },
    {
      key: '3',
      label: 
        <div>
                  {
                    userStatus == UserStatus.LoggedIn ?
                    (
                      <Link to="/login">Log Out <LogoutOutlined /></Link>
                    ) :
                    (
                      <Button>LogIn</Button>
                    )
                  }
                  
          </div> 
      
    }

  ];
  const items = [
    {
      key: '1',
      label: <Link to="/" ><b>Home</b></Link>,
    }
  ];

  const userItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      key: '2',
      label: 'Log Out',
      icon: <LogoutOutlined />,
      onClick:handLogOut
    }
  ];


  return (
    <Layout >
      {
        isMobile ? 
        (
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor:'white'
            
            }}
          >
            
            <div>
                <MenuOutlined  onClick={() => setShowMenu(true)} style={{ fontSize:'25px'}}/>
                <Drawer
                    title="Menu"
                    placement="left"
                    onClose={() => setShowMenu(false)}
                    open={showMenu}
                    size='large'
                    >

                    <Menu
                      theme="light"
                      mode="vertical"
                      defaultSelectedKeys={['1']}
                      items={mobileItems}
                      style={{ flex: 1, minWidth: 0}}
                      onClick={() => setShowMenu(false)}
                    />
                </Drawer>
            </div>

            <div 
                className="demo-logo" 
                style={
                  {
                    fontSize:'20px', 
                    width:"100%"
                  }
                }
              >
              </div>

            
            <div >
                <Image preview={false}  src="logo1.jpg"/>
              </div>
          
          </Header>
        )
        :
        ( 
            <Header
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: "white"
              }}
            >
              <div 
                className="demo-logo" 
                style={
                  {
                    fontSize:'20px', 
                  }
                }
              >
                <Image preview={false}  src="logo1.jpg"/>
              </div>
              <Menu
                theme='light'
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items}
                style={
                  { 
                    flex: 1, 
                    minWidth: 0 , 
                  }
                }
              />

              <div>
                {
                  userStatus == UserStatus.LoggedIn ?
                  (
                    
                    <Dropdown menu={{ items:userItems }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Avatar 
                            style={{ backgroundColor: "green", verticalAlign: 'middle' }} 
                            size="large" 
                          >
                            {user?.email.charAt(0).toUpperCase() }
                          </Avatar>
                          
                        </Space>
                      </a>
                    </Dropdown>
                  ) :
                  (
                    <Button>LogIn</Button>
                  )
                }
                
              </div>

              
            
            </Header>
        )
      }
        
      <Content >
      
        <Outlet />
        
      </Content>
      <Footer style={{textAlign:'center'}}>

        ©{new Date().getFullYear()} Created by <a href='https://www.tante.tz' target="_blank">tante.tz</a>
            
      </Footer>
    </Layout>
  );
}
