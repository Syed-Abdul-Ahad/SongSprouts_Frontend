import React from 'react'

const StatsGrid = ({ location, projectsCompleted, memberSince }) => {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 sm:ml-15 text-primary">
          {/* Location */}
          <div className="flex flex-col items-start rounded-2xl  p-4">
            <div className="mb-2 flex items-center gap-2">
              
              <span className="text-sm font-medium uppercase tracking-wide ">Location</span>
            </div>
            <div className='flex items-center gap-x-2'>
                <img src="/Map.png" alt="Location" className="h-5 w-5" />
            <p className="text-lg font-medium  ">{location}</p>
            </div>
          </div>

          {/* Projects Completed */}
          <div className="flex flex-col items-start rounded-2xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-wide">Projects Completed</span>
            </div>
            <div className='flex items-center gap-x-2'>
              <img src="/Music.png" alt="Projects" className="h-6 w-6" />
              <p className="text-lg font-medium">{projectsCompleted}</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex flex-col items-start rounded-2xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-wide">Member Since</span>
            </div>
            <div className='flex items-center gap-x-2'>
              <img src="/Calendar.png" alt="Member Since" className="h-6 w-6" />
              <p className="text-lg font-medium ">{memberSince}</p>
            </div>
          </div>
        </div>
  )
}

export default StatsGrid