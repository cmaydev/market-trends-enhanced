// src/pages/WatchlistPage.js
import React, { useState } from 'react';
import { Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap';

const WatchlistPage = ({ 
  watchlist, 
  selectedStock, 
  setSelectedStock, 
  removeFromWatchlist, 
  addToWatchlist 
}) => {
  const [newSymbol, setNewSymbol] = useState('');
  
  // Sample stock data - in a real app, you'd fetch this data
  const stockInfo = {
    'AAPL': { price: 180.95, change: 2.45, changePercent: 1.37, volume: '42.3M' },
    'MSFT': { price: 340.67, change: -1.23, changePercent: -0.36, volume: '28.1M' },
    'NVDA': { price: 780.28, change: 15.43, changePercent: 2.02, volume: '37.5M' },
    'GOOGL': { price: 160.72, change: 0.84, changePercent: 0.53, volume: '19.8M' },
  };
  
  const handleAddSymbol = (e) => {
    e.preventDefault();
    if (newSymbol.trim()) {
      addToWatchlist(newSymbol.toUpperCase().trim());
      setNewSymbol('');
    }
  };
  
  return (
    <Row>
      <Col>
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>My Watchlist</span>
            <Badge bg="primary">{watchlist.length} Stocks</Badge>
          </Card.Header>
          <Card.Body>
            {watchlist.length > 0 ? (
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Volume</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map(symbol => {
                    const info = stockInfo[symbol] || { 
                      price: 100.00, 
                      change: 0.00, 
                      changePercent: 0.00, 
                      volume: 'N/A' 
                    };
                    
                    const getCompanyName = (symbol) => {
                      const companies = {
                        'AAPL': 'Apple Inc.',
                        'MSFT': 'Microsoft Corporation',
                        'NVDA': 'NVIDIA Corporation',
                        'GOOGL': 'Alphabet Inc.',
                      };
                      return companies[symbol] || symbol;
                    };
                    
                    return (
                      <tr key={symbol} className={selectedStock === symbol ? 'table-primary' : ''}>
                        <td>
                          <strong>{symbol}</strong>
                        </td>
                        <td>{getCompanyName(symbol)}</td>
                        <td>${info.price.toFixed(2)}</td>
                        <td className={info.change >= 0 ? 'text-success' : 'text-danger'}>
                          {info.change >= 0 ? '+' : ''}{info.change.toFixed(2)} ({info.changePercent.toFixed(2)}%)
                        </td>
                        <td>{info.volume}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => setSelectedStock(symbol)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeFromWatchlist(symbol)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div className="text-center p-4">
                <p className="mb-3">Your watchlist is empty. Add some stocks to get started!</p>
              </div>
            )}
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>Add Stock to Watchlist</Card.Header>
          <Card.Body>
            <Form onSubmit={handleAddSymbol}>
              <Row className="align-items-center">
                <Col md={8}>
                  <Form.Group>
                    <Form.Label>Stock Symbol</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter stock symbol (e.g., AAPL)" 
                      value={newSymbol}
                      onChange={(e) => setNewSymbol(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Enter a valid stock ticker symbol.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4} className="mt-md-4">
                  <Button 
                    variant="success" 
                    type="submit" 
                    className="w-100"
                  >
                    Add to Watchlist
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default WatchlistPage;