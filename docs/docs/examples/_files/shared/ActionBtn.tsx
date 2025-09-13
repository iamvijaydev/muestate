
export const ActionBtn = `
import { common } from './styles'

export const ActionBtn = (props) => {
  return (
    <div className="flex gap-3 justify-end">
      <button
        onClick={props.onClick}
        type="button"
        className={common.btn}
      >
        {props.icon}
        <span>{props.label}</span>
      </button>
    </div>
  )
}
`