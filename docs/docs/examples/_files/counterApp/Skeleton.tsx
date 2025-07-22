export const Skeleton = `
import { SkeletonCore } from './SkeletonCore'
import { skeleton } from './styles'

export const Skeleton = (props) => (
  <SkeletonCore imgCls={props.imgCls}>
    <div className={skeleton.btn} />
  </SkeletonCore>
)
`