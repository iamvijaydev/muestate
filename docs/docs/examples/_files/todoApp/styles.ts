import { styles as common } from '../shared/styles';

export const styles = common +`
export const inputGrp = {
  box: 'flex w-full',
  inputFull: inputGrpPost.inputFull,
}

export const app = {
  form: 'grid grid-flow-row auto-rows-max gap-6 p-6 relative',
  row: 'grid grid-cols-[1fr_max-content] items-start gap-6',
}

export const todoItems = {
  emptyContent: 'text-neutral-400 text-center p-20',
  content: 'grid grid-flow-row auto-rows-max gap-3 p-6',
  contentFooter: 'border-t-2 border-zinc-200/75 flex items-center justify-between gap-6 px-6 py-3',
  grid: 'grid grid-cols-[15px_1fr_max-content] place-items-stretch items-center gap-3',
  count: 'text-md text-neutral-600',
}`;