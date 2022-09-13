import axios from "axios";
import getCurrentDateFromTimeServer from "server/src/api/topic/currentDate/getCurrentDateFromTimeServer";
import CurrentDate from "server/src/api/topic/currentDate/CurrentDate";

jest.mock("axios")

test('when getCurrentDateFromTimeServer is called, it should return new CurrentDate(26, 8, 2022)', () => {
    const response = {
        data: {
            "year": 2022,
            "month": 8,
            "day": 26,
            "hour": 15,
            "minute": 18,
            "seconds": 47,
            "milliSeconds": 890,
            "dateTime": "2022-08-26T15:18:47.8901619",
            "date": "08/26/2022",
            "time": "15:18",
            "timeZone": "Asia/Ho_Chi_Minh",
            "dayOfWeek": "Friday",
            "dstActive": false
        }
    }
    axios.get.mockResolvedValue(response)
    getCurrentDateFromTimeServer().then(data => expect(data).toEqual(new CurrentDate(26, 8, 2022)))
})

test('when getCurrentDateFromTimeServer is called, it should not return new CurrentDate(2022, 8, 26)', () => {
    const response = {
        data: {
            "year": 2022,
            "month": 8,
            "day": 26,
            "hour": 15,
            "minute": 18,
            "seconds": 47,
            "milliSeconds": 890,
            "dateTime": "2022-08-26T15:18:47.8901619",
            "date": "08/26/2022",
            "time": "15:18",
            "timeZone": "Asia/Ho_Chi_Minh",
            "dayOfWeek": "Friday",
            "dstActive": false
        }
    }
    axios.get.mockResolvedValue(response)
    getCurrentDateFromTimeServer().then(data => expect(data).not.toEqual(new CurrentDate(2022, 8, 26)))
})
