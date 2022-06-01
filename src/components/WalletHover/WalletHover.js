import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  sig_rsv_icon,
  erg_icon,
  sig_usd_icon,
  paideia_icon,
  neta_icon,
  ergopad_icon,
  exle_icon,
} from "../../assets";
import { classNames } from "../../helpers/Helpers";
import "../../styles.css";

export default function WalletHover({ disconnect, balances }) {
  function handleClearWallet() {
    disconnect();
  }
  console.log(balances);
  return (
    <Menu as="div" className="mainDiv">
      <Transition
        show={true}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="mainMenuItem">
          <div
            style={{
              padding: "0.25rem 0 0.25rem",
              marginBottom: "1px",
              marginTop: "1px",
            }}
          >
            {balances &&
              balances.map((token) => {
                return (
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "item1" : "item2",
                            "item3"
                          )}
                        >
                          <img
                            src={token.icon}
                            className="token-icon-img"
                            alt={`${token.name} Icon`}
                          />
                          <p>
                            {`${token.name} Balance:`}
                            <br />
                            {`${token.balance} ${token.name.toLowerCase()}`}
                          </p>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                );
              })}
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
