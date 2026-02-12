const StatsCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white rounded-3xl p-4 flex items-center gap-4 shadow-sm">
      <div className="w-18 h-16 bg-[#2d5f4a] rounded-full flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
