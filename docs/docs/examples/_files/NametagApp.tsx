import { Sandpack } from "@codesandbox/sandpack-react";

export const NametagApp = () => {
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
  group: 'relative',
  input: 'peer w-full bg-white border-1 border-neutral-300 hover:border-indigo-400 outline-indigo-400 focus:outline-1 rounded-sm p-2 text-sm text-neutral-900 leading-none',
  iconBtn: 'p-2 rounded-r-sm absolute inset-y-0 right-0 cursor-pointer disabled:invisible bg-neutral-300 hover:bg-indigo-400 peer-hover:bg-indigo-400 peer-focus:bg-indigo-400 outline-indigo-400 focus:outline-1 group',
  btnIcon: 'text-white'
}
textboxGrp.iconBtnEnd = textboxGrp.iconBtn + ' ' + textboxGrp.iconBtnEnd`,
          },
          "/index.js": {
            hidden: true,
            code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import CounterApp from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CounterApp />  
  </React.StrictMode>
);`,
          },
          "/store.ts": {
            code: `import { createStore, type SetStateFn } from 'muestate'
            
const makeMethods = (setState: SetStateFn<string>) => ({
  update(name: string) {
    setState(name)
  },
  reset() {
    setState('')
  },
});

export const [
  useNameTagStore,
  useNameTagState,
  NametagProvider
] = createStore<
  string,
  ReturnType<typeof getMethods>
>('Vijay', makeMethods)`,
            active: true,
          },
          "/App.tsx": `import { NametagProvider } from './store.ts'
import { NametagForm } from './NametagForm'
import { app } from './styles'

export default function NametagApp() {
  return (
    <div className={app.container}>
      <NametagProvider>
        <NametagForm />
      </NametagProvider>
    </div>
  )
}`,
          "/NametagForm.tsx": `import { X } from 'lucide-react'
import { useNameTagStore, useNameTagState } from './store'
import { textboxGrp } from './styles'

export const NametagForm = () => {
  const name = useNameTagState()
  const store = useNameTagStore()

  const onChange = (e) => { store.update(e.target.value) }

  return (
    <div className={textboxGrp.container}>
      <label htmlFor="name" className={textboxGrp.label}>Hello</label>
      <div className={textboxGrp.group}>
        <input
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Enter your name"
          className={textboxGrp.input}
          autoComplete="off"
        />
        <button
          disabled={!Boolean(name?.trim())}
          onClick={store.reset}
          type="button"
          title="Clear"
          aria-label="Clear"
          className={textboxGrp.iconBtn}
        >
          <X size={16} strokeWidth={3} className={textboxGrp.btnIcon} />
        </button>
      </div>
    </div>
  )
}
`,
        }}
      />
    </div>
  );
};
