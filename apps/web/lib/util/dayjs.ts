import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
// import { enableStaticRendering } from "mobx-react-lite";

export const dayjsInit = () => {
  dayjs.extend(relativeTime);
  dayjs.extend(duration);
  dayjs.extend(utc);
  // enableStaticRendering(typeof window === "undefined");
};
