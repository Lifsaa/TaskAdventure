import React from "react";

const ProgressBar = ({ level, xp, maxXp }) => {
  const progress = (xp / maxXp) * 100;

  return (
    <div className="mb-4">
      <p className="text-lg font-semibold">Level {level}</p>
      <p className="text-sm text-gray-500">{xp}/{maxXp} XP to Next Level</p>
      <div className="w-full bg-gray-300 rounded-full h-4 mt-1">
        <div
          className="bg-black h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const UserStats = () => {
  const stats = [
    { name: "Healthfulness", level: 10, xp: 4, maxXp: 100 },
    { name: "Kindness", level: 14, xp: 17, maxXp: 140 },
    { name: "Creativity", level: 7, xp: 40, maxXp: 70 },
    { name: "Sociability", level: 12, xp: 89, maxXp: 120 },
    { name: "Intelligence", level: 18, xp: 135, maxXp: 180 },
    { name: "Proficiency", level: 5, xp: 8, maxXp: 50 },
  ];

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">User Stats</h2>
      <ProgressBar level={50} xp={4690} maxXp={5000} />
      {stats.map((stat) => (
        <div key={stat.name}>
          <h3 className="text-lg font-bold">{stat.name}</h3>
          <ProgressBar level={stat.level} xp={stat.xp} maxXp={stat.maxXp} />
        </div>
      ))}
    </div>
  );
};

export default UserStats;