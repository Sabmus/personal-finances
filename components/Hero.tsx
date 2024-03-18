import { auth } from '@/lib/auth';
import { HeroPhoto } from '@/components';

const Hero = async () => {
  const session = await auth();

  return <HeroPhoto img={session?.user?.image ?? ''} />;
};

export default Hero;
