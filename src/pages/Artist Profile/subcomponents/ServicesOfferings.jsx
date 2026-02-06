import React from 'react';

const ServicesOfferings = ({ services }) => {
  // Default services if none provided
  const defaultServices = [
    {
      id: 1,
      title: "Custom Song",
      price: 350,
      description: "A fully produced original song written and recorded specifically for your project. Includes lyric writing, melody composition, and professional recording.",
      deliveryTime: "3-5 days delivery",
      features: ["WAV + MP3 stems"],
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Feature Verse",
      price: 180,
      description: "Add a professionally recorded vocal feature to your existing track. Perfect for hooks, choruses, or verses that need that special touch.",
      deliveryTime: "3-5 days delivery",
      features: ["DRY + processed vocals"],
      color: "bg-primary"
    },
    {
      id: 3,
      title: "Full Production",
      price: 650,
      description: "Complete songwriting, vocal performance, and professional production package. From concept to finished master, ready for release.",
      deliveryTime: "3-5 days delivery",
      features: ["DRY + processed vocals"],
      color: "bg-primary"
    },
    {
      id: 4,
      title: "Demo Vocal",
      price: 95,
      description: "Professional demo recording to test out melodies or lyrics before full production. Great for songwriters needing a quality reference track.",
      deliveryTime: "3-5 days delivery",
      features: ["DRY + processed vocals"],
      color: "bg-primary"
    }
  ];

  const servicesList = services || defaultServices;

  const handleSelectService = (service) => {
    console.log('Selected service:', service);
    // TODO: Navigate to booking/checkout page
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900">Services & Offerings</h2>
        <p className="text-sm text-gray-600">Choose the perfect service for your project</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className={`group relative overflow-hidden rounded-3xl ${service.color} p-6 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105`}
          >
            {/* Service Header */}
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <div className="text-right">
                <p className="text-3xl font-extrabold">${service.price}</p>
              </div>
            </div>

            {/* Service Description */}
            <p className="mb-4 text-sm leading-relaxed text-white/90">
              {service.description}
            </p>

            {/* Service Features */}
            <div className="mb-6 space-y-2">
              {/* Delivery Time */}
              <div className="flex items-center gap-2 text-sm">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>{service.deliveryTime}</span>
              </div>

              {/* Features */}
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}

              {/* Custom Fields */}
              {service.customFields && Object.keys(service.customFields).length > 0 && (
                <>
                  {Object.entries(service.customFields).map(([key, value], index) => (
                    <div key={`custom-${index}`} className="flex items-center gap-2 text-sm">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}: {' '}
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Select Service Button */}
            <button
              onClick={() => handleSelectService(service)}
              className="w-full rounded-full bg-white py-3 font-semibold text-primary shadow-md transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
            >
              SELECT SERVICE
            </button>

            {/* Decorative Corner Element */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesOfferings;
