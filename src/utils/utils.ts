export const getRemainTimeStr = (time: number) => {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = Math.floor(time % 60);
  return time < 0
    ? "00 : 00 : 00"
    : `${includeZeroFormat(hour)} : ${includeZeroFormat(
        min
      )} : ${includeZeroFormat(sec)}`;
};

export const includeZeroFormat = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  } else return num;
};

export const convertPSTTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Los_Angeles",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};

export const getStartTimeByTimestampDaily = (timestamp: number) => {
  const currentTime = timestamp === 0 ? new Date() : new Date(timestamp * 1000);

  const utcTime = currentTime.getTime();

  const pstOffset = -8 * 3600 * 1000;
  const pstDate = new Date(utcTime + pstOffset);
  pstDate.setUTCHours(0, 0, 0, 0);

  return Math.floor((pstDate.getTime() - pstOffset) / 1000);
};
