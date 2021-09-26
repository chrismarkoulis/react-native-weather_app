import moment from 'moment';

export const getDayName = (date) => {
  return moment(date).format('dddd')
}

export const getDayNameFirst3Letters = (date) => {
  return (moment(date).format('dddd')).substring(0, 3);
}

export const getTime = (date) => {
  return moment(date).format('HH:mm A')
}