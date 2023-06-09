import Image from 'next/image'
import Slider from 'react-slick'

type Props = {}

function Banner({}: Props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const listBanner = [
    'https://media.studio7thailand.com/99969/MacBook_air_M1_Start_price_28800.-_Hero_PC_2000x720-homepage_desktop_banner_medium.jpg',
    'https://media.studio7thailand.com/100467/Apple_6.6_Mega_Fest_01_HERO_PC_2000x720-homepage_desktop_banner_medium.jpg',
    'https://media.studio7thailand.com/99121/STU_Campaign_iPad_Air_5_Promotion_22_May_%E2%80%93_11_June_2023_Hero_PC_2000x720-homepage_desktop_banner_medium.jpg',
    'https://media.studio7thailand.com/99972/STU_Campaign_Apple_Watch_Series_8_19_-_31_MAY_2023_HeroBanner-Web-(1)-homepage_desktop_banner_medium.jpg',
    'https://media.studio7thailand.com/98883/STU_Campaign_Air_pods_Gen_3_Discount_550_Baht_19_May_%E2%80%93_11_Jun_2023_Hero_PC_2000x720-homepage_desktop_banner_medium.jpg',
    'https://res.cloudinary.com/spvi-production/image/upload/q_auto/v1686025545/hero-banner/desktop/pbmai7amxrlfztt6fp4a.png',
  ]

  return (
    <div className='mt-[16px]'>
      <Slider {...settings}>
        {listBanner.map((item,idx) => {
          return (
            <div key={`banner-${idx}`}>
              <Image src={item} alt='banner image' width={1400} height={400} className="max-h-[400px] aspect-[12/4] object-cover object-center" />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default Banner
