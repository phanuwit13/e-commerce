import { Minus, Plus } from 'lucide-react'
import { ChangeEvent } from 'react'

type Props = {
  amount: number
  setAmount: (value: number) => void
  max: number
}

const QuantityButton = ({ amount, setAmount, max }: Props) => {
  const increase = () => {
    setAmount(amount < max ? (amount += 1) : max)
  }
  const decrease = () => {
    setAmount(amount > 2 ? (amount -= 1) : 1)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue: string = event.target.value

    inputValue = inputValue.replace(/[^0-9]/g, '')

    if (inputValue !== '') {
      const numericValue = Number(inputValue)

      if (numericValue < 0) {
        inputValue = '0'
      } else if (numericValue > max) {
        inputValue = max.toString()
      }
    }

    setAmount(Number(inputValue))
  }

  return (
    <div className='flex items-center border border-gray-200 rounded'>
      <button
        onClick={decrease}
        type='button'
        className='w-10 h-10 flex justify-center items-center leading-10 text-gray-600 transition hover:opacity-75'
      >
        <Minus />
      </button>

      <input
        type='number'
        id='Quantity'
        value={amount}
        onChange={onChange}
        className='outline-none h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
      />

      <button
        onClick={increase}
        type='button'
        className='w-10 h-10 leading-10  flex justify-center items-center text-gray-600 transition hover:opacity-75'
      >
        <Plus />
      </button>
    </div>
  )
}

export default QuantityButton
