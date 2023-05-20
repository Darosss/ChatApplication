import moment from "moment";

export const getFormatedDate = (date: Date) => moment(date).format("YYYY-MM-DD h:mm:ss");
export const getFormatedDateTime = (date: Date) => moment(date).format("h:mm:ss");
