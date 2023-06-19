import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import ChimpleLogo from "../components/ChimpleLogo";
import "./EditStudent.css";
import StudentNameBox from "../components/editStudent/StudentNameBox";
import { useEffect, useState } from "react";
import GenderAndAge from "../components/editStudent/GenderAndAge";
import SelectAvatar from "../components/editStudent/SelectAvatar";
import GradeBoardAndLangDropdown from "../components/editStudent/GradeBoardAndLangDropdown";
import { ADD_STUDENT, GENDER, PAGES } from "../common/constants";
import { chevronForward } from "ionicons/icons";
import Curriculum from "../models/curriculum";
import Grade from "../models/grade";
import Language from "../models/language";
import Loading from "../components/Loading";
import { useHistory, useLocation } from "react-router";
import { ServiceConfig } from "../services/ServiceConfig";
import { t } from "i18next";
import { Util } from "../utility/util";
import NextButton from "../components/common/NextButton";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";

const EditStudent = () => {
  const history = useHistory();
  const location = useLocation();
  const api = ServiceConfig.getI().apiHandler;
  const isEdit =
    location.pathname === PAGES.EDIT_STUDENT && !!Util.getCurrentStudent();

  enum STAGES {
    NAME,
    GENDER_AND_AGE,
    AVATAR,
    GRADE,
  }
  const [stage, setStage] = useState(STAGES.NAME);
  const [studentName, setStudentName] = useState(
    isEdit ? Util.getCurrentStudent()?.name : ""
  );
  const [gender, setGender] = useState<GENDER | undefined>(
    isEdit && Util.getCurrentStudent()?.gender
      ? (Util.getCurrentStudent()?.gender as GENDER)
      : undefined
  );
  const [age, setAge] = useState<number | undefined>(
    isEdit ? Util.getCurrentStudent()?.age : undefined
  );
  const [avatar, setAvatar] = useState<string | undefined>(
    isEdit ? Util.getCurrentStudent()?.avatar : undefined
  );
  const [board, setBoard] = useState<string | undefined>(
    isEdit ? Util.getCurrentStudent()?.board?.id : undefined
  );
  const [grade, setGrade] = useState<string | undefined>(
    isEdit ? Util.getCurrentStudent()?.grade?.id : undefined
  );
  const [language, setLanguage] = useState<string | undefined>(
    isEdit ? Util.getCurrentStudent()?.language?.id : undefined
  );
  const [boards, setBoards] = useState<Curriculum[]>();
  const [grades, setGrades] = useState<Grade[]>();
  const [languages, setLanguages] = useState<Language[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onNextButton = async () => {
    setIsLoading(true);
    const stagesLength = Object.keys(STAGES).length / 2;
    const newStage = stage + 1;
    //Completed all stages
    if (stagesLength === newStage) {
      //Creating Profile for the Student
      let student;
      const currentStudent = Util.getCurrentStudent();
      if (isEdit && !!currentStudent && !!currentStudent.docId) {
        student = await api.updateStudent(
          currentStudent,
          studentName!,
          age ?? currentStudent.age!,
          gender ?? currentStudent.gender!,
          avatar ?? currentStudent.avatar!,
          undefined,
          board ?? currentStudent.board?.id!,
          grade ?? currentStudent.grade?.id!,
          language ?? currentStudent.language?.id!
        );
      } else {
        student = await api.createProfile(
          studentName!,
          age,
          gender,
          avatar,
          undefined,
          board,
          grade,
          language
        );

        //Setting the Current Student
        const langIndex = languages?.findIndex(
          (lang) => lang.docId === language
        );
        await Util.setCurrentStudent(
          student,
          langIndex && languages ? languages[langIndex]?.code : undefined
        );
      }
      console.log(
        "🚀 ~ file: EditStudent.tsx:56 ~ onNextButton ~ student:",
        student
      );

      const state = history.location.state as any;
      history.replace(state?.from ?? PAGES.HOME);
    } else {
      if (newStage === STAGES.GRADE) {
        const results = await Promise.all([
          api.getAllCurriculums(),
          api.getAllGrades(),
          api.getAllLanguages(),
        ]);
        setBoards(results[0]);
        setGrades(results[1]);
        setLanguages(results[2]);
        console.log(
          "🚀 ~ file: EditStudent.tsx:51 ~ isNextButtonEnabled ~ docs:",
          results
        );
      }
      setStage(newStage);
    }
    setIsLoading(false);
  };
  const isNextButtonEnabled = () => {
    switch (stage) {
      case STAGES.NAME:
        return !!studentName;
      case STAGES.GENDER_AND_AGE:
        return !!gender && !!age;
      case STAGES.AVATAR:
        return !!avatar;
      case STAGES.GRADE:
        return !!grade && !!board && !!language;
      default:
        return false;
    }
  };
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      Keyboard.addListener("keyboardWillShow", (info) => {
        setIsInputFocus(true);
      });
      Keyboard.addListener("keyboardWillHide", () => {
        setIsInputFocus(false);
      });
    }
  }, []);

  return (
    <IonPage id="Edit-student-page">
      <div id="next-button">
        <NextButton
          disabled={!isNextButtonEnabled()}
          onClicked={onNextButton}
        />
      </div>
      <div
        className={
          "header " + isInputFocus && stage === STAGES.NAME
            ? "scroll-header"
            : ""
        }
      >
        <div id="common-div">
          <ChimpleLogo
            header={t("Welcome to Chimple!")}
            msg={t("Please create your child profile").toString()}
          />
        </div>
        {stage === STAGES.NAME && (
          <StudentNameBox
            studentName={studentName!}
            onValueChange={setStudentName}
            onEnterDown={isNextButtonEnabled() ? onNextButton : () => {}}
          />
        )}
      </div>
      {stage === STAGES.AVATAR && (
        <div className="avatar-title">{t("Select Child Avatar:")}</div>
      )}
      <div className="content">
        {stage === STAGES.GENDER_AND_AGE && (
          <GenderAndAge
            age={age}
            gender={gender}
            onAgeChange={setAge}
            onGenderChange={setGender}
          />
        )}
        {stage === STAGES.AVATAR && (
          <SelectAvatar avatar={avatar} onAvatarChange={setAvatar} />
        )}
        {stage === STAGES.GRADE && (
          <GradeBoardAndLangDropdown
            boards={boards}
            grades={grades}
            languages={languages}
            onBoardChange={setBoard}
            onGradeChange={setGrade}
            onLangChange={setLanguage}
            currentlySelectedBoard={board}
            currentlySelectedGrade={grade}
            currentlySelectedLang={language}
          />
        )}
      </div>
      <Loading isLoading={isLoading} />
    </IonPage>
  );
};
export default EditStudent;
