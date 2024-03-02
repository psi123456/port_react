import React, { Component } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import logoImage from './logo1.png';
import MainSection from './components/MainSection';
import LoginForm from "./components/Login";
import Visitors from './components/Visitors';
import AboutMe from './components/Aboutme';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    // 페이지가 로드될 때 로그인 상태 확인
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 로그인 상태로 변경
      this.setState({ isLoggedIn: true });
    }
  }

  // 로그아웃 처리 함수
  handleLogout = () => {
    // 로그아웃 버튼 클릭 시 로컬 스토리지의 토큰 제거
    localStorage.removeItem('token');
    // 로그인 상태를 false로 변경
    this.setState({ isLoggedIn: false });
  };

  // // 로그인 상태 변경 함수
  toggleLoginStatus = () => {
    this.setState((prevState) => ({
       isLoggedIn: !prevState.isLoggedIn,
    }));
   };
  render() {
    const { isLoggedIn } = this.state;
    const navStyle = {
      backgroundColor: '#DDF3FF',
      padding: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // 중앙 정렬
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    // 모든 네비게이션 요소를 감싸는 컨테이너 스타일
    const navContainerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%', // 원하는 너비로 조정
      margin: '0 auto', // 수평 중앙 정렬
    };

    const navLeftStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    const titleStyle = {
      marginLeft: '15px',
      color: 'black',
      fontWeight: 'bold',
      fontSize: '28px',
    };

    const logoStyle = {
      height: '60px',
    };

    const navLinkStyle = {
      padding: '10px 20px',
      borderRadius: '5px',
      backgroundColor: 'white',
      color: '#ADD8E6',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'background-color 0.3s, color 0.3s',
      fontSize: '20px',
    };
 
    
    return (
      <BrowserRouter>
        <div>
          {/* 네비게이션 바 */}
          <nav style={navStyle}>
            {/* 왼쪽에 로고와 타이틀 */}
            <div style={navLeftStyle}>
              <Link to="/">
                <img src={logoImage} alt="로고" style={logoStyle} />
              </Link>
              <span style={{ margin: '0 240px' }}></span>
              <div style={titleStyle}>계룡건설 빅데이터 기반 GREEN TECH SW개발자 과정 3기</div>
            </div>
           {/* 오른쪽 네비게이션 링크 */}
          <div>
          <span style={{ margin: '0 10px' }}></span>
              {/* 로그인 상태에 따라 버튼 변경 */}
              {isLoggedIn ? (
                <Link to="/" style={navLinkStyle} onClick={this.handleLogout}>
                  로그아웃
                </Link>
              ) : (
                <Link to="/" style={navLinkStyle}>
                  로그인
                </Link>
              )}
            <span style={{ margin: '0 20px' }}></span>
            {/* 추가적인 네비게이션 링크를 여기에 추가할 수 있습니다 */}
          </div>
        </nav>
          {/* 메뉴 */}
        <div className="container mt-3" style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul style={{ display: 'inline-block', listStyle: 'none', padding: 10 }}>
          </ul>
        </div>
          

          {/* 주요 컨텐츠 */}
          <div className="container mt-3">
            <Routes>
            <Route path="/" element={<LoginForm
                  handleLoginStatus={(status) => this.setState({ isLoggedIn: status })}/>} />
              {/* Main, MainSection 등에서 isLoggedIn 상태 전달 */}
              <Route path="/main" element={<Main isLoggedIn={isLoggedIn} />}/>
              <Route path="/main-section" element={<MainSection isLoggedIn={isLoggedIn} />} />  
              <Route path="/visitors" element={<Visitors isLoggedIn={isLoggedIn}/>} />
              <Route path="/aboutme" element={<AboutMe isLoggedIn={isLoggedIn}/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;