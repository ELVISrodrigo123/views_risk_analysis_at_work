import AOS from 'aos';
import 'aos/dist/aos.css';
import DrawerAppBar from './components/navbar';
import VisionSection from './components/BarListimg';
import RiskAnalysis from './components/Mycomponentsone';
import Footer from './components/Footer';
import IndustrialSafety from './components/Mycomponentsthree';

export default function Principal() {

  const url = process.env.NEXT_PUBLIC_API_URL;

  fetch(url).then((res) => res.json()).then((data) => console.log(data));

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

