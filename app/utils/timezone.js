import moment from 'moment-timezone'

export const getTimeFromUnix = (unixTime, timezone) => {
    return moment.unix(unixTime).tz(timezone).format('HH:mm A')
}