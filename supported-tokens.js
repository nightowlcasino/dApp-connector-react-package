import erg_icon from "./src/assets/ergo-icon.png";
import sig_rsv_icon from "./src/assets/sigrsv-icon.png";
import sig_usd_icon from "./src/assets/sig-usd-icon.svg";
import neta_icon from "./src/assets/neta-icon.svg";
import exle_icon from "./src/assets/exle-icon.svg";
import ergopad_icon from "./src/assets/ergopad-icon.svg";
import paideia_icon from "./src/assets/paideia-icon.svg";

export default [
  {
    name: "Erg",
    unit: 1000000000,
    icon: erg_icon,
  },
  {
    name: "SigRSV",
    id: "003bd19d0187117f130b62e1bcab0939929ff5c7709f843c5c4dd158949285d0",
    unit: 100,
    icon: sig_rsv_icon,
  },
  {
    name: "SigUSD",
    id: "03faf2cb329f2e90d6d23b58d91bbb6c046aa143261cc21f52fbe2824bfcbf04",
    unit: 100,
    icon: sig_usd_icon,
  },
  {
    name: "Neta",
    id: "472c3d4ecaa08fb7392ff041ee2e6af75f4a558810a74b28600549d5392810e8",
    unit: 1000000,
    icon: neta_icon,
  },
  {
    name: "EXLE",
    id: "007fd64d1ee54d78dd269c8930a38286caa28d3f29d27cadcb796418ab15c283",
    unit: 100,
    icon: exle_icon,
  },
  {
    name: "ErgoPad",
    id: "d71693c49a84fbbecd4908c94813b46514b18b67a99952dc1e6e4791556de413",
    unit: 100,
    icon: ergopad_icon,
  },
  {
    name: "Paideia",
    id: "1fd6e032e8476c4aa54c18c1a308dce83940e8f4a28f576440513ed7326ad489",
    unit: 10000,
    icon: paideia_icon,
  },
];
