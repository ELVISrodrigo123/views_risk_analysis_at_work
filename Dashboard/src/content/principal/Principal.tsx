import AOS from 'aos';
import 'aos/dist/aos.css';
import DrawerAppBar from './components/navbar';
import VisionSection from './components/BarListimg';
import RiskAnalysis from './components/Mycomponentsone';
import Footer from './components/Footer';
import IndustrialSafety from './components/Mycomponentsthree';
export default function Principal() {

  AOS.init();
  return (
    <>
      <div className='background-home'>
        <DrawerAppBar />
        <VisionSection/>
        <RiskAnalysis/>
        <IndustrialSafety/>
        <Footer></Footer>
        <div>
          <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
          <script>
            AOS.init();
          </script>
        </div>
      </div>
    </>
  );
}

