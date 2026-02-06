import { useState } from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: 'home',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.39966 10.199L13.5988 2.26636L23.7979 10.199V22.6646C23.7979 23.2657 23.5591 23.8422 23.1341 24.2673C22.709 24.6923 22.1325 24.9311 21.5314 24.9311H5.66613C5.06503 24.9311 4.48854 24.6923 4.06349 24.2673C3.63845 23.8422 3.39966 23.2657 3.39966 22.6646V10.199Z" stroke={isActive ? "#50C878" : "white"} strokeWidth="1.69985" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.1991 24.9312V13.5989H16.9985V24.9312" stroke={isActive ? "#50C878" : "white"} strokeWidth="1.69985" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Home',
    },
    {
      id: 'profile',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.6647 23.798V21.5315C22.6647 20.3293 22.1872 19.1763 21.3371 18.3262C20.487 17.4761 19.334 16.9985 18.1318 16.9985H9.06591C7.86369 16.9985 6.71072 17.4761 5.86063 18.3262C5.01054 19.1763 4.53296 20.3293 4.53296 21.5315V23.798" stroke={isActive ? "#50C878" : "white"} strokeWidth="1.69985" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.5989 12.4656C16.1023 12.4656 18.1318 10.4361 18.1318 7.9326C18.1318 5.42913 16.1023 3.39966 13.5989 3.39966C11.0954 3.39966 9.06592 5.42913 9.06592 7.9326C9.06592 10.4361 11.0954 12.4656 13.5989 12.4656Z" stroke={isActive ? "#50C878" : "white"} strokeWidth="1.69985" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Profile',
    },
    {
      id: 'orders',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.79937 23.798C8.67698 23.798 10.1991 22.2759 10.1991 20.3982C10.1991 18.5206 8.67698 16.9985 6.79937 16.9985C4.92176 16.9985 3.39966 18.5206 3.39966 20.3982C3.39966 22.2759 4.92176 23.798 6.79937 23.798Z" stroke={isActive ? "#50C878" : "white"} strokeWidth="1.69985" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.1991 20.3982V5.66613L23.7979 3.39966V18.1317" stroke={isActive ? "#50C878" : "white"} strokeWidth="1.69985" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.3982 21.5316C22.2759 21.5316 23.798 20.0095 23.798 18.1319C23.798 16.2543 22.2759 14.7322 20.3982 14.7322C18.5206 14.7322 16.9985 16.2543 16.9985 18.1319C16.9985 20.0095 18.5206 21.5316 20.3982 21.5316Z" stroke={isActive ? "#50C878" : "white"} strokeWidth="1.69985" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Orders',
    },
    {
      id: 'storefront',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 25H3.66667M3.66667 25H22.3333M3.66667 25V9.43733M25 25H22.3333M22.3333 25V9.43733M3.66667 9.43733C3.61681 9.4087 3.5679 9.37846 3.52 9.34667L2.8 8.86667C2.29101 8.52716 1.91424 8.02296 1.7329 7.43862C1.55155 6.85428 1.57665 6.22536 1.804 5.65733L2.996 2.676C3.19399 2.18121 3.53568 1.75709 3.97702 1.45835C4.41835 1.15961 4.93907 0.999964 5.472 1H20.528C21.0609 0.999964 21.5817 1.15961 22.023 1.45835C22.4643 1.75709 22.806 2.18121 23.004 2.676L24.196 5.65733C24.4233 6.22536 24.4485 6.85428 24.2671 7.43862C24.0858 8.02296 23.709 8.52716 23.2 8.86667L22.48 9.34667C22.4321 9.37846 22.3832 9.4087 22.3333 9.43733M3.66667 9.43733C4.0974 9.68611 4.58912 9.80945 5.08627 9.79343C5.58342 9.77741 6.06618 9.62266 6.48 9.34667L9 7.66667L11.52 9.34667C11.9582 9.63904 12.4732 9.79507 13 9.79507C13.5268 9.79507 14.0418 9.63904 14.48 9.34667L17 7.66667L19.52 9.34667C19.9338 9.62266 20.4166 9.77741 20.9137 9.79343C21.4109 9.80945 21.9026 9.68611 22.3333 9.43733" stroke={isActive ? "#50C878" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.6667 25.0001V18.3334C15.6667 17.6262 15.3858 16.9479 14.8857 16.4478C14.3856 15.9477 13.7073 15.6667 13 15.6667C12.2928 15.6667 11.6145 15.9477 11.1144 16.4478C10.6143 16.9479 10.3334 17.6262 10.3334 18.3334V25.0001" stroke={isActive ? "#50C878" : "white"} strokeWidth="2"/>
        </svg>
      ),
      label: 'Store Front',
    },
    {
      id: 'chat',
      icon: (isActive) => (
      <svg width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12.5C1 9.45001 2.2116 6.52494 4.36827 4.36827C6.52494 2.2116 9.45001 1 12.5 1C15.55 1 18.4751 2.2116 20.6317 4.36827C22.7884 6.52494 24 9.45001 24 12.5V19.8169C24 21.0359 24 21.6425 23.8189 22.1298C23.6749 22.516 23.4495 22.8666 23.1581 23.1581C22.8666 23.4495 22.516 23.6749 22.1298 23.8189C21.6425 24 21.0344 24 19.8169 24H12.5C9.45001 24 6.52494 22.7884 4.36827 20.6317C2.2116 18.4751 1 15.55 1 12.5Z" stroke={isActive ? "#50C878" : "white"} strokeWidth="2"/>
        <path d="M8.1875 11.0625H16.8125M12.5 16.8125H16.8125" stroke={isActive ? "#50C878" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      ),
      label: 'Chat',
    },
    {
      id: 'referrals',
      icon: (isActive) => (
        <svg width="22" height="22" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M13 6.67252C13.4567 6.68314 13.9111 6.6051 14.3371 6.44286C14.7632 6.28062 15.1525 6.03736 15.483 5.72697C15.8135 5.41658 16.0786 5.04514 16.2632 4.63389C16.4478 4.22264 16.5482 3.77962 16.5588 3.33016C16.5332 2.42523 16.1444 1.56712 15.4774 0.943688C14.8104 0.320256 13.9196 -0.0177032 13 0.00379697C12.5379 -0.0176408 12.0762 0.0518605 11.6417 0.208231C11.2073 0.364602 10.8089 0.6047 10.47 0.914466C10.131 1.22423 9.85823 1.59744 9.66763 2.01224C9.47704 2.42704 9.37246 2.87509 9.36 3.33016C9.35666 3.83161 9.47948 4.32607 9.7175 4.76945L5.3625 9.05535C4.8151 8.74089 4.19258 8.57531 3.55875 8.57558C3.09529 8.56492 2.63434 8.64557 2.203 8.81278C1.77167 8.97999 1.37866 9.23038 1.04709 9.54924C0.715522 9.8681 0.452081 10.249 0.272261 10.6695C0.0924418 11.09 -0.000126425 11.5417 1.29588e-07 11.9979C0.0584836 12.8802 0.461669 13.706 1.12507 14.3022C1.78848 14.8984 2.66062 15.2189 3.55875 15.1963C4.12271 15.2052 4.68041 15.079 5.18375 14.8285L9.685 19.2743C9.49666 19.6925 9.39712 20.1442 9.3925 20.6017C9.39652 21.0594 9.49379 21.5116 9.67856 21.9317C9.86333 22.3517 10.1318 22.731 10.4682 23.0471C10.8046 23.3632 11.2019 23.6097 11.6368 23.772C12.0717 23.9343 12.5352 24.0091 13 23.992C13.4647 24.0237 13.931 23.961 14.37 23.8078C14.809 23.6545 15.2112 23.4141 15.5518 23.1014C15.8924 22.7886 16.1639 22.4103 16.3496 21.9899C16.5352 21.5695 16.631 21.116 16.631 20.6576C16.631 20.1993 16.5352 19.7458 16.3496 19.3254C16.1639 18.905 15.8924 18.5266 15.5518 18.2139C15.2112 17.9012 14.809 17.6607 14.37 17.5075C13.931 17.3543 13.4647 17.2916 13 17.3233C12.3235 17.3212 11.6598 17.5039 11.0825 17.851L6.64625 13.5971C6.74183 13.4391 6.82338 13.2732 6.89 13.1014H19.11C19.3926 13.7355 19.8599 14.2731 20.4528 14.6459C21.0458 15.0188 21.7377 15.2104 22.4412 15.1963C23.3394 15.2189 24.2115 14.8984 24.8749 14.3022C25.5383 13.706 25.9415 12.8802 26 11.9979C25.9526 11.1735 25.612 10.3918 25.0379 9.78959C24.4639 9.1874 23.6929 8.8031 22.8599 8.70397C22.027 8.60484 21.1851 8.79719 20.4817 9.24735C19.7783 9.69751 19.2582 10.3768 19.0125 11.1663H6.9875C6.93654 10.9555 6.86017 10.7515 6.76 10.5586L11.0988 6.20875C11.6802 6.52478 12.3359 6.68473 13 6.67252ZM13 4.68949C13.1913 4.70026 13.3829 4.67352 13.5636 4.61081C13.7443 4.5481 13.9105 4.45068 14.0526 4.32421C14.1947 4.19774 14.3099 4.04473 14.3914 3.87409C14.4729 3.70344 14.5192 3.51855 14.5275 3.33016C14.5171 3.14315 14.4693 2.96 14.3869 2.79119C14.3045 2.62239 14.189 2.47126 14.0471 2.34646C13.9052 2.22167 13.7396 2.12566 13.56 2.06394C13.3803 2.00223 13.19 1.97602 13 1.98682C12.8023 1.96236 12.6016 1.97836 12.4105 2.03383C12.2193 2.0893 12.0419 2.18304 11.8893 2.30917C11.7368 2.4353 11.6123 2.5911 11.5238 2.7668C11.4353 2.94249 11.3846 3.13429 11.375 3.33016C11.3825 3.52741 11.4315 3.72097 11.5191 3.89856C11.6066 4.07614 11.7308 4.23386 11.8836 4.3617C12.0364 4.48953 12.2146 4.58469 12.4068 4.64112C12.599 4.69755 12.801 4.71403 13 4.68949ZM3.55875 13.2773C3.93109 13.2958 4.29656 13.1737 4.58047 12.9359C4.86438 12.6981 5.0453 12.3626 5.08625 11.9979C5.06113 11.6217 4.88704 11.2703 4.60141 11.0191C4.31577 10.7679 3.9414 10.637 3.55875 10.6546C3.17337 10.6327 2.79483 10.7616 2.50564 11.0132C2.21646 11.2649 2.04009 11.6188 2.015 11.9979C2.05979 12.3639 2.24408 12.6996 2.53063 12.9371C2.81717 13.1745 3.18462 13.2961 3.55875 13.2773ZM23.985 11.9979C23.8745 12.3121 23.6672 12.5846 23.392 12.7775C23.1167 12.9704 22.7873 13.0741 22.4494 13.0741C22.1115 13.0741 21.782 12.9704 21.5068 12.7775C21.2316 12.5846 21.0243 12.3121 20.9137 11.9979C21.0243 11.6837 21.2316 11.4112 21.5068 11.2183C21.782 11.0254 22.1115 10.9217 22.4494 10.9217C22.7873 10.9217 23.1167 11.0254 23.392 11.2183C23.6672 11.4112 23.8745 11.6837 23.985 11.9979ZM14.4463 20.6656C14.4359 20.8526 14.3881 21.0358 14.3057 21.2046C14.2232 21.3734 14.1077 21.5245 13.9658 21.6493C13.8239 21.7741 13.6584 21.8701 13.4787 21.9319C13.299 21.9936 13.1087 22.0198 12.9187 22.009C12.7259 22.0297 12.5308 22.0101 12.3461 21.9516C12.1614 21.8932 11.9913 21.797 11.8469 21.6695C11.7024 21.5421 11.5869 21.3861 11.5079 21.2117C11.4288 21.0374 11.3879 20.8486 11.3879 20.6576C11.3879 20.4667 11.4288 20.2779 11.5079 20.1036C11.5869 19.9292 11.7024 19.7732 11.8469 19.6457C11.9913 19.5182 12.1614 19.4221 12.3461 19.3636C12.5308 19.3052 12.7259 19.2856 12.9187 19.3063C13.11 19.2955 13.3016 19.3223 13.4823 19.385C13.663 19.4477 13.8292 19.5451 13.9714 19.6716C14.1135 19.7981 14.2287 19.9511 14.3102 20.1217C14.3917 20.2924 14.438 20.4772 14.4463 20.6656Z" fill={isActive ? "#50C878" : "white"}/>
        </svg>
      ),
      label: 'Referrals',
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-20 bg-primary h-screen flex-col items-center py-5 fixed left-0 top-0 rounded-r-[2.5rem] z-40">
        {/* Logo */}
        <div className="mb-8 text-white">
          logo
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3 flex-1 w-full">
          
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-1 transition-all ${
                activeTab === item.id
                  ? 'bg-white text-primary rounded-l-lg ml-3 pl-4 items-start '
                  : 'text-white hover:bg-white/10 rounded-xl'
              }`}
            >
              <div className='flex flex-col items-center gap-y-1'>{item.icon(activeTab === item.id)}
              <span className="text-[9px] font-light">{item.label}</span></div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-3 rounded-xl shadow-lg"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen w-64 bg-primary z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 h-full overflow-y-auto">
          {/* Logo */}
          <div className="mb-6 text-white text-xl font-bold">
            Logo
          </div>

          {/* Search Bar - Mobile Only */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2.5 border border-white/20 bg-white/10 text-white placeholder-white/60 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <svg
                className="w-5 h-5 text-white/60 absolute right-4 top-2.5"
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
          </div>

          {/* Filter Button - Mobile Only */}
          <button className="mb-6 bg-white text-primary px-4 py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors w-full">
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

          {/* Divider */}
          <div className="border-t border-white/20 mb-4"></div>

          {/* Menu Items */}
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-white text-primary' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.icon(activeTab === item.id)}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
