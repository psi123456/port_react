import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import CardComponent from './CardComponent';
import './MainSection.css'; // 이 파일에 스타일을 정의함
import axios from 'axios';

const emojiOptions = ['✍️', '🧭', '🚮', '🌳', '📖', '⏰']; // 선택 가능한 이모지 목록

const MainSection = () => {
  const [cards, setCards] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newEmoji, setNewEmoji] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 이미지 경로를 세션에 저장
  const setSessionImagePath = (imagePath) => {
    sessionStorage.setItem('imagePath', imagePath);
  };

  // 이미지 경로를 쿠키에 저장
  const setCookieImagePath = (imagePath) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    document.cookie = `imagePath=${imagePath};expires=${expires.toUTCString()}`;
  };

  // 서버에서 카드 데이터를 불러오는 함수
  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:9998/project');
      if (response.data && Array.isArray(response.data)) {
        // 서버로부터 받아온 데이터가 배열이라면 상태를 업데이트
        setCards(response.data);
      } else {
        // 데이터 형식이 예상과 다를 경우 적절한 에러 핸들링을 수행
        console.error('Received data is not an array', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 컴포넌트가 마운트될 때 카드 데이터를 불러옴
  useEffect(() => {
    fetchCards();
  }, []);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
   // 이미지 업로드 핸들러
   const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);

      // 이미지 경로를 세션에 저장
      setSessionImagePath(file.name);

      // 이미지 경로를 쿠키에 저장
      setCookieImagePath(file.name);
    }
  };
  const handleSelectEmoji = (e) => {
    setNewEmoji(e); // 선택된 이모지를 newEmoji 상태에 저장
    setDropdownOpen(false); // 드롭다운 닫기
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await axios.delete(`http://localhost:9998/project/${cardId}`);
      // 상태 업데이트로 UI에서 카드 제거
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // 폼을 제출하는 함수
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('description', newDescription);
    formData.append('emoji', newEmoji);
    formData.append('image', imageFile);

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:9998/project',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // 서버로부터 반환된 데이터를 사용하여 카드 목록 업데이트
      const newCardData = response.data;
      const newCard = {
        id: newCardData.id,
        title: newTitle,
        description: newDescription,
        imageUrl: newCardData.image_path,
        emoji: newEmoji,
      };
      setCards(currentCards => [...currentCards, newCard]);

      // 이미지 경로를 초기화
      setImageFile(null); // 이미지 파일 상태 초기화

    } catch (error) {
      console.error('Error:', error);
    }
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
    top: 80,
    left: "0",
    right: "0",
    zIndex: "1000",
    transition: "background-color 0.3s ease",
  };

  return (
    <><nav style={navbarStyle}>
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
    <Container>
      <Row className="justify-content-md-center">
        {cards.map((card) => (
          <Col key={card.id} sm={12} md={4} lg={4} className="mb-4">
          <CardComponent {...card} onDelete={handleDeleteCard} />
        </Col>
        ))}
      </Row>
      <div className="mb-3">
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="제목 입력" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>설명</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="설명 입력" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>이모지 선택</Form.Label>
            <Dropdown show={dropdownOpen} onSelect={handleSelectEmoji} onToggle={toggleDropdown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {newEmoji || "이모지 선택"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {emojiOptions.map((emoji, index) => (
                  <Dropdown.Item key={index} eventKey={emoji}>{emoji}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <label htmlFor="image-upload" className="btn btn-primary mr-2">이미지 업로드</label>
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
          <Button type="submit" className="btn btn-primary mr-2">저장하기</Button>
        </Form>
      </div>
    </Container>
    </>
  );
};

export default MainSection;
