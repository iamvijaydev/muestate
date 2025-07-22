export const IconBtn = `
export const IconBtn = (props) => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      title={props.title}
      aria-label={props.title}
      className={props.className}
    >
      {props.icon}
    </button>
  )
}
`