import { FC } from "react";
import Course from "../../models/course";
import "./SelectCourse.css";

const SelectCourse: FC<{
  courses: Course[];
  onCourseChange: (course: Course) => void;
}> = ({ courses, onCourseChange }) => {
  return (
    <div className="subject-container">
      {courses.map((course) => {
        return (
          <div
            onClick={() => {
              onCourseChange(course);
            }}
            className="subject-button"
            key={course.docId}
          >
            <div className="course-icon">
              <img
                className="course-img"
                src={course.thumbnail ?? "assets/icons/EnglishIcon.svg"}
                alt={course.thumbnail ?? "assets/icons/EnglishIcon.svg"}
              />
            </div>
            {course.title}
          </div>
        );
      })}
    </div>
  );
};
export default SelectCourse;
