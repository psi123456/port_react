import React, { useState, useEffect } from "react";
import imgJoWanWoo from "../조완우.png";
import imgParkSangIl from "../박상일.jpg";
import imgMinSeung from "../추민승.png";
import imgYoonJiMin from "../윤지민.jpg";
import imgJeonSuYeon from "../전수연.jpg";
import imgOhEunChae from "../오은채.png";
// import "./Main.css"; // CSS 파일을 임포트

function Main() {
  const [showCards, setShowCards] = useState(false);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "-35px", // 위쪽 마진 추가
    background: "#eef",
  };

  const cardContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "-10px", // 수정된 부분: marginTop 값을 조정하여 카드를 위로 올립니다.
    marginBottom: "120px",
    flexDirection: "row", // 세로로 나열되도록 변경
  };
  
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "250px", // 크기를 조정
    margin: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    marginTop: "5px",
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 10px",
    backgroundColor: "#808080", // 회색으로 변경
    color: "f9f9f9",
    height: "55px",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    
    left: "0",
    right: "0",
    zIndex: "1000",
    transition: "background-color 0.3s ease",
  };

  const introSectionStyle = {
    marginTop: "20px", // 소개 섹션 위쪽 마진 추가
    textAlign: "center",
  };

  const introTitleStyle = {
    fontSize: "24px", // 타이틀 크기 조정
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const introTextStyle = {
    fontSize: "18px",
    fontFamily: 'Arial, sans-serif', // 원하는 글꼴로 변경하세요
    lineHeight: '5.4', // 줄 간격을 늘릴 수 있습니다.
    textAlign: "center",
    marginTop: "30px", // 위쪽 마진 추가
    color: "#333", // 텍스트 색상을 조정할 수 있습니다.
    fontWeight: 'bold', // 볼드체로 설정
  };
  

  const imageStyle = {
    width: "140px",
    height: "160px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  const textStyle = {
    padding: "10px 0",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const linkStyle = {
    color: "white", // 흰색으로 변경
    textDecoration: "none",
    fontSize: "16px",
  };

  const people = [
    {
      img: imgJoWanWoo,
      name: "👤 조완우",
      email: "✉️ hr395@naver.com",
      phone: "📞 010-2429-1606",
      birthdate: "🎂 생년월일: 1993.06.17",
    },
    {
      img: imgParkSangIl,
      name: "👤 박상일",
      email: "✉️ darkeagle333@naver.com",
      phone: "📞 010-6327-3726",
      birthdate: "🎂 생년월일: 1991.12.26",
    },
    {
      img: imgMinSeung,
      name: "👤 추민승",
      email: "✉ aksk1435@naver.com",
      phone: "📞 010-5216-9432",
      birthdate: "🎂 생년월일: 1999.05.04",
    },
    {
      img: imgYoonJiMin,
      name: "👤 윤지민",
      email: "✉️ jimin7uz2@gmail.com",
      phone: "📞 010-3088-8347",
      birthdate: "🎂 생년월일: 2000.04.25",
    },
    {
      img: imgJeonSuYeon,
      name: "👤 전수연",
      email: "✉️ hr395@naver.com",
      phone: "📞 010-1234-5678",
      birthdate: "🎂 생년월일: 2001.2.10",
    },
    {
      img: imgOhEunChae,
      name: "👤 오은채",
      email: "✉️ dmsco72012@naver.com",
      phone: "📞 010-4205-8853",
      birthdate: "🎂 생년월일: 2001.07.04",
    },
  ];

  // 페이지가 로딩되면 카드를 나타나게 함
  useEffect(() => {
    setShowCards(true);
  }, []);

  return (
    <div>
      {/* 상단바를 추가합니다. */}
      <nav style={navbarStyle}>
        <span style={{ margin: "0 20px" }}></span>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>홈</a>
        <span style={{ margin: "0 20px" }}></span>
        <a href="/main-section" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>조완우</a>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>박상일</a>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>추민승</a>
        <a href="/aboutme" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>윤지민</a>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>전수연</a>
        <a href="/visitors" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>오은채</a>
        <a href="/visitors" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>방명록</a>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>프로젝트</a>
        <span style={{ margin: "0 20px" }}></span>
      </nav>

      {/* 기존 컨테이너와 카드 컨테이너 */}
      
      <div style={containerStyle}>
        <div style={introSectionStyle}>
          <span style={{ topmargin: "0 20px" }}></span>
          <p style={introTextStyle}>
            💫안녕하세요, 빅데이터 기반 GREEN TECH SW 개발자 과정 3기 
            react portfol 서비스를 제공하는 3조입니다.💫
          </p>
        </div>
        <div style={cardContainerStyle}>
          {people.map((person, index) => (
            <div
              key={index}
              style={cardStyle}
              className={showCards ? "card-enter-active" : "card-enter"} // 애니메이션 클래스를 추가합니다.
            >
              <img
                src={person.img}
                alt={`사진: ${person.name}`}
                style={imageStyle}
              />
              <div style={textStyle}>
                <strong>{person.name}</strong>
              </div>
              <div style={textStyle}>{person.birthdate}</div>
              <div style={textStyle}>{person.email}</div>
              <div style={textStyle}>{person.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;