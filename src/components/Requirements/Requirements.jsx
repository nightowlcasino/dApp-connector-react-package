import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import wallet_black from "../../assets/ergo-wallet-black.png";
import wallet_white from "../../assets/ergo-wallet-white.png";
import nautiusIcon from "../../assets/nautilusLogo.svg";
import WalletHover from "../WalletHover/WalletHover";
import "./Requirements.css";
import ModalPopup from "./ModalPopup/ModalPopup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NANOERG_TO_ERG = 1000000000;
const TOKENID_NO_TEST =
  "afd0d6cb61e86d15f2a0adc1e7e23df532ba3ff35f8ba88bed16729cae933032";
const TOKENID_FAKE_SIGUSD =
  "96c402c0e658909aa03f534006124f0e43725c467dbc8dea39680d0861892de5";

export const Requirements = () => {
  const [open, setOpen] = useState(true);
  const [ergoWallet, setErgoWallet] = useState();
  const [ergBalance, setErgBalance] = useState(0);
  const [sigUSDBalance, setSigUSDBalance] = useState(0);
  const [owlBalance, setOwlBalance] = useState(0);
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
    console.log("Wallet Disconnected!");
  });

  useEffect(() => {
    const checkWallet = localStorage.getItem("walletConnected");
    if (checkWallet === "true") {
      window.ergoConnector.nautilus.connect().then((access_granted) => {
        console.log("AFTER CONNECTION");
        if (access_granted) {
          setWalletConnected(true);
          window.ergoConnector.nautilus.getContext().then((context) => {
            console.log("nautilus is connected", context);
            setErgoWallet(context);
          });
        } else {
          setWalletConnected(false);
          console.log("Wallet access denied");
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
        console.log(`ERG: ${balance / NANOERG_TO_ERG}`);
      });
      // get SigUSD balance
      ergoWallet.get_balance(TOKENID_FAKE_SIGUSD).then(function (balance) {
        setSigUSDBalance(balance);
        console.log(`SigUSD: ${balance / 100}`);
      });
      // get OWL balance
      ergoWallet.get_balance(TOKENID_NO_TEST).then(function (balance) {
        setOwlBalance(balance);
        console.log(`OWL: ${balance}`);
      });
      ergoWallet.get_change_address().then(function (address) {
        console.log("ADDRESS: ", address);
        localStorage.setItem("walletAddress", address);
        setDefaultAddress(truncate(address, 17, "..."));
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
    console.log("hola");
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
    console.log("connectNautilus method");
    if (!window.ergoConnector) {
      console.log(window.ergoConnector);
      console.log("ergoConnector not found");
      return;
    }
    window.ergoConnector.nautilus.isConnected().then((connected) => {
      if (!walletConnected) {
        console.log("WALLET CREDENTIALS: ", connected);
        console.log("BEFORE CONNECTION");
        window.ergoConnector.nautilus.connect().then((access_granted) => {
          console.log("AFTER CONNECTION");
          if (access_granted) {
            setWalletConnected(true);
            window.ergoConnector.nautilus.getContext().then((context) => {
              console.log("nautilus is connected", context);
              setErgoWallet(context);
            });
          } else {
            setWalletConnected(false);
            console.log("Wallet access denied");
          }
        });
        toggleSelector();
      } else {
        // Already connected
        console.log(`nautilus is connected`);
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
              style={{ marginTop: "2.5rem", position: "absolute" }}
            >
              <div
                style={{ padding: "0.25rem 0 0.25rem", marginBottom: "1px" }}
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
                        src={nautiusIcon}
                        style={{
                          height: "30px",
                          marginRight: "3rem",
                          marginLeft: "0.5rem",
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
            backgroundColor: colorStylingArray.orange[0],
            color: colorStylingArray.orange[1],
            flexDirection: walletConnected ? "column" : "row",
          }}
        >
          {!walletConnected && (
            <img
              src={
                colorStylingArray.orange[1] == "white"
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
                    <img src={nautiusIcon} style={{ height: "20px" }} />
                    <p
                      style={{
                        color: "black",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
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
              owlBalance={owlBalance}
              sigUSDBalance={sigUSDBalance}
              ergBalance={ergBalance}
              setModalOpen={setModalOpen}
            />
          )}
          {modalOpen && (
            <ModalPopup
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              disconnect={disconnectWallet}
            />
          )}
        </div>
      </div>
    </div>
  );
};
