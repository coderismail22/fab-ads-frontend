import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { BlogPost } from "../Blog/blogpost.type";
import axiosInstance from "@/api/axiosInstance";
import { FaDiscord, FaSkype, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>(); // Get the blog ID from the URL
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null); // BlogPost or null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogDetail = async () => {
    try {
      // TODO: Add Server Url
      const { data } = await axiosInstance.get(`/services/${slug}`); // Fetch blog post by ID
      setBlogPost(data.data); // Access data properly from the response
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog post detail:", error);
      setError("Something went wrong while fetching the blog post.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchBlogDetail();
  }, [slug]); // Fetch the blog when component mounts

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
    <div className="text-black container mx-auto px-4 py-8">
      {blogPost ? (
        <div className=" mx-auto max-w-3xl">
          <Helmet>
            <title>{blogPost.title}</title>
          </Helmet>
          <h1 className="text-4xl font-bold mb-4 text-center ">
            {blogPost.title}
          </h1>
          {/* {blogPost.image && (
            <img
              src={blogPost.image}
              alt="thumbnail"
              className="w-full h-80 object-cover mb-4 rounded-md"
            />
          )} */}
          <p dangerouslySetInnerHTML={{ __html: blogPost.body }}></p>
          {/* <p className="text-sm mt-5 font-semibold">
            Author: {blogPost.author}
          </p> */}
          {/* <p className="text-sm font-semibold">
            Published on: {new Date(blogPost.createdAt).toLocaleDateString()}
          </p> */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-5 ">
            <Link
              to="http://t.me/fbbmkinga"
              target="_blank"
              className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
            >
              <FaTelegram className="text-xl" />
              Telegram
            </Link>

            <Link
              to="https://wa.link/e80poh"
              target="_blank"
              className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
            >
              <FaWhatsapp className="text-xl" />
              Whatsapp
            </Link>

            <Link
              to="https://discord.gg/RCAZ4NX5"
              target="_blank"
              className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
            >
              <FaDiscord className="text-xl" />
              Discord
            </Link>

            <Link
              to="#"
              target="_blank"
              className="w-full text-white bg-[var(--secondary-color)] border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-xl text-[16px] flex items-center gap-2 justify-center"
            >
              <FaSkype className="text-xl" />
              Skype
            </Link>
          </div>
        </div>
      ) : (
        <p>Service not found.</p>
      )}
    </div>
  );
};

export default BlogPostDetail;
