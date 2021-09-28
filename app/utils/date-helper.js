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

export const getTimeFromTimezone = (timestamp, timezone) => {
  // const timezoneInMinutes = timezone / 60;
  // return moment().utcOffset(timezoneInMinutes).format("h:mm A");


  // moment.unix - Unix Timestamp (seconds)
  return moment.unix(timestamp).utc().add(timezone, 's');

}