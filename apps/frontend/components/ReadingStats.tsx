import React from "react";

type ReadingStatsProps = {
  totalBooks: number;
  completed: number;
  reading: number;
  wantToRead: number;
};

export default function ReadingStats({
  totalBooks,
  completed,
  reading,
  wantToRead,
}: ReadingStatsProps) {
  const stats = [
    {
      title: "Total Books",
      value: totalBooks,
      color: "bg-purple-500",
      icon: "📚",
    },
    {
      title: "Completed",
      value: completed,
      color: "bg-green-500",
      icon: "✅",
    },
    {
      title: "Reading",
      value: reading,
      color: "bg-blue-500",
      icon: "📖",
    },
    {
      title: "Want to Read",
      value: wantToRead,
      color: "bg-yellow-500",
      icon: "⭐",
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">{stat.icon}</span>

            <div
              className={`h-3 w-3 rounded-full ${stat.color}`}
            />
          </div>

          <h3 className="mt-5 text-sm font-medium uppercase tracking-wide text-gray-500">
            {stat.title}
          </h3>

          <p className="mt-2 text-4xl font-bold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}