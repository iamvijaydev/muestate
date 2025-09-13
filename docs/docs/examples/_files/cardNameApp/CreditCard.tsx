export const CreditCard = `
import { useCardNameState } from './store'
import { creditCard } from './styles'

export const CreditCard = () => {
  const name = useCardNameState()

  return (
    <div className={creditCard.box}>
      <div className={creditCard.pBox}>
        <div className={creditCard.pLogo} />
        <div className={creditCard.pName} />
      </div>
      <div className={creditCard.number}>1234 5678 9012 3456</div>
      <div>
        <div className={creditCard.name}>{name || 'John Doe'}</div>
      </div>
    </div>
  )
}
`