'use client'

import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className="bg-red3 h-full w-min relative">
      <div>
        <Image
          src="/public /images/next.svg"
          alt="Logo blue no text"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
