import OrderCard from './subcomponents/OrderCard';
import StatsCard from './subcomponents/StatsCard';

const Orders = () => {
  // Stats data
  const statsData = [
    {
      icon: (
        <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="104" height="104" rx="35" fill="#2D5D46"/>
<path d="M52.1509 29C64.9371 29 75.3017 39.3646 75.3017 52.1509C75.3017 64.9371 64.9371 75.3017 52.1509 75.3017C39.3646 75.3017 29 64.9371 29 52.1509C29 39.3646 39.3646 29 52.1509 29ZM52.1509 38.2603C51.5369 38.2603 50.948 38.5043 50.5138 38.9384C50.0797 39.3726 49.8358 39.9614 49.8358 40.5754V52.1509C49.8359 52.7648 50.0799 53.3536 50.5141 53.7876L57.4594 60.7329C57.896 61.1546 58.4808 61.3879 59.0878 61.3827C59.6948 61.3774 60.2754 61.1339 60.7047 60.7047C61.1339 60.2754 61.3774 59.6948 61.3827 59.0878C61.3879 58.4808 61.1546 57.896 60.7329 57.4594L54.4659 51.1924V40.5754C54.4659 39.9614 54.222 39.3726 53.7879 38.9384C53.3537 38.5043 52.7649 38.2603 52.1509 38.2603Z" fill="white"/>
</svg>

      ),
      label: 'Pending Orders',
      value: '3',
    },
    {
      icon: (
      <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="104" height="104" rx="35" fill="#2D5D46"/>
        <path d="M42.9303 74.1724L22 52.7601L27.2326 47.4071L42.9303 63.4663L76.6209 29L81.8534 34.3531L42.9303 74.1724Z" fill="white"/>
      </svg>

      ),
      label: 'Completed Orders',
      value: '3',
    },
    {
      icon: (
      <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="104" height="104" rx="35" fill="#2D5D46"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M54.5845 31.5723C54.5845 30.8901 54.3108 30.2358 53.8237 29.7534C53.3366 29.271 52.6759 29 51.9871 29C51.2982 29 50.6375 29.271 50.1504 29.7534C49.6633 30.2358 49.3897 30.8901 49.3897 31.5723V34.1446C46.6341 34.1446 43.9915 35.2287 42.0431 37.1583C40.0946 39.0879 39 41.705 39 44.4339C39 47.1628 40.0946 49.7799 42.0431 51.7095C43.9915 53.6391 46.6341 54.7232 49.3897 54.7232V65.0125C48.3151 65.013 47.2668 64.6835 46.3893 64.0694C45.5117 63.4553 44.848 62.5868 44.4896 61.5836C44.2513 60.9522 43.7721 60.4387 43.1554 60.1535C42.5386 59.8684 41.8334 59.8345 41.1916 60.059C40.5498 60.2835 40.0227 60.7485 39.7235 61.354C39.4244 61.9595 39.3773 62.6571 39.5922 63.2967C40.3084 65.3033 41.6351 67.0405 43.3898 68.2692C45.1445 69.4978 47.2407 70.1574 49.3897 70.1571V72.7294C49.3897 73.4116 49.6633 74.0659 50.1504 74.5483C50.6375 75.0307 51.2982 75.3017 51.9871 75.3017C52.6759 75.3017 53.3366 75.0307 53.8237 74.5483C54.3108 74.0659 54.5845 73.4116 54.5845 72.7294V70.1571C57.34 70.1571 59.9826 69.073 61.9311 67.1434C63.8795 65.2138 64.9741 62.5967 64.9741 59.8678C64.9741 57.1389 63.8795 54.5218 61.9311 52.5922C59.9826 50.6626 57.34 49.5785 54.5845 49.5785V39.2893C55.659 39.2887 56.7073 39.6182 57.5849 40.2323C58.4625 40.8464 59.1261 41.7149 59.4845 42.7182C59.7229 43.3496 60.202 43.8631 60.8188 44.1482C61.4356 44.4333 62.1407 44.4673 62.7825 44.2428C63.4243 44.0183 63.9515 43.5532 64.2506 42.9477C64.5497 42.3422 64.5969 41.6446 64.3819 41.005C63.6658 38.9985 62.339 37.2612 60.5843 36.0325C58.8297 34.8039 56.7334 34.1443 54.5845 34.1446V31.5723ZM49.3897 39.2893C48.0119 39.2893 46.6906 39.8313 45.7164 40.7961C44.7421 41.7609 44.1948 43.0695 44.1948 44.4339C44.1948 45.7984 44.7421 47.1069 45.7164 48.0717C46.6906 49.0365 48.0119 49.5785 49.3897 49.5785V39.2893ZM54.5845 54.7232V65.0125C55.9622 65.0125 57.2836 64.4704 58.2578 63.5056C59.232 62.5408 59.7793 61.2323 59.7793 59.8678C59.7793 58.5034 59.232 57.1948 58.2578 56.23C57.2836 55.2652 55.9622 54.7232 54.5845 54.7232Z" fill="white"/>
      </svg>
      ),
      label: 'Ongoing Earning',
      value: '$3,840',
    },
  ];

  // Sample data for orders in progress
  const ordersInProgress = [
    {
      id: 'ORD-2023-045',
      date: 'Oct 12, 2023',
      title: '"Midnight Dreams" Original Song',
      service: 'Song Commission',
      client: 'Alex Johnson',
      delivery: 'Oct 25, 2023',
      amount: '249',
      status: 'Progress Start',
    },
    {
      id: 'ORD-2023-045',
      date: 'Oct 12, 2023',
      title: '"Midnight Dreams" Original Song',
      service: 'Song Commission',
      client: 'Alex Johnson',
      delivery: 'Oct 25, 2023',
      amount: '249',
      status: 'Progress Approval',
    },
    {
      id: 'ORD-2023-045',
      date: 'Oct 12, 2023',
      title: '"Midnight Dreams" Original Song',
      service: 'Song Commission',
      client: 'Alex Johnson',
      delivery: 'Oct 25, 2023',
      amount: '249',
      status: 'Progress Start',
    },
  ];

  // Sample data for completed orders
  const completedOrders = [
    {
      id: 'ORD-2023-041',
      date: 'Oct 2, 2023',
      title: '"Midnight Dreams" Original Song',
      service: 'Song Commission',
      client: 'Alex Johnson',
      completed: 'Oct 25, 2023',
      amount: '249',
      status: 'Completed',
    },
    {
      id: 'ORD-2023-041',
      date: 'Oct 2, 2023',
      title: '"Midnight Dreams" Original Song',
      service: 'Song Commission',
      client: 'Alex Johnson',
      completed: 'Oct 25, 2023',
      amount: '249',
      status: 'Completed',
    },
    {
      id: 'ORD-2023-041',
      date: 'Oct 2, 2023',
      title: '"Midnight Dreams" Original Song',
      service: 'Song Commission',
      client: 'Alex Johnson',
      completed: 'Oct 25, 2023',
      amount: '249',
      status: 'Completed',
    },
  ];

  return (
    <div className="lg:ml-20 min-h-screen bg-gray-50 p-4 md:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Orders Overview</h1>
        <p className="text-gray-600 text-sm">
          Manage and track your song commissions and merchandise orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Orders Progress Section */}
      <div className="mb-8 bg-[#F2F1EF] py-4 px-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Orders Progress</h2>
          <button className="flex items-center gap-2 text-gray-700 text-sm hover:text-gray-900">
            View All
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordersInProgress.map((order, index) => (
            <OrderCard key={index} order={order} isCompleted={false} />
          ))}
        </div>
      </div>

      {/* Completed Orders Section */}
      <div className='bg-[#F2F1EF] py-4 px-6 rounded-2xl'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Completed Orders</h2>
          <button className="flex items-center gap-2 text-gray-700 text-sm hover:text-gray-900">
            View All
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedOrders.map((order, index) => (
            <OrderCard key={index} order={order} isCompleted={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
