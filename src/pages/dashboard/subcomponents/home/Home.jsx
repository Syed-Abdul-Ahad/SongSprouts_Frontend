import { useAuth } from '../../../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: (
        <svg width="26" height="32" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3005 2.58989C15.0365 1.06185 16.624 0 18.4587 0H28.9724C30.807 0 32.3919 1.06185 33.1305 2.58989C34.9257 2.60542 36.3267 2.68571 37.5778 3.16743C39.0713 3.74309 40.3702 4.72139 41.3259 5.99041C42.2905 7.26981 42.7453 8.9092 43.3656 11.165L45.3158 18.2147L46.0518 20.3928L46.1149 20.4705C48.4831 23.4592 47.3555 27.9034 45.1003 36.7893C43.6652 42.443 42.9503 45.2686 40.8107 46.9158C38.6712 48.5603 35.7142 48.5603 29.8003 48.5603H17.6307C11.7168 48.5603 8.75982 48.5603 6.62029 46.9158C4.48076 45.2686 3.7632 42.443 2.33072 36.7893C0.075535 27.9034 -1.05206 23.4592 1.31615 20.4705L1.37923 20.3928L2.11519 18.2147L4.06547 11.165C4.68841 8.9092 5.14312 7.26722 6.10512 5.98781C7.06115 4.71976 8.36003 3.74238 9.85325 3.16743C11.1044 2.68571 12.5027 2.60283 14.3005 2.58989ZM14.3058 6.48248C12.5658 6.50061 11.8666 6.56536 11.2884 6.78809C10.484 7.09805 9.78441 7.6249 9.26974 8.30835C8.80714 8.92216 8.53378 9.77941 7.77154 12.5428L6.27334 17.9531C8.95433 17.4817 12.6183 17.4817 17.6281 17.4817H29.8003C34.8127 17.4817 38.4741 17.4817 41.1551 17.9479L39.6595 12.5376C38.8973 9.77423 38.6239 8.91697 38.1613 8.30317C37.6466 7.61972 36.9471 7.09287 36.1427 6.78291C35.5644 6.56018 34.8653 6.49543 33.1252 6.4773C32.752 7.25128 32.1638 7.90516 31.4288 8.3631C30.6937 8.82104 29.842 9.06427 28.9724 9.0646H18.4587C17.5893 9.06451 16.7378 8.82165 16.0028 8.36419C15.2678 7.90673 14.6794 7.25598 14.3058 6.48248Z" fill="white"/>
        </svg>

      ),
      label: 'Total Orders',
      value: '42',
    },
    {
      icon: (
       <svg width="26" height="32" viewBox="0 0 26 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5845 2.57232C15.5845 1.8901 15.3108 1.23582 14.8237 0.753414C14.3366 0.271011 13.6759 0 12.9871 0C12.2982 0 11.6375 0.271011 11.1504 0.753414C10.6633 1.23582 10.3897 1.8901 10.3897 2.57232V5.14464C7.63415 5.14464 4.9915 6.22868 3.04306 8.15829C1.09462 10.0879 0 12.705 0 15.4339C0 18.1628 1.09462 20.7799 3.04306 22.7095C4.9915 24.6391 7.63415 25.7232 10.3897 25.7232V36.0125C9.31511 36.013 8.26683 35.6835 7.38926 35.0694C6.51168 34.4553 5.84799 33.5868 5.48963 32.5836C5.25125 31.9522 4.77213 31.4387 4.15536 31.1535C3.53858 30.8684 2.83344 30.8345 2.19164 31.059C1.54983 31.2835 1.02267 31.7485 0.723548 32.354C0.424431 32.9595 0.37727 33.6571 0.592211 34.2967C1.30835 36.3033 2.63515 38.0405 4.38982 39.2692C6.14449 40.4978 8.24069 41.1574 10.3897 41.1571V43.7294C10.3897 44.4116 10.6633 45.0659 11.1504 45.5483C11.6375 46.0307 12.2982 46.3017 12.9871 46.3017C13.6759 46.3017 14.3366 46.0307 14.8237 45.5483C15.3108 45.0659 15.5845 44.4116 15.5845 43.7294V41.1571C18.34 41.1571 20.9826 40.073 22.9311 38.1434C24.8795 36.2138 25.9741 33.5967 25.9741 30.8678C25.9741 28.1389 24.8795 25.5218 22.9311 23.5922C20.9826 21.6626 18.34 20.5785 15.5845 20.5785V10.2893C16.659 10.2887 17.7073 10.6182 18.5849 11.2323C19.4625 11.8464 20.1261 12.7149 20.4845 13.7182C20.7229 14.3496 21.202 14.8631 21.8188 15.1482C22.4356 15.4333 23.1407 15.4673 23.7825 15.2428C24.4243 15.0183 24.9515 14.5532 25.2506 13.9477C25.5497 13.3422 25.5969 12.6446 25.3819 12.005C24.6658 9.99846 23.339 8.26119 21.5843 7.03254C19.8297 5.80388 17.7334 5.14429 15.5845 5.14464V2.57232ZM10.3897 10.2893C9.0119 10.2893 7.69058 10.8313 6.71636 11.7961C5.74214 12.7609 5.19483 14.0695 5.19483 15.4339C5.19483 16.7984 5.74214 18.1069 6.71636 19.0717C7.69058 20.0365 9.0119 20.5785 10.3897 20.5785V10.2893ZM15.5845 25.7232V36.0125C16.9622 36.0125 18.2836 35.4704 19.2578 34.5056C20.232 33.5408 20.7793 32.2323 20.7793 30.8678C20.7793 29.5034 20.232 28.1948 19.2578 27.23C18.2836 26.2652 16.9622 25.7232 15.5845 25.7232Z" fill="white"/>
</svg>

      ),
      label: 'Total Revenue',
      value: '$3,840',
    },
    {
      icon: (
        <svg width="26" height="32" viewBox="0 0 49 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_267_2763)">
            <path d="M15.1339 23C12.3776 23.0856 10.1233 24.1808 8.37083 26.2857H4.95104C3.5559 26.2857 2.38194 25.9392 1.42917 25.2461C0.476389 24.553 0 23.5391 0 22.2042C0 16.1633 1.05486 13.1429 3.16458 13.1429C3.26667 13.1429 3.63672 13.3225 4.27474 13.6819C4.91276 14.0413 5.74219 14.4049 6.76302 14.7729C7.78385 15.1408 8.79618 15.3248 9.8 15.3248C10.9399 15.3248 12.0714 15.128 13.1943 14.7344C13.1092 15.3676 13.0667 15.9323 13.0667 16.4286C13.0667 18.8073 13.7557 20.9978 15.1339 23ZM42.4667 39.3516C42.4667 41.4051 41.8457 43.0266 40.6036 44.216C39.3616 45.4053 37.7113 46 35.6526 46H13.3474C11.2887 46 9.63837 45.4053 8.39635 44.216C7.15434 43.0266 6.53333 41.4051 6.53333 39.3516C6.53333 38.4446 6.56311 37.559 6.62266 36.6948C6.6822 35.8305 6.8013 34.8979 6.97995 33.8968C7.15859 32.8956 7.38403 31.9673 7.65625 31.1116C7.92847 30.256 8.29427 29.4217 8.75365 28.6088C9.21302 27.7959 9.74045 27.1029 10.3359 26.5296C10.9314 25.9563 11.6588 25.4985 12.518 25.1562C13.3772 24.814 14.3257 24.6429 15.3635 24.6429C15.5337 24.6429 15.8995 24.8268 16.4609 25.1948C17.0224 25.5627 17.6434 25.9734 18.324 26.4269C19.0045 26.8804 19.9148 27.2911 21.0547 27.659C22.1946 28.027 23.3431 28.2109 24.5 28.2109C25.6569 28.2109 26.8054 28.027 27.9453 27.659C29.0852 27.2911 29.9955 26.8804 30.676 26.4269C31.3566 25.9734 31.9776 25.5627 32.5391 25.1948C33.1005 24.8268 33.4663 24.6429 33.6365 24.6429C34.6743 24.6429 35.6228 24.814 36.482 25.1562C37.3412 25.4985 38.0686 25.9563 38.6641 26.5296C39.2595 27.1029 39.787 27.7959 40.2464 28.6088C40.7057 29.4217 41.0715 30.256 41.3438 31.1116C41.616 31.9673 41.8414 32.8956 42.0201 33.8968C42.1987 34.8979 42.3178 35.8305 42.3773 36.6948C42.4369 37.559 42.4667 38.4446 42.4667 39.3516ZM16.3333 6.57143C16.3333 8.38542 15.6953 9.93415 14.4193 11.2176C13.1432 12.5011 11.6035 13.1429 9.8 13.1429C7.99653 13.1429 6.45677 12.5011 5.18073 11.2176C3.90469 9.93415 3.26667 8.38542 3.26667 6.57143C3.26667 4.75744 3.90469 3.20871 5.18073 1.92522C6.45677 0.641741 7.99653 0 9.8 0C11.6035 0 13.1432 0.641741 14.4193 1.92522C15.6953 3.20871 16.3333 4.75744 16.3333 6.57143ZM34.3 16.4286C34.3 19.1496 33.343 21.4727 31.4289 23.3979C29.5148 25.3231 27.2052 26.2857 24.5 26.2857C21.7948 26.2857 19.4852 25.3231 17.5711 23.3979C15.657 21.4727 14.7 19.1496 14.7 16.4286C14.7 13.7076 15.657 11.3845 17.5711 9.45926C19.4852 7.53404 21.7948 6.57143 24.5 6.57143C27.2052 6.57143 29.5148 7.53404 31.4289 9.45926C33.343 11.3845 34.3 13.7076 34.3 16.4286ZM49 22.2042C49 23.5391 48.5236 24.553 47.5708 25.2461C46.6181 25.9392 45.4441 26.2857 44.049 26.2857H40.6292C38.8767 24.1808 36.6224 23.0856 33.8661 23C35.2443 20.9978 35.9333 18.8073 35.9333 16.4286C35.9333 15.9323 35.8908 15.3676 35.8057 14.7344C36.9286 15.128 38.0601 15.3248 39.2 15.3248C40.2038 15.3248 41.2161 15.1408 42.237 14.7729C43.2578 14.4049 44.0872 14.0413 44.7253 13.6819C45.3633 13.3225 45.7333 13.1429 45.8354 13.1429C47.9451 13.1429 49 16.1633 49 22.2042ZM45.7333 6.57143C45.7333 8.38542 45.0953 9.93415 43.8193 11.2176C42.5432 12.5011 41.0035 13.1429 39.2 13.1429C37.3965 13.1429 35.8568 12.5011 34.5807 11.2176C33.3047 9.93415 32.6667 8.38542 32.6667 6.57143C32.6667 4.75744 33.3047 3.20871 34.5807 1.92522C35.8568 0.641741 37.3965 0 39.2 0C41.0035 0 42.5432 0.641741 43.8193 1.92522C45.0953 3.20871 45.7333 4.75744 45.7333 6.57143Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_267_2763">
            <rect width="49" height="46" fill="white"/>
            </clipPath>
            </defs>
        </svg>

      ),
      label: 'Total Customers',
      value: '156',
    },
  ];

  const recentOrders = [
    { title: 'Abstract Landscape #5', date: 'May 15, 2023', price: '$240' },
    { title: 'Portrait Commission', date: 'May 12, 2023', price: '$380' },
    { title: 'Cityscape Series #2', date: 'May 10, 2023', price: '$175' },
    { title: 'Digital Art Print', date: 'May 8, 2023', price: '$90' },
    { title: 'Watercolor Set', date: 'May 5, 2023', price: '$120' },
    { title: 'Custom Illustration', date: 'May 3, 2023', price: '$210' },
  ];

  return (
    <div className="lg:ml-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="mt-12 lg:mt-0">
            <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2">Artist Dashboard</h1>
            <p className="text-sm md:text-base text-gray-600">
              Welcome back, {user?.fullname || 'Sarah'}! Here's what's happening with your art store.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-48 lg:w-64 pl-4 pr-10 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute right-4 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Filter Button */}
            <button className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>

            {/* Profile Avatar */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 py-4 md:py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-xs md:text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-[#F2F1EF] rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-gray-700 text-sm md:text-base font-medium hover:text-primary transition-colors flex items-center gap-2">
              View All
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="bg-primary text-white rounded-2xl p-4 md:p-5 hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg mb-1">{order.title}</h3>
                    <p className="text-white/70 text-xs md:text-sm">{order.date}</p>
                  </div>
                  <p className="font-bold text-base md:text-lg">{order.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
