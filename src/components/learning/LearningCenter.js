// src/components/learning/LearningCenter.js
import React, { useState } from 'react';
import { Card, Row, Col, Nav, Button } from 'react-bootstrap';
import ArticlePreview from './ArticlePreview';
import ArticleContent from './ArticleContent';

// Sample learning content
const learningContent = {
  technical: [
    {
      id: 'tech-1',
      title: 'Understanding Moving Averages',
      summary: 'Learn how to use moving averages to identify market trends and make better trading decisions.',
      readTime: '5 min',
      content: `
        <h2>Understanding Moving Averages</h2>
        <p>Moving averages are one of the most popular and easy-to-use tools available to technical analysts. They smooth out price data to help identify trends by filtering out the "noise" from random short-term price fluctuations.</p>
        
        <h3>Types of Moving Averages</h3>
        <p>There are several types of moving averages, but the most common are:</p>
        <ul>
          <li><strong>Simple Moving Average (SMA)</strong>: Calculated by adding the closing prices over a specific time period and dividing by the number of periods.</li>
          <li><strong>Exponential Moving Average (EMA)</strong>: Gives more weight to recent prices, making it more responsive to new information.</li>
          <li><strong>Weighted Moving Average (WMA)</strong>: Assigns a heavier weighting to more current data points.</li>
        </ul>
        
        <h3>How to Use Moving Averages</h3>
        <p>Moving averages are versatile indicators that can be used in several ways:</p>
        <ol>
          <li><strong>Trend Identification</strong>: When prices are above a moving average, it indicates an uptrend. When prices are below, it suggests a downtrend.</li>
          <li><strong>Support and Resistance</strong>: Moving averages often act as dynamic support or resistance levels.</li>
          <li><strong>Crossovers</strong>: When a shorter-term moving average crosses above a longer-term one, it generates a bullish signal (Golden Cross). The opposite is a bearish signal (Death Cross).</li>
        </ol>
        
        <h3>Common Moving Average Periods</h3>
        <p>Different time periods are used depending on the trading timeframe:</p>
        <ul>
          <li>Short-term traders often use 5, 10, and 20-day moving averages</li>
          <li>Medium-term traders might focus on 20, 50, and 100-day moving averages</li>
          <li>Long-term investors often look at 50, 100, and 200-day moving averages</li>
        </ul>
        
        <p>Remember that no indicator is perfect, and moving averages work best when combined with other technical analysis tools and fundamental research.</p>
      `
    },
    {
      id: 'tech-2',
      title: 'Relative Strength Index (RSI)',
      summary: 'Master the RSI indicator to identify overbought and oversold conditions in the market.',
      readTime: '4 min',
      content: `
        <h2>Relative Strength Index (RSI)</h2>
        <p>The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements. Developed by J. Welles Wilder, the RSI oscillates between zero and 100 and is typically used to identify overbought or oversold conditions in a market.</p>
        
        <h3>How RSI is Calculated</h3>
        <p>The formula for calculating RSI is:</p>
        <p>RSI = 100 - (100 / (1 + RS))</p>
        <p>Where RS = Average Gain / Average Loss</p>
        <p>Traditionally, the RSI is calculated using 14 periods, though traders may use shorter periods for more sensitivity or longer periods for less sensitivity.</p>
        
        <h3>Interpreting RSI Values</h3>
        <p>The RSI indicator is considered overbought when above 70 and oversold when below 30. These thresholds can also be adjusted to 80 and 20 for stronger signals.</p>
        <ul>
          <li><strong>Overbought (above 70)</strong>: Suggests that the asset may be primed for a price correction or reversal.</li>
          <li><strong>Oversold (below 30)</strong>: Indicates that the asset may be undervalued and due for a bounce.</li>
        </ul>
        
        <h3>Trading Strategies Using RSI</h3>
        <ol>
          <li><strong>Divergence</strong>: When price makes a new high but RSI fails to exceed its previous high, this bearish divergence can signal a potential reversal. The opposite is true for bullish divergence.</li>
          <li><strong>Trend Confirmation</strong>: In strong uptrends, the RSI often remains in the 40 to 90 range, with the 40-50 zone acting as support. In downtrends, the RSI typically stays between 10 and 60, with the 50-60 zone acting as resistance.</li>
          <li><strong>Failure Swings</strong>: These are reliable reversal signals that occur without prices making new highs or lows.</li>
        </ol>
        
        <p>As with all technical indicators, the RSI is most effective when used in conjunction with other forms of technical analysis. It should not be relied upon as a standalone trading signal.</p>
      `
    }
  ],
  fundamental: [
    {
      id: 'fund-1',
      title: 'How to Read Financial Statements',
      summary: 'Learn the essentials of analyzing company financial statements to make informed investment decisions.',
      readTime: '7 min',
      content: `
        <h2>How to Read Financial Statements</h2>
        <p>Financial statements provide crucial information about a company's financial health and performance. Understanding how to read and analyze these documents is essential for any investor looking to make informed decisions.</p>
        
        <h3>The Three Key Financial Statements</h3>
        <ol>
          <li><strong>Income Statement</strong>: Shows a company's revenues, expenses, and profits over a specific period. It answers the question, "Was the company profitable?"</li>
          <li><strong>Balance Sheet</strong>: Provides a snapshot of a company's assets, liabilities, and shareholders' equity at a specific point in time. It shows what a company owns and owes.</li>
          <li><strong>Cash Flow Statement</strong>: Tracks the flow of cash into and out of the business, showing how the company generates and uses cash.</li>
        </ol>
        
        <h3>Key Metrics to Focus On</h3>
        <p>When analyzing financial statements, pay attention to these important metrics:</p>
        <ul>
          <li><strong>Revenue Growth</strong>: Consistent growth in top-line revenue indicates market demand for the company's products or services.</li>
          <li><strong>Gross Margin</strong>: Calculated as (Revenue - Cost of Goods Sold) / Revenue. Higher margins typically indicate a stronger competitive position.</li>
          <li><strong>Net Profit Margin</strong>: Shows how much of each dollar of revenue is kept as profit after all expenses.</li>
          <li><strong>Debt-to-Equity Ratio</strong>: Measures a company's financial leverage. A high ratio may indicate excessive debt.</li>
          <li><strong>Return on Equity (ROE)</strong>: Reveals how efficiently a company is using shareholders' capital to generate profits.</li>
          <li><strong>Current Ratio</strong>: A measure of liquidity that compares current assets to current liabilities.</li>
        </ul>
        
        <h3>Red Flags to Watch For</h3>
        <p>Be alert to these warning signs in financial statements:</p>
        <ul>
          <li>Inconsistent or declining revenue</li>
          <li>Shrinking profit margins</li>
          <li>Cash flow that consistently lags behind reported earnings</li>
          <li>Rapidly increasing debt levels</li>
          <li>Frequent or unexplained changes in accounting methods</li>
          <li>Unusual or significant one-time charges</li>
        </ul>
        
        <p>Remember that financial statements should be analyzed in context, comparing them to previous periods, industry benchmarks, and competitors to get a complete picture of a company's financial health.</p>
      `
    }
  ],
  strategies: [
    {
      id: 'strat-1',
      title: 'Long-Term Value Investing',
      summary: 'Explore the principles of value investing and how to identify undervalued stocks for long-term growth.',
      readTime: '6 min',
      content: `
        <h2>Long-Term Value Investing</h2>
        <p>Value investing is an investment strategy that involves selecting stocks that appear to be trading for less than their intrinsic or book value. The strategy was pioneered by Benjamin Graham and has been famously used by Warren Buffett to build enormous wealth over long time horizons.</p>
        
        <h3>Core Principles of Value Investing</h3>
        <ol>
          <li><strong>Margin of Safety</strong>: Buy stocks at a significant discount to their intrinsic value to provide a buffer against errors in analysis or unexpected market downturns.</li>
          <li><strong>Long-Term Perspective</strong>: Focus on the long-term performance and value of a company rather than short-term market fluctuations.</li>
          <li><strong>Fundamental Analysis</strong>: Analyze company fundamentals including financial statements, competitive advantages, management quality, and industry trends.</li>
          <li><strong>Contrarian Thinking</strong>: Be willing to go against market sentiment when your analysis suggests the market has mispriced a stock.</li>
        </ol>
        
        <h3>How to Identify Undervalued Stocks</h3>
        <p>Value investors use several metrics to identify potentially undervalued companies:</p>
        <ul>
          <li><strong>Price-to-Earnings (P/E) Ratio</strong>: A low P/E relative to peers or the company's historical average may indicate undervaluation.</li>
          <li><strong>Price-to-Book (P/B) Ratio</strong>: Compares a stock's market value to its book value. A ratio under 1.0 can indicate a potential bargain.</li>
          <li><strong>Dividend Yield</strong>: High dividend yields can signal value, especially when the company has a history of maintaining or increasing dividends.</li>
          <li><strong>Free Cash Flow</strong>: Strong, consistent free cash flow supports a company's ability to weather downturns, invest in growth, and return capital to shareholders.</li>
          <li><strong>Debt Levels</strong>: Lower debt levels reduce financial risk and increase flexibility.</li>
        </ul>
        
        <h3>Common Pitfalls to Avoid</h3>
        <ul>
          <li><strong>Value Traps</strong>: Stocks that appear cheap but are actually declining businesses with deteriorating fundamentals.</li>
          <li><strong>Anchoring Bias</strong>: Placing too much importance on a single piece of information, such as a stock's previous high price.</li>
          <li><strong>Impatience</strong>: Value investing requires patience. Undervalued stocks may remain undervalued for extended periods before the market recognizes their true worth.</li>
          <li><strong>Neglecting Qualitative Factors</strong>: While numbers are important, don't ignore qualitative aspects like management quality, competitive advantages, and industry disruption risks.</li>
        </ul>
        
        <p>Remember that value investing is not about finding cheap stocks, but about finding stocks trading below their intrinsic value. This requires thorough research and a disciplined approach to investment decisions.</p>
      `
    }
  ],
  indicators: [
    {
      id: 'ind-1',
      title: 'Understanding Market Breadth',
      summary: 'Learn how market breadth indicators can help you gauge the overall health of the stock market.',
      readTime: '5 min',
      content: `
        <h2>Understanding Market Breadth</h2>
        <p>Market breadth indicators measure the number of stocks that are participating in a market move. These indicators provide insight into the health of a market trend and can help identify potential reversals before they occur in major indices.</p>
        
        <h3>Important Market Breadth Indicators</h3>
        <ul>
          <li><strong>Advance-Decline Line (A/D Line)</strong>: One of the most widely used breadth indicators. It's calculated by taking the difference between advancing and declining issues and adding it to the previous value. A rising A/D line confirms an uptrend, while divergence can signal potential reversals.</li>
          <li><strong>Advance-Decline Ratio</strong>: The number of advancing stocks divided by the number of declining stocks. Values above 1.0 indicate positive breadth.</li>
          <li><strong>New Highs-New Lows</strong>: Tracks the number of stocks making new 52-week highs versus those making new 52-week lows. Strong markets typically have more new highs than lows.</li>
          <li><strong>Percentage of Stocks Above Moving Averages</strong>: Measures the percentage of stocks trading above their 50-day or 200-day moving averages. This helps assess the strength of a trend across the broader market.</li>
          <li><strong>McClellan Oscillator</strong>: A momentum indicator for the advance-decline stats, helping to identify overbought or oversold conditions in the market.</li>
        </ul>
        
        <h3>How to Use Market Breadth in Your Analysis</h3>
        <p>Market breadth indicators are most valuable when used in these ways:</p>
        <ol>
          <li><strong>Confirmation</strong>: When major indices make new highs, breadth indicators should also be making new highs to confirm the strength of the trend.</li>
          <li><strong>Divergence</strong>: If the market is making new highs but breadth indicators are declining, this negative divergence can signal weakness and potential reversals.</li>
          <li><strong>Market Extremes</strong>: Extremely high or low readings in breadth indicators can identify overbought or oversold conditions, suggesting potential reversal points.</li>
        </ol>
        
        <h3>Interpreting Market Breadth Signals</h3>
        <ul>
          <li><strong>Healthy Uptrend</strong>: Most stocks participating (high breadth), with the A/D line rising alongside or ahead of the major indices.</li>
          <li><strong>Weakening Uptrend</strong>: Fewer stocks participating in rallies, with major indices being lifted by a smaller number of large stocks.</li>
          <li><strong>Bottoming Market</strong>: Extremely negative breadth readings that begin to improve, even as indices make final lows.</li>
          <li><strong>Topping Market</strong>: Deteriorating breadth even as major indices continue to make marginal new highs.</li>
        </ul>
        
        <p>Remember that no single indicator should be used in isolation. Market breadth indicators work best when combined with other technical analysis tools and an understanding of the fundamental economic environment.</p>
      `
    }
  ]
};

const LearningCenter = () => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedArticle(null);
  };
  
  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
  };
  
  const handleBackToList = () => {
    setSelectedArticle(null);
  };
  
  return (
    <Row>
      <Col md={3}>
        <Card className="mb-4">
          <Card.Header>Learning Categories</Card.Header>
          <Card.Body>
            <Nav className="flex-column">
              <Nav.Link 
                className={activeCategory === 'technical' ? 'active' : ''}
                onClick={() => handleCategoryChange('technical')}
              >
                Technical Analysis
              </Nav.Link>
              <Nav.Link 
                className={activeCategory === 'fundamental' ? 'active' : ''}
                onClick={() => handleCategoryChange('fundamental')}
              >
                Fundamental Analysis
              </Nav.Link>
              <Nav.Link 
                className={activeCategory === 'strategies' ? 'active' : ''}
                onClick={() => handleCategoryChange('strategies')}
              >
                Investment Strategies
              </Nav.Link>
              <Nav.Link 
                className={activeCategory === 'indicators' ? 'active' : ''}
                onClick={() => handleCategoryChange('indicators')}
              >
                Market Indicators
              </Nav.Link>
            </Nav>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={9}>
        <Card>
          <Card.Header>
            {selectedArticle ? (
              <div className="d-flex justify-content-between align-items-center">
                <span>{selectedArticle.title}</span>
                <Button variant="outline-primary" size="sm" onClick={handleBackToList}>
                  Back to List
                </Button>
              </div>
            ) : (
              `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Analysis Articles`
            )}
          </Card.Header>
          <Card.Body>
            {selectedArticle ? (
              <ArticleContent article={selectedArticle} />
            ) : (
              <Row>
                {learningContent[activeCategory].map(article => (
                  <Col md={6} key={article.id} className="mb-4">
                    <ArticlePreview 
                      article={article} 
                      onSelect={() => handleArticleSelect(article)} 
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LearningCenter;