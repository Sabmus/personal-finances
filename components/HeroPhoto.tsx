'use client';

import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';

const HeroPhoto = ({ img, children }: { img: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative">
      <div className="w-10 h-10 rounded-full text-center">
        {img ? (
          <img src={img} className="rounded-full hover:cursor-pointer" onClick={handleOnClick} />
        ) : (
          <div className="bg-background w-10 h-10 rounded-full">
            <CircleUserRound size={40} className="hover:cursor-pointer" onClick={handleOnClick} />
          </div>
        )}
      </div>
      {isOpen && <div className="absolute h-fit w-24 top-1 right-12 flex-center">{children}</div>}
    </div>
  );
};

export default HeroPhoto;
