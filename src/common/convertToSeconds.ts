export const convertToSeconds = (inputTime: any) => {
  let repTms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let hours = 0,
    minutes = 0,
    seconds = 0,
    totalSeconds;

  if (repTms.test(inputTime)) {
    let matches: any = repTms.exec(inputTime);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
    totalSeconds = hours + ":" + minutes + ":" + seconds;
  }

  return totalSeconds;
};
