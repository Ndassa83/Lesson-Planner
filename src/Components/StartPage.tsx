import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { LessonPlanType } from "../Types";
import "../ComponentsCSS/StartPage.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  MenuItem,
  Select,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type StartPageProps = {
  setResponse: React.Dispatch<React.SetStateAction<LessonPlanType | null>>;
};

export const StartPage = ({ setResponse }: StartPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [gradeLevel, setGradeLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [assignment, setAssignment] = useState<string>("");
  const [lengthToComplete, setLengthToComplete] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const getLLMResponse = async () => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    const prompt = `Create a structured and detailed lesson plan using the following parameters:

      Lesson Title: ${title}
      Time in minutes for lesson length:  ${lengthToComplete},
      Grade Level:  ${gradeLevel},
      Subject Matter:  ${subject},
      Assignment:  ${assignment},
      Additional Information: ${additionalInfo}
      
      Return the lesson plan in the following structured JSON schema:
    *note that the numbered lists should be seperate elements in an array of strings, and that no font notes should be written out (i.e. /n3)

      LessonPlan {
        lessonTitle: string;
        summary: string;
        intro: string;
        objectives: string[];
        materialsNeeded: string[];
        instructionalSteps: string[];
        conclusion: string;
        assessmentMethods: string;
      }
      Return: <LessonPlan>

      more information about the content for each element:

        lessonTitle: "Clearly state the lesson topic" ,
summary: "give a concise summary of the lesson as well as how it will be evaluated"
        objectives: "List what students should achieve by the end of the lesson." ,
        materialsNeeded: "Provide a bullet-point list of required materials." ,
        intro: "How will you introduce the topic? Any engaging hook, story, or question to spark interest?" ,
        instructionalSteps: "Step-by-step breakdown of teaching methods and content delivery. Specify any multimedia or interactive elements." include est. time in this format i.e. (20 min) at the end of each string,do not number each element, This must be an array of strings with each string being an individual step
        assessmentMethods: "How will student understanding be evaluated? Include quizzes, discussions, or reflections if applicable." it is possible to not have an assessment method,
        conclusion: "How will you wrap up the lesson? Any review questions or concluding thoughts?"
      
      `;

    const result = await model.generateContent(prompt);
    const jsonString = result.response.text;
    const parsedObj = JSON.parse(jsonString()) as LessonPlanType;
    setResponse(parsedObj);
  };

  const handleClick = async () => {
    setIsLoading(true);

    await getLLMResponse();
    navigate("/LessonPlan");
    setIsLoading(false);
  };

  return (
    <div className="start-page-container">
      {isLoading && <CircularProgress className="circular-progress-bar" />}
      <div className="start-input-container">
        <div className="create-header">Create Lesson Plan </div>
        <div className="create-subheader">
          Effortlessly generate a customized lesson plan for any subject—just
          add a title. Include more details to further tailor the results.
        </div>
        <div className="start-header">
          Age Range
          <FormControl size="small" margin="dense" className="inputs">
            <InputLabel>Age Range</InputLabel>
            <Select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Infants (0-12 months)">
                Infants (0-12 months)
              </MenuItem>
              <MenuItem value="Toddlers (1-2 years)">
                Toddlers (1-2 years)
              </MenuItem>
              <MenuItem value="Preschool (3-4 years)">
                Preschool (3-4 years)
              </MenuItem>
              <MenuItem value="Pre-K (4-5 years)">Pre-K (4-5 years)</MenuItem>
              <MenuItem value="Kindergarten (5-6 years)">
                Kindergarten (5-6 years)
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="start-header">
          Lesson Title
          <TextField
            className="inputs"
            placeholder="Enter the lesson title"
            size="small"
            margin="dense"
            multiline
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="start-header">
          Subject Details
          <TextField
            minRows={2}
            className="inputs"
            placeholder="Provide subject-specific information"
            size="small"
            margin="dense"
            multiline
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="start-header">
          Assessment
          <TextField
            className="inputs"
            placeholder="Determine the Assessment or Assignment"
            minRows={2}
            size="small"
            margin="dense"
            multiline
            value={assignment}
            onChange={(e) => setAssignment(e.target.value)}
          />
        </div>
        <div className="start-header">
          Lesson Length
          <TextField
            className="inputs length"
            placeholder="Lesson length"
            size="small"
            margin="dense"
            value={lengthToComplete}
            onChange={(e) => setLengthToComplete(e.target.value)}
          />
        </div>
        <div className="start-header">
          Additional Info
          <TextField
            className="inputs"
            placeholder="Include any extra details or notes"
            minRows={2}
            size="small"
            margin="dense"
            multiline
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          onClick={() => handleClick()}
          className="generate-button"
        >
          <div>Generate Lesson</div>
          <AutoAwesomeIcon className="gemini-logo" />
        </button>
      </div>
    </div>
  );
};
