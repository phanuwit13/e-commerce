import FacebookIcon from '@/components/Icons/FacebookIcon'
import InstagramIcon from '@/components/Icons/InstagramIcon'
type Props = {}

const Header = (props: Props) => {
  return (
    <div className='bg-[#020202] w-full'>
      <div className='w-[90%] max-w-[1400px] text-white m-auto py-[10px] flex justify-between text-[12px] items-center'>
        <div className='text-white'>
          <span className='text-[#ACACAC]'>Mon-Thu:</span> 9:00 AM - 5:30 PM
        </div>
        <div className='text-[#ACACAC] md:block hidden'>
          Visit our showroom in 1234 Street Adress City Address, 1234{' '}
          <span className='text-white underline' role='button'>
            Contact Us
          </span>
        </div>
        <div className='text-white flex items-center gap-[12px]'>
          <div>Call Us: (00) 1234 5678</div>
          <FacebookIcon />
          <InstagramIcon />
        </div>
      </div>
    </div>
  )
}

export default Header
