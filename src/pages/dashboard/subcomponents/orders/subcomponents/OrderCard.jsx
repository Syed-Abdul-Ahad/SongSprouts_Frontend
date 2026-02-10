const OrderCard = ({ order, isCompleted }) => {
  // Calculate progress percentage based on status
  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Progress Start':
        return 33.33;
      case 'Progress Approval':
        return 66.66;
      default:
        return 0;
    }
  };

  const progressPercentage = getProgressPercentage(order.status);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Order ID and Date */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-900 font-bold text-sm">{order.id}</span>
        <span className="text-gray-600 text-sm">{order.date}</span>
      </div>
      
      <hr className="border-gray-400 mb-2" />

      {/* Song Title */}
      <h3 className="text-gray-900 font-semibold text-base mb-3">
        {order.title}
      </h3>

      {/* Service Tag */}
      <div className="mb-4">
        <span className="inline-block bg-[#2d5f4a] text-white text-xs px-3 py-1 rounded-full">
          {order.service}
        </span>
      </div>

      {/* Order Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-700 text-sm font-bold">Client:</span>
          <span className="text-gray-900 text-sm font-medium">{order.client}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 text-sm font-bold">
            {isCompleted ? 'Completed:' : 'Delivery:'}
          </span>
          <span className="text-gray-900 text-sm font-medium">
            {isCompleted ? order.completed : order.delivery}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 text-sm font-bold">Amount:</span>
          <span className="text-gray-900 text-sm font-extrabold">${order.amount}</span>
        </div>
      </div>

      {/* Status - Button for Completed, Progress Bar for In Progress */}
      <div className="mt-4">
        {isCompleted ? (
          <button className="w-full py-3 rounded-full text-sm font-medium transition-colors bg-[#2d5f4a] text-white">
            {order.status}
          </button>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 text-sm font-medium">{order.status}</span>
              <span className="text-gray-700 text-sm font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#2d5f4a] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
