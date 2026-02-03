import React from 'react';
import StatsGrid from './StatsGrid';

const ProfileHeader = ({ artist }) => {
  const {
    name = "Ava Sterling",
    imageUrl = "/My Image.png",
    genres = ["Pop", "R&B"],
    bio = "Award-winning vocalist specializing in pop and R&B with a soulful touch. I bring emotion and professionalism to every project, from catchy hooks to powerful ballads. My vocals have been featured on tracks with over 50M+ streams.",
    location = "Los Angeles, CA",
    projectsCompleted = "240+",
    memberSince = "2020"
  } = artist || {};

  return (
    <div className="relative w-full bg-secondary/30 rounded-3xl p-8 shadow-lg border border-outline">
      {/* Profile Content */}
      <div className="flex flex-col items-center">
        {/* Artist Image */}
        <div className="relative mb-6">
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl">
            <img 
              src={imageUrl} 
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Artist Name */}
        <h1 className="mb-4 text-4xl font-extrabold text-primary">
          {name}
        </h1>

        {/* Genre Pills */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-primary px-6 py-1.5 text-sm font-semibold text-white shadow-md"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="mb-8 max-w-2xl text-center text-base leading-relaxed text-gray-700">
          {bio}
        </p>

        {/* Stats Grid */}
        <StatsGrid
          location={location}
          projectsCompleted={projectsCompleted}
          memberSince={memberSince}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
