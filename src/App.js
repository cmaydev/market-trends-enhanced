// src/App.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Alert, 
  Nav, 
  Navbar 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';

// Import components
import Navigation from './components/layout/Navigation';
// Import components
import LearningCenter from './components/learning/LearningCenter';
import EnhancedChart from './components/charts/EnhancedChart';
import ChartLoadingState from './components/charts/ChartLoadingState';
import './assets/styles/main.css';
import WatchlistPage from './pages/WatchlistPage';
import NewsPage from './pages/NewsPage';
import InsightsPage from './pages/InsightsPage';


function App() {
  // State management
  const [watchlist, setWatchlist] = useState(() => {
    // Try to get saved watchlist from localStorage
    const savedWatchlist = localStorage.getItem('watchlist');
    // Return parsed data or default watchlist if nothing is saved
    return savedWatchlist ? JSON.parse(savedWatchlist) : ['AAPL', 'MSFT', 'NVDA', 'GOOGL'];
  });
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const [aiInsights, setAiInsights] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeFrame, setTimeFrame] = useState('1M');
  const [activePage, setActivePage] = useState('dashboard');

  // Handle time period changes
  const handleTimeFrameChange = (period) => {
    setTimeFrame(period);
    const newSampleData = generateSampleDataForTimeFrame(selectedStock, period);
    setStockData(newSampleData);
    generateAiInsights(selectedStock, newSampleData);
  };

  // Add a stock to watchlist
  const addToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      // Create new watchlist with the added symbol
      const newWatchlist = [...watchlist, symbol];
      // Update state
      setWatchlist(newWatchlist);
      // Save to localStorage
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    }
  };

  // Remove a stock from watchlist
  const removeFromWatchlist = (symbol) => {
    // Create new watchlist without the removed symbol
    const newWatchlist = watchlist.filter(item => item !== symbol);
    // Update state
    setWatchlist(newWatchlist);
    // Save to localStorage
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    
    // If the removed stock is the selected one, select another stock
    if (symbol === selectedStock && newWatchlist.length > 0) {
      setSelectedStock(newWatchlist[0]);
    }
  };

  // All other functions (generateSampleDataForTimeFrame, getCompanyName, fetchRelatedNews, etc.)
  // ...

  // Helper function to get company names
  const getCompanyName = (symbol) => {
    const companies = {
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corporation',
      'NVDA': 'NVIDIA Corporation',
      'GOOGL': 'Alphabet Inc.',
    };
    return companies[symbol] || symbol;
  };

  // Function to generate sample data for different time frames
  const generateSampleDataForTimeFrame = (symbol, period) => {
    // Determine how many data points to generate based on the time frame
    let dataPoints;
    let volatilityFactor; // Higher = more volatile
    
    switch(period) {
      case '1D':
        dataPoints = 24; // Hourly data for 1 day
        volatilityFactor = 0.002;
        break;
      case '1W':
        dataPoints = 7; // Daily data for 1 week
        volatilityFactor = 0.008;
        break;
      case '1M':
        dataPoints = 30; // Daily data for 1 month
        volatilityFactor = 0.02;
        break;
      case '3M':
        dataPoints = 90; // Daily data for 3 months
        volatilityFactor = 0.04;
        break;
      case '1Y':
        dataPoints = 250; // Daily data for 1 year (excluding weekends)
        volatilityFactor = 0.08;
        break;
      default:
        dataPoints = 30; // Default to 1 month
        volatilityFactor = 0.02;
    }
    
    // Create dates array based on time frame
    const dates = [];
    const prices = [];
    
    // Generate appropriate time intervals
    for (let i = 0; i < dataPoints; i++) {
      const date = new Date();
      
      if (period === '1D') {
        // For 1D, go back by hours
        date.setHours(date.getHours() - (dataPoints - i));
        dates.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      } else {
        // For other periods, go back by days
        date.setDate(date.getDate() - (dataPoints - i));
        dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      }
    }
    
    // Generate price data with appropriate volatility for the time frame
    let price = symbol === 'AAPL' ? 180 : 
               symbol === 'MSFT' ? 340 : 
               symbol === 'NVDA' ? 780 : 
               symbol === 'GOOGL' ? 160 : 100;
    
    // Set initial price further back in time
    const initialPrice = price * (1 - (Math.random() * 0.2 - 0.1)); // ±10% from current
    price = initialPrice;
    
    // Add slight trend bias based on symbol (purely for sample data diversity)
    let trendBias = 0;
    if (symbol === 'AAPL') trendBias = 0.0002;
    if (symbol === 'MSFT') trendBias = 0.0003;
    if (symbol === 'NVDA') trendBias = 0.0004;
    if (symbol === 'GOOGL') trendBias = -0.0001;
    
    // Generate prices
    for (let i = 0; i < dataPoints; i++) {
      // Add some randomness with the appropriate volatility
      price = price * (1 + (Math.random() * volatilityFactor * 2 - volatilityFactor) + trendBias);
      prices.push(Math.round(price * 100) / 100);
    }
    
    // Calculate percent change
    const percentChange = ((prices[prices.length - 1] - prices[0]) / prices[0] * 100).toFixed(2);
    
    return {
      symbol,
      companyName: getCompanyName(symbol),
      dates,
      prices,
      change: percentChange,
      timeFrame: period
    };
  };

  // Simple sentiment analysis function
  const getSentiment = (text) => {
    const positiveWords = ['rise', 'rises', 'rising', 'up', 'gain', 'gains', 'positive', 'bull', 'bullish', 'growth', 'grew', 'higher', 'surge', 'surging', 'rally', 'rallies', 'rallying', 'strong', 'strength', 'profit', 'profits', 'win', 'winning'];
    
    const negativeWords = ['fall', 'falls', 'falling', 'down', 'drop', 'drops', 'dropping', 'decline', 'declining', 'negative', 'bear', 'bearish', 'lower', 'weak', 'weakness', 'loss', 'losses', 'crash', 'crashing', 'plunge', 'plunging', 'tumble', 'tumbling'];
    
    // Convert to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase();
    
    // Count occurrences of positive and negative words
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });
    
    // Determine sentiment
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  // Enhanced generateAiInsights function with deeper analysis and buy/sell recommendations
  const generateAiInsights = async (symbol, data) => {
    // For simplified implementation, using rule-based insights
    const changePercent = parseFloat(data.change);
    let insight = '';
    
    if (changePercent > 5) {
      insight = `${symbol} has shown strong upward momentum (${data.change}%) over the past month. The technical indicators suggest continued strength, with potential for further gains if market conditions remain favorable. \n\nBUY RECOMMENDATION: Consider entering at current levels with a stop loss at 5% below entry. Target price could be 10-15% higher than current levels based on momentum. Watch for any sudden volume increases which could indicate heightened interest from institutional investors.`;
    } else if (changePercent > 0) {
      insight = `${symbol} has shown modest gains (${data.change}%) over the past month. The stock appears to be in a consolidation phase, building potential energy for its next move. \n\nHOLD RECOMMENDATION: Current price level appears to be fair value. Consider adding to positions if the stock breaks above recent resistance with increased volume. Set stop loss at recent support levels. Monitor industry news and broader market trends that could influence the next price movement direction.`;
    } else {
      insight = `${symbol} has declined (${data.change}%) over the past month. The current downtrend indicates weakness, though it may be approaching oversold territory if the decline has been steep. \n\nSELL/AVOID RECOMMENDATION: Consider exiting positions if you're currently holding, especially if the stock breaks below key support levels. For potential buyers, wait for signs of trend reversal before entering. A good entry point might be after the stock establishes a new support level with at least three tests of that level.`;
    }
    
    setAiInsights(insight);
  };

  // Generate sample news for a stock
  const fetchRelatedNews = async (symbol) => {
    const companyName = getCompanyName(symbol);
    const sampleNews = [
      {
        id: 1,
        title: `${companyName} Reports Quarterly Earnings`,
        source: 'Financial Times',
        url: '#',
        sentiment: 'positive',
        summary: 'Company released its latest financial results.'
      },
      {
        id: 2,
        title: `New Product Launches Coming from ${companyName}`,
        source: 'TechCrunch',
        url: '#',
        sentiment: 'neutral',
        summary: 'Recent developments in the company\'s product line.'
      },
      {
        id: 3,
        title: `Industry Analysis: ${companyName}'s Position in the Market`,
        source: 'Bloomberg',
        url: '#',
        sentiment: 'neutral',
        summary: 'Examining competitive landscape and future prospects.'
      }
    ];
    setNewsItems(sampleNews);
  };

  // Updated fetchStockData function to handle all data fetching
  const fetchStockData = async (symbol) => {
    setLoading(true);
    try {
      const sampleData = generateSampleDataForTimeFrame(symbol, timeFrame);
      setStockData(sampleData);
      
      // Fetch related news and generate AI insights
      await fetchRelatedNews(symbol);
      await generateAiInsights(symbol, sampleData);
      
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(`Error fetching data for ${symbol}: ${error.message}`);
      
      // Fall back to sample data if API fails
      const sampleData = generateSampleDataForTimeFrame(symbol, timeFrame);
      setStockData(sampleData);
      
      await fetchRelatedNews(symbol);
      await generateAiInsights(symbol, sampleData);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data when component mounts or selected stock changes
  useEffect(() => {
    fetchStockData(selectedStock);
  }, [selectedStock]);

  // Create a ChartLoadingState component
  const ChartLoadingState = () => (
    <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted">Loading chart data...</p>
    </div>
  );

  // Render the Dashboard View
  const renderDashboard = () => (
    <Row>
      <Col md={3}>
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Watchlist</span>
            {watchlist.length > 0 && (
              <span className="badge bg-primary">{watchlist.length} stocks</span>
            )}
          </Card.Header>
          <Card.Body>
            {watchlist.length > 0 ? (
              <div className="watchlist">
                {watchlist.map(symbol => (
                  <div key={symbol} className="d-flex align-items-center justify-content-between mb-2">
                    <Button
                      variant={selectedStock === symbol ? "primary" : "outline-primary"}
                      className="flex-grow-1 me-1"
                      onClick={() => setSelectedStock(symbol)}
                    >
                      {symbol}
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeFromWatchlist(symbol)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p>Your watchlist is empty. Add stock symbols below.</p>
              </div>
            )}
            
            <Form className="mt-3" onSubmit={(e) => {
              e.preventDefault();
              const symbol = document.getElementById('newSymbol').value.toUpperCase().trim();
              if (symbol) {
                addToWatchlist(symbol);
                document.getElementById('newSymbol').value = '';
              }
            }}>
              <Form.Group>
                <Form.Label>Add Stock Symbol</Form.Label>
                <div className="d-flex">
                  <Form.Control 
                    type="text" 
                    placeholder="e.g., AAPL, MSFT, GOOG" 
                    id="newSymbol"
                  />
                  <Button 
                    variant="success" 
                    type="submit"
                    className="ms-2"
                  >
                    Add
                  </Button>
                </div>
                <Form.Text className="text-muted">
                  Enter valid stock ticker symbols to add them to your watchlist.
                </Form.Text>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>Learning Center</Card.Header>
          <Card.Body>
            <Nav className="flex-column">
              <Nav.Link onClick={() => setActivePage('learn')}>Technical Analysis</Nav.Link>
              <Nav.Link onClick={() => setActivePage('learn')}>Fundamental Analysis</Nav.Link>
              <Nav.Link onClick={() => setActivePage('learn')}>Investment Strategies</Nav.Link>
              <Nav.Link onClick={() => setActivePage('learn')}>Market Indicators</Nav.Link>
            </Nav>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={9}>
        <Card className="mb-4">
          <Card.Header>
            {stockData ? `${stockData.companyName} (${stockData.symbol})` : 'Loading...'}
            {stockData && (
              <span 
                className={`float-end ${parseFloat(stockData.change) >= 0 ? 'text-success' : 'text-danger'}`}
              >
                {stockData.change}%
              </span>
            )}
          </Card.Header>
          <Card.Body>
            <div style={{ height: '300px', padding: '20px 10px 20px 10px' }}>
              {loading ? (
                <ChartLoadingState />
              ) : stockData ? (
                <EnhancedChart data={stockData} />
              ) : (
                <div className="text-center">No data available</div>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <div className="btn-group">
                <Button 
                  variant={timeFrame === "1D" ? "secondary" : "outline-secondary"} 
                  size="sm"
                  onClick={() => handleTimeFrameChange("1D")}
                >
                  1D
                </Button>
                <Button 
                  variant={timeFrame === "1W" ? "secondary" : "outline-secondary"} 
                  size="sm"
                  onClick={() => handleTimeFrameChange("1W")}
                >
                  1W
                </Button>
                <Button 
                  variant={timeFrame === "1M" ? "secondary" : "outline-secondary"} 
                  size="sm"
                  onClick={() => handleTimeFrameChange("1M")}
                >
                  1M
                </Button>
                <Button 
                  variant={timeFrame === "3M" ? "secondary" : "outline-secondary"} 
                  size="sm"
                  onClick={() => handleTimeFrameChange("3M")}
                >
                  3M
                </Button>
                <Button 
                  variant={timeFrame === "1Y" ? "secondary" : "outline-secondary"} 
                  size="sm"
                  onClick={() => handleTimeFrameChange("1Y")}
                >
                  1Y
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>AI Insights</span>
                <span className="badge bg-primary">Powered by AI</span>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Analyzing market data...</p>
                  </div>
                ) : (
                  <div>
                    {aiInsights.split('\n\n').map((paragraph, index) => (
                      <p key={index} className={index === 0 ? "fw-bold" : ""}>
                        {paragraph}
                      </p>
                    ))}
                    <div className="mt-3 text-end">
                      <small className="text-muted">
                        Note: This is AI-generated analysis and should not be considered as professional financial advice.
                      </small>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
  <Card className="mb-4">
    <Card.Header>Recent News</Card.Header>
    <Card.Body>
      {newsItems.length > 0 ? (
        <ul className="list-unstyled">
          {newsItems.map(item => (
            <li key={item.id} className="mb-2">
              <a 
                href={item.url} 
                className="text-decoration-none" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
              <span className={`badge ms-2 ${
                item.sentiment === 'positive' ? 'bg-success' : 
                item.sentiment === 'negative' ? 'bg-danger' : 'bg-secondary'
              }`}>
                {item.sentiment}
              </span>
              <p className="small text-muted">{item.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent news found.</p>
      )}
    </Card.Body>
  </Card>
</Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <div className="App">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'watchlist' && <WatchlistPage 
        watchlist={watchlist} 
        selectedStock={selectedStock} 
        setSelectedStock={setSelectedStock}
        removeFromWatchlist={removeFromWatchlist}
        addToWatchlist={addToWatchlist}
      />}

      {activePage === 'news' && <NewsPage 
        newsItems={newsItems} 
      />}

    {activePage === 'insights' && (
      <InsightsPage 
        stockData={stockData}
        aiInsights={aiInsights}
      />
    )}
    <Container className="mt-4">
      {error && <Alert variant="warning">{error}</Alert>}
      
      {activePage === 'dashboard' && renderDashboard()}
      {activePage === 'learn' && <LearningCenter />}
      {/* Add other page conditions here */}
    </Container>
    </div>
  );
}

export default App;