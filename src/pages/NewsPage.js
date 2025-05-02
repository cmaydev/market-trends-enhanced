// src/pages/NewsPage.js
import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';

const NewsPage = ({ newsItems = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('all');
  
  // If no news items are provided, use these samples
  const sampleNews = [
    {
      id: 1,
      title: 'Federal Reserve Signals Potential Rate Cut in September',
      source: 'Financial Times',
      url: '#',
      sentiment: 'positive',
      publishedAt: '2025-04-30',
      summary: 'The Federal Reserve has indicated it may cut interest rates in its upcoming September meeting, citing improving inflation metrics.'
    },
    {
      id: 2,
      title: 'Tech Stocks Rally as Earnings Beat Expectations',
      source: 'Bloomberg',
      url: '#',
      sentiment: 'positive',
      publishedAt: '2025-04-29',
      summary: 'Major technology companies reported better-than-expected earnings, driving a sector-wide rally in the stock market.'
    },
    {
      id: 3,
      title: 'Oil Prices Fall on Concerns About Global Demand',
      source: 'Reuters',
      url: '#',
      sentiment: 'negative',
      publishedAt: '2025-04-28',
      summary: 'Oil prices declined as concerns about weakening global demand outweighed production cuts announced by OPEC+ nations.'
    },
    {
      id: 4,
      title: 'Retail Sales Remain Flat in April, Missing Expectations',
      source: 'Wall Street Journal',
      url: '#',
      sentiment: 'negative',
      publishedAt: '2025-04-27',
      summary: 'U.S. retail sales showed no growth in April, falling short of economist projections and raising concerns about consumer spending.'
    },
    {
      id: 5,
      title: 'New Semiconductor Plant Construction to Begin Next Month',
      source: 'TechCrunch',
      url: '#',
      sentiment: 'neutral',
      publishedAt: '2025-04-26',
      summary: 'Construction on a major new semiconductor manufacturing facility will begin next month, potentially helping to address ongoing chip shortages.'
    },
    {
      id: 6,
      title: 'Housing Market Shows Signs of Stabilization',
      source: 'CNBC',
      url: '#',
      sentiment: 'neutral',
      publishedAt: '2025-04-25',
      summary: 'After months of volatility, the housing market is showing signs of stabilization with inventory levels and price growth normalizing.'
    }
  ];
  
  // Use provided news items or sample news
  const displayNews = newsItems.length > 0 ? newsItems : sampleNews;
  
  // Filter news based on search term and sentiment
  const filteredNews = displayNews.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSentiment = filterSentiment === 'all' || item.sentiment === filterSentiment;
    
    return matchesSearch && matchesSentiment;
  });
  
  // Get sentiment badge
  const getSentimentBadge = (sentiment) => {
    const badgeClass = sentiment === 'positive' ? 'bg-success' : 
                      sentiment === 'negative' ? 'bg-danger' : 'bg-secondary';
    
    return <span className={`badge ${badgeClass} me-2`}>{sentiment}</span>;
  };
  
  return (
    <Row>
      <Col>
        <Card className="mb-4">
          <Card.Header>
            <h5 className="mb-0">Financial News</h5>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Col md={8}>
                <InputGroup>
                  <Form.Control
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setSearchTerm('')}
                    >
                      Clear
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={4}>
                <Form.Select 
                  value={filterSentiment}
                  onChange={(e) => setFilterSentiment(e.target.value)}
                >
                  <option value="all">All Sentiment</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </Form.Select>
              </Col>
            </Row>
            
            {filteredNews.length > 0 ? (
              filteredNews.map(item => (
                <Card key={item.id} className="mb-3 news-item">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <small className="text-muted">{item.source}</small>
                      <small className="text-muted">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </small>
                    </div>
                    <h5 className="mb-2">
                      {getSentimentBadge(item.sentiment)}
                      {item.title}
                    </h5>
                    <Card.Text>{item.summary}</Card.Text>
                    <div className="text-end">
                      <Button variant="link" href={item.url} target="_blank">
                        Read More
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-center p-4">
                <p>No news items match your search criteria.</p>
                <Button 
                  variant="outline-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterSentiment('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default NewsPage;