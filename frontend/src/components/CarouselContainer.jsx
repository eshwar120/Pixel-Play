import React from 'react'
import '../styles/carousel.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export default function CarouselContainer() {

  const banner = [
    {
      link: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Fgta-6.jpg?alt=media&token=16f6e744-4883-4d44-afe8-ca968fe0ee00",
      alt: "GTA 6"
    },
    {
      link: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Fcod.jpg?alt=media&token=f2da9862-69e3-4f95-a4f8-c683ec6879d0",
      alt: "Call Of Duty"
    },
    {
      link: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Fgow.jpg?alt=media&token=c9c6f117-9107-464b-966e-9adf1cd67158",
      alt: "God Of War"
    },
    {
      link: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Fsale-1.jpg?alt=media&token=458c81f2-7849-4038-9754-37afa8660f73",
      alt: "Sale Poster"
    },
    {
      link: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Fgaming.jpg?alt=media&token=ff2f15cf-9199-4a64-8af2-07a50a2100e5",
      alt: "Gaming"
    },
    {
      link: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Fsale-2.jpg?alt=media&token=9584d38b-e279-4d85-aa5e-8e7bbfc95f8c",
      alt: "Sale Poster"
    },
    {
      link: "https://firebasestorage.googleapis.com/v0/b/pixel-play-9891f.appspot.com/o/Banner%2Ffortnite.jpg?alt=media&token=620bf6c6-327d-462f-b027-c2cfef60243c",
      alt: "Fortnite"
    },
  ]

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
        {
          banner.map((item, index) => {
            return (
              <div key={`${index}`}>
                <img  className='carousel-img' src={item.link} alt={item.alt} />
                {/* <p className="legend">GOD OF WAR</p> */}
              </div>
            )
          })
        }
      </Carousel>
    </div>


  )
}
