import dayjs from "dayjs";

export const dateToLL = (date: string) => {
  return dayjs(date).format("MMMM D, YYYY");
};
