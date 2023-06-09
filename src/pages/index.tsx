import Banner from '@/components/Banner'
import ProductList from '@/components/ProductList'

type Props = {}

const IndexPage = (props: Props) => {
  return (
    <div className='w-[90%] max-w-[1400px] m-auto'>
      <Banner />
      <div className='mt-[40px]'>
        <ProductList />
      </div>
    </div>
  )
}

export default IndexPage
