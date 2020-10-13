export const onlyNumber = (stringValue) => {
  let regex = /^[0-9.]+$/;

  return regex.test(stringValue) ? true : false;
};
