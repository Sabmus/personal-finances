import { CircleUserRound } from 'lucide-react';

const HeroPhoto = ({ img }: { img: string }) => {
  return (
    <div className="relative py-2">
      <div className="w-10 h-10 rounded-full text-center">
        {img ? (
          <img src={img} className="rounded-full" />
        ) : (
          <div className="bg-background w-10 h-10 rounded-full">
            <CircleUserRound size={40} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroPhoto;
