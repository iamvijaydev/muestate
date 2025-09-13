export const App = `
import { Footer } from './Footer'
import { Form } from './Form'
import { Skeleton } from './Skeleton'
import { CounterProvider } from './store'
import { common, app } from './styles'

export const App = () => {
  return (
    <div className={common.pot}>
      <div className={common.card}>
        <CounterProvider>
          <div className={app.results}>
            <div className={common.maskTB} />
            <Skeleton />
            <Skeleton />
            <Form />
            <Skeleton />
          </div>
          <Footer />
        </CounterProvider>
      </div>
    </div>
  )
}
`