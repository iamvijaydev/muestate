export const InputGroup = `
import { X } from 'lucide-react'
import { useCardNameStore, useCardNameState } from './store'
import { IconBtn } from './IconBtn'
import { inputGrp, app } from './styles'

export const InputGroup = () => {
  const store = useCardNameStore()
  const name = useCardNameState()

  return (
    <div className={app.row}>
      <div className="self-center">Name on card</div>
      <div className={inputGrp.box}>
        <input
          value={name}
          onChange={(e) => store.update(e.target.value)}
          type="text"
          className={name.length > 0 ? inputGrp.input : inputGrp.inputFull}
        />
        {name.length > 0 ? (<IconBtn
          onClick={store.reset}
          title="Increment"
          className={inputGrp.btnPost}
          icon={<X />}
        />) : null}
      </div>
    </div>
  )
}
`