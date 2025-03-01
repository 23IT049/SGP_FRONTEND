import { useNavigate, useParams } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import BackButton from "../../UI/BackButton";
import { useEffect } from "react";
import ActionButtons from "./ActionButtons";

const NewsDetails = () => {
  const { id } = useParams();
  const { newsData, setNewsData } = useNews();
  const newsItem = newsData.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!newsItem) {
    return <div>News item not found.</div>;
  }

  const handleApprove = (id) => {
    // alert(`News item with ID ${id} approved.`);
    setNewsData(newsData.filter((news) => news.id !== id));
    navigate("/admin/news")
  };

  const handleReject = (id) => {
    // alert(`News item with ID ${id} rejected.`);
    setNewsData(newsData.filter((news) => news.id !== id));
  };

  const {
    title,
    description,
    image,
    postalCircle,
  } = newsItem;

  return (
    <div className="relative p-4">
      <BackButton />
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={image}
              alt={title}
              className="rounded-lg object-cover w-full h-96"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-primary-dark dark:text-text-dark mb-3">
              {title}
            </h1>
            <div className="text-sm text-text-black dark:text-text-dark mb-2">
              <strong>Postal Circle: </strong>
              {postalCircle}
            </div>
            <p className="text-base text-text-black dark:text-text-dark mb-4">
              {description}
            </p>
            <ActionButtons
              id={parseInt(id)}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
