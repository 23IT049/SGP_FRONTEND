
import { GiPostOffice } from "react-icons/gi";
import { Link } from "react-router-dom";
import ActionButtons from "./ActionButtons";
import FormattedDate from "./FormattedDate";

const NewsCard = ({ news, onApprove, onReject }) => {
  console.log(news)
  return (
    <div className="flex flex-col-reverse md:flex-row items-start gap-3 dark:text-text-dark bg-background-light dark:bg-background-dark border border-border-dark rounded-lg p-4 transition-transform transform hover:scale-[1.01]">
      <div className="flex-1">
        <h2 className="md:text-xl text-lg font-semibold mb-2 text-text-black dark:text-text-dark">
          {news.title}
        </h2>
        <p className="text-sm text-text-black dark:text-text-dark mb-4">
          {news.description}
        </p>
        {/* <div className="inline-flex items-center bg-[#D3B000] text-black px-3 py-1 mr-5 rounded mb-5 text-sm">
          <GiPostOffice className="mr-2" />
          {news.name}
        </div> */}
        {/* <Link
          to={`/admin/news/${news.id}`}
          className="bg-primary-dark dark:bg-primary-dark text-white px-5 py-1 rounded hover:opacity-90 transition-colors"
        >
          Know More
        </Link> */}
        <ActionButtons id={news._id} onApprove={onApprove} onReject={onReject} />
      </div>
      <div className="relative w-full md:w-1/3 flex-shrink-0 flex items-center justify-center md:h-full">
        <FormattedDate postedTime={news.postedTime} />
        {news.image && (
          <img
            src={news.image}
            alt={news.title}
            className="rounded-lg object-cover w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default NewsCard;
