import { createPortal } from 'react-dom'
import './Modal.css'

function Modal({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
}) {
  const modalRoot = document.getElementById('modal')

  if (!modalRoot) {
    return null
  }

  return createPortal(
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal__header">
          <span className="modal__eyebrow">
            Confirmación
          </span>

          <h2 id="modal-title">
            {title}
          </h2>
        </div>

        <div className="modal__body">
          {children}
        </div>

        <div className="modal__actions">
          <button
            type="button"
            className="button button--outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="button button--danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? 'Eliminando...'
              : confirmText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default Modal