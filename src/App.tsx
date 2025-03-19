import { useEffect, useState } from "react";
import { StartPage } from "./Components/StartPage";
import { LessonPlan } from "./Components/LessonPlan";
import "./App.css";
import { LessonPlanType } from "./Types";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { DownloadPage } from "./Components/DownloadPage";

function App() {
  const [response, setResponse] = useState<LessonPlanType | null>(null);
  const [responseTitle, setResponseTitle] = useState<string>("");
  const [responseSummary, setResponseSummary] = useState<string>("");
  const [responseIntro, setResponseIntro] = useState<string>("");
  const [responseObjectives, setResponseObjectives] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [responseMaterials, setResponseMaterials] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [responseInstructions, setResponseInstructions] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [responseAssessment, setResponseAssessment] = useState<string>("");
  const [responseConclusion, setResponseConclusion] = useState("");

  useEffect(() => {
    if (response) {
      setResponseTitle(response.lessonTitle);
      setResponseSummary(response.summary);
      setResponseIntro(response.intro);
      setResponseObjectives(response.objectives);
      setResponseMaterials(response.materialsNeeded);
      setResponseInstructions(response.instructionalSteps);
      setResponseAssessment(response.assessmentMethods);
      setResponseConclusion(response.conclusion);
    }
  }, [response !== null]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartPage setResponse={setResponse} />} />
        <Route
          path="/LessonPlan"
          element={
            <LessonPlan
              responseTitle={responseTitle}
              setResponseTitle={setResponseTitle}
              responseSummary={responseSummary}
              setResponseSummary={setResponseSummary}
              responseIntro={responseIntro}
              setResponseIntro={setResponseIntro}
              responseObjectives={responseObjectives}
              setResponseObjectives={setResponseObjectives}
              responseMaterials={responseMaterials}
              setResponseMaterials={setResponseMaterials}
              responseInstructions={responseInstructions}
              setResponseInstructions={setResponseInstructions}
              responseAssessment={responseAssessment}
              setResponseAssessment={setResponseAssessment}
              responseConclusion={responseConclusion}
              setResponseConclusion={setResponseConclusion}
            />
          }
        />
        <Route
          path="/DownloadPage"
          element={
            <DownloadPage
              responseTitle={responseTitle}
              responseSummary={responseSummary}
              responseIntro={responseIntro}
              responseObjectives={responseObjectives}
              responseMaterials={responseMaterials}
              responseInstructions={responseInstructions}
              responseAssessment={responseAssessment}
              responseConclusion={responseConclusion}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
