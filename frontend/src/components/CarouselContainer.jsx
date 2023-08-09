import React  from 'react'
import '../styles/carousel.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import cod from '../assets/cod.jpg'
import gow from '../assets/gow.jpg'
import forntnite from '../assets/fortnite.jpg'
import sale1 from '../assets/sale-1.jpg'
import sale2 from '../assets/sale-2.jpg'
import gta6 from '../assets/gta-6.jpg'
import gaming from '../assets/gaming.jpg'


export default function CarouselContainer() {

  return (
    <div className='carousel-container mb-2'>
      <Carousel 
      showArrows={true} 
      autoPlay 
      infiniteLoop 
      useKeyboardArrows 
      showThumbs={false} 
      showStatus={false}
      className='rounded overflow-hidden'
      >
        <div onClick={() => {
          // console.log("1st image clicked");
        }}>
          <img className='carousel-img' src={gta6} alt="Astromomy" />
        </div>
        <div>
          <img className='carousel-img'  src={cod} alt="Blackhole" />
        </div>
        <div>
          <img className='carousel-img'  src={gow} alt="Mountains" />
        </div>
        <div>
          <img className='carousel-img'  src={sale1} alt="Mountains" />
          {/* <p className="legend">GOD OF WAR</p> */}
        </div>
        <div>
          <img className='carousel-img'  src={gaming} alt="Mountains" />
        </div>
        <div>
          <img className='carousel-img'  src={sale2} alt="Mountains" />
        </div>
        <div>
          <img className='carousel-img'  src={forntnite} alt="Mountains" />
        </div>
      </Carousel>
    </div>


  )
}
