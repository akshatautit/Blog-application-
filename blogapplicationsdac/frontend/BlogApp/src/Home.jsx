import { useState } from "react";

function Home() {
  // Initialize Blog as an object with keys for name, imgUrl, and description
  const [Blog, setBlog] = useState({
    name: "",
    imgUrl: "",
    des: ""
  });

  // Handle the change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the input name and value
    setBlog((prevBlog) => ({
      ...prevBlog, // Spread the previous Blog state
      [name]: value // Update the key that matches the input's name
    }));
    console.log("changed data", Blog);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    console.log("handle click");
    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(Blog), // Convert the Blog object to JSON
      });
      if(response.ok){
        alert("Blog was created successfully");
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Success:", data); // Log success message
      // Optionally reset the form or perform other actions
      setBlog({
        name: "",
        imgUrl: "",
        des: ""
      });

    } catch (error) {
      console.error("Error:", error); // Log any errors
    }
  };

  return (
    <>
      <div>
        <div className="bg-gray-900 h-screen flex flex-col items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold">Create a Blog</h1>
          </div>
          <div className="mt-8">
            <form
              onSubmit={handleSubmit} // Use handleSubmit on form submission
              className="flex flex-col items-center"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4"
                required
                value={Blog.name} // Bind the state value to the input
                onChange={handleChange} // Update state on change
              />
              <input
                type="text" // Change to text type for imgUrl
                name="imgUrl"
                placeholder="Enter Image URL"
                className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4"
                required
                value={Blog.imgUrl} // Bind the state value to the input
                onChange={handleChange} // Update state on change
              />
              <textarea
                name="des"
                placeholder="Your Message"
                rows={6}
                className="py-2 px-4 bg-gray-800 text-white rounded-md focus:outline-none mb-4 resize-none w-full"
                required
                value={Blog.des} // Bind the state value to the textarea
                onChange={handleChange} // Update state on change
              />
              <button
                type="submit"
                className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
