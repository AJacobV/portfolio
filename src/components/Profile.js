import React from 'react';

function Profile() {
  return (
    <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[50%] z-10">
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white border border-gray-500 shadow-sm flex items-center justify-center overflow-hidden">
        {/* Profile picture will go here */}
      </div>
    </div>
  );
}

export default Profile;
