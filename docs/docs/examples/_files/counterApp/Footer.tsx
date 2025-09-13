export const Footer = `
import { Send } from 'lucide-react'
import { useCounterState, useCounterStore } from './store'
import { footer, common } from './styles'

export const Footer = () => {
  const count = useCounterState()
  const store = useCounterStore()

  return (
    <div className={footer.box + ' ' + (count > 0 ? footer.show : footer.hide)}>
      <span className={footer.count}>{'Total: ₹ ' + count * 110}</span>
      <button onClick={store.reset} className={common.btn}>
        <Send />
        Order Now
      </button>
    </div>
  )
}
`