const optionsDate = { year: "numeric", month: "numeric", day: "numeric" };

export const getDateForDatePickerWithClassDate = (classDateOfPicker) => {
  const datePtBr = classDateOfPicker.toLocaleDateString("pt-br", optionsDate);

  const dayPtBr = datePtBr.substring(0, 2);
  const monthPtBr = datePtBr.substring(3, 5);
  const yearPtBr = datePtBr.substring(6, 10);

  const dateForPicker = `${yearPtBr}-${monthPtBr}-${dayPtBr}`;

  return dateForPicker;
};

export const getDateForDatePickerWithDateString = (dateStringOfPicker) => {
  const dayPtBr = dateStringOfPicker.substring(0, 2);
  const monthPtBr = dateStringOfPicker.substring(3, 5);
  const yearPtBr = dateStringOfPicker.substring(6, 10);

  const dateForPicker = `${yearPtBr}-${monthPtBr}-${dayPtBr}`;

  return dateForPicker;
};

export const getDateOfDatePickerValue = (datePickerValue) => {
  const yearPtBr = datePickerValue.substring(0, 4);
  const monthPtBr = datePickerValue.substring(5, 7);
  const dayPtBr = datePickerValue.substring(8, 10);

  const dateForPicker = `${dayPtBr}/${monthPtBr}/${yearPtBr}`;

  return dateForPicker;
};
