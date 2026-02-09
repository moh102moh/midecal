import React from "react";
import HeroSlider from "../components/HeroSlider";
import CallToAction from "../components/CallToAction";
import About from "../components/About";
import Status from "../components/status";
import Departments from "../components/Departments";
import Doctors from "../components/Doctors";
import Footer from "../components/Footer";

function Home(){
    return(
        <div>
            {/* قسم الهيرو */}
            <section id="home">
                <HeroSlider/>
            </section>
            
            <CallToAction/>
            
            {/* قسم من نحن */}
            <section id="about">
                <About/>
            </section>
            
            <Status/>
            
            {/* قسم الأقسام */}
            <section id="departments">
                <Departments/>
            </section>
            
            {/* قسم الأطباء */}
            <section id="doctors">
                <Doctors/>
            </section>
            
            {/* قسم الخدمات */}
            <section id="services">
                <div className="py-16 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-[#008e9b] mb-8 text-center">Our Services</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <i className="fas fa-stethoscope text-blue-600 text-xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Medical Consultations</h3>
                                <p className="text-gray-600">Professional medical consultations with experienced doctors.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <i className="fas fa-heartbeat text-green-600 text-xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Health Checkups</h3>
                                <p className="text-gray-600">Comprehensive health checkup packages for all ages.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <i className="fas fa-pills text-purple-600 text-xl"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Pharmacy Services</h3>
                                <p className="text-gray-600">In-house pharmacy with all necessary medications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer/>
        </div>
    );
}
export default Home;