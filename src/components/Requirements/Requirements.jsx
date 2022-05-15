import { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
import wallet_pink from "../../assets/wallet_pink.png"
import nautiusIcon from "../../assets/nautilus.jpg"
import WalletHover from "../WalletHover/WalletHover";
import "./Requirements.css"

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const NANOERG_TO_ERG = 1000000000;
const TOKENID_NO_TEST =
	"afd0d6cb61e86d15f2a0adc1e7e23df532ba3ff35f8ba88bed16729cae933032";
const TOKENID_FAKE_SIGUSD =
	"96c402c0e658909aa03f534006124f0e43725c467dbc8dea39680d0861892de5";
    
export const Requirements = ()=>{
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
			window.addEventListener("ergo_wallet_disconnected", () => {
				localStorage.setItem("walletAddress", "");
				localStorage.setItem("walletConnected", "false");
				setDefaultAddress(false);
				setWalletConnected(false);
				console.log("Wallet Disconnected!!!");
			});
			setDefaultAddress(
				localStorage.getItem("walletAddress")
			);
			setWalletConnected(true);
		}
	}, []);

    useEffect(() => {
		if (typeof ergoWallet !== "undefined") {
			window.addEventListener("ergo_wallet_disconnected", () => {
				localStorage.setItem("walletAddress", "");
				localStorage.setItem("walletConnected", "");
				setDefaultAddress(false);
				setWalletConnected(false);
				console.log("Wallet Disconnected!!!");
			});
			// get ERG balance
			ergoWallet.get_balance().then(function (balance) {
				setErgBalance(balance/NANOERG_TO_ERG);
				console.log(`ERG: ${balance/NANOERG_TO_ERG}`);
			});
			// get SigUSD balance
			ergoWallet.get_balance(TOKENID_FAKE_SIGUSD).then(function (balance) {
				setSigUSDBalance(balance);
				console.log(`SigUSD: ${balance/100}`);
			});
			// get OWL balance
			ergoWallet.get_balance(TOKENID_NO_TEST).then(function (balance) {
				setOwlBalance(balance);
				console.log(`OWL: ${balance}`);
			});
			ergoWallet.get_change_address().then(function (address) {
				console.log('ADDRESS: ', address)
				localStorage.setItem("walletAddress", address);
				setDefaultAddress(address);
				localStorage.setItem("walletConnected", "true");
			});
		}
	}, [ergoWallet]);

    const disconnectWallet = () => {
		if (typeof window.ergo_request_read_access === "undefined") {
			console.log("Ergo not found");
		} else {
			if (walletConnected) {
				setWalletConnected(false);
				setErgoWallet();
				setDefaultAddress("");
				setOwlBalance(0);
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
		if(!window.ergoConnector){
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

    return(
        <>
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
				  <Menu.Items className="mainMenuItem" style={{ marginTop:'3.5rem'}}>
					<div style={{padding:'0.25rem 0 0.25rem', marginBottom:'1px'}}>
					  <Menu.Item onClick={connectNautilus}>
						{({ active }) => (
						  <a
							href="#"
							className={classNames(
							  active ? 'item1' : 'item2',
							  'item3'
							)}
						  >
							<img src={nautiusIcon} style={{height:'30px', marginRight:'3rem'}} />
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
				<div id="header-wallet">
					{!walletConnected && <img src={wallet_pink} id="header-wallet-image" />}
					<div id="wallet-connect">
						<span>
							{walletConnected ? <span style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
								{/* <p style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',fontWeight:'bold'}}>
									{owlBalance}
									<span>OWL</span>
								</p> */}
								<span style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', gap:'5px'}}>
									<img src={nautiusIcon} style={{height:'20px'}} />
									<p style={{color:'black', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width:'150px'}}>{defaultAddress}</p>
								</span>

								</span> : "Connect Wallet"}
						</span>
					</div>
					{(walletHover && walletConnected) &&(
						<WalletHover
							disconnect={disconnectWallet}
							owlBalance={owlBalance}
							sigUSDBalance={sigUSDBalance}
							ergBalance={ergBalance}
						/>
					)}
				</div>
			</div>
		</>
    )
}