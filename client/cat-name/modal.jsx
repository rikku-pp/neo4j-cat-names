import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

const mainRoot = document.getElementById('root')
const modalRoot = document.getElementById('modal-root')

export const Modal = ({ closeDialog, children }) => {
  const lastFocusRef = useRef()

  useEffect(() => {
    mainRoot.setAttribute('aria-hidden', true)
    lastFocusRef.current = document.activeElement
    return () => {
      mainRoot.setAttribute('aria-hidden', false)
      lastFocusRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const d = document.getElementById('detail-modal')

    function modalEscape(event) {
      event.keyCode === 27 && closeDialog()
    }
    function modalFocus(event) {
      if (!d.contains(event.target)) {
        event.stopPropagation()
        d.focus()
      }
    }
    d.focus()

    document.addEventListener('focus', modalFocus, true)
    document.addEventListener('keydown', modalEscape, true)

    return () => {
      document.removeEventListener('focus', modalFocus, true)
      document.removeEventListener('keydown', modalEscape, true)
    }
  }, [])

  return ReactDOM.createPortal(children, modalRoot)
}
