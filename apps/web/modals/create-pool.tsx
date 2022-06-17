import { FunctionComponent, useState } from "react";
// import { observer } from "mobx-react-lite";
import { ObservableCreatePoolConfig } from "@ollo/stores";
// import {
//   Step1SetRatios,
//   Step2AddLiquidity,
//   Step3Confirm,
// } from "../components/complex/pool/create";
import { ModalBase, ModalBaseProps } from ".";

export const CreatePoolModal: FunctionComponent<
  ModalBaseProps & {
    step?: 1 | 2 | 3;
    createPoolConfig: ObservableCreatePoolConfig;
    isSendingMsg?: boolean;
    onCreatePool: () => void;
  }
> = (props) => {
  const { step, createPoolConfig: config, isSendingMsg, onCreatePool } = props;
  const [curStep, setCurStep] = useState<1 | 2 | 3>(step ?? 1);
  const advanceStep = () => setCurStep(Math.min(curStep + 1, 3) as 1 | 2 | 3);
  const backStep = () => setCurStep(Math.max(curStep - 1, 0) as 1 | 2 | 3);

  return (
    <ModalBase
      {...props}
      onRequestClose={() => {
        config.clearAssets();
        props.onRequestClose();
      }}
    ></ModalBase>
  );
};
// {curStep === 1 && (
//   <Step1SetRatios
//     createPoolConfig={config}
//     advanceStep={advanceStep}
//     backStep={backStep}
//   />
// )}
// {curStep === 2 && (
//   <Step2AddLiquidity
//     createPoolConfig={config}
//     advanceStep={advanceStep}
//     backStep={backStep}
//   />
// )}
// {curStep === 3 && (
//   <Step3Confirm
//     createPoolConfig={config}
//     isSendingMsg={isSendingMsg}
//     advanceStep={onCreatePool}
//     backStep={backStep}
//   />
// )}
