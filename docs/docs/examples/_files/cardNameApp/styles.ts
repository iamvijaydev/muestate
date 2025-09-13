import { styles as common } from '../shared/styles';

export const styles = common +`
export const inputGrp = {
  box: 'flex w-full',
  input: inputGrpPost.input,
  inputFull: inputGrpPost.inputFull,
  btnPost: inputGrpPost.btnPost
}

export const app = {
  form: 'grid grid-flow-row auto-rows-max gap-6 p-6 relative',
  row: 'grid grid-cols-[150px_1fr] items-start gap-6',
  skeletonText: common.skeletonText + ' self-center rounded-sm h-[24px] w-full',
  skeletonInput: common.skeletonText + ' rounded-sm h-[42px] w-full',
}

export const skeleton = {
  box: 'grid grid-cols-[80px_1fr_200px] items-start gap-3',
  img: 'rounded-md h-[60px] w-[80px] ',
  text1: 'rounded-sm mt-2 h-[15px] w-[80%] ',
  text2: 'rounded-sm mt-2 h-[10px] w-[50%] ',
  btn: 'rounded-md h-[40px] w-[200px] ',
}
skeleton.img += common.skeletonImg
skeleton.text1 += common.skeletonText
skeleton.text2 += common.skeletonText
skeleton.btn += common.skeletonText

export const footer = {
  box: 'bg-zinc-200 inset-ring-2 inset-ring-zinc-300/50 flex items-center justify-between gap-6 px-6 py-3 absolute inset-x-0 bottom-0 transition-all duration-300 ease-in-out',
  show: 'translate-y-0',
  hide: 'translate-y-full',
  count: 'flex items-center text-md text-indigo-950',
}

export const creditCard = {
  box: 'bg-radial-[at_25%_25%] from-white to-zinc-200 to-75% border-1 border-white inset-ring-1 inset-ring-zinc-200 w-md h-[220px] rounded-md p-6 shadow-xl fade-slide-in',
  pBox: 'flex justify-end gap-2',
  pLogo: 'size-[30px] bg-linear-45 from-slate-200 to-slate-300 inset-ring-1 inset-ring-slate-50 rounded-md',
  pName: 'w-[75px] h-[30px] bg-linear-45 from-slate-200 to-slate-300 inset-ring-1 inset-ring-slate-50 rounded-md',
  number: 'mt-10 font-mono text-4xl tracking-wide font-semibold text-white text-shadow-md/20',
  name: 'mt-5 uppercase font-mono text-2xl tracking-wide font-semibold text-indigo-400 text-shadow-md',
}
`
