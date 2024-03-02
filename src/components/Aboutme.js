import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AboutMe() {
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    aboutMe: " ",
    contact: " ",
    toolsData: [
      { title: "Tools", items: [""] },
      { title: "Skills", items: [""] },
      { title: "Certificate", items: [""] },
      { title: "Education", items: [""] },
    ],
  });
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
  const [data, setData] = useState([]);


    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:9998/api/data");
        const data = await response.json();
    
        console.log("Received data:", data);
    
        if (Array.isArray(data) && data.length > 0) {
          const firstItem = data[0]; // fetchedData 배열에서 첫 번째 요소 가져오기
    
          setData(data);
    
          setEditedData({
            aboutMe: firstItem.oneline || "",
            contact: firstItem.contact || "",
            toolsData: [
              { title: "Tools", items: firstItem.tools ? firstItem.tools.split(", ") : [] },
              { title: "Skills", items: firstItem.skills ? firstItem.skills.split(", ") : [] },
              { title: "Certificate", items: firstItem.certificate ? firstItem.certificate.split(", ") : [] },
              { title: "Education", items: firstItem.education ? firstItem.education.split(", ") : [] },
            ],
          });
        } else {
          console.error("Data is not in the expected format:", data);
          setEditedData({
            aboutMe: " ",
            contact: " ",
            toolsData: [
              { title: "Tools", items: [" "] },
              { title: "Skills", items: [" "] },
              { title: "Certificate", items: [" "] },
              { title: "Education", items: [" "] },
            ],
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };


    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
    
      if (file) {
        const formData = new FormData();
        formData.append('id', '1');
        formData.append('image', file);
        formData.append('oneline', editedData.aboutMe);
        formData.append('tools', editedData.toolsData[0]?.items.join(", ") || "");
        formData.append('skills', editedData.toolsData[1]?.items.join(", ") || "");
        formData.append('certificate', editedData.toolsData[2]?.items.join(", ") || "");
        formData.append('education', editedData.toolsData[3]?.items.join(", ") || "");
        formData.append('contact', editedData.contact);
    
        try {
          // Axios로 데이터 전송
          const response = await axios.post("http://localhost:9998/api/data", formData);
    
          const result = response.data;
          console.log(result.message);
    
          // 이미지 업로드 후 최신 데이터를 불러오기
          loadImage();
          loadData();
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
    
  
  

  useEffect(() => {
    // 서버에서 데이터를 받아오는 함수
    loadData();
    loadImage();
  }, []);

  const loadImage = async () => {
    try {
      const response = await fetch("http://localhost:9998/api/data");
      const data = await response.json();

      if (data && data[0] && data[0].image_path) {
        setImagePreview(`http://localhost:9998/${data[0].image_path}`);
      } else {
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  

  // saveData 함수 수정
  const saveData = async () => {
    try {
      const response = await axios.post("http://localhost:9998/api/data", {
        id: '1',
        oneline: editedData.aboutMe,
        tools: editedData.toolsData[0]?.items.join(", ") || "",
        skills: editedData.toolsData[1]?.items.join(", ") || "",
        certificate: editedData.toolsData[2]?.items.join(", ") || "",
        education: editedData.toolsData[3]?.items.join(", ") || "",
        contact: editedData.contact,
      });

      const result = response.data;
      console.log(result.message);
      loadData();
      loadImage();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  
  


  const handleSaveClick = async () => {
    try {
      // 서버에 수정된 데이터를 저장
      await saveData();

      // 저장이 성공하면 수정 모드를 비활성화하고 데이터를 다시 불러옴
      setIsEditMode(false);
      loadData();
    } catch (error) {
      console.error("Error saving and loading data:", error);
    }
  };


  
  const handleEditClick = () => {
    setIsEditMode(true);
    // 이미지 업로드를 보이도록 설정
    setShowImageUpload(true);
  };

  const handleCancelClick = () => {
    if (isEditMode) {
      setIsEditMode(false);
      loadData();
      // 이미지 업로드를 숨기도록 설정
      setShowImageUpload(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleContactChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [field]: value,
      },
    }));
  };

  const handleToolsChange = (toolIndex, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      toolsData: prevData.toolsData.map((tool, index) =>
        index === toolIndex ? { ...tool, items: value.split(", ") } : tool
      ),
    }));
  };

  const handleEducationChange = (value) => {
    setEditedData((prevData) => ({
      ...prevData,
      toolsData: [
        ...prevData.toolsData.slice(0, 3),  // 앞의 3개 항목은 그대로 두고
        { title: "Education", items: value.split(", ") },  // 변경된 education 항목
      ],
    }));
  };

  const handleToolsItemChange = (toolIndex, itemIndex, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      toolsData: prevData.toolsData.map((tool, index) =>
        index === toolIndex
          ? { ...tool, items: tool.items.map((item, i) => (i === itemIndex ? value : item)) }
          : tool
      ),
    }));
  };
  
  const handleAddToolsItem = (toolIndex) => {
    setEditedData((prevData) => {
      const updatedToolsData = prevData.toolsData.map((tool, index) => {
        if (index === toolIndex) {
          return { ...tool, items: [...tool.items, ""] };
        }
        return tool;
      });
      return { ...prevData, toolsData: updatedToolsData };
    });
  };

  const handleRemoveItem = (toolIndex, itemIndex) => {
    setEditedData((prevData) => {
      const updatedToolsData = prevData.toolsData.map((tool, index) => {
        if (index === toolIndex) {
          const updatedItems = tool.items.filter((_, i) => i !== itemIndex);
          return { ...tool, items: updatedItems };
        }
        return tool;
      });
      return { ...prevData, toolsData: updatedToolsData };
    });
  };
  

  const contactStyle = {
    position: "absolute",
    top: "20px",    // 원하는 위치로 조절
    right: "20px",  // 원하는 위치로 조절
  };

  

  useEffect(() => {
    loadData();
    loadImage();
  }, []);

  

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
    <div className="container" style={{ backgroundColor: "#ffffff", padding: "50px" }}>
      <div className="col-md-12">
        {isEditMode && (
          <div style={{ position: "absolute", top: "300px", right: "400px" }}>
            <button className="btn btn-primary" onClick={handleSaveClick}>
              저장하기
            </button>
            <button className="btn btn-secondary" onClick={handleCancelClick}>
              취소
            </button>
          </div>
        )}
        <h1 className="border-bottom pb-2">About me</h1>

        {showImageUpload && (
          <div>
            {isEditMode && (
              <>
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
                <div style={{ marginTop: "10px" }}>
                  <input type="file" onChange={handleImageUpload} />
                </div>
              </>
            )}
            {!isEditMode && (
              <img
                src={imagePreview}
                alt="Uploaded"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            )}
          </div>
        )}


            

        
        {isEditMode && (
          <>
            <h2>한줄소개 추가하기</h2>
            <input
              type="text"
              value={editedData.aboutMe}
              onChange={(e) => handleInputChange("aboutMe", e.target.value)}
            />

            <h2>Contact</h2>
            <textarea
              value={editedData.contact}
              onChange={(e) => handleInputChange("contact", e.target.value)}
              style={{ whiteSpace: "pre-wrap" }}
            />

            {editedData.toolsData &&
              editedData.toolsData.map((tool, toolIndex) => (
                <div key={tool.title} className="mr-3" style={{ width: "200px" }}>
                  <div className="border-bottom pb-2">
                    <h3>{tool.title}</h3>
                  </div>
                  <ul>
                    {tool.items &&
                      tool.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleToolsItemChange(toolIndex, itemIndex, e.target.value)
                            }
                          />
                          <button
                            onClick={() => handleRemoveItem(toolIndex, itemIndex)}
                          >
                            X
                          </button>
                        </li>
                      ))}
                  </ul>
                  <button onClick={() => handleAddToolsItem(toolIndex)}>
                    Add Item
                  </button>
                </div>
              ))}
          </>
        )}

        {!isEditMode && (
          <>
            <div className="d-flex">
              <div className="flex-1 mr-3">
                {/* {showImageUpload && (
                  <div>
                    <input type="file" onChange={handleImageUpload} />
                  </div>
                )} */}
                {/* {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )} */}
                <h1>{editedData.aboutMe}</h1>
              </div>
              <div className="flex-1 d-flex flex-column position-relative">
                <div className="d-flex">
                  {editedData.toolsData.map((tool, index) => (
                    <div key={index} className="mr-3" style={{ width: "200px" }}>
                      <div className="border-bottom pb-2">
                        <h3>{tool.title}</h3>
                      </div>
                      <ul>
                        {tool.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    position: "relative",
                    left: "600px",
                    top: "120px",
                    padding: "10px",
                  }}
                >
                  {editedData.contact.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleEditClick}
              style={{ position: "absolute", top: "300px", right: "400px" }}
            >
              수정하기
            </button>
          </>
        )}
      </div>
    </div>
  </>
);
}

export default AboutMe;