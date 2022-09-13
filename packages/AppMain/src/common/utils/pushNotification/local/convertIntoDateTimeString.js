export default function convertIntoDateTimeString(dateTime) {
    return [dateTime.day, dateTime.month, dateTime.year].join('/') + '-' + [dateTime.hour, dateTime.minute, dateTime.seconds].join(':')
}
