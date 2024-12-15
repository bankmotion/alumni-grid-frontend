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
