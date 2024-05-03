import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


export function formatUTC(utcString: string, format = 'YYYY-MM-DD HH:mm:ss') {
	const utcResult = dayjs.utc(utcString).utcOffset(8).format(format)
	return utcResult
}
