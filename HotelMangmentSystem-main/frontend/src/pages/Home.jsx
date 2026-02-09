import React from 'react';
import Heroslider from '../components/Herosilder';
import About from '../components/About';
import OurRooms from '../components/OurRooms';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="home-page">
      <Heroslider />
      <section id="about">
        <About />
      </section>
      <section id="our-rooms">
        <OurRooms />
      </section>
      <Footer />
    </div>
  );
}

export default Home;