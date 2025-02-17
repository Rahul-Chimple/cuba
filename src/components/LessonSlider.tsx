import "./LessonSlider.css";
import "./LessonCard.css";
import LessonCard from "./LessonCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import Lesson from "../models/lesson";
import Course from "../models/course";
import { StudentLessonResult } from "../common/courseConstants";

const LessonSlider: React.FC<{
  lessonData: Lesson[];
  course: Course | undefined;
  isHome: boolean;
  lessonsScoreMap: Map<string, StudentLessonResult>;
  startIndex: number;
  showSubjectName: boolean;
}> = ({
  lessonData,
  course,
  isHome,
  lessonsScoreMap,
  startIndex,
  showSubjectName = false,
}) => {
  const [lessonSwiperRef, setLessonSwiperRef] = useState<any>();
  let width: string;
  let height: string;
  width = "45.5vh";
  height = "35vh";
  useEffect(() => {
    console.log("lessonsScoreMap", lessonsScoreMap);
    lessonSwiperRef?.go(0);
    setTimeout(() => {
      if (startIndex) lessonSwiperRef?.go(startIndex);
    }, 100);
  });
  console.log("REFERENCE", startIndex);
  return isHome ? (
    <div className="content">
      <Splide
        ref={setLessonSwiperRef}
        hasTrack={true}
        options={{
          arrows: false,
          wheel: true,
          lazyLoad: true,
          direction: "ltr",
          pagination: false,
        }}
      >
        {lessonData.map((m: Lesson, i: number) => {
          if (!m) return;
          console.log(
            "lessonsScoreMap[m.id]",
            lessonsScoreMap.get(m.docId),
            m.docId,
            lessonsScoreMap.get(m.docId)?.score
          );
          let res: StudentLessonResult = lessonsScoreMap.get[m.docId];
          const isPlayed =
            !!lessonsScoreMap.get(m.docId) &&
            lessonsScoreMap.get(m.docId)?.score! > 0;

          width = "47.5vh";
          height = "37vh";
          return (
            <SplideSlide className="slide" key={i}>
              <LessonCard
                width={width}
                height={height}
                isPlayed={isPlayed}
                isUnlocked={true}
                isHome={isHome}
                lesson={m}
                course={course}
                showSubjectName={showSubjectName}
                showScoreCard={isPlayed}
                score={lessonsScoreMap.get(m.docId)?.score}
                lessonData={lessonData}
                startIndex={startIndex === -1 ? startIndex + 1 : startIndex}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  ) : (
    <div className="content">
      <Splide
        ref={setLessonSwiperRef}
        hasTrack={true}
        options={{
          arrows: false,
          wheel: true,
          lazyLoad: true,
          direction: "ltr",
          pagination: false,
        }}
      >
        {/* {
      (currentChapter.id === chaptersData[0].id)?<></>:<SplideSlide className="slide" >
        <Arrow
              width={width}
              height={height}
              isForward={false}
              currentChapter={currentChapter!}
              onChapterChange={onChapterChange}
            ></Arrow>
          </SplideSlide>
          } */}
        {lessonData.map((m: Lesson, i: number) => {
          if (!m) return;
          const isPlayed =
            !!lessonsScoreMap.get(m.docId) &&
            lessonsScoreMap.get(m.docId)?.score! > 0;
          return (
            <SplideSlide className="slide" key={i}>
              <LessonCard
                width={width}
                height={height}
                isPlayed={isPlayed}
                isUnlocked={true}
                isHome={isHome}
                lesson={m}
                course={course}
                showSubjectName={showSubjectName}
                showScoreCard={isPlayed}
                score={lessonsScoreMap.get(m.docId)?.score}
                lessonData={lessonData}
                startIndex={startIndex === -1 ? startIndex + 1 : startIndex}
              />
            </SplideSlide>
          );
        })}
        {/* {((currentChapter.id === chaptersData[0].id && currentChapter.title === 'Quiz') || 
      currentChapter.id === chaptersData[chaptersData.length-1].id)?<></>:<SplideSlide className="slide" >
      <Arrow
            width={width}
            height={height}
            isForward={true}
            currentChapter={currentChapter!}
            onChapterChange={onChapterChange}
          ></Arrow>
        </SplideSlide>} */}
      </Splide>
    </div>
  );
};
export default LessonSlider;
