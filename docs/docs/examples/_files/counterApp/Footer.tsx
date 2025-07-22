export const Footer = `
import { Send } from 'lucide-react'
import { useCounterState } from './store'
import { footer } from './styles'

export const Footer = () => {
  const count = useCounterState()

  return (
    <div className={footer.box + ' ' + (count > 0 ? footer.show : footer.hide)}>
      <span className={footer.count}>{'Total: ₹ ' + count * 110}</span>
      <button className={footer.btn}>
        <Send absoluteStrokeWidth />
        Order Now
      </button>
    </div>
  )
}
`