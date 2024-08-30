export const isAlphabets = (str) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(str);
}

export const isdescreption = (str) => {
  const regex = /^[A-Za-z0-9.,!"\s]+$/;
  return regex.test(str);
}

export const isFutureDate = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  return inputDate > currentDate;
}
