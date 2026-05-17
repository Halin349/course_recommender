import { useState } from "react";
import axios from "axios";

function App() {

  const [credits, setCredits] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const courses = [
    {
      name: "Machine Learning",
      credits: 4,
      value: 9,
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    },
    {
      name: "Cyber Security",
      credits: 3,
      value: 8,
      image:
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
    },
    {
      name: "Data Structures",
      credits: 3,
      value: 7,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    },
    {
      name: "Cloud Computing",
      credits: 2,
      value: 6,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    },
    {
      name: "Artificial Intelligence",
      credits: 4,
      value: 10,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    },
    {
      name: "Web Development",
      credits: 2,
      value: 5,
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    },
  ];

  const handleSubmit = async () => {

    if (!credits) {
      alert("Please enter credits");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        "https://course-recommender-56co.onrender.com/recommend",
        {
          courses,
          max_credits: Number(credits),
        }
      );

      setResult(response.data.selected_courses);

    } catch (error) {

      console.error(error);
      alert("Backend not running!");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">

        <h1 className="text-3xl font-bold tracking-wide text-cyan-400">
          CourseAI
        </h1>

        <button className="bg-cyan-500 px-5 py-2 rounded-full hover:bg-cyan-400 transition">
          Explore
        </button>

      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-10 px-4">

        {/* Input Card */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-xl">

          <h2 className="text-5xl font-extrabold text-center leading-tight">

            Smart Course

            <span className="text-cyan-400">
              {" "}Recommendation
            </span>

          </h2>

          <div className="mt-8">

            <label className="text-lg font-semibold">
              Maximum Credit Limit
            </label>

            <input
              type="number"
              placeholder="Enter credits"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full mt-3 p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400 transition"
            />

          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 p-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105"
          >

            {loading ? "Generating..." : "Get Recommendations"}

          </button>

        </div>

        {/* Result Section */}
        {result.length > 0 && (

          <div className="mt-24 w-full max-w-5xl animate-fadeIn">

            {/* Heading */}
            <div className="text-center mb-14">

              <h2 className="text-5xl font-bold text-cyan-300">
                Recommended Courses
              </h2>

              <p className="text-slate-400 mt-4 text-lg">
                Optimized for your selected credit limit of

                <span className="text-cyan-400 font-bold">
                  {" "}{credits}
                </span>

              </p>

            </div>

            {/* Course List */}
            <div className="flex flex-col gap-8">

              {result.map((course, index) => (

                <div
                  key={index}
                  className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-3xl p-6 flex items-center justify-between hover:scale-[1.02] transition duration-300 shadow-2xl"
                >

                  {/* Left Section */}
                  <div className="flex items-center gap-6">

                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />

                    <div>

                      <h3 className="text-2xl font-bold text-cyan-300">
                        {course.name}
                      </h3>

                      <p className="text-slate-400 mt-2">
                        Credits Required:

                        <span className="text-white font-semibold">
                          {" "}{course.credits}
                        </span>

                      </p>

                    </div>

                  </div>

                  {/* Right Badge */}
                  <div className="bg-cyan-500 text-black px-5 py-3 rounded-2xl font-bold text-lg shadow-lg">

                    #{index + 1}

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default App;