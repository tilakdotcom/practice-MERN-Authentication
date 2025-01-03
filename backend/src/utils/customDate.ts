export const getCustomDays = (days:number):Date => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export const  getCustomHours = (hours:number):Date => {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export const  getCustomMinutes = (minutes:number):Date => {
  return new Date(Date.now() + minutes * 60 * 1000);
}