import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs"); // Replace with your actual API endpoint

        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("akshata", data);
        setBlogs(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const HandleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the blog");
      }
      // Remove the deleted blog from the state
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  return (
    <div className="bg-slate-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {blogs.length === 0 ? ( // Check if blogs array is empty
          <div className="col-span-4 text-center text-white">
            No blogs available.
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-slate-800 relative hover:bg-slate-500 rounded-lg shadow-lg p-4 font-mono text-white"
            >
              <h2 className="text-xl font-bold pb-4">{blog.name}</h2>
              <button
                className="absolute bottom-2 right-2 bg-slate-700 text-white rounded px-2 py-1 hover:bg-red-600"
                onClick={() => {
                  HandleDelete(blog._id);
                }}
              >
                Delete
              </button>
              <img
                src={blog.imgUrl} // Assuming each blog has an imageUrl property
                className="w-full h-32 object-cover rounded-t-lg"
                alt={blog.title}
              />
              <p className="mt-2">{blog.des.substring(0, 15) + "..."}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
