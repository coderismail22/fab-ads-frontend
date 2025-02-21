import axios from "axios";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import PostEditModal from "../PostEditModal/PostEditModal.js"; // Import the modal component
import moment from "moment";
import debounce from "lodash.debounce"; // Debouncing utility
import DatePicker from "react-datepicker"; // Datepicker for filtering dates
import "react-datepicker/dist/react-datepicker.css"; // Datepicker styles
import { FaSearch } from "react-icons/fa";

// Type definition for a single blog post
export interface BlogPost {
  _id: string;
  title: string;
  author: string;
  image?: string;
  body: string;
  category: string[];
  createdAt: string;
}

const MyBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]); // Use BlogPost type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(6); // Initial 6 visible posts
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null); // Use BlogPost type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/services");
      const posts: BlogPost[] = data?.data;
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Something went wrong while fetching the posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Load More Button Handler
  const loadMore = () => {
    setVisiblePosts((prevVisibleBlogs) => prevVisibleBlogs + 6); // Load 6 more posts
  };

  // Delete Button Handler
  const deleteBlog = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:5000/api/v1/services/${id}`
        );
      }
      Swal.fire("Deleted!", "Your blog post has been deleted.", "success");
      fetchPosts();
    } catch (error) {
      Swal.fire("Error!", "Failed to delete blog post.", "error");
    }
  };

  // Open Modal For Updating Post
  const openEditModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Modal Close Handler
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Refresh on update
  const handlePostUpdate = () => {
    fetchPosts(); // Refresh the list when a post is updated
  };

  // Debounced Search Handler
  const debouncedSearch = useCallback(
    debounce((query: string) => setSearchQuery(query), 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Filter Blogs Based on Search Query and Date Range
  const filteredBlogPosts = posts.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.body.toLowerCase().includes(searchQuery.toLowerCase());

    const blogDate = moment(blog.createdAt);
    const matchesDateRange =
      (!startDate || blogDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || blogDate.isSameOrBefore(moment(endDate)));

    return matchesSearch && matchesDateRange;
  });

  // Loading Spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RotatingLines
          visible={true}
          // height="46"
          width="46"
          // color="grey"
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        {/* Search Bar */}
        <div className="relative w-full md:w-[40%] mx-auto">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search services"
            className="bg-white  border px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleSearchChange}
          />
        </div>

        {/* Date Filters */}
        {/* <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-auto">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="bg-white  border px-10 py-2 text-center rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="Start Date"
              isClearable
            />
          </div>
          <div className="relative w-full md:w-auto">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="bg-white  border text-center px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="End Date"
              isClearable
            />
          </div>
        </div> */}
      </div>

      {filteredBlogPosts.length === 0 ? (
        <p className="text-center text-gray-600 text-xl font-semibold mt-6">
          There&apos;s no post to show
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlogPosts.slice(0, visiblePosts).map((blog) => (
            <div
              key={blog._id}
              className="font-notoserifbangla p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-gray-300 bg-white"
            >
              {/* Title */}
              <div className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                {blog.title}
              </div>
              {/* Post Cover Image */}
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              {/* Content */}
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.body.substring(0, 100) +
                      (blog.body.length > 100 ? "..." : ""),
                  }}
                  className="text-gray-600 text-sm md:text-base mb-4"
                ></p>
              </div>

              {/* Author */}
              <p className="text-gray-500 text-sm mt-2">
                <span className="font-bold">Author:</span> {blog.author}
              </p>
              {/* Date */}
              <p className="text-gray-500 text-sm">
                <span className="font-bold">Published:</span>{" "}
                {moment(blog.createdAt).format("YYYY-MM-DD")}
              </p>
              {/* Categories */}
              <p className="text-gray-500 text-sm">
                <span className="font-bold">Categories:</span>{" "}
                {blog.category.join(", ")}
              </p>
              <hr className="my-4" />
              {/* Edit and Delete Button */}
              <div className="flex justify-center space-x-5">
                <MdDeleteOutline
                  className="text-red-500 hover:text-red-700 text-2xl cursor-pointer transition-all duration-200"
                  onClick={() => deleteBlog(blog._id)}
                />
                <MdEdit
                  className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer transition-all duration-200"
                  onClick={() => openEditModal(blog)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {visiblePosts < filteredBlogPosts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}

      {/* Post Edit Modal */}
      {isModalOpen && selectedPost && (
        <PostEditModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onPostUpdate={handlePostUpdate}
        />
      )}
    </div>
  );
};

export default MyBlogPosts;
