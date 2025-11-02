import SignInForm from './SignInForm';
import { SignedOut } from '@clerk/clerk-react';
import heroBg from '@/assets/hero-background.jpg';

const Hero = () => {
  return (
    <div className="relative h-3/4  text-center font-bold  flex flex-col justify-center items-center">
      {/* <div className="absolute inset-0 bg-[url(assets/hero-background.jpg)] opacity-50"></div> */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative">
        <h1 className="text-white text-lg md:text-3xl font-bold">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-white text-sm md:text-lg mt-4">
          Starts at $7.99. Cancel anytime.
        </p>
        <SignedOut>
          <p className="flex-1">
            Ready to watch? Enter your email to create or restart your
            membership
          </p>
          <SignInForm />
        </SignedOut>
      </div>
    </div>
  );
};

export default Hero;
