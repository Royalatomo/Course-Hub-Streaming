import React, { useEffect } from "react";
import "./navigate.scss";

function Navigate({data, playingLecture, setPlayingLecture}) {
  const storedLecture = JSON.parse(localStorage.getItem("last-lecture") || "{}")[data._id];
  const checkedList = JSON.parse(localStorage.getItem("checked") || "{}")[data._id];
  const lectCompaire = storedLecture?.lecture || 0;
  const secCompaire = storedLecture?.section || 0;

  useEffect(() => {
    const sections = document.querySelectorAll(".navigation .section");
    sections.forEach((sec) => {
      sec.querySelector("span").addEventListener("click", (e) => {
        const element = e.currentTarget;
        const imgElement = element.querySelector("img");
        const split = imgElement.src.split("/");
        if (split[split.length - 1] === "down-arrow.png") {
          imgElement.src = "/up-arrow.png";
        } else {
          imgElement.src = "/down-arrow.png";
        }
        sec.querySelector(".content").classList.toggle("active");
      });
    });
  }, [data]);

  const checkLecture = (checked, secIndex, lecIndex) => {
    let allStoredLec = JSON.parse(localStorage.getItem("checked") || "{}");
    const allLastLectures = JSON.parse(localStorage.getItem("last-lecture") || "{}");
    localStorage.setItem("last-lecture", JSON.stringify({...allLastLectures, [data._id]: {lecture: lecIndex, section: secIndex}}))

    const storedLec = (allStoredLec[data._id] && allStoredLec[data._id][secIndex]) || []
    if(checked){
      let checkedList = Array.from(new Set([...storedLec, lecIndex]));
      let newList = {...allStoredLec, [data._id]: {...allStoredLec[data._id], [secIndex]: checkedList}};
      localStorage.setItem("checked", JSON.stringify(newList));
      const sectionLength = document.querySelector(`.section.s${secIndex} .video-completed span`);
      sectionLength.innerText = checkedList.length;
      return;
    }

    let checkedList = [];
    for(let i of storedLec) {
      if(i!==lecIndex) checkedList.push(i);
    }

    let newList = {...allStoredLec, [data._id]: {...allStoredLec[data._id], [secIndex]: checkedList}};
    localStorage.setItem("checked", JSON.stringify(newList));
    const sectionLength = document.querySelector(`.section.s${secIndex} .video-completed span`);
    sectionLength.innerText = checkedList.length;
  }

  const getCompletedVideo = (secIndex) => {
    let allStoredLec = JSON.parse(localStorage.getItem("checked") || "{}");
    const checked = (allStoredLec[data._id] && allStoredLec[data._id][secIndex]) || []
    return checked.length
  }

  const getDefaultChecked = (secIndex, lecIndex) => {
    let allStoredLec = JSON.parse(localStorage.getItem("checked") || "{}");
    const checked = (allStoredLec[data._id] && allStoredLec[data._id][secIndex]) || []
    return checked?.indexOf(lecIndex) >= 0
  }

  return (
    <aside className="navigation">
      {data?.sections?.map((section, sec_index) => {
        return (
          <div className={`section ${"s"+sec_index}`} key={"section-" + sec_index}>
            <span>
              <img src={sec_index === secCompaire?"/up-arrow.png":"/down-arrow.png"} alt="down arrow" />
              <h3 className="section-text">
                {sec_index + 1}: {section.name}
              </h3>
              <div className="section-info">
                <p className="video-completed"><span>{getCompletedVideo(sec_index)}</span>/{section.lectures.length}</p>
                <img src="/dot2.png" alt="dot" />
                <p className="section-length">{section.time} mins</p>
              </div>
            </span>

            <ul className={`content ${sec_index === secCompaire?"active":""}`}>
              {section.lectures?.map((lecture, lec_index) => {
                if((lec_index === lectCompaire) && (sec_index === secCompaire)) {
                  if(!playingLecture){
                    setPlayingLecture(lecture)
                  }
                }
                return (
                  <li>
                    <input defaultChecked={getDefaultChecked(sec_index, lec_index)} type="checkbox" onClick={(e) => checkLecture(e.currentTarget.checked, sec_index, lec_index)} />
                    <p
                      className="lecture"
                      onClick={(e) => {
                        e.currentTarget.parentElement.querySelector("input").checked = true
                        checkLecture(true, sec_index, lec_index)
                        setPlayingLecture(lecture)
                      }}
                    >
                      Lecture {lec_index + 1}: {lecture.name}
                    </p>
                    <p className="lecture-length">{lecture.time} min</p>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </aside>
  );
}

export default Navigate;
