import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircleIcon from "@mui/icons-material/Circle";
import "../ComponentsCSS/LessonPlan.css";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

type LessonPlanProps = {
  responseTitle: string;
  setResponseTitle: React.Dispatch<React.SetStateAction<string>>;
  responseSummary: string;
  setResponseSummary: React.Dispatch<React.SetStateAction<string>>;
  responseIntro: string;
  setResponseIntro: React.Dispatch<React.SetStateAction<string>>;
  responseObjectives: string[];
  setResponseObjectives: React.Dispatch<React.SetStateAction<string[]>>;
  responseMaterials: string[];
  setResponseMaterials: React.Dispatch<React.SetStateAction<string[]>>;
  responseInstructions: string[];
  setResponseInstructions: React.Dispatch<React.SetStateAction<string[]>>;
  responseAssessment: string;
  setResponseAssessment: React.Dispatch<React.SetStateAction<string>>;
  responseConclusion: string;
  setResponseConclusion: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  subject: string;
  date: string;
};

export const LessonPlan = ({
  responseTitle,
  setResponseTitle,
  responseSummary,
  setResponseSummary,
  responseIntro,
  setResponseIntro,
  responseObjectives,
  setResponseObjectives,
  responseMaterials,
  setResponseMaterials,
  responseInstructions,
  setResponseInstructions,
  responseAssessment,
  setResponseAssessment,
  responseConclusion,
  setResponseConclusion,
  date,
  setDate,
  name,
  setName,
  subject,
  setSubject,
}: LessonPlanProps) => {
  const navigate = useNavigate();
  return (
    <div className="lesson-plan-container">
      <div className="lesson-input-container">
        <div className="create-header">Edit and Refine</div>
        <div className="create-subheader">
          Modify entries, adjust objectives, materials, or steps, and finalize
          your lesson plan for download.
        </div>
        <div className="name-date-subject">
          <TextField
            className="name-date-subject-elements"
            id="Name"
            placeholder="Name"
            label="Name"
            variant="standard"
            value={name}
            size="small"
            margin="dense"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="name-date-subject-elements"
            id="Subject"
            placeholder="Subject"
            label="Subject"
            variant="standard"
            value={subject}
            size="small"
            margin="dense"
            onChange={(e) => setSubject(e.target.value)}
          />{" "}
          <TextField
            className="name-date-subject-elements"
            id="Date"
            placeholder="Date"
            label="Date"
            variant="standard"
            value={date}
            size="small"
            margin="dense"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="header">Title</div>
        <TextField
          className="inputs"
          placeholder="Enter the lesson title."
          value={responseTitle}
          size="small"
          margin="dense"
          multiline
          onChange={(e) => setResponseTitle(e.target.value)}
        />
        <div className="header">Summary</div>
        <TextField
          className="inputs"
          placeholder="Provide a brief lesson overview."
          size="small"
          margin="dense"
          minRows={2}
          multiline
          value={responseSummary}
          onChange={(e) => setResponseSummary(e.target.value)}
        />
        <div className="header">Introduction:</div>
        <TextField
          className="inputs"
          placeholder="Write a short lesson introduction."
          size="small"
          margin="dense"
          minRows={2}
          multiline
          value={responseIntro}
          onChange={(e) => setResponseIntro(e.target.value)}
        />
        <div className="header">Learning Objectives</div>{" "}
        {responseObjectives.map((objective, index) => {
          return (
            <div className="input-bullet-container">
              <CircleIcon className="circle-icon" />

              <TextField
                className="inputs"
                key={index}
                placeholder={`Objective ${(index + 1).toString()}`}
                size="small"
                margin="dense"
                multiline
                minRows={2}
                value={objective}
                onChange={(e) => {
                  const newObjectives = [...responseObjectives];
                  newObjectives[index] = e.target.value;
                  setResponseObjectives(newObjectives);
                }}
              />
              <RemoveCircleOutlineIcon
                className="remove-button"
                onClick={() => {
                  const newObjectives = [...responseObjectives];
                  newObjectives.splice(index, 1);
                  setResponseObjectives(newObjectives);
                }}
              />
            </div>
          );
        })}
        <div
          onClick={() => {
            const newObjectives = [...responseObjectives];
            newObjectives.push("");
            setResponseObjectives(newObjectives);
          }}
          className="add-row"
        >
          <AddCircleOutlineIcon />
          <div className="footer">Add Objective</div>
        </div>
        <div className="header">Materials Needed</div>
        {responseMaterials.map((material, index) => {
          return (
            <div className="input-bullet-container">
              <CircleIcon className="circle-icon" />
              <TextField
                placeholder={`Material ${(index + 1).toString()}`}
                size="small"
                margin="dense"
                className="inputs"
                multiline
                key={index}
                value={material}
                onChange={(e) => {
                  const newMaterials = [...responseMaterials];
                  newMaterials[index] = e.target.value;
                  setResponseMaterials(newMaterials);
                }}
              />
              <RemoveCircleOutlineIcon
                className="remove-button"
                onClick={() => {
                  const newMaterials = [...responseMaterials];
                  newMaterials.splice(index, 1);
                  setResponseMaterials(newMaterials);
                }}
              />
            </div>
          );
        })}
        <div
          onClick={() => {
            const newMaterials = [...responseMaterials];
            newMaterials.push("");
            setResponseMaterials(newMaterials);
          }}
          className="add-row"
        >
          <AddCircleOutlineIcon />
          <div className="footer">Add Material</div>
        </div>
        <div className="header">Instructions</div>
        {responseInstructions.map((instruction, index) => {
          return (
            <div className="input-bullet-container">
              <div className="numbers">{index + 1}.</div>

              <TextField
                className="inputs"
                key={index}
                placeholder={`Step ${(index + 1).toString()}`}
                size="small"
                margin="dense"
                minRows={2}
                multiline
                value={instruction}
                onChange={(e) => {
                  const newInstructions = [...responseInstructions];
                  newInstructions[index] = e.target.value;
                  setResponseInstructions(newInstructions);
                }}
              />
              <RemoveCircleOutlineIcon
                className="remove-button"
                onClick={() => {
                  const newInstructions = [...responseInstructions];
                  newInstructions.splice(index, 1);
                  setResponseInstructions(newInstructions);
                }}
              />
            </div>
          );
        })}
        <div
          onClick={() => {
            const newInstructions = [...responseInstructions];
            newInstructions.push("");
            setResponseInstructions(newInstructions);
          }}
          className="add-row"
        >
          <AddCircleOutlineIcon />
          <div className="footer">Add Step</div>
        </div>
        <div className="header">Assignment/Assessment</div>
        <TextField
          className="inputs"
          size="small"
          placeholder="Describe the task or evaluation method."
          margin="dense"
          multiline
          minRows={2}
          value={responseAssessment}
          onChange={(e) => setResponseAssessment(e.target.value)}
        />
        <div className="header">Conclusion</div>
        <TextField
          className="inputs"
          size="small"
          placeholder="Summarize key takeaways from the lesson."
          margin="dense"
          multiline
          minRows={2}
          value={responseConclusion}
          onChange={(e) => setResponseConclusion(e.target.value)}
        />
        <div className="add-row" onClick={() => navigate("/DownloadPage")}>
          Continue to Export
        </div>
      </div>
    </div>
  );
};
