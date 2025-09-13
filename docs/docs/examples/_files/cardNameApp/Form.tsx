export const Form = `
import { Plus, Trash2 } from 'lucide-react'
import { useCounterStore, useCounterState } from './store'
import { SkeletonInput } from './SkeletonInput'
import { InputGroup } from './InputGroup'
import { app, inputGrp, common } from './styles'

export const Form = () => {
  return (
    <div className={common.card}>
      <div className={app.form}>
        <InputGroup />
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </div>
      <div className={common.maskBT} />
    </div>
  )
}
`