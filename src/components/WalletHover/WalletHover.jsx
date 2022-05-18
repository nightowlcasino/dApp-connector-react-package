import { Fragment, useState } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import SigRSVicon from "../../assets/sigrsv-icon.svg";
import ERGicon from "../../assets/ergo-icon.svg";

import "../Requirements/Requirements.css";
import ModalPopup from "../Requirements/ModalPopup/ModalPopup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WalletHover({
  disconnect,
  owlBalance,
  sigUSDBalance,
  ergBalance,
  setModalOpen,
}) {
  const [open, setOpen] = useState(true);

  function handleClearWallet() {
    let showAgain = localStorage.getItem("showAgain");
    console.log(showAgain);
    if (showAgain == "false") disconnect();
    else setModalOpen(true);
  }
  return (
    <Menu as="div" className="mainDiv">
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="mainMenuItem"
        >
          <div
            style={{
              padding: "0.25rem 0 0.25rem",
              marginBottom: "1px",
              marginTop: "1px",
            }}
          >
            {ergBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img src={ERGicon} className="token-icon-img" />
                    <p>
                      ERG Balance:
                      <br />
                      {ergBalance} ERG
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}
            {sigUSDBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img src={SigRSVicon} className="token-icon-img" />
                    <p>
                      SigUSD Balance:
                      <br />
                      {sigUSDBalance} SigUSD
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}
            {owlBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img src={ERGicon} className="token-icon-img" />
                    <p>
                      OWL Balance:
                      <br />
                      {owlBalance} OWL
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}

            <Menu.Item>
              {({ active }) => (
                <a
                  style={{ textAlign: "center" }}
                  href="#"
                  onClick={handleClearWallet}
                  className={classNames(active ? "item1" : "item2", "item3")}
                >
                  <p
                    style={{
                      color: "rgba(205, 10, 10, 0.8)",
                      margin: "0 auto",
                      fontSize: "0.95rem",
                    }}
                  >
                    Clear Wallet
                  </p>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
