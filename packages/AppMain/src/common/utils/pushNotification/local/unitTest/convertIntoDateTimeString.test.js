import convertIntoDateTimeString from "../convertIntoDateTimeString";
import CurrentDateTime from "server/src/api/topic/currentDateTime/CurrentDateTime";

test('when get dateTime (day: 26, month: 8, year: 2022, hour: 15, minute: 26, seconds: 30) from server ' +
    'and call convertIntoDateTimeString, then it should return 26/8/2022-15:26:30', () => {
    expect(convertIntoDateTimeString(new CurrentDateTime(26, 8, 2022, 15, 26, 30))).toBe(
        '26/8/2022-15:26:30'
    )
})

test('when get dateTime (day: 26, month: 8, year: 2022, hour: 15, minute: 26, seconds: 30) from server ' +
    'and call convertIntoDateTimeString, then it should not return 26/8/2024-15:26:30', () => {
    expect(convertIntoDateTimeString(new CurrentDateTime(26, 8, 2022, 15, 26, 30))).not.toBe(
        '26/8/2024-15:26:30'
    )
})

