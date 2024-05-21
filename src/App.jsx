import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main';
import Header from './components/header';
import Centre from './components/centre';
import QuestionComponent from './components/questions';
import Footer from './components/Footer';

function App() {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    const baseUrl = 'https://real-time-finance-data.p.rapidapi.com/search?query=Apple&language=en';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8a82088fe6msh556c20d38c4d6fap101b03jsn5fc87311740d', // Hardcoded API key
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };

    try {
      let allExchanges = [];
      let page = 1;
      let totalFetched = 0;
      const pageSize = 10; // Assuming each page returns 10 items

      while (totalFetched < 16) {
        const url = `${baseUrl}&page=${page}`;
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('API Result:', result); // Debug log

        if (result.status === 'OK' && result.data.stock.length > 0) {
          const exchanges = result.data.stock.map(exchange => ({
            name: exchange.name,
            price: exchange.price,
            currency: exchange.currency,
            change: exchange.change,
            change_percent: exchange.change_percent,
            country: exchange.country_code,
            timezone: exchange.timezone
          }));
          allExchanges = [...allExchanges, ...exchanges];
          totalFetched = allExchanges.length;
          page += 1;
        } else {
          break;
        }
      }

      console.log('All Exchanges:', allExchanges); // Debug log
      setArr(allExchanges.slice(0, 16));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Main />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Centre data={arr} />
      )}
      <QuestionComponent />
      <Footer />
    </>
  );
}

export default App;