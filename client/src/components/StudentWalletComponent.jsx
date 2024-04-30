import React, { useEffect, useState } from 'react'
import coinb from '../assets/coin.svg'
import coins from '../assets/coins.svg'
import wallet from '../assets/wallet-svg.svg'

const StudentWalletComponent = () => {
  const [coin, setCoin] = useState('')
  const [submit, setSubmit] = useState(false);
  const [deleteCurrent, setDeleteCurrent] = useState('hide')


  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmit(false)
    }, 5000);

    return () => clearTimeout(timer);
  }, [submit]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCoin(value);
  };

  const handleBuyOpen = () => {

    if (coin !== '') {
      setDeleteCurrent('show');
      setSubmit(false);

    } else {
      setSubmit(true);
    }

  }

  const handleBuyClose = () => {
    setDeleteCurrent('hide');
  }

  return (
    <div className='wallet'>
      <img className='background' src={coinb} alt="" />
      <div className="header">
        <div className="title">
          <img src={wallet} alt="" />
          <h1>Wallet</h1>
        </div>
        <div className="disc">! 10 Erasen-lewaq coin = 1 ETB</div>
      </div>
      <div className="body">
        <div className="balance">
          <div className="view">
            <h1>2000 Coin</h1>
            <p>Total balance</p>
          </div>
          <img src={coins} alt="" />
        </div>
        <div className="buy">
          <div className='buy-input'>
            <input
              type="number"
              name="coin"
              className="input"
              placeholder="Coin"
              value={coin}
              onChange={handleInputChange}
              {...(submit && coin === '' && { required: true })}
            />
            <button onClick={handleBuyOpen} className='buy-btn'>Buy</button>
          </div>
        </div>
      </div>
      <div className={`add-new-admin ${deleteCurrent}`}>
        <button onClick={handleBuyClose} className='close'>Close</button>

        <div className="newAdminForm">
          <p>Are You sure you want to Buy 200Coins?</p>
        </div>
        <input type="submit" value="Buy" className="buyBtn" />

      </div>
    </div>
  )
}

export default StudentWalletComponent
