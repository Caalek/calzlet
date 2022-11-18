const getTimePassedString = (datestring) => {
  const dateInSeconds = Math.floor(new Date(datestring).getTime() / 1000);
  const currentDateInSeconds = Math.floor(new Date().getTime() / 1000);
  const timePassedInSeconds = currentDateInSeconds - dateInSeconds;

  if (timePassedInSeconds > 86400) {
    const number = Math.floor(timePassedInSeconds / 86400);
    let ending;
    if (number.toString().endsWith("1")) {
      ending = " dzień temu";
    } else {
      ending = " dni temu";
    }
    return number.toString() + ending;
  } else if (timePassedInSeconds > 60 && timePassedInSeconds < 86400) {
    const number = Math.floor(timePassedInSeconds / 60);
    let ending;
    if (number < 5) {
      ending = " minuty temu";
    } else {
      ending = " minut temu";
    }
    return number.toString() + ending;
  } else {
    let ending;
    if (timePassedInSeconds < 5) {
      ending = " sekundy temu";
    } else {
      ending = " sekund temu";
    }
    return timePassedInSeconds.toString() + ending;
  }
};
export default getTimePassedString;
