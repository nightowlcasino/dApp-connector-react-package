import { useState, useEffect, Fragment } from "react";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import wallet_black from "../../assets/ergo-wallet-black.png";
import wallet_white from "../../assets/ergo-wallet-white.png";
import WalletHover from "../WalletHover/WalletHover";
import "../../styles.css";
import ModalPopup from "../ModalPopup/ModalPopup";
import NautilusLogo from "../../assets/NautilusLogo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NANOERG_TO_ERG = 1000000000;
const TOKENID_NO_TEST =
  "afd0d6cb61e86d15f2a0adc1e7e23df532ba3ff35f8ba88bed16729cae933032";
const TOKENID_FAKE_SIGUSD =
  "96c402c0e658909aa03f534006124f0e43725c467dbc8dea39680d0861892de5";
const TOKENID_SIGRSV = "003bd19d0187117f130b62e1bcab0939929ff5c7709f843c5c4dd158949285d0";
const TOKENID_SIGUSD = "03faf2cb329f2e90d6d23b58d91bbb6c046aa143261cc21f52fbe2824bfcbf04"
const TOKENID_NETA = "472c3d4ecaa08fb7392ff041ee2e6af75f4a558810a74b28600549d5392810e8";
const TOKENID_ERGOPAD = "d71693c49a84fbbecd4908c94813b46514b18b67a99952dc1e6e4791556de413";
const TOKENID_PAIDEIA = "1fd6e032e8476c4aa54c18c1a308dce83940e8f4a28f576440513ed7326ad489";

export const ErgoDappConnector = ({color}) => {
  const [open, setOpen] = useState(true);
  const [ergoWallet, setErgoWallet] = useState();
  
  const [ergBalance, setErgBalance] = useState(0);
  const [sigUSDBalance, setSigUSDBalance] = useState(0);
  const [sigRSVBalance, setSigRSVBalance] = useState(0);
  const [ergopadBalance, setErgopadBalance] = useState(0);
  const [netaBalance, setNetaBalance] = useState(0);
  const [paideiaBalance, setPaideiaBalance] = useState(0);

  const [walletConnected, setWalletConnected] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [walletHover, setWalletHover] = useState(false);
  const [readOnlyNautilus, setReadOnlyNautilus] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState();
  const [modalOpen, setModalOpen] = useState();

  window.addEventListener("ergo_wallet_disconnected", () => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletConnected");
    setDefaultAddress(false);
    setWalletConnected(false);

  });

  useEffect(() => {
    const checkWallet = localStorage.getItem("walletConnected");
    if (checkWallet === "true") {
      window.ergoConnector.nautilus.connect().then((access_granted) => {

        if (access_granted) {
          setWalletConnected(true);
          window.ergoConnector.nautilus.getContext().then((context) => {

            setErgoWallet(context);
          });
        } else {
          setWalletConnected(false);

        }
      });
      setDefaultAddress(localStorage.getItem("walletAddress"));
      setWalletConnected(true);
    }
  }, []);
  useEffect(() => {
    if (typeof ergoWallet !== "undefined") {
      // get ERG balance
      ergoWallet.get_balance().then(function (balance) {
        setErgBalance(balance / NANOERG_TO_ERG);

      });
      // get SigUSD balance
      ergoWallet.get_balance(TOKENID_SIGUSD).then(function (balance) {
        setSigUSDBalance(balance/100);

      });

      // get SigRSV balance
      ergoWallet.get_balance(TOKENID_SIGRSV).then(function (balance) {
        setSigRSVBalance(balance);

      });

      // get Ergopad balance
      ergoWallet.get_balance(TOKENID_ERGOPAD).then(function (balance) {
        setErgopadBalance(balance/100);

      });

      // get Neta balance
      ergoWallet.get_balance(TOKENID_NETA).then(function (balance) {
        setNetaBalance(balance/1000000);

      });

      // get Paideia balance
      ergoWallet.get_balance(TOKENID_PAIDEIA).then(function (balance) {
        setPaideiaBalance(balance/10000);

      });

      // get OWL balance
      // ergoWallet.get_balance(TOKENID_NO_TEST).then(function (balance) {
      //   setOwlBalance(balance);
      //   console.log(`OWL: ${balance}`);
      // });
      ergoWallet.get_change_address().then(function (address) {
        localStorage.setItem("walletAddress", address);
        setDefaultAddress(truncate(address, 15, "..."));
        localStorage.setItem("walletConnected", "true");
      });
    }
  }, [ergoWallet]);

  const colorStylingArray = {
    orange: ["#ff5e18", "black"],
    white: ["white", "black"],
    black: ["black", "white"],
    green: ["#00b300", "white"],
    purple: ["#8c00ff", "white"],
    blue: ["#00b3ff", "white"],
    red: ["#ff0000", "white"],
    yellow: ["#ffd800", "black"],
    brown: ["#964B00", "white"],
    pink: ["#ff00ff", "white"],
    teal: ["#00b3b3", "white"],
    cyan: ["#00b3ff", "white"],
    coral: ["#FF6F61", "white"],
    emerald: ["#009B77", "white"],
    darkred: ["#9B2335", "white"],
    inkwell: ["#363945", "white"],
    darkgreen: ["#006400", "white"],
    darkblue: ["#00008B", "white"],
    darkpurple: ["#301934", "white"],
    darkorange: ["#ff8c00", "white"],
  };

  const truncate = (str, len, sep) => {
    if (str.length < len) {
      return str;
    } else {
      return (
        str.substring(0, parseInt(len / 2)) +
        sep +
        str.substring(str.length - parseInt(len / 2), str.length)
      );
    }
  };

  function disconnectWallet() {
    if (typeof window.ergo_request_read_access === "undefined") {
      console.log("Ergo not found");
    } else {
      if (walletConnected) {
        setWalletConnected(false);
        setErgoWallet();
        setDefaultAddress("");
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("walletConnected");
      }
    }
  };

  const toggleSelector = () => {
    if (!walletConnected) setShowSelector(!showSelector);
  };

  const handleWalletTrue = () => {
    if (walletConnected) setWalletHover((prev) => !prev);
    else {
      setShowSelector((prev) => !prev);
    }
  };

  const connectNautilus = () => {
    if (!window.ergoConnector) {
      return;
    }
    window.ergoConnector.nautilus.isConnected().then((connected) => {
      if (!walletConnected) {
        window.ergoConnector.nautilus.connect().then((access_granted) => {
          if (access_granted) {
            setWalletConnected(true);
            window.ergoConnector.nautilus.getContext().then((context) => {
              setErgoWallet(context);
            });
          } else {
            setWalletConnected(false);
          }
        });
        toggleSelector();
      } else {
        // Already connected
        toggleSelector();
        return;
      }
    });
  };

  return (
    <div className="package-container">
      {showSelector && (
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
              style={{ marginTop: "48px" }}
            >
              <div
                style={{ padding: "4px 0 4px", marginBottom: "1px" }}
              >
                <Menu.Item onClick={connectNautilus}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "item1" : "item2",
                        "item3"
                      )}
                    >
                      <img
                        src={NautilusLogo}
                        style={{
                          height: "30px",
                          marginRight: "48px",
                          marginLeft: "8px",
                        }}
                      />
                      Nautilus
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}

      <div id="header-wallet-wrapper" onClick={handleWalletTrue}>
        <div
          id="header-wallet"
          style={{
            backgroundColor: colorStylingArray[color][0],
            color: colorStylingArray[color][1],
            flexDirection: walletConnected ? "column" : "row",
            border: color == "white" ? "1px solid black" : "",
          }}
        >
          {!walletConnected && (
            <img
              src={
                colorStylingArray[color][1] == "white"
                  ? wallet_white
                  : wallet_black
              }
              id="header-wallet-image"
            />
          )}
          <div id="wallet-connect">
            <span>
              {walletConnected ? (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <img src={NautilusLogo} style={{ height: "20px", marginLeft: "20px" }} />
                    <p
                      style={{
                        color: colorStylingArray[color][1],
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                        marginLeft: "8px",
                      }}
                    >
                      {defaultAddress}
                    </p>
                  </span>
                </span>
              ) : (
                "Connect Wallet"
              )}
            </span>
          </div>
          {walletHover && walletConnected && (
            <WalletHover
              disconnect={disconnectWallet}
              sigUSDBalance={sigUSDBalance}
              ergBalance={ergBalance}
              sigRSVBalance={sigRSVBalance}
              netaBalance={netaBalance}
              ergopadBalance={ergopadBalance}
              paideiaBalance={paideiaBalance}
              setModalOpen={setModalOpen}
            />
          )}
          {/* WILL COMMENT THIS UNTIL WE KNOW IF NEMO IMPLEMENTS THE FUNCTIONALITY OF DISCONNECTING */}
          {/* {modalOpen && (
            <ModalPopup
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              disconnect={disconnectWallet}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};
