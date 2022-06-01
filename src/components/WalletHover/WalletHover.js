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

export default function WalletHover({
  disconnect,
  balances,
  sigUSDBalance,
  ergBalance,
  sigRSVBalance,
  ergopadBalance,
  netaBalance,
  paideiaBalance,
  exleBalance,
}) {
  function handleClearWallet() {
    disconnect();
  }
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
            {ergBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img
                      src={erg_icon}
                      className="token-icon-img"
                      alt="Ergo Icon"
                    />
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
                    <img
                      src={sig_usd_icon}
                      className="token-icon-img"
                      alt="SigUSD Icon"
                    />
                    <p>
                      SigUSD Balance:
                      <br />
                      {sigUSDBalance} SigUSD
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}
            {sigRSVBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img
                      src={sig_rsv_icon}
                      className="token-icon-img"
                      alt="SigRSV Icon"
                    />
                    <p>
                      SigRSV Balance:
                      <br />
                      {sigRSVBalance} SigRSV
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}
            {exleBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img
                      src={exle_icon}
                      className="token-icon-img"
                      alt="EXLE Icon"
                    />
                    <p>
                      EXLE Balance:
                      <br />
                      {exleBalance} EXLE
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}
            {ergopadBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img
                      src={ergopad_icon}
                      className="token-icon-img"
                      alt="ErgoPad Icon"
                    />
                    <p>
                      ergopad Balance:
                      <br />
                      {ergopadBalance} ergopad
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}
            {netaBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img
                      src={neta_icon}
                      className="token-icon-img"
                      alt="Neta Icon"
                    />
                    <p>
                      NETA Balance:
                      <br />
                      {netaBalance} NETA
                    </p>
                  </a>
                )}
              </Menu.Item>
            )}
            {paideiaBalance != 0 && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? "item1" : "item2", "item3")}
                  >
                    <img
                      src={paideia_icon}
                      className="token-icon-img"
                      alt="Paideia Icon"
                    />
                    <p>
                      Paideia Balance:
                      <br />
                      {paideiaBalance} Paideia
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
