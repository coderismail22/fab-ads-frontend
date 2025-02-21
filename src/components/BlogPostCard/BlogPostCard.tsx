/* eslint-disable no-unused-vars */
import { FaArrowRight, FaImage } from "react-icons/fa"; // Icons
import { Link } from "react-router-dom"; // Link for routing
import moment from "moment"; // For formatting the date
import { IBlogPost } from "./blogPost.interface";

//define props
interface IBlogPostCardProps {
  blogPost: IBlogPost;
  handleImageError: (id: string) => void;
  imgErrors: { [key: string]: boolean };
}

const BlogPostCard = ({
  blogPost,
  handleImageError,
  imgErrors,
}: IBlogPostCardProps) => {
  return (
    <div
      key={blogPost._id}
      className=" p-4 border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-gray-300 bg-slate-300 flex flex-col justify-between"
    >
      <div>
        {/* Title */}
        <div className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
          {blogPost.title}
        </div>
        {/* Image */}
        <div>
          {imgErrors[blogPost._id] ? (
            <div className="my-2 w-full h-36 flex flex-col items-center justify-center bg-gray-200 border border-dashed border-gray-400 rounded-lg shadow-md">
              <FaImage className="size-8" />
              <p className="text-xl text-gray-500 text-center font-medium">
                Image Not Available
              </p>
            </div>
          ) : (
            <img
              className="w-full h-36 object-cover object-center rounded-lg shadow-md"
              src={blogPost.image}
              alt="Note Cover Image"
              onError={() => handleImageError(blogPost._id)}
            />
          )}
        </div>

        {/* Content */}
        <div>
          <p
            dangerouslySetInnerHTML={{
              __html:
                blogPost.body.substring(0, 100) +
                (blogPost.body.length > 100 ? "..." : ""),
            }}
            className="text-gray-600 text-sm md:text-base mb-4"
          ></p>
        </div>

        {/* Author */}
        <p className="text-gray-500 text-sm mt-2">
          <span className="font-bold">Author:</span> {blogPost.author}
        </p>
        {/* Date */}
        <p className="text-gray-500 text-sm">
          <span className="font-bold">Published:</span>{" "}
          {moment(blogPost.createdAt).format("YYYY-MM-DD")}
        </p>
      </div>
      <Link
        to={`/blog/${blogPost._id}`}
        className="flex gap-2 items-center justify-center bg-black text-white p-3 mt-4 hover:bg-gray-800 transition-colors duration-300"
      >
        <button className="font-palanquin">Read more</button>
        <FaArrowRight />
      </Link>
    </div>
  );
};

export default BlogPostCard;
