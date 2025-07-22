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
            <Skeleton imgCls="bg-red-50" />
            <Skeleton imgCls="bg-orange-50" />
            <Form />
            <Skeleton imgCls="bg-yellow-50" />
          </div>
          <Footer />
        </CounterProvider>
      </div>
    </div>
  )
}
`