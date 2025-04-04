import React, { useEffect, useState } from "react";
import Heading from "../../assets/blog/article/Heading.png";
import "../../styles/blog/article.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { communityServices } from "../../services/communityServices";

const categories = [
  "All",
  "Promotions",
  "Songwriting",
  "Industry",
  "Production",
  "News",
  "Live",
];

export default function Article() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await communityServices.getAllBlogs(currentPage, 6);
        setBlogs(response.data.docs);
        setTotalPages(response.data.totalPages);
        setHasNextPage(response.data.hasNextPage);
        setHasPrevPage(response.data.hasPrevPage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFD700]"></div>
          <p className="mt-4 text-white font-['Orbitron'] text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-2 article">
      <div className="row">
        <div className="col-12 data text-center ">
          <img src={Heading} className="img-fluid" alt="Blog Heading" />
          <div className="d-flex flex-wrap justify-content-center gap-2 py-3">
            {categories.map((category, index) => (
              <div key={index} className="filter_category px-4 py-1">
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-6 col-lg-4 py-2">
            <div className="card p-3 h-100 bg-white">
              <div className="card-img-container">
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <span className="card-text font-weight-bold">
                  {blog.title}
                </span>
                <p className="card-desc py-1 flex-grow-1">
                  {blog.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="date_tag">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'long' 
                    })} - Admin
                  </div>
                  <div className="d-flex align-items-center gap-2 article_button px-3 py-1">
                    <span>Read On</span>
                    <FaLongArrowAltRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex align-items-center justify-content-center gap-3 py-3">
          <div 
            className={`d-flex prev align-items-center justify-content-center gap-2 ${!hasPrevPage ? 'opacity-50' : 'cursor-pointer'}`}
            onClick={handlePrevPage}
            style={{ cursor: hasPrevPage ? 'pointer' : 'not-allowed' }}
          >
            <div>
              <FaLongArrowAltLeft />
            </div>
            <div>Previous Page</div>
          </div>
          <div className="mx-3">
            Page {currentPage} of {totalPages}
          </div>
          <div 
            className={`d-flex next align-items-center justify-content-center gap-3 ${!hasNextPage ? 'opacity-50' : 'cursor-pointer'}`}
            onClick={handleNextPage}
            style={{ cursor: hasNextPage ? 'pointer' : 'not-allowed' }}
          >
            <div>Next Page</div>
            <div>
              <FaLongArrowAltRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
