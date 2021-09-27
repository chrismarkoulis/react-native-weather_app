import moment from 'moment-timezone'

export const getTimeFromUnix = (timezone) => {
    return moment.tz(timezone).format('HH:mm A')
}