
const QuickOrderStats = ({ counts = {} }) => {
  const cards = [
    {
      title: "Pending",
      value: counts.pending || 0,
    },

    {
      title: "Confirmed",
      value: counts.confirmed || 0,
    },

    {
      title: "Processing",
      value: counts.processing || 0,
    },

    {
      title: "Completed",
      value: counts.completed || 0,
    },

    {
      title: "Cancelled",
      value: counts.cancelled || 0,
    },
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-5">
      {cards.map((item) => (
        <div key={item.title} className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-500">{item.title}</p>

          <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default QuickOrderStats;
