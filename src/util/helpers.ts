export const findSmallestMissing = (arr: number[] = []) => {
  let count = 1;
  if (!arr?.length) {
    return count;
  }
  while (arr.indexOf(count) !== -1) {
    count++;
  }
  return count;
};
