import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import WhoAreWe from '../components/WhoAreWe'
import OurValues from '../components/OurValues'
import Process from '../components/Process'
import Testimonial from '../components/Testimonial'


export default function HomePage() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <WhoAreWe/>
    <OurValues/>
    <Process/>
    <Testimonial/>
    <Footer/>
    </>
  )
}
