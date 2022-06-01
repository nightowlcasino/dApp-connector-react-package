export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getDefaultBalanceState({ tokens = [] }) {
  return tokens.map((item) => {
    return { balance: 0, ...item };
  });
}
