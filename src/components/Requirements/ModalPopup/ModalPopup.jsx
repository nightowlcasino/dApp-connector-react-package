import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import "./ModalPopup.css";

export default function ModalPopup({ setModalOpen, modalOpen, disconnect }) {
  const [isChecked, setIsChecked] = useState(false);

  const cancelButtonRef = useRef(null);

  function handleClearWallet() {
    disconnect();
  }

  function handleOkButton() {
    setModalOpen(false);
    if (isChecked) {
      localStorage.setItem("showAgain", "false");
    }
    else {
      localStorage.setItem("showAgain", "true");
    }
  }
  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        style={{ position: "relative", zIndex: "10" }}
        initialFocus={cancelButtonRef}
        onClose={setModalOpen}
      >
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
                      <ExclamationIcon
                        style={{
                          color: "#DC2626",
                          width: "1.5rem",
                          height: "1.5rem",
                        }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="modal-8">
                      <Dialog.Title
                        as="h3"
                        style={{
                          color: "#111827",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          lineHeight: "0.5rem",
                        }}
                      >
                        Clear Wallet
                      </Dialog.Title>
                      <div style={{ marginTop: "0.5rem" }}>
                        <p
                          style={{
                            color: "#6B7280",
                            fontSize: "1.125rem",
                            lineHeight: "1.25rem",
                            fontWeight: "600",
                          }}
                        >
                          Follow these steps to disconnect your wallet:
                          <br />
                          <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                            1. Click this button below:
                            <br />
                            <button
                              className="button-clear-wallet"
                              onClick={() => handleClearWallet()}
                            >
                              Clear Wallet
                            </button>
                            <br /><br />
                            2. Then disconnect from the dApp on Nautilus by
                            going to Nautilus extension, Connected dApps and
                            disconnecting from this dApp.
                            <br /><br />
                            3. Refresh the site.
                            <br /><br />
                          </p>
                        </p>
                        <div className="dont-show-message-container">
                          <input style={{ marginTop: "2px" }} type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                          Dont show this message again
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-9">
                  <button
                    type="button"
                    className="button-1"
                    onClick={() => handleOkButton()}
                  >
                    Ok
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
  );
}
