import { eachDayOfInterval, format } from "date-fns";
import { MarkedDateProps, DateObject } from ".";
import { getPlatformDate } from "../../utils";
import theme from "../../../global/styles/theme";

function createInterval(start: DateObject, end: DateObject) {
    let interval: MarkedDateProps = {};
    eachDayOfInterval({start: new Date(start.timestamp), end: new Date(end.timestamp)})
    .forEach((item) => {
        const date = format(getPlatformDate(item), "yyyy-MM-dd")

        interval = {
            ...interval,
            [date]: {
                color: start.dateString === date || end.dateString === date
                ? theme.colors.main.main
                : theme.colors.main.light,
                textColor: start.dateString === date || end.dateString === date
                ? theme.colors.main.light
                : theme.colors.main.main
            }
        }
    })
    return interval;
}

export default createInterval;
