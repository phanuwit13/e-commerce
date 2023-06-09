import { useRouter } from 'next/router'

type Props = {
  total: number
  current: number
  limit: number
}

const Pagination = ({ total, current, limit }: Props) => {
  const allPage = Math.floor(total / limit)
  const router = useRouter()
  const { pathname, query } = router

  const goPath = (param: { [key: string]: string | number }) => {
    Object.keys(param).forEach((item) => {
      query[item] = param[item].toString()
    })
    const paramData = Object.keys(query)
      .map((item) => `${item}=${query[item]}`)
      .join('&')
    const path = pathname + `${paramData ? `?${paramData}` : ''}`
    router.push(path)
  }

  return (
    <div className='flex'>
      <button
        onClick={() => goPath({ page: current - 1, limit })}
        disabled={current === 1}
        className={`${
          current !== 1 && 'hover:bg-blue-500 hover:text-white'
        } px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200  dark:hover:bg-blue-500  dark:hover:text-gray-200`}
      >
        <div className='flex items-center -mx-1'>
          <span className='mx-1'>previous</span>
        </div>
      </button>
      {Array.from(Array(allPage).keys()).map((item) => {
        return (
          <button
            key={`page-${item}`}
            onClick={() => goPath({ page: item + 1, limit })}
            className={`${
              current === item + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
            } hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200`}
          >
            {item + 1}
          </button>
        )
      })}
      <button
        onClick={() => goPath({ page: current + 1, limit })}
        disabled={current === allPage}
        className={`${
          current !== allPage && 'hover:bg-blue-500 hover:text-white'
        } px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200  dark:hover:bg-blue-500  dark:hover:text-gray-200`}
      >
        <div className='flex items-center -mx-1'>
          <span className='mx-1'>Next</span>
        </div>
      </button>
    </div>
  )
}

export default Pagination
