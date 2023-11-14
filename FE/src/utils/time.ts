export const Time = Object.freeze({
  hourAndMinute: (time: string) => {
    const regex = /\d{2}:\d{2}/;
    const [_hour, _minute] = time.match(regex)?.[0].split(":") ?? ["0", "0"];
    const hour = (Number(_hour) + 9) % 24;
    const minute = Number(_minute);
    return `${hour >= 12 ? "오후" : "오전"} ${
      hour % 12 > 0 ? hour % 12 : 12
    }:${minute}`;
  },

  yearAndHourAndMinute: (time: string) => {
    const regex = /\d{4}-\d{2}-\d{2}/;
    return time.match(regex)?.[0] ?? "";
  },

  period: (startDate: string, endDate: string) =>
    `${Time.yearAndHourAndMinute(startDate)} ~ ${Time.yearAndHourAndMinute(
      endDate
    )}`,
});
