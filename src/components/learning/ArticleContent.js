// src/components/learning/ArticleContent.js
import React from 'react';

const ArticleContent = ({ article }) => {
  return (
    <div className="article-content">
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <div className="mt-4 pt-3 border-top">
        <small className="text-muted">
          Estimated reading time: {article.readTime}
        </small>
      </div>
    </div>
  );
};

export default ArticleContent;