// src/components/learning/ArticlePreview.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ArticlePreview = ({ article, onSelect }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.summary}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{article.readTime} read</small>
          <Button variant="primary" size="sm" onClick={onSelect}>
            Read Article
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ArticlePreview;

