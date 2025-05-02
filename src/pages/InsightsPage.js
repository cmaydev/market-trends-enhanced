// src/pages/InsightsPage.js
// Import this at the top
import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import { Row, Col, Card, Tab, Nav, Button, Badge, ListGroup } from 'react-bootstrap';

const InsightsPage = ({ stockData, aiInsights }) => {
  const [activeTab, setActiveTab] = useState('current');
  
  // Sample historical insights
  const historicalInsights = [
    {
      id: 1,
      date: '2025-04-25',
      stock: 'AAPL',
      insight: 'Apple showing strong momentum after product announcements. Technical indicators suggest potential for continued upward movement.',
      recommendation: 'BUY',
      priceAtTime: 175.32,
      currentPrice: 180.95,
      result: 'CORRECT'
    },
    {
      id: 2,
      date: '2025-04-20',
      stock: 'MSFT',
      insight: 'Microsoft approaching resistance levels with weakening momentum. Technical indicators suggest a potential pullback in the short term.',
      recommendation: 'HOLD',
      priceAtTime: 342.18,
      currentPrice: 340.67,
      result: 'CORRECT'
    },
    {
      id: 3,
      date: '2025-04-15',
      stock: 'NVDA',
      insight: 'NVIDIA showing signs of overbought conditions after recent rally. Technical indicators suggest potential for short-term consolidation.',
      recommendation: 'SELL',
      priceAtTime: 790.45,
      currentPrice: 780.28,
      result: 'CORRECT'
    },
    {
      id: 4,
      date: '2025-04-10',
      stock: 'GOOGL',
      insight: 'Google forming a bullish pattern with improving momentum. Technical indicators suggest potential for upward breakout.',
      recommendation: 'BUY',
      priceAtTime: 158.32,
      currentPrice: 160.72,
      result: 'CORRECT'
    }
  ];
  
  // Sample market insights
  const marketInsights = [
    {
      id: 1,
      title: 'Technology Sector Analysis',
      content: 'Technology stocks are showing mixed signals with large-cap stocks outperforming smaller players. The sector is currently trading at elevated P/E ratios compared to historical averages, suggesting potential caution. Cloud computing and AI subsectors continue to show the strongest growth prospects.',
      date: '2025-04-30'
    },
    {
      id: 2,
      title: 'Semiconductor Industry Outlook',
      content: 'Semiconductor stocks are displaying divergent performance patterns. Companies focused on AI chips are maintaining strong momentum, while traditional semiconductor manufacturers are facing headwinds from supply chain pressures and reduced consumer electronics demand.',
      date: '2025-04-28'
    },
    {
      id: 3,
      title: 'Market Breadth Analysis',
      content: 'Overall market breadth has been weakening despite major indices holding near all-time highs. The percentage of stocks trading above their 200-day moving averages has declined, which often precedes market corrections. Defensive sectors have been outperforming cyclicals in recent weeks.',
      date: '2025-04-25'
    }
  ];
  
  const getRecommendationBadge = (recommendation) => {
    let badgeColor = 'secondary';
    if (recommendation === 'BUY') badgeColor = 'success';
    if (recommendation === 'SELL') badgeColor = 'danger';
    if (recommendation === 'HOLD') badgeColor = 'warning';
    
    return <Badge bg={badgeColor}>{recommendation}</Badge>;
  };
  
  const getResultBadge = (result) => {
    let badgeColor = 'secondary';
    if (result === 'CORRECT') badgeColor = 'success';
    if (result === 'INCORRECT') badgeColor = 'danger';
    if (result === 'PARTIAL') badgeColor = 'warning';
    
    return <Badge bg={badgeColor}>{result}</Badge>;
  };
  
  // Format current AI insights
  const formattedAiInsights = aiInsights ? (
    <div>
      {aiInsights.split('\n\n').map((paragraph, index) => (
        <p key={index} className={index === 0 ? "fw-bold" : ""}>
          {paragraph}
        </p>
      ))}
    </div>
  ) : (
    <p>No current AI insights available. Select a stock to generate insights.</p>
  );
  
  return (
    <Row>
      <Col>
        <Tab.Container id="insights-tabs" activeKey={activeTab} onSelect={setActiveTab}>
          <Card>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="current">Current Insights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="historical">Historical Insights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="market">Market Analysis</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="current">
                  <Row>
                    <Col md={8}>
                      <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <span>AI Insights</span>
                          <span className="badge bg-primary">Powered by AI</span>
                        </Card.Header>
                        <Card.Body>
                          {formattedAiInsights}
                          <div className="mt-3 text-end">
                            <small className="text-muted">
                              Note: This is AI-generated analysis and should not be considered as professional financial advice.
                            </small>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card>
                        <Card.Header>Key Metrics</Card.Header>
                        <ListGroup variant="flush">
                          {stockData && (
                            <>
                              <ListGroup.Item>
                                <div className="d-flex justify-content-between">
                                  <span>Symbol:</span>
                                  <strong>{stockData.symbol}</strong>
                                </div>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <div className="d-flex justify-content-between">
                                  <span>Current Price:</span>
                                  <strong>${stockData.prices[stockData.prices.length - 1]}</strong>
                                </div>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <div className="d-flex justify-content-between">
                                  <span>30-Day Change:</span>
                                  <strong className={parseFloat(stockData.change) >= 0 ? 'text-success' : 'text-danger'}>
                                    {stockData.change}%
                                  </strong>
                                </div>
                              </ListGroup.Item>
                            </>
                          )}
                          {!stockData && (
                            <ListGroup.Item>
                              <p className="text-center my-3">Select a stock to view key metrics</p>
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="historical">
                  <h5 className="mb-3">Historical AI Insights & Performance</h5>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Stock</th>
                        <th>Insight</th>
                        <th>Recommendation</th>
                        <th>Price Then</th>
                        <th>Price Now</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historicalInsights.map(item => (
                        <tr key={item.id}>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>{item.stock}</td>
                          <td>{item.insight}</td>
                          <td>{getRecommendationBadge(item.recommendation)}</td>
                          <td>${item.priceAtTime.toFixed(2)}</td>
                          <td>${item.currentPrice.toFixed(2)}</td>
                          <td>{getResultBadge(item.result)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="market">
                  <h5 className="mb-3">Market-Wide AI Analysis</h5>
                  {marketInsights.map(insight => (
                    <Card key={insight.id} className="mb-3">
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <span>{insight.title}</span>
                        <small className="text-muted">{new Date(insight.date).toLocaleDateString()}</small>
                      </Card.Header>
                      <Card.Body>
                        <p>{insight.content}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Col>
    </Row>
  );
};



export default InsightsPage;