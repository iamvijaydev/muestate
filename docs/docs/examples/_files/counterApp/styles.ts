export const styles = `
export const common = {
  pot: 'grid w-svw h-svh place-items-center',
  card: 'w-xl bg-zinc-50 inset-ring-2 inset-ring-zinc-200/50 rounded-md overflow-hidden relative',

  btn: 'flex flex-nowrap items-center px-3 py-2 gap-2 rounded-lg cursor-pointer bg-indigo-500/80 hover:bg-indigo-500 focus-within:bg-indigo-500 outline-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 text-md text-indigo-50 hover:text-white focus:text-white disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-auto transition',
  input: '',
}

export const inputGrp = {
  box: 'flex',
  btnBase: 'cursor-pointer flex-none p-2 border-1 border-slate-300 hover:border-indigo-500 focus-within:border-indigo-500 bg-indigo-100 hover:bg-indigo-500 focus-within:bg-indigo-500 outline-indigo-600 focus-within:outline-2 text-indigo-400 hover:text-white focus-within:text-white focus-within:relative focus-within:z-1 transition',
  inputMid: 'w-13 bg-white border-y-1 border-slate-300 p-2 text-md text-slate-900 text-center outline-indigo-600 focus-within:outline-2 focus-within:border-white focus-within:relative focus-within:z-1',
}
inputGrp.btnPre = 'rounded-l-lg' + ' ' + inputGrp.btnBase
inputGrp.btnPost = 'rounded-r-lg' + ' ' + inputGrp.btnBase

export const app = {
  results: 'grid grid-flow-row auto-rows-max gap-6 p-6',
}

export const skeleton = {
  box: 'grid grid-cols-[80px_1fr_200px] items-start gap-3',
  img: 'bg-conic-180 from-zinc-200 via-zinc-100 to-zinc-300 inset-ring-1 inset-ring-zinc-300/25 rounded-md h-[60px] w-[80px]',
  text1: 'bg-linear-45 from-zinc-200 to-zinc-100 inset-ring-1 inset-ring-zinc-200 rounded-sm mt-2 h-[15px] w-[80%]',
  text2: 'bg-linear-45 from-zinc-200 to-zinc-100 inset-ring-1 inset-ring-zinc-200 rounded-sm mt-2 h-[10px] w-[50%]',
  btn: 'bg-linear-45 from-zinc-200 to-zinc-100 inset-ring-1 inset-ring-zinc-200 rounded-md h-[40px] w-[200px]',
}

export const form = {
  box: '',
  iconBtn: '',
}

export const footer = {
  box: 'bg-zinc-200 inset-ring-2 inset-ring-zinc-300/50 flex items-center justify-between gap-6 px-6 py-3 absolute inset-x-0 bottom-0 transition-all duration-300 ease-in-out',
  show: 'translate-y-0',
  hide: 'translate-y-full',
  count: 'flex items-center text-md text-indigo-950',
  btn: 'flex flex-nowrap items-center px-3 py-2 gap-2 rounded-lg cursor-pointer bg-indigo-500/80 hover:bg-indigo-500 focus-within:bg-indigo-500 outline-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 text-md text-indigo-100 hover:text-white focus:text-white disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-auto transition',
}
`