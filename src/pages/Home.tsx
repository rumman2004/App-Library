import { useRef } from 'react';
import HeroSection from '../components/sections/HeroSection';
import AppsSection from '../components/sections/Apps';
import GithubProfile from '../components/sections/GithubProfile';
import Portfolio from '../components/sections/Portfolio';
import Socials from '../components/sections/Socials';

const Home = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection ref={(el) => { sectionsRef.current[0] = el; }} />
      <AppsSection ref={(el) => { sectionsRef.current[1] = el; }} />
      <GithubProfile ref={(el) => { sectionsRef.current[2] = el; }} />
      <Portfolio ref={(el) => { sectionsRef.current[3] = el; }} />
      <Socials ref={(el) => { sectionsRef.current[4] = el; }} />
    </div>
  );
};

export default Home;
