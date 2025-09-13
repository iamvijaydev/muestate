import { styles as common } from '../shared/styles';

export const styles = common +`
export const inputGrp = {
  input: 'w-13 text-center ',
  btnPre: 'rounded-l-md ',
  btnPost: 'rounded-r-md '
}
inputGrp.box = baseInputGrp.box
inputGrp.input += baseInputGrp.input
inputGrp.btnPre += baseInputGrp.btnBase
inputGrp.btnPost += baseInputGrp.btnBase

export const app = {
  results: 'grid grid-flow-row auto-rows-max gap-6 p-6 relative',
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
  box: 'bg-zinc-100 inset-ring-2 inset-ring-zinc-200 flex items-center justify-between gap-6 px-6 py-3 absolute inset-x-0 bottom-0 transition-all duration-300 ease-in-out',
  show: 'translate-y-0',
  hide: 'translate-y-full',
  count: 'flex items-center text-md text-indigo-950',
}
`