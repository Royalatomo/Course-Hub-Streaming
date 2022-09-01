import "./App.scss";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import Navigate from "./components/Navigate";
import { useEffect, useState } from "react";
import { backend, loadingUrl } from "./env";

const getCourseData = async () => {
  const id = window.location.search.replace("?id=", "");
  try {
    const responce = await fetch(backend  + `/course/${id}`);
    const data = await responce.json();
    return data?.course || ""
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [lecture, setLectureLinks] = useState();
  const [course, setCourse] = useState({});
  const storedLecture = JSON.parse(localStorage.getItem("last-lecture") || "{}")[course?._id]
  const lectCompaire = storedLecture?.lecture || 0;
  const secCompaire = storedLecture?.section || 0;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getCourseData()
      .then((data) => {
        setLoaded(true);
        setCourse(data);
      })
      .catch((err) => console.log(err));
  }, [])

  return (
    <>
      <Header />
      {!loaded?<img src={loadingUrl+"?tr=h-155"} alt="loading" />:(

      <div className="container">
        <div className="video-container">
          <VideoPlayer playingLecture={lecture}/>
          <h3>Section: {secCompaire+1}</h3>
          <h3>Lecture: {lectCompaire+1} {lecture?.name}</h3>
          {course?.material?
            <a className="download" href={course.material} target="_blank" rel="noreferrer">Download Course Materials</a>:""
          }
        </div>
        <div className="navigation-container">
          <h2>Course Navigation</h2>
          {course?
          <Navigate data={course} playingLecture={lecture} setPlayingLecture={setLectureLinks} />:""
          }
        </div>
      </div>
      )}
    </>
  );
}

export default App;
