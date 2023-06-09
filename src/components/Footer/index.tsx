type Props = {}

const Footer = (props: Props) => {
  const footerList = [
    {
      name: 'Information',
      list: [
        'About Us',
        'About Zip',
        'Privacy Policy',
        'Search',
        'Terms',
        'Orders and Returns',
        'Contact Us',
        'Advanced Search',
        'Newsletter Subscription',
      ],
    },
    {
      name: 'PC Parts',
      list: [
        'CPUS',
        'Add On Cards',
        'Hard Drives (Internal)',
        'Graphic Cards',
        'Keyboards / Mice',
        'Cases / Power Supplies / Cooling',
        'RAM (Memory)',
        'Software',
        'Speakers / Headsets',
        'Motherboards',
      ],
    },
    {
      name: 'Desktop PCs',
      list: [
        'Custom PCs',
        'Servers',
        'MSI All-In-One PCs',
        'HP/Compaq PCs',
        'ASUS PCs',
        'Tecs PCs',
      ],
    },
    {
      name: 'Laptops',
      list: [
        'Evryday Use Notebooks',
        'MSI Workstation Series',
        'MSI Prestige Series',
        'Tablets and Pads',
        'Netbooks',
        'Infinity Gaming Notebooks',
      ],
    },
    {
      name: 'Address',
      list: [
        'Address: 1234 Street Adress City Address, 1234',
        'Phones: (00) 1234 5678',
        'We are open: Monday-Thursday: 9:00 AM - 5:30 PM',
        'Friday: 9:00 AM - 6:00 PM',
        'Saturday: 11:00 AM - 5:00 PM',
        'E-mail: shop@email.com',
      ],
    },
  ]

  return (
    <div className='bg-[#020202] w-full'>
      <div className='w-[90%] max-w-[1400px] m-auto py-[47px] text-white lg:block hidden '>
        <div>
          <div className='text-[38px]'>Sign Up To Our Newsletter.</div>
          <div className='font-[200]'>
            Be the first to hear about the latest offers.
          </div>
        </div>
        <div className='grid grid-cols-5 mt-[45px]'>
          {footerList.map((item, idx) => {
            return (
              <div key={`footer-${idx}`}>
                <span className='text-[#808081]'>{item.name}</span>
                <ul className='mt-[25px] flex flex-col gap-[6px]'>
                  {item.list.map((v, i) => {
                    return <li key={`footer-sub-${i}`}>{v}</li>
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      <div className='grid w-[90%] max-w-[1400px] mx-auto mt-8 text-white lg:hidden py-[20px]'>
        <div>
          <div className='text-[20px]'>Sign Up To Our Newsletter.</div>
          <div className='font-[200] text-[14px]'>
            Be the first to hear about the latest offers.
          </div>
        </div>
        {footerList.map((item, idx) => {
          return (
            <div className='py-5 text-[]' key={`footer-${idx}`}>
              <details className='group'>
                <summary className='flex justify-between items-center font-medium cursor-pointer list-none'>
                  <span className='text-[#808081]'> {item.name}</span>
                  <span className='transition group-open:rotate-180'>
                    <svg
                      fill='none'
                      height='24'
                      shapeRendering='geometricPrecision'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      viewBox='0 0 24 24'
                      width='24'
                    >
                      <path d='M6 9l6 6 6-6'></path>
                    </svg>
                  </span>
                </summary>
                <ul className='mt-[25px] flex flex-col gap-[6px]'>
                  {item.list.map((v, i) => {
                    return <li key={`footer-sub-${i}`}>{v}</li>
                  })}
                </ul>
              </details>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Footer
