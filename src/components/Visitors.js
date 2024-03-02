import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getCurrentLocalTime() {
  return new Date().toLocaleString(); 
}

function Visitors() {
    const [entries, setEntries] = useState([]);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [views, setViews] = useState(0);
    const [message, setMessage] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);
 
    useEffect(() => {
      fetchGuestbookEntries();
  }, []);

  const fetchGuestbookEntries = async () => {
      try {
          const response = await axios.get('http://localhost:9998//Visitors');
          setEntries(response.data);
      } catch (error) {
          console.error('Error fetching guestbook entries:', error);
      }
  };

  
   const handleCloseModal = () => {
    setSelectedEntry(null); // 모달을 닫을 때 선택한 항목을 초기화
  };
  const handleDelete = async (id) => {
    // 현재 편집 중이거나 보고 있는 항목이 삭제 대상인지 확인
    if (editingId === id) {
        // 편집 중인 항목이 삭제 대상이면 편집 상태 초기화
        setEditingId(null);
        setTitle('');
        setName('');
        setMessage('');
        setViews(0);
    }

    if (selectedEntry && selectedEntry.id === id) {
        // 보고 있는 항목이 삭제 대상이면 선택 상태 초기화
        setSelectedEntry(null);
    }

    try {
        // 서버에 삭제 요청을 보냅니다.
        await deleteGuestbookEntry(id);
    } catch (error) {
        console.error('방명록 항목 삭제 중 오류 발생:', error);
    }

    // 목록에서 해당 항목 삭제
    setEntries(entries.filter(entry => entry.id !== id));
};

  const handleEditClick = (entry) => {
    // 입력 필드에 선택된 항목의 데이터를 설정합니다.
    setName(entry.name);
    setMessage(entry.message);
    setEditingId(entry.id); // 수정 모드로 전환
    setTitle(entry.title);
    setViews(entry.views);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // 수정 모드: 기존 항목 업데이트
      const updatedEntryData = {
        title,
        name,
        message,
        views,
        // date와 views는 여기서 업데이트하지 않음
      };
      await updateGuestbookEntry(editingId, updatedEntryData); // 수정된 부분
    } else {
      // 추가 모드: 새 항목 생성
      const currentDateTime = getCurrentLocalTime(); 
      const newEntryData = {
        number: Date.now(), // 고유 번호 생성
        title,
        name,
        message,
        views:0,
        date: currentDateTime,
      };
      await createGuestbookEntry(newEntryData); 
    }
    
    // 폼 초기화
    setTitle('');
    setName('');
    setMessage('');
    setEditingId(null);
  };


  const increaseViews = async (entryId) => {
    try {
        const response = await axios.post(`http://localhost:9998/Visitors/increase-views/${entryId}`);
        if (response.status === 200) {
            console.log('조회수가 증가되었습니다.');
            // 조회수가 업데이트된 새로운 목록을 불러옵니다.
            fetchGuestbookEntries();
        }
    } catch (error) {
        console.error('조회수 증가 중 오류 발생:', error);
    }
};
  const handleViewClick = async (entry) => {
    setSelectedEntry(entry);
    await increaseViews(entry.id);
};
  
const updateGuestbookEntry = async (id, updatedData) => {
  try {
      const response = await axios.put(`http://localhost:9998/Visitors/${id}`, updatedData);
      if (response.status === 200) {
          console.log('방명록 항목이 수정되었습니다.');
          // 엔트리 목록을 새로고침하거나, 개별 엔트리를 업데이트할 수 있습니다.
          // fetchGuestbookEntries();
          // 또는
          setEntries(entries.map(entry => entry.id === id ? { ...entry, ...updatedData } : entry));
      }
  } catch (error) {
      console.error('방명록 항목 수정 중 오류 발생:', error);
  }
};
  const createGuestbookEntry = async (data) => {
    try {
      const response = await axios.post('http://localhost:9998/Visitors', data);
      if (response.status === 201) {
        console.log('방명록 항목이 생성되었습니다.');
        fetchGuestbookEntries(); // 생성 후 목록을 새로고침
      }
    } catch (error) {
      console.error('방명록 항목 생성 중 오류 발생:', error);
    }
  };
  const deleteGuestbookEntry = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9998/Visitors/${id}`);
      if (response.status === 200) {
        console.log('방명록 항목이 삭제되었습니다.');
        fetchGuestbookEntries(); // 삭제 후 목록을 새로고침
      }
    } catch (error) {
      console.error('방명록 항목 삭제 중 오류 발생:', error);
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
    <div style={styles.container}>
    <h2 style={{ ...styles.header, textAlign: 'center' }}>(계룡건설) 빅데이터 기반 GREEN TECH SW개발자 과정 3기</h2>
    <div style={styles.tableHeader}>
        <span>번호</span>
        <span>제목</span>
        <span>작성자</span>
        <span>작성일</span>
        <span>조회수</span>
        <span>삭제/수정</span>
        <span>글 보기</span>
      </div>
    <ul style={styles.list}>
      {entries.map((entry,index) => (
        <li key={entry.id} style={styles.entry}>
          <span>{index + 1}</span> {/* 번호는 항목의 인덱스에 1을 더한 값 */}
          <span>{entry.title}</span> {/* 제목 */}
          <span>{entry.name}</span> {/* 작성자 */}
          <span>{entry.date}</span> {/* 작성일 */}
          <span>{entry.views}</span> {/* 조회수, 이 값을 관리하려면 추가 로직 필요 */}
          
          <span>
          <button onClick={() => handleDelete(entry.id)} style={styles.deleteButton}>삭제</button>
          <button onClick={() => handleEditClick(entry)} style={styles.editButton}>수정</button>
          </span>
          <button onClick={() => handleViewClick(entry)} style={styles.viewButton}>보기</button>
        </li>
      ))}
    </ul>
    <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          제목:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={styles.input} 
          />
        </label>
        <label style={styles.label}>
          작성자:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={styles.input} 
          />
        </label>
        <label style={styles.label}>
        </label>
        <label style={styles.label}>
          글쓰기:
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            style={styles.textarea} 
          />
        </label>
        <button type="submit" style={styles.button}>
          {editingId ? '수정' : '등록'}
        </button>
      </form>
      {selectedEntry && ( 
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{selectedEntry.title}</h2>
            <p>작성자: {selectedEntry.name}</p>
            <p>날짜: {selectedEntry.date}</p>
            <p>내용: {selectedEntry.message}</p>
            <button onClick={handleCloseModal} style={styles.closeButton}>닫기</button>
          </div>
        </div>
      )}
    </div></>
);
}
const styles = {
    header: {
        fontSize: '26px',
        color: '#333',
        marginBottom: '30px',
        borderBottom: '3px solid #e1e1e1',
        paddingBottom: '10px',
      },
      tableHeader: {
        display: 'grid',
         // 8개의 열을 1fr로 나누어 배치
        padding: '10px',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        marginBottom: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
      },
      list: {
        listStyle: 'none',
        padding: '0',
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom: '20px',
      },
      entry: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr', // 8개의 열을 1fr로 나누어 배치
        alignItems: 'center',
        padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
      },
      label: {
        marginBottom: '10px',
        color: '#495057',
        fontSize: '14px',
      },
      input: {
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ced4da',
        borderRadius: '10px',
        fontSize: '14px',
        width: '100%', // 너비를 100%로 설정하여 부모의 너비만큼 확장
      },
      textarea: {
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ced4da',
        borderRadius: '10px',
        minHeight: '150px', // 조금 더 높이를 주어 글쓰기 공간 확장
        width: '100%', // 너비를 100%로 설정하여 부모의 너비만큼 확장
      },
      button: {
        backgroundColor: '#87CEEB',
        color: '#fff',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
        alignSelf: 'flex-end',
        marginTop: '10px',
      },
      deleteButton: {
        backgroundColor: '#87CEEB',
        color: '#fff',
        padding: '8px 11px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '13px',
        marginRight: '2px',
      },
      editButton: {
        backgroundColor: '#87CEEB',
        color: '#fff',
        padding: '8px 11px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '13px',
        arginRight: '2px',
      },
      viewButton: {
        backgroundColor: '#87CEEB',
        color: '#fff',
        padding: '6px 10px', // Adjust padding as needed
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '13px', // Adjust font size as needed
        marginRight: '2px',
        width: '80px', // Set a fixed width for the button
      },
      modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 9999,
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '80%',
        overflowY: 'auto',
        maxHeight: '80%',
      },
      closeButton: {
        backgroundColor: '#87CEEB',
        color: '#fff',
        padding: '8px 12px',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '14px',
        alignSelf: 'flex-end',
        marginTop: '10px',
      },
    };
    
    export default Visitors;