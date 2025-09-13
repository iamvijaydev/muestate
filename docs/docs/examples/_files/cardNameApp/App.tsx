export const App = `
import { CreditCard } from './CreditCard'
import { Form } from './Form'
import { CardNameProvider } from './store'
import { common } from './styles'

export const App = () => {
  return (
    <div className={common.pot}>
      <CardNameProvider>
        <CreditCard />
        <Form />
      </CardNameProvider>
    </div>
  )
}
`