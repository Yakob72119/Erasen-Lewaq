import { useEffect, useState } from 'react';
import axios from 'axios';

import coinb from '../assets/coin.svg';
import coins from '../assets/coins.svg';
import wallet from '../assets/wallet-svg.svg';

const StudentWalletComponent = () => {
  const [coin, setCoin] = useState('');
  const [submit, setSubmit] = useState(false);
  const [deleteCurrent, setDeleteCurrent] = useState('hide');
  const [balance, setBalance] = useState(0); 

  useEffect(() => {
    // Fetch the current balance when the component mounts
    fetchBalance();
  }, []);

  const fetchBalance = () => {
    // Assuming you have a function to get the user ID from the session
    const studentId = sessionStorage.getItem('_id');

    // Assuming you have an API endpoint to fetch the balance
    const apiUrl = `http://localhost:3000/payment/${studentId}/balance`;

    // Make a GET request to your backend API using Axios
    axios.get(apiUrl)
      .then((response) => {
        // Set the current balance from the response
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error('Error fetching balance:', error);
      });
  };

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmit(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [submit]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (parseFloat(value) >= 0 || value === '') {
      setCoin(value);
    }
  };

  const handleBuyOpen = () => {
    if (coin !== '') {
      setDeleteCurrent('show');
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  };

  const handleBuyClose = () => {
    setDeleteCurrent('hide');
  };

  const handleBuySubmit = () => {
    // Assuming you have a function to get the user ID from the session
    const studentId = sessionStorage.getItem('_id');

    // Assuming you have an API endpoint for buying coins
    const apiUrl = "http://localhost:3000/payment/buycoin"

    // Make a POST request to your backend API using Axios
    axios.post(apiUrl, {
      userId: studentId,
      amount: parseFloat(coin),
    })
      .then((response) => {
        // Handle response from backend
        const checkoutUrl = response.data.checkout_url;
      window.open(checkoutUrl, '_blank');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='wallet'>
      <img className='background' src={coinb} alt='' />
      <div className='header'>
        <div className='title'>
          <img src={wallet} alt='' />
          <h1>Wallet</h1>
        </div>
        <div className='disc'>! 1 Erasen-lewaq coin = 1 ETB</div>
      </div>
      <div className='body'>
        <div className='balance'>
        <div className='view'>
        <h1>{balance} Coin</h1>
        <p>Total balance</p>
      </div>
          <img src={coins} alt='' />
        </div>
        <div className='buy'>
          <div className='buy-input'>
            <input
              type='number'
              name='coin'
              className='input'
              placeholder='Coin'
              value={coin}
              onChange={handleInputChange}
              {...(submit && coin === '' && { required: true })}
            />
            <button onClick={handleBuyOpen} className='buy-btn'>
              Buy
            </button>
          </div>
        </div>
      </div>
      <div className={`add-new-admin ${deleteCurrent}`}>
        <button onClick={handleBuyClose} className='close'>
          Close
        </button>

        <div className='newAdminForm'>
          <p>Are You sure you want to Buy {coin} Coins?</p>
        </div>
        <button onClick={handleBuySubmit} className='buyBtn'>
          Buy
        </button>
      </div>
    </div>
  );
};

export default StudentWalletComponent;
