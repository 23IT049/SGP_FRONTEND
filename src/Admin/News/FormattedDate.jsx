import moment from "moment";

const FormattedDate = ({ postedTime }) => {
  const formattedPostedTime = moment(postedTime)
    .utcOffset("+05:30")
    .format("DD MMM YYYY, h:mm A");

  return (
    <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md">
      {formattedPostedTime}
    </div>
  );
};

export default FormattedDate;
