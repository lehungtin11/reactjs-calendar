import moment from "moment";

const CustomHeader = ({ date, localizer, isMobile, view }) => {
  let result = <span></span>;
  let formatString = "";
  switch (view) {
    case "month":
      formatString = isMobile ? "MMM YYYY" : "MMMM YYYY";
      result = <span>{localizer.format(date, formatString)}</span>;
      break;
    case "week":
      const startOfWeek = moment(date).startOf("week");
      const endOfWeek = moment(date).endOf("week");
      formatString = isMobile ? "MMM DD" : "MMMM DD";
      result = (
        <span>{`${startOfWeek.format(formatString)} - ${endOfWeek.format(
          formatString
        )}`}</span>
      );
      break;
    case "day":
      formatString = isMobile ? "ddd MMM DD" : "ddd MMM DD";
      result = <span>{localizer.format(date, formatString)}</span>;
      break;
  }
  return result;
};

export default CustomHeader;