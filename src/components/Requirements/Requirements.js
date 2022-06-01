import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import WalletHover from "../WalletHover/WalletHover";
import "../../styles.css";
import { wallet_black, wallet_white, nautilus_logo } from "../../assets";
import { Config } from "../../config";
import { classNames, getDefaultBalanceState } from "../../helpers/Helpers";
const { supportedTokens } = Config;

const zeroBalanceState = getDefaultBalanceState({
  tokens: supportedTokens,
});

export const ErgoDappConnector = ({ color }) => {
  const [open, setOpen] = useState(true);
  const [ergoWallet, setErgoWallet] = useState();
  const [balances, setBalances] = useState(zeroBalanceState);

  const setBalance = ({ token, balance }) => {
    setBalances(
      [...balances].map((object) => {
        if (object.name.toLowerCase() === token) {
          return {
            balance,
            ...object,
          };
        } else return object;
      })
    );
  };

  const [walletConnected, setWalletConnected] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [walletHover, setWalletHover] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState();

  window.addEventListener("ergo_wallet_disconnected", () => {
    disconnectWallet();
  });

  useEffect(() => {
    const checkWallet = localStorage.getItem("walletConnected");
    if (checkWallet === "true") {
      setDefaultAddress();
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
    if (typeof ergoWallet !== "undefined" && supportedTokens) {
      for (let i = 0; i <= supportedTokens.length; i++) {
        if (!supportedTokens[i]) return;
        // get ERG balance
        if (supportedTokens[i]?.name?.toLowerCase() === "erg") {
          //TODO: this can probably go away if this function returns erg balance for an empty string
          ergoWallet.get_balance().then(function (chainBalance) {
            setBalance({
              token: "erg",
              balance: chainBalance / supportedTokens[i].unit,
            });
          });
        } else {
          ergoWallet
            .get_balance(supportedTokens[i].id)
            .then(function (chainBalance) {
              setBalance({
                token: supportedTokens[i].name,
                balance: chainBalance / supportedTokens[i].unit,
              });
            });
        }
      }

      //get Address
      ergoWallet.get_change_address().then(function (address) {
        localStorage.setItem("walletAddress", address);
        setDefaultAddress(truncate(address, 14, "..."));
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
    } else {
      if (walletConnected) {
        setWalletConnected(false);
        setErgoWallet();
        setDefaultAddress("");
        localStorage.removeItem("walletAddress");
        localStorage.removeItem("walletConnected");
        window.ergoConnector.nautilus.disconnect();
      }
    }
  }

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
            <Menu.Items className="mainMenuItem" style={{ marginTop: "48px" }}>
              <div style={{ padding: "4px 0 4px", marginBottom: "1px" }}>
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
                        src={nautilus_logo}
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
                    <img
                      src={nautilus_logo}
                      style={{ height: "20px", marginLeft: "20px" }}
                    />
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
            <WalletHover disconnect={disconnectWallet} balances={balances} />
          )}
        </div>
      </div>
    </div>
  );
};

// const connectSafew = () => {
// 	if(!window.ergoConnector){
// 		return;
// 	}
// 	if (!window.ergoConnector.safew.isConnected()) {
// 		// we aren't connected
// 		window.ergoConnector.safew.connect().then((access_granted) => {
// 			if (access_granted) {
// 				setWalletConnected(true);
// 				window.ergoConnector.safew.getContext().then((context) => {
// 					setErgoWallet(context);
// 					console.log(`safew is connected`);
// 				});
// 			} else {
// 				setWalletConnected(false);
// 				console.log("Wallet access denied");
// 			}
// 		});
// 	}
// 	toggleSelector();
// };
