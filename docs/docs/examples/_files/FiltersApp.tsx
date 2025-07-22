import { Sandpack } from "@codesandbox/sandpack-react";

export const FiltersApp = () => {
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
import FiltersApp from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FiltersApp />  
  </React.StrictMode>
);`,
          },
          "/state.ts": `export type FilterItem = {
  label: string,
  value: string          
}

export enum BaseFields {
  search = 'search',
  department = 'department'
}

export enum AdvancedFields {
  fromDate = 'fromDate',
  toDate = 'toDate',
  color = 'color',
  size = 'size',
  brand = 'brand'
}

export interface FilterState {
  base: Map<BaseFields, FilterItem>,
  advanced: Map<AdvancedFields, FilterItem>,
  advancedApplied: Set<AdvancedFields>,
}

export const initialState: FilterState = {
  base: new Map(getMapItems(BaseFields)),
  advanced: new Map(getMapItems(AdvancedFields)),
  advancedApplied: new Set()
}

function getMapItems (source: any) {
  return Object.values(source).map((value) => {
    return [value, { label: splitCamlecase(value), value }]
  })
}
function splitCamlecase (str: string) {
  const result = str.replace(/([a-z])([A-Z])/g, '$1 $2').toLocaleLowerCase()
  return result.charAt(0).toUpperCase() + result.slice(1)
}`,
          "/store.ts": {
            code: `import { createStore, type SetStateFn } from 'muestate'
import { initialState, type FilterState, type BaseFields, type AdvancedFields } from './state'

const getMethods = (setState: SetStateFn<FilterState>) => ({
  setBase(field: BaseFields, value: string) {
    setState((state) => {
      state.base.get(field).value = value
      return state
    })
  },
  setAdvanced(field: AdvancedFields, value: string) {
    setState((state) => {
      state.advanced.get(field).value = value
      state.advancedApplied[Boolean(value) ? 'add' : 'delete'](field)
      return state
    })
  },
  clearBase(field: BaseFields) {
    setState((state) => {
      state.base.get(field).value = ''
      return state
    })
  },
  clearAdvanced(field: AdvancedFields) {
    setState((state) => {
      state.advanced.get(field).value = ''
      state.advancedApplied.delete(field)
      return state
    })
  },
  resetAdvanced() {
    setState((state) => {
      state.advanced.forEach((filter) => { filter.value = '' })
      state.advancedApplied.clear()
      return state
    })
  },
})

export const [
  useFilterStore,
  useFilterState,
  FilterProvider
] = createStore(initialState, getMethods)`,
            active: true,
          },
          "/App.tsx": `import { FilterProvider } from './store.ts';
import { Filters } from './Filters.tsx';

export default function FiltersApp() {
  return (
    <div className={app.container}>
      <FilterProvider>
        <Filters />
      </FilterProvider>
    </div>
  )
}`,
          "/Filters.tsx": `import { useState } from 'react'
import { BaseFilters } from './BaseFilters'
import { AdvancedFilters } from './AdvancedFilters'
import { AppliedFilters } from './AppliedFilters'
import { Results } from './Results'

export const Filters = () => {
  const [isShowAdvanced, setShowAdvanced] = useState(false)
  const onToggle = () => setShowAdvanced((prev) => !prev)

  return (
    <div>
      <BaseFilters
        isShowAdvanced={isShowAdvanced}
        onToggleAdvancedFilter={onToggle}
      />
      <AppliedFilters />
      {isShowAdvanced ? <AdvancedFilters /> : null}
      <Results />
    </div>
  )
}`,
          "/BaseFilters.tsx": `import { X, ListFilterPlus } from 'lucide-react'
import { FilterItem } from './FilterItem'

export type Props = {
  isShowAdvanced: boolean
  onToggleAdvancedFilter: () => void
}

export const BaseFilters = ({
  isShowAdvanced,
  onToggleAdvancedFilter,
}: Props) => {
 return (
    <div className="grid grid-cols-[1fr_40px] gap-4 p-4 bg-neutral-100 border-b border-neutral-300 shadow-xs">
      <div className='grid grid-cols-[2fr_auto] gap-4'>
        <FilterItem field="search" />
        <FilterItem field="department" />
      </div>
      <div className="relative">
        <button type="button" onClick={onToggleAdvancedFilter} className='absolute inset-x-0 bottom-0 p-2 rounded-sm cursor-pointer disabled:cursor-none disabled:invisible bg-neutral-400/70 hover:bg-indigo-400 focus:bg-indigo-400 outline-indigo-400 focus:outline-1 grid place-items-center'>
          {isShowAdvanced ? <X  className="text-white" size={16} strokeWidth={3} /> : <ListFilterPlus className="text-white" size={16} strokeWidth={3} />}
        </button>
      </div>
    </div>
  )
}`,
          "/AdvancedFilters.tsx": `import { useFilterStore } from './store'
import { FilterItem } from './FilterItem'

export const AdvancedFilters = () => {
  const store = useFilterStore()

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-5 p-5 bg-neutral-100 border-1 border-neutral-300 absolute right-[15px] top-[86px] z-10 w-[300px] rounded-b-lg shadow-lg">
      <FilterItem type="date" field="fromDate" />
      <FilterItem type="date" field="toDate" />
      <FilterItem type="color" field="color" />
      <FilterItem field="size" />
      <FilterItem field="brand" />
      <button type="button" onClick={store.resetAdvanced} className='p-2 rounded-sm text-neutral-800 cursor-pointer bg-neutral-300 hover:bg-indigo-400 focus:bg-indigo-400 outline-indigo-400 focus:outline-1 text-neutral-900 hover:text-indigo-50 focus:text-indigo-50'>Reset</button>
    </div>
  )
}
`,
          "/FilterItem.tsx": `import { X } from 'lucide-react'
import { BaseFields, AdvancedFields, type FilterState } from './state'
import { useFilterStore, useFilterState } from './store'
import {container, label as labelCls, group, input, iconBtn, btnIcon} from './styles'

export type Props = {
  type?: "text" | "date" | "color"
  field: string
  className?: string
}

export const FilterItem = ({
  type = "text",
  field,
}: Props) => {
  const store = useFilterStore()

  const isBase = field in BaseFields

  if (!isBase && !(field in AdvancedFields)) {
    throw 'Choose the correct filter type: "base" or "advanced"'
  }

  const source = isBase ? 'base' : 'advanced'
  const setMethod = isBase ? 'setBase' : 'setAdvanced'
  const clearMethod = isBase ? 'clearBase' : 'clearAdvanced'

  // Use 'store' and 'useReactiveState' to create a reactive value for the current 'field'.
  // Thus only re-render if the specific value changes.
  const [label, value] = useFilterState((state: FilterState) => {
    const filter = state[source].get(field)!
    return [filter.label, filter.value]
  })

  const onChange = (e) => { store[setMethod](field, e.target.value) }
  const onClear = () => { store[clearMethod](field) }

  return (
    <div className={container}>
      <label htmlFor={field} className={labelCls}>{label}</label>
      <div className={group}>
        <input
          type={type}
          id={field}
          onChange={onChange}
          value={value}
          className={input}
        />
        <button disabled={!Boolean(value?.trim())} onClick={onClear} type="button" title="Clear" aria-label="Clear" className={iconBtn}>
          <X size={16} strokeWidth={3} className={btnIcon} />
        </button>
      </div>
    </div>
  )
}`,
          "/AppliedFilters.tsx": `import { X } from 'lucide-react'
import { useFilterStore, useFilterState } from './store'
import type { FilterState, FilterItem } from './state'

export type AppliedItem = FilterItem & {
  field: string
}

export const AppliedFilters = () => {
  const store = useFilterStore()

  const applied = useFilterState<AppliedItem[]>(
    (state: FilterState) => {
      return [...state.advancedApplied].map((field) => ({
        field,
        ...state.advanced.get(field)!
      }))
    }
  )

  return (
    <div className='m-2 flex flex-wrap gap-2'>
      {
        applied.map((item: AppliedItem) => (
          <div key={item.field} className='group rounded-full bg-neutral-100 hover:bg-indigo-100 border border-neutral-300 hover:border-indigo-200 text-xs font-mono text-neutral-700 flex transition'>
            <span className='py-2 pl-2 pr-1 text-neutral-600 group-hover:text-indigo-900 transition'>{item.label}</span>
            <span className='py-2 pl-3 rounded-l-full bg-neutral-200 group-hover:bg-indigo-200 text-neutral-900 group-hover:text-indigo-900 transition'>{item.value}</span>
            <button type="button" onClick={() => store.clearAdvanced(item.field)} className='p-2 rounded-r-full bg-neutral-400/70 group-hover:bg-indigo-200 text-neutral-900 group-hover:text-indigo-900 cursor-pointer transition'><X size={16} strokeWidth={2} /></button>
          </div>
        ))
      }
    </div>
  )
}`,
        "/Results.tsx": {
            hidden: true,
            code: `export const ResultItem = ({ delay }: { delay: string }) => (
  <div className="animate-pulse w-full grid grid-cols-[20px_1fr_1fr_40px_40px] gap-x-4 gap-y-2" style={{ animationDelay: delay }}>
    <div className="size-[20px] rounded-full bg-neutral-200" />
    <div className="col-span-2 h-[20px] rounded-full bg-neutral-200" />
    <div className="h-[20px] w-[40px] rounded-full bg-neutral-200" />
    <div className="h-[20px] w-[40px] rounded-full bg-neutral-200" />
    <div className="col-start-2 h-[20px] rounded-full bg-neutral-200" />
  </div>
)

export const Results = () => (
  <div className="w-full flex flex-col gap-7 p-10">
    <ResultItem delay="0ms" />
    <ResultItem delay="100ms" />
    <ResultItem delay="200ms" />
    <ResultItem delay="300ms" />
    <ResultItem delay="400ms" />
    <ResultItem delay="500ms" />
    <ResultItem delay="600ms" />
    <ResultItem delay="700ms" />
    <ResultItem delay="800ms" />
    <ResultItem delay="900ms" />
  </div>
);`,
          },
        }}
      />
    </div>
  );
};
