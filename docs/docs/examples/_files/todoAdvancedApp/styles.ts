import { styles as common } from '../shared/styles';

export const styles = common +`
export const inputGrp = {
  box: inputGrpPost.box,
  input: inputGrpPost.input,
  inputFull: inputGrpPost.inputFull,
  btnPost: inputGrpPost.btnPost
}

export const app = {
  form: 'grid grid-flow-row auto-rows-max gap-6 p-6 relative',
  row: 'grid grid-cols-[1fr_minmax(150px,10%)_max-content] gap-6',
}

export const todoItems = {
  emptyContent: 'text-neutral-400 text-center p-20',
  container: 'mt-6 mx-auto max-w-2xl bg-neutral-100 border border-neutral-300 shadow-xs rounded-md',
  content: 'grid grid-flow-row auto-rows-max gap-3 p-6',
  contentFooter: 'border-t-2 border-zinc-200/75 flex items-center justify-between gap-6 px-6 py-3',
  grid: 'grid grid-cols-[15px_1fr_max-content_max-content] place-items-stretch items-center gap-3',
  category: 'font-mono text-xs uppercase leading-3 bg-fuchsia-50 inset-ring-1 inset-ring-fuchsia-200 text-fuchsia-500 p-1 rounded',
  actionBtn: 'text-neutral-900 hover:text-indigo-600 cursor-pointer',
  count: 'text-md text-neutral-600',
  bulkActionBtn: 'flex flex-nowrap items-center px-2 py-1 gap-2 rounded-sm cursor-pointer bg-neutral-400/70 hover:bg-indigo-400 focus:bg-indigo-400 outline-indigo-400 focus:outline-1 text-md text-neutral-600 hover:text-white focus:text-white disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-auto transition',
}`;
