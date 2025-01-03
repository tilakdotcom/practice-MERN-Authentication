export const getCustomDays = (days:number):number => {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

export const  getCustomHours = (hours:number):number => {
  return Date.now() + hours * 60 * 60 * 1000;
}