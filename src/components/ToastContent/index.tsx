import styled from 'styled-components'

const ToastBody = styled.div`
  h4 {
    font-size: 1.25rem;
    font-weight: 500;
  }
  p {
    font-size: 1rem;
  }
`
type ToastMessageProps = {
  title?: string
  message?: string
}
export const ToastContent = ({ title, message }: ToastMessageProps) => {
  return (
    <ToastBody>
      {title && <h4>{title}</h4>}
      {message && <p>{message}</p>}
    </ToastBody>
  )
}
