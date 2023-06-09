import LogoIcon from '@/components/Icons/LogoIcon'
import MenuProfile from '@/components/MenuProfile'
import useInitializeStore from '@/store/auth'
import { useCartStore } from '@/store/cart'
import { LogIn, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {}

const Navbar = (props: Props) => {
  const router = useRouter()
  const { isLogin } = useInitializeStore()
  const { cartList } = useCartStore()
  const [item, setItem] = useState(0)

  const [isAuth, setIsAuth] = useState(false)

  const goPath = (q: string = '') => {
    const path = `/${q.toString() ? `?q=${q}` : ''}`
    router.push(path)
  }

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      search: { value: string }
    }
    goPath(target.search.value)
  }

  useEffect(() => {
    setItem(cartList.reduce((acc, cur) => acc + cur.amount, 0))
  }, [cartList])

  useEffect(() => {
    setIsAuth(isLogin)
  }, [isLogin])

  return (
    <div className='bg-white w-full shadow-md'>
      <div className='w-[90%] max-w-[1400px] text-white m-auto py-[24px] flex justify-between text-[12px] items-center gap-[10px] md:gap-[40px]'>
        <Link href='/' className='w-[40px] h-[40px] aspect-square'>
          <LogoIcon />
        </Link>
        <div className='text-white w-full'>
          <form onSubmit={onSearch} className='w-full'>
            <div className='w-full px-3'>
              <input
                id='search'
                name='search'
                className='appearance-none rounded-[30px] block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                type='text'
                placeholder='Search entiere store here...'
              />
            </div>
          </form>
        </div>
        <div className='text-[#ACACAC] flex items-center gap-[30px]'>
          <Link href='/cart' role='button' className='relative'>
            {!!item && isAuth && (
              <div className='text-[12px] bg-[#1D4ED8] w-[22px] h-[22px] text-white flex justify-center items-center rounded-full absolute right-[-10px] top-[-10px] z-10'>
                {item}
              </div>
            )}
            <ShoppingCart />
          </Link>
          {isAuth && (
            <div className='min-w-[30px]'>
              <MenuProfile />
            </div>
          )}
          {!isAuth && (
            <Link href='/login' className='min-w-[30px]'>
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
