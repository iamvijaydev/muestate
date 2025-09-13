export const Form = `
import { Plus, Trash2 } from 'lucide-react'
import { useCounterStore, useCounterState } from './store'
import { SkeletonCore } from './SkeletonCore'
import { InputGroup } from './InputGroup'
import { IconBtn } from './IconBtn'
import { common, inputGrp } from './styles'

export const Form = () => {
  const store = useCounterStore()
  const count = useCounterState()

  return (
    <SkeletonCore>
      {count > 0 ? (
        <div className="flex gap-3 items-center">
          <InputGroup />
          <IconBtn
            onClick={store.reset}
            title="Remove"
            className={common.btn}
            icon={<Trash2 />}
          />
        </div>
      ) : (
        <div className="flex gap-3 justify-end">
          <button
            onClick={store.increment}
            type="button"
            className={common.btn}
          >
            <Plus />
            <span>Add item</span>
          </button>
        </div>
      )}
    </SkeletonCore>
  )
}
`