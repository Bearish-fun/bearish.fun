import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import solanaLogo from '../assets/images/solana-logo.png';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from "../contexts/WalletModalProvider"
import userAvatar from '../assets/images/users/avatar1.png';
import TermAgreementModal from '../components/TermAgreementModal';
import { useModalOpenContext } from '../contexts/ModalOpenContext';
import DepositModal from '../components/DepositModal';
import DepositSuccessModal from '../components/DepositSuccessModal';
import DepositFailedModal from '../components/DepositFailedModal';

const Navbar: React.FC = () => {
  const { connecting, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { 
    setIsManageWalletDropdownVisible,
    setDepositModalVisible,
    depositModalVisible
  } = useModalOpenContext();
  const [_balance] = useState<number>(100.67);
  const [isTermAgreementModalOpen, setIsTermAgreementModalOpen] = useState(true);
  const [isDepositSuccessModalOpen, setIsDepositSuccessModalOpen] = useState(false);
  const [isDepositFailedModalOpen, setIsDepositFailedModalOpen] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState<number>(0);
  const [transactionLink, setTransactionLink] = useState<string>("");

  const handleConnect = async () => {
    setVisible(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDisconnect = async () => {
    await disconnect();
  };

  const handleOpenManageWalletDropdown = () => {
    setIsManageWalletDropdownVisible(true);
  };

  const depositResultCallback = (result: boolean, depositedAmount?: number, transactionLink?: string) => {
    if (result) {
      setDepositedAmount(depositedAmount ?? 0);
      setTransactionLink(transactionLink ?? "");
      setIsDepositSuccessModalOpen(true);
    } else {
      setIsDepositFailedModalOpen(true);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <img src={logo} alt="Logo" className="h-full" />
          <div className="flex items-center gap-4">
            <button className="rounded-lg py-2 px-3 bg-card-primary text-gray-primary">Crypto</button>
            <button className="rounded-lg py-2 px-3 text-gray-secondary">Docs</button>
          </div>
        </div>
        <div>
          {!connected && (
            <div className="flex justify-end items-center gap-2">
              <div>
                <img src={solanaLogo} alt="Logo" className="h-[22px] w-5" />
              </div>
              <button className="bg-yellow p-2 rounded-lg text-black text-base leading-5 font-oxanium font-semibold" onClick={handleConnect}>
                {connecting ? 'Connecting' : 'Connect'}
              </button>
            </div>
          )}
          {connected && (
            <div className="flex justify-end items-center gap-2">
              <p className="text-gray-primary text-base leading-tight">$ {_balance}</p>
              <button className="w-9 h-9 rounded-full overflow-hidden" onClick={handleOpenManageWalletDropdown}>
                <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
              </button>
            </div>
          )}
        </div>
      </nav>
      {isTermAgreementModalOpen && <TermAgreementModal setOpen={setIsTermAgreementModalOpen} />}
      {depositModalVisible && <DepositModal callback={depositResultCallback} setOpen={setDepositModalVisible} />}
      {isDepositSuccessModalOpen &&
        <DepositSuccessModal
          depositedAmount={depositedAmount}
          transactionLink={transactionLink}
          setOpen={setIsDepositSuccessModalOpen}
        />
      }
      {isDepositFailedModalOpen && <DepositFailedModal setOpen={setIsDepositFailedModalOpen} />}
    </>
  );
};

export default Navbar;
