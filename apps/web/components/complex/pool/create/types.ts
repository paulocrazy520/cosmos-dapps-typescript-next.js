import { ObservableCreatePoolConfig } from "@ollo/stores";
import { CustomClasses } from "../../../types";

export interface StepProps extends CustomClasses {
  createPoolConfig: ObservableCreatePoolConfig;
  isSendingMsg?: boolean;
  backStep: () => void;
  advanceStep: () => void;
}
