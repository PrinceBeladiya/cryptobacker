export const isAlphabets = (str) => {
  const regex = /^[a-zA-Z ]+$/;
  console.log("regex.test(str) : " + regex.test(str))
  return regex.test(str);
}

export const isdescreption = (str) => {
  const regex = /^[A-Za-z0-9.,!"\s]+$/;
  return regex.test(str);
}

export const isFutureDate = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  console.log("inputDate > currentDate : " + inputDate > currentDate)
  return inputDate > currentDate;
}
