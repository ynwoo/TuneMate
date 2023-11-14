const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const getDay = (day: number) => {
  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
  }
};
const getTime = (time: string) => new Date(time).getTime() + 9 * HOUR;

export const Time = Object.freeze({
  HHmm: (time: string) => {
    const date = new Date(getTime(time));
    const _hour = date.getHours();
    const _minute = date.getMinutes();
    const hour = _hour % 12 > 0 ? _hour % 12 : 12;
    const minute = _minute < 10 ? `0${_minute}` : String(_minute);
    const type = _hour < 12 ? "오전" : "오후";
    return `${type} ${hour}:${minute}`;
  },

  MMdd: (time: string) => {
    const date = new Date(getTime(time));
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${Number(month)}월 ${Number(day)}일`;
  },

  yyyyMMdd: (time: string) => {
    const date = new Date(getTime(time));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  },

  yyyyMMddD: (time: string) => {
    const date = new Date(getTime(time));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const days = date.getDate();
    const day = date.getDay();
    return `${year}년 ${month}월 ${days}일 ${getDay(day)}요일`;
  },

  period: (startDate: string, endDate: string) =>
    `${Time.yyyyMMdd(startDate)} ~ ${Time.yyyyMMdd(endDate)}`,

  createAt: (time: string) => {
    const date = new Date(getTime(time));
    const now = new Date();

    // 같은 날이면 HHmm
    if (date.getDate() === now.getDate()) {
      return Time.HHmm(time);
    }

    // 다른 날이면 MMdd
    return Time.MMdd(time);
  },
});
