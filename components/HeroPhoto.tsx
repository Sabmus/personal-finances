import { auth } from '@/lib/auth';

const HeroPhoto = async () => {
  const session = await auth();

  return (
    <div className="w-10 h-10 rounded-full text-center">
      <img src={session.user.image} className="rounded-full" />
    </div>
  );
};

export default HeroPhoto;
