import { useState } from 'react';
import Sidebar from './subcomponents/Sidebar';
import Home from './subcomponents/Home';
import Profile from './subcomponents/profile/Profile';
import Orders from './subcomponents/Orders';
import StoreFront from './subcomponents/StoreFront';
import Chat from './subcomponents/Chat';
import Referrals from './subcomponents/Referrals';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'profile':
        return <Profile />;
      case 'orders':
        return <Orders />;
      case 'storefront':
        return <StoreFront />;
      case 'chat':
        return <Chat />;
      case 'referrals':
        return <Referrals />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
