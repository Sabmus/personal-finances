import { auth } from '@/lib/auth';
import { HeroPhoto } from '@/components';
import { LogOutForm } from '@/components';

const Hero = async () => {
  const session = await auth();

  return (
    <HeroPhoto img={session?.user?.image ?? ''}>
      <LogOutForm redirectTo="/" />
    </HeroPhoto>
  );
};

export default Hero;
