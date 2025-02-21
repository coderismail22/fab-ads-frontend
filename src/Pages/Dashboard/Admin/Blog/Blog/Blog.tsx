import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import debounce from "lodash.debounce";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { BlogPost } from "./blogpost.type";
import BlogPostCard from "@/components/BlogPostCard/BlogPostCard";

// Blog Component
const Blog = () => {
  // State with types
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // Initialized as an empty array of blog posts
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [visibleBlogPosts, setVisibleBlogPosts] = useState<number>(6); // Initial 6 visible blog posts
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({}); // Track image errors per blogPost ID

  // Fetch BlogPosts
  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/blog"
      );
      setBlogPosts(data.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setError("Something went wrong while fetching the blog posts.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image load error
  const handleImageError = (id: string) => {
    setImgErrors((prevErrors) => ({
      ...prevErrors,
      [id]: true,
    }));
  };

  // Fetch blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Load More Button Handler
  const loadMore = () => {
    setVisibleBlogPosts((prevVisibleBlogPosts) => prevVisibleBlogPosts + 6); // Load 6 more blog posts
  };

  // Debounced Search Handler
  const debouncedSearch = useCallback(
    debounce((query: string) => setSearchQuery(query), 300), // Debouncing search input
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Filter BlogPosts Based on Search Query and Date Range
  const filteredBlogPosts = blogPosts.filter((blogPost) => {
    const matchesSearch =
      blogPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blogPost.body.toLowerCase().includes(searchQuery.toLowerCase());

    const blogPostDate = moment(blogPost.createdAt);
    const matchesDateRange =
      (!startDate || blogPostDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || blogPostDate.isSameOrBefore(moment(endDate)));

    return matchesSearch && matchesDateRange;
  });

  // Loading Spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RotatingLines
          visible={true}
          width="46"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  // Error Message
  if (error) {
    return (
      <p className="text-red-500 text-xl text-center font-bold py-10 border-2 border-red-500 rounded-md m-5">
        {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search blog posts by title or content..."
            className="border px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSearchChange}
          />
        </div>

        {/* Date Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-auto">
            <DatePicker
              showIcon
              icon={<BsCalendar />}
              toggleCalendarOnIconClick
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border px-10 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="Start Date"
              isClearable
            />
          </div>
          <div className="relative w-full md:w-auto">
            <DatePicker
              showIcon
              icon={<BsCalendar />}
              toggleCalendarOnIconClick
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="border text-center px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="End Date"
              isClearable
            />
          </div>
        </div>
      </div>

      {filteredBlogPosts.length === 0 ? (
        <p className="text-center text-gray-600 text-xl font-semibold mt-6">
          There&apos;s no post to show
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {filteredBlogPosts.slice(0, visibleBlogPosts).map((blogPost) => (
            <BlogPostCard
              blogPost={blogPost}
              handleImageError={handleImageError}
              imgErrors={imgErrors}
              key={blogPost._id}
            />
          ))}
        </div>
      )}

      {/* More Posts Button */}
      {visibleBlogPosts < filteredBlogPosts.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            More Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
