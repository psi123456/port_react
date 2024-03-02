import React from 'react';
import { Card, Button } from 'react-bootstrap';

const truncateText = (text, limit) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

const CardComponent = ({ id, title, description, image_url, emoji, onDelete }) => {
  // 이미지 URL을 직접 사용합니다.
  const detailUrl = ' http://localhost:3002'; // 원하는 URL로 수정하세요
  return (
    <Card style={{ width: '18rem' }}>
       <Card.Img variant="top" src={image_url} className="card-img-top" />
      <Card.Body>
        <Card.Title>
          {emoji}
          {truncateText(title, 10)}
        </Card.Title>
        <Card.Text>
          {truncateText(description, 100)}
        </Card.Text>
         {/* Link 컴포넌트를 사용하여 '/create-form'으로 이동 */}
         <a href={detailUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="primary">자세히 보기</Button>
        </a>{' '}
        <Button variant="danger" onClick={() => onDelete(id)}>삭제</Button>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;

