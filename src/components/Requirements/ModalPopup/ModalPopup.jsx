import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import './ModalPopup.css'

export default function ModalPopup({setModalOpen, modalOpen, disconnect}) {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  function handleClearWallet(){
      disconnect();
      setModalOpen(false)
  }

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog as="div" style={{position: 'relative', zIndex: '10'}} initialFocus={cancelButtonRef} onClose={setModalOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
            <div className="modal-1" />
        </Transition.Child>

        <div className="modal-2">
          <div className="modal-3">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="modal-4">
                <div className="modal-5">
                  <div className="modal-6">
                    <div className="modal-7">
                      <ExclamationIcon style={{color: '#DC2626', width: '1.5rem', height: '1.5rem'}} aria-hidden="true" />
                    </div>
                    <div className="modal-8">
                      <Dialog.Title as="h3" style={{color: '#111827', fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '500', lineHeight: '1.5rem'}}>
                        Deactivate account
                      </Dialog.Title>
                      <div style={{marginTop: '0.5rem'}}>
                        <p style={{color: '#6B7280', fontSize: '0.875rem', lineHeight: '1.25rem'}}>
                          Are you sure you want to deactivate your account? All of your data will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-9">
                  <button
                    type="button"
                    className="button-1"
                    onClick={handleClearWallet}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="button-2"
                    onClick={() => setModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}