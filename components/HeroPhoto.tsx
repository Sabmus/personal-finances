import { auth } from '@/lib/auth';

const HeroPhoto = async () => {
  const session = await auth();

  return (
    <div className="w-10 h-10 rounded-full text-center">
      {session?.user ? (
        <img src={session.user.image} className="rounded-full" />
      ) : (
        <div className="bg-green-400 w-10 h-10 rounded-full"></div>
      )}
    </div>
  );
};

export default HeroPhoto;
