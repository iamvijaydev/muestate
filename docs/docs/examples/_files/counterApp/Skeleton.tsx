export const Skeleton = `
import { SkeletonCore } from './SkeletonCore'
import { skeleton } from './styles'

export const Skeleton = (props) => (
  <SkeletonCore>
    <div className={skeleton.btn} />
  </SkeletonCore>
)
`