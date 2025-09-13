export const styles = `
const core = {
  fullScreen: 'w-svw h-svh',
  mask: 'absolute inset-x-0 w-full h-1/2 from-transparent to-white',
  btn: 'flex flex-nowrap items-center rounded-md cursor-pointer outline-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 text-md disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-auto transition'
}

export const common = {
  pot: core.fullScreen + ' grid place-items-center',
  potTop: core.fullScreen + ' grid justify-items-center',
  potRows: 'flex flex-col gap-6 py-6',
  card: 'w-xl bg-zinc-50 inset-ring-2 inset-ring-zinc-200/75 rounded-md overflow-hidden relative',
  maskTB: core.mask + ' top-0 bg-linear-to-t',
  maskBT: core.mask + ' bottom-0 bg-linear-to-b',

  btn: core.btn + ' px-3 py-2 gap-2 hover:shadow-md bg-indigo-500/80 hover:bg-indigo-500 focus-visible:bg-indigo-500 text-indigo-100 hover:text-white focus:text-white',

  btnIcon: core.btn + ' p-2 inset-ring-1 inset-ring-slate-300 hover:inset-ring-indigo-500 focus-visible:inset-ring-indigo-500 bg-indigo-100 hover:bg-indigo-500 focus-visible:bg-indigo-500 text-indigo-400 hover:text-white focus-visible:text-white',

  chkbox: 'w-4 h-4 text-indigo-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-500 focus:ring-2',

  skeletonImg: 'bg-conic-180 from-zinc-200 via-zinc-100 to-zinc-300 inset-ring-1 inset-ring-zinc-300/50',
  skeletonText: 'bg-linear-45 from-zinc-200 to-zinc-100 inset-ring-1 inset-ring-zinc-300/50'
}

export const baseInputGrp = {
  box: 'flex',
  btnBase: 'flex-none w-[42px] h-[42px] cursor-pointer p-2 hover:shadow-md border-1 border-slate-300 hover:border-indigo-500 focus-visible:border-indigo-500 bg-indigo-100 hover:bg-indigo-500 focus-visible:bg-indigo-500 outline-indigo-600 focus-visible:outline-2 text-indigo-400 hover:text-white focus-visible:text-white focus-visible:relative focus-visible:z-1 transition',
  input: 'w-full flex-auto bg-white border-y-1 border-slate-300 p-2 text-md text-slate-900 outline-indigo-600 focus-visible:outline-2 focus-visible:border-white focus-visible:relative focus-visible:z-1',
}

export const inputGrpPost  = {
  box: baseInputGrp.box + ' w-full',
  input: baseInputGrp.input + ' border-l-1 rounded-l-md',
  inputFull: baseInputGrp.input +' border-x-1 rounded-md',
  btnPost: baseInputGrp.btnBase + ' rounded-r-md'
}

export const textboxGrp = {
  box: 'grid grid-flow-row',
  label: 'font-mono text-sm text-neutral-700',
}

export const actionChip = {
  box: 'flex w-full flex-wrap gap-3',
  base: 'cursor-pointer rounded-full inset-ring-2 outline-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 font-mono text-sm uppercase px-3 py-2',
}
actionChip.btn = actionChip.base + ' inset-ring-zinc-200 hover:inset-ring-indigo-200 focus-visible:inset-ring-indigo-200 bg-zinc-100 hover:bg-indigo-100 focus-visible:bg-indigo-100 text-zinc-500 hover:text-indigo-500 focus-visible:text-indigo-500'
actionChip.btnActive = actionChip.base + ' bg-indigo-100 inset-ring-indigo-200 text-indigo-500'
`