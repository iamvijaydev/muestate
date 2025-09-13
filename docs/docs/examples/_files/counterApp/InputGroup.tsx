export const InputGroup = `
import { Plus, Minus } from 'lucide-react'
import { useCounterStore, useCounterState } from './store'
import { inputGrp } from './styles'
import { IconBtn } from './IconBtn'

export const InputGroup = () => {
  const store = useCounterStore()
  const count = useCounterState()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10)

    value = isNaN(value) ? 0 : value
    store.update(value)
  }
  return (
    <div className={inputGrp.box}>
      <IconBtn
        onClick={store.decrement}
        title="Decrement"
        className={inputGrp.btnPre}
        icon={<Minus />} 
      />
      <input
        value={count}
        onChange={onChange}
        type="text"
        className={inputGrp.input}
      />
      <IconBtn
        onClick={store.increment}
        title="Increment"
        className={inputGrp.btnPost}
        icon={<Plus />}
      />
    </div>
  )
}
`