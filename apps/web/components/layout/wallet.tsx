import { useStore } from "../../stores";

export default function Wallet() {
  const { chainStore, accountStore, queriesStore, priceStore } = useStore();
  return (
    <>
      <h1>Wallet</h1>
      {chainStore.ollo}
    </>
  );
}
