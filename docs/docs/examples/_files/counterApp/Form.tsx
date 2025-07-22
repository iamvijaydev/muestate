export const Form = `
import { Plus, Minus, Trash2 } from 'lucide-react'
import { useCounterStore, useCounterState } from './store'
import { SkeletonCore } from './SkeletonCore'
import { common, inputGrp } from './styles'
import { IconBtn } from './IconBtn'

export const Form = () => {
  const store = useCounterStore()
  const count = useCounterState()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10)

    value = isNaN(value) ? 0 : value
    store.update(value)
  }
  return (
    <SkeletonCore>
      {count > 0 ? (
        <div className="flex gap-3 items-center">
          <div className={inputGrp.box}>
            <IconBtn onClick={store.decrement} title="Decrement" className={inputGrp.btnPre} icon={<Minus  absoluteStrokeWidth />} />
            <input
              value={count}
              onChange={onChange}
              type="text"
              className={inputGrp.inputMid}
            />
            <IconBtn onClick={store.increment} title="Increment" className={inputGrp.btnPost} icon={<Plus  absoluteStrokeWidth />} />
          </div>
          <IconBtn onClick={store.reset} title="" className={common.btn} icon={<Trash2 absoluteStrokeWidth />} />
        </div>
      ) : (
        <div className="flex gap-3 justify-end">
          <button onClick={store.increment} type="button" className={common.btn}>
            <Plus absoluteStrokeWidth />
            <span>Add item</span>
          </button>
        </div>
      )}
    </SkeletonCore>
  )
}
`