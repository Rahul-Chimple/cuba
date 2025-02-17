import User from "../../models/user";
import { LeaderboardInfo, ServiceApi } from "./ServiceApi";
import Curriculum from "../../models/curriculum";
import Grade from "../../models/grade";
import Language from "../../models/language";
import { Chapter, StudentLessonResult } from "../../common/courseConstants";
import Course from "../../models/course";
import Lesson from "../../models/lesson";
import Result from "../../models/result";
import Subject from "../../models/subject";
import Assignment from "../../models/assignment";
import Class from "../../models/class";
import StudentProfile from "../../models/studentProfile";

export class ApiHandler implements ServiceApi {
  public static i: ApiHandler;

  private s: ServiceApi;

  private constructor() {}

  public async getDataByInviteCode(inviteCode: number): Promise<any> {
    return await this.s.getDataByInviteCode(inviteCode);
  }
  public async linkStudent(inviteCode: number): Promise<any> {
    return await this.s.linkStudent(inviteCode);
  }
  public async getStudentResult(
    studentId: string,
    fromCache: boolean = true
  ): Promise<StudentProfile | undefined> {
    return await this.s.getStudentResult(studentId, fromCache);
  }
  public async getClassById(id: string): Promise<Class | undefined> {
    return await this.s.getClassById(id);
  }
  public async isStudentLinked(
    studentId: string,
    fromCache: boolean = true
  ): Promise<boolean> {
    return await this.s.isStudentLinked(studentId, fromCache);
  }
  public async getPendingAssignments(
    classId: string,
    studentId: string
  ): Promise<Assignment[]> {
    return await this.s.getPendingAssignments(classId, studentId);
  }

  public async updateStudent(
    student: User,
    name: string,
    age: number,
    gender: string,
    avatar: string,
    image: string | undefined,
    boardDocId: string,
    gradeDocId: string,
    languageDocId: string
  ): Promise<User> {
    return await this.s.updateStudent(
      student,
      name,
      age,
      gender,
      avatar,
      image,
      boardDocId,
      gradeDocId,
      languageDocId
    );
  }

  public async getLessonResultsForStudent(
    studentId: string
  ): Promise<Map<string, StudentLessonResult> | undefined> {
    return await this.s.getLessonResultsForStudent(studentId);
  }

  public async updateResult(
    student: User,
    courseId: string | undefined,
    lessonId: string,
    score: number,
    correctMoves: number,
    wrongMoves: number,
    timeSpent: number,
    assignmentId: string | undefined
  ): Promise<Result> {
    return await this.s.updateResult(
      student,
      courseId,
      lessonId,
      score,
      correctMoves,
      wrongMoves,
      timeSpent,
      assignmentId
    );
  }

  public async getCoursesForParentsStudent(student: User): Promise<Course[]> {
    return await this.s.getCoursesForParentsStudent(student);
  }

  public async getLesson(id: string): Promise<Lesson | undefined> {
    return await this.s.getLesson(id);
  }

  public async getLessonsForChapter(chapter: Chapter): Promise<Lesson[]> {
    return await this.s.getLessonsForChapter(chapter);
  }

  public async getDifferentGradesForCourse(
    course: Course
  ): Promise<{ grades: Grade[]; courses: Course[] }> {
    return await this.s.getDifferentGradesForCourse(course);
  }

  public async getAllCurriculums(): Promise<Curriculum[]> {
    return await this.s.getAllCurriculums();
  }

  public async getAllGrades(): Promise<Grade[]> {
    return await this.s.getAllGrades();
  }

  public async getAllLanguages(): Promise<Language[]> {
    return await this.s.getAllLanguages();
  }

  public async getParentStudentProfiles(): Promise<User[]> {
    return await this.s.getParentStudentProfiles();
  }

  updateSoundFlag(user: User, value: boolean) {
    return this.s.updateSoundFlag(user, value);
  }

  updateMusicFlag(user: User, value: boolean) {
    return this.s.updateMusicFlag(user, value);
  }

  updateLanguage(user: User, value: string) {
    return this.s.updateLanguage(user, value);
  }

  public get currentStudent(): User | undefined {
    return this.s.currentStudent;
  }

  public set currentStudent(value: User | undefined) {
    this.s.currentStudent = value;
  }

  public async createProfile(
    name: string,
    age: number | undefined,
    gender: string | undefined,
    avatar: string | undefined,
    image: string | undefined,
    boardDocId: string | undefined,
    gradeDocId: string | undefined,
    languageDocId: string | undefined
  ): Promise<User> {
    return await this.s.createProfile(
      name,
      age,
      gender,
      avatar,
      image,
      boardDocId,
      gradeDocId,
      languageDocId
    );
  }

  public async deleteProfile(studentId: string) {
    return await this.s.deleteProfile(studentId);
  }

  public static getInstance(s: ServiceApi): ApiHandler {
    if (!ApiHandler.i) {
      ApiHandler.i = new ApiHandler();
      ApiHandler.i.s = s;
    }
    return ApiHandler.i;
  }

  public async getLanguageWithId(id: string): Promise<Language | undefined> {
    return await this.s.getLanguageWithId(id);
  }

  public async getSubject(id: string): Promise<Subject | undefined> {
    return await this.s.getSubject(id);
  }

  public async getLeaderboardResults(
    sectionId: string,
    isWeeklyData: boolean
  ): Promise<LeaderboardInfo | undefined> {
    return await this.s.getLeaderboardResults(sectionId, isWeeklyData);
  }

  getAllLessonsForCourse(course: Course): Promise<{
    [key: string]: {
      [key: string]: Lesson;
    };
  }> {
    return this.s.getAllLessonsForCourse(course);
  }
}
