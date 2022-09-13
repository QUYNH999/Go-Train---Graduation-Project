import CurrentDate from "server/src/api/topic/currentDate/CurrentDate";

export default function getShortFormatToday(fullFormatDay) {
    return new CurrentDate(
        fullFormatDay.day,
        fullFormatDay.month,
        fullFormatDay.year
    )
}
