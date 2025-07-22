export const SkeletonCore = `
import { skeleton } from './styles'

export const SkeletonCore = (props) => (
  <div className={skeleton.box}>
    <div className={skeleton.img + ' ' + props.imgCls} />
    <div>
      <div className={skeleton.text1} />
      <div className={skeleton.text2} />
    </div>
    {props.children}
  </div>
)
`