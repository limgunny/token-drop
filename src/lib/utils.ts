export const formatNumber = (value: bigint | undefined) => {
  if (value === undefined) return "Loadung...";
  return Number(value.toString()) / 1e18; //begint를 문자열로 변환 후 Number로 변환
};
