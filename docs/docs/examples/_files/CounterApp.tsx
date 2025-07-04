import { Sandpack } from "@codesandbox/sandpack-react";

export const CounterApp = () => {
  return (
    <div>
      <Sandpack
        theme="auto"
        template="react"
        options={{
          showLineNumbers: true,
          wrapContent: true,
          editorHeight: 800,
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "latest",
            muestate: "latest",
          },
          entry: "/index.js",
        }}
        files={{
          "/styles.ts": {
            hidden: true,
            code: `export const app = {
  container: 'h-dvh grid place-content-center'            
}
export const textboxGrp = {
  container: 'grid grid-flow-row',
  label: 'font-mono text-sm text-neutral-700',
  group: 'flex',
  input: 'w-full bg-white border-1 border-neutral-300 hover:border-indigo-400 outline-indigo-400 focus-within:outline-1 rounded-l-sm p-2 text-sm text-neutral-900 leading-none',
  iconBtn: 'p-2 cursor-pointer disabled:invisible bg-neutral-300 hover:bg-indigo-400 outline-indigo-400 focus-within:outline-1 focus-within:bg-indigo-400 border-r-1 border-neutral-400/25',
  iconBtnEnd: 'border-r-0 border-neutral-400/0 rounded-r-sm',
  btnIcon: 'text-white'
}
textboxGrp.iconBtnEnd = textboxGrp.iconBtn + ' ' + textboxGrp.iconBtnEnd`,
          },
          "/index.js": {
            hidden: true,
            code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import CounterApp from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CounterApp />  
  </React.StrictMode>
);`,
          },
          "/store.ts": {
            code: `import { createStore, type SetStateFn } from 'muestate'
            
const makeMethods = (setState: SetStateFn<number>) => ({
  increment() {
    setState((prev) => prev + 1)
  },
  decrement() {
    setState((prev) => prev - 1)
  },
  update(count: number) {
    setState(count)
  },
  reset() {
    setState(0)
  },
})

export const [
  useCounterStore,
  useCounterState,
  CounterProvider
] = createStore<
  number,
  ReturnType<typeof makeMethods>
>(0, makeMethods)`,
            active: true,
          },
          "/App.tsx": `import { CounterProvider } from './store'
import { CounterForm } from './CounterForm'
import { app } from './styles'

export default function CounterApp() {
  return (
    <div className={app.container}>
      <CounterProvider>
        <CounterForm />
      </CounterProvider>
    </div>
  )
}`,
          "/CounterForm.tsx": `import { Plus, Minus, Circle } from 'lucide-react'
import { useCounterStore } from './store'
import { CounterInput } from './CounterInput'
import { textboxGrp } from './styles'

export const CounterForm = () => {
  const store = useCounterStore()

  return (
    <div className={textboxGrp.container}>
      <label htmlFor="count" className={textboxGrp.label}>Counter</label>
      <div className={textboxGrp.group}>
        <CounterInput />
        <button
          onClick={store.decrement}
          type="button"
          title="Decrement"
          aria-label="Decrement"
          className={textboxGrp.iconBtn}
        >
          <Minus size={16} strokeWidth={3} className={textboxGrp.btnIcon} />
        </button>
        <button
          onClick={store.reset}
          type="button"
          title="Reset"
          aria-label="Reset"
          className={textboxGrp.iconBtn}
        >
          <Circle size={16} strokeWidth={3} className={textboxGrp.btnIcon} />
        </button>
        <button
          onClick={store.increment}
          type="button"
          title="Increment"
          aria-label="Increment"
          className={textboxGrp.iconBtnEnd}
        >
          <Plus size={16} strokeWidth={3} className={textboxGrp.btnIcon} />
        </button>
      </div>
    </div>
  )
}
`,
          "/CounterInput.tsx": `import { useCounterState, useCounterStore } from './store'
import { textboxGrp } from './styles'

// CounterInput re-renders on every change.
// Accessing 'useCounterState' returns new value on change. Thus triggers re-render.
export const CounterInput = () => {
  const count = useCounterState()
  const store = useCounterStore()

  const onChange = (e: any) => {
    let value = parseInt(e.target.value, 10)

    value = isNaN(value) ? 0 : value
    store.update(value)
  }

  return (
    <input
      type="text"
      id="count"
      value={count}
      onChange={onChange}
      className={textboxGrp.input}
    />
  )
}`,
        }}
      />
    </div>
  );
};
