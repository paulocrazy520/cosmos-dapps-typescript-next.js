import { action, computed, makeObservable, observable } from "mobx";
import { computedFn } from "mobx-utils";
import {
  DefaultGasPriceStep,
  FeeType,
  IFeeConfig,
  TxChainSetter,
} from "@keplr-wallet/hooks";
import { ChainGetter, CoinPrimitive } from "@keplr-wallet/stores";
import { CoinPretty, Dec, Int } from "@keplr-wallet/unit";
import { Currency } from "@keplr-wallet/types";
import { StdFee } from "@cosmjs/stargate";

/**
 * Currencies that can be used for fees.
 */
interface FeeCurrency extends Currency {
  readonly gasPriceStep: {
    low: number;
    average: number;
    high: number;
  };
}

/**
 * FakeFeeConfig is used to set the fee with the high gas price step.
 * Currently, Keplr wallet doesn't support to set the fee manually in the frontend.
 * Keplr wallet just override the fee always in the wallet side.
 * So, setting the exact max amount is not possible.
 * To mitigate this problem, just set the max amount minus high fee setting.
 */
export class FakeFeeConfig extends TxChainSetter implements IFeeConfig {
  @observable
  protected _gas: number;

  @observable
  protected _sender: string;

  @observable
  protected _shouldZero: boolean = false;

  constructor(chainGetter: ChainGetter, initialChainId: string, gas: number) {
    super(chainGetter, initialChainId);

    this._gas = gas;
    this._chainId = initialChainId;

    makeObservable(this);
  }

  get gas(): number {
    return this._gas;
  }

  @computed
  get fee(): CoinPretty | undefined {
    const feeCurrency = this.feeCurrency;
    const feePrimitive = this.getFeePrimitive();

    if (!feeCurrency || !feePrimitive) return undefined;

    return new CoinPretty(feeCurrency, new Int(feePrimitive.amount));
  }

  get feeCurrencies(): Currency[] {
    return this.feeCurrency ? [this.feeCurrency] : [];
  }

  get feeCurrency(): Currency | undefined {
    const chainInfo = this.chainGetter.getChain(this.chainId);
    return chainInfo.feeCurrencies[0];
  }

  get feeCurrencyWithGas(): FeeCurrency {
    return this.feeCurrency as FeeCurrency;
  }

  feeType: FeeType | undefined;

  get error(): Error | undefined {
    // noop
    return undefined;
  }

  get shouldZero(): boolean {
    return this._shouldZero;
  }

  @action
  setShouldZero(value: boolean) {
    this._shouldZero = value;
  }

  readonly getFeePrimitive = computedFn((): CoinPrimitive | undefined => {
    const feeCurrency = this.feeCurrency;

    if (!feeCurrency) return undefined;

    if (this.shouldZero) {
      return {
        denom: feeCurrency.coinMinimalDenom,
        amount: "0",
      };
    }

    const gasPriceStep =
      this.feeCurrencyWithGas.gasPriceStep ?? DefaultGasPriceStep;
    const feeAmount = new Dec(gasPriceStep.high.toString()).mul(
      new Dec(this.gas)
    );

    return {
      denom: feeCurrency.coinMinimalDenom,
      amount: feeAmount.truncate().toString(),
    };
  });

  getFeeTypePretty(_feeType: FeeType): CoinPretty {
    // noop
    return new CoinPretty(this.feeCurrency, new Dec(0));
  }

  setFeeType(_feeType: FeeType | undefined): void {
    // noop
    this._feeType = _feeType;
  }

  toStdFee(): StdFee {
    return {
      gas: this.gas.toString(),
      amount: [this.getFeePrimitive()],
    };
  }

  protected _chainId: string;

  getFeeTypePrettyForFeeCurrency(
    feeCurrency: FeeCurrency,
    feeType: FeeType
  ): CoinPretty {
    return new CoinPretty(feeCurrency, new Dec(0));
  }
  @observable
  protected _autoFeeCoinMinimalDenom: string | undefined = undefined;
  @observable
  protected _feeType: FeeType | undefined = undefined;

  @observable
  protected _manualFee: CoinPrimitive | undefined = undefined;

  /**
   * `additionAmountToNeedFee` indicated that the fee config should consider the amount config's amount
   *  when checking that the fee is sufficient to send tx.
   *  If this value is true and if the amount + fee is not sufficient to send tx, it will return error.
   *  Else, only consider the fee without addition the amount.
   * @protected
   */
  @observable
  protected additionAmountToNeedFee: boolean = true;

  @observable
  protected _disableBalanceCheck: boolean = false;

  @action
  setAdditionAmountToNeedFee(additionAmountToNeedFee: boolean) {
    this.additionAmountToNeedFee = additionAmountToNeedFee;
  }

  get sender(): string {
    return this._sender;
  }

  @action
  setSender(sender: string) {
    this._sender = sender;
  }

  @action
  setAutoFeeCoinMinimalDenom(denom: string | undefined) {
    this._autoFeeCoinMinimalDenom = denom;
  }

  get isManual(): boolean {
    return this.feeType === undefined;
  }

  @action
  setManualFee(fee: CoinPrimitive) {
    this._manualFee = fee;
    this._feeType = undefined;
  }
  protected canOsmosisTxFeesAndReady(): boolean {
    if (
      this.chainInfo.features &&
      this.chainInfo.features.includes("osmosis-txfees")
    ) {
      // if (!this.queriesStore.get(this.chainId).osmosis) {
      //   console.log(
      //     "Chain has osmosis-txfees feature. But no osmosis queries provided."
      //   );
      //   return false;
      // }
      // const queryBaseDenom = this.queriesStore.get(this.chainId).osmosis!
      //   .queryTxFeesBaseDenom;
      // if (
      //   queryBaseDenom.baseDenom &&
      //   this.chainInfo.feeCurrencies.find(
      //     (cur) => cur.coinMinimalDenom === queryBaseDenom.baseDenom
      //   )
      // ) {
      //   return true;
      // }
    }

    return false;
  }

  protected getFeeTypePrimitive(
    feeCurrency: FeeCurrency,
    feeType: FeeType
  ): CoinPrimitive {
    // if (feeType === this._feeType)
    if (this._manualFee) {
      throw new Error(
        "Can't calculate fee from fee type. Because fee config uses the manual fee now"
      );
    }

    // if (
    //   this.chainInfo.features &&
    //   this.chainInfo.features.includes("osmosis-txfees") &&
    //   this.queriesStore.get(this.chainId).osmosis &&
    //   this.queriesStore
    //     .get(this.chainId)
    //     .osmosis?.queryTxFeesFeeTokens.isTxFeeToken(
    //       feeCurrency.coinMinimalDenom
    //     )
    // ) {
    //   const gasPriceStep =
    //     this.feeCurrencies[0].gasPriceStep ?? DefaultGasPriceStep;

    //   const gasPrice = new Dec(gasPriceStep[feeType].toString());
    //   let feeAmount = gasPrice.mul(new Dec(this.gasConfig.gas));

    //   const spotPriceDec = this.queriesStore
    //     .get(this.chainId)
    //     .osmosis!.queryTxFeesSpotPriceByDenom.getQueryDenom(
    //       feeCurrency.coinMinimalDenom
    //     ).spotPriceDec;
    //   if (spotPriceDec.gt(new Dec(0))) {
    //     // If you calculate only the spot price, slippage cannot be considered. However, rather than performing the actual calculation here, the slippage problem is avoided by simply giving an additional value of 1%.
    //     feeAmount = feeAmount.quo(spotPriceDec).mul(new Dec(1.01));
    //   } else {
    //     // 0 fee amount makes the simulation twice because there will be no zero fee immediately.
    //     // To reduce this problem, just set the fee amount as 1.
    //     feeAmount = new Dec(1);
    //   }

    return {
      denom: feeCurrency.coinMinimalDenom,
      amount: new Dec(0).roundUp().toString(),
    };
  }
}
