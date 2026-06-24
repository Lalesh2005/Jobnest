import { useEffect } from "react";
import { getAllJobs } from "../services/jobServices";

function Home() {
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Home Page
    </div>
  );
}

export default Home;