import { useEffect, useState } from "react";
import BackButton from "../../UI/BackButton";
// import AllNewsPage from "../../Components/News/AllNewsPage";
import NewsCard from "./NewsCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaPlus } from "react-icons/fa";
import NewsFormModal from "../../Components/News/NewsFormModal";
import NewsCardA from "../../Components/News/NewsCard";
import { useAuth } from "../../context/AuthContext";

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [pendingNewsData, setPendingNewsData] = useState([]);
  const [temp, setTemp] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const {user} = useAuth();


  useEffect(() => {
    axios.get("http://localhost:5000/api/news").then((res) => {
      console.log("News fetched");
      let demo = res.data;
      setNewsData(res.data);
      let pendingNews = [];
      demo.map((news) => {
        if (news.isApproved === false && news.status==="pending") {
          pendingNews.push(news);
        }
      });
      setPendingNewsData(pendingNews);
      console.log(demo, " ", pendingNews);
    });
  }, [temp]);

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzZjNDcwYzc5YjRhYTc4NGM5OTFlZCIsInJvbGUiOiJtZWRpYXRvciIsImlhdCI6MTczMTY0NjAzMiwiZXhwIjoxNzMxNzMyNDMyfQ.mVH8DXQVtxNY4Q9iDqOVruAAouZ9jA8md2RcC48de0c";

  // const role = jwtDecode(token).role;
  // const role = "user";
  // console.log(role);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Don't chnage this API
  const handleApprove = (id) => {
    // alert(`News item with ID ${id} approved.`);
    const token = localStorage.getItem("token");
    console.log("aprrove button",token);

    // axios.put(`http://localhost:5000/api/admin/approve-news/${id}`).then(() => {
    //   setTemp(1);
    // });

    axios
  .put(
    `http://localhost:5000/api/admin/approve-news/${id}`,
    {}, // Pass an empty object as the data if no body is required
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
    }
  )
  .then((res) => {
    setTemp(1);
    console.log("approved", res.data);
    // setTemp((prev) => !prev); // Trigger re-render by toggling a state
  })
  .catch((err) => console.log(err));
    // setNewsData(newsData.filter((news) => news.id !== id));
  };

  const handleReject = (id) => {
    const token = localStorage.getItem("token");
    console.log("aprrove button",token);

    // axios.put(`http://localhost:5000/api/admin/approve-news/${id}`).then(() => {
    //   setTemp(1);
    // });

    axios
  .put(
    `http://localhost:5000/api/admin/reject-news/${id}`,
    {}, // Pass an empty object as the data if no body is required
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to the Authorization header
      },
    }
  )
  .then((res) => {
    setTemp(1);
    console.log("approved", res.data);
    // setTemp((prev) => !prev); // Trigger re-render by toggling a state
  })
  .catch((err) => console.log(err));
    
    // alert(`News item with ID ${id} rejected.`);
    setNewsData(newsData.filter((news) => news.id !== id));
  };

  return (
    <div className="relative">
      <BackButton />
      <div className="p-4">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark mb-3 md:mt-0 mt-1">
          News Verification
        </h1>

        {pendingNewsData.length === 0 ? (
          <p className="text-lg px-10">No news items pending verification.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 px-8">
            {pendingNewsData.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative p-4">
        {user === "mediator" && (
          <button
            className="bg-primary-dark flex items-center text-primary-light py-2 px-4 rounded-lg hover:opacity-90 transition absolute top-5 right-5"
            onClick={openModal}
          >
            <FaPlus className="mr-2" /> Create News
          </button>
        )}
        <div className="container mx-auto md:py-5">
          <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-3 md:mt-0 mt-12 mb-5">
            All News
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-4">
            {newsData.map((newsItem, index) => (
              (newsItem.isApproved == true ? <NewsCardA key={index} {...newsItem} />:"")
            ))}
          </div>
        </div>
        <NewsFormModal
          showModal={showModal}
          closeModal={closeModal}
          setTemp={setTemp}
        />
      </div>
    </div>
  );
};

export default NewsList;
