import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument"; // Import the PDF document
import "../ComponentsCSS/DownloadPage.css";

type DownloadPageProps = {
  responseTitle: string;
  responseSummary: string;
  responseIntro: string;
  responseObjectives: string[];
  responseMaterials: string[];
  responseInstructions: string[];
  responseAssessment: string;
  responseConclusion: string;
  name: string;
  subject: string;
  date: string;
};

export const DownloadPage = (props: DownloadPageProps) => {
  return (
    <div className="export-container">
      <div className="pdf-viewer">
        <PDFViewer width="100%" height="600px">
          <PDFDocument {...props} />
        </PDFViewer>
      </div>

      <div className="export-buttons">
        <PDFDownloadLink
          document={<PDFDocument {...props} />}
          fileName={`${props.responseTitle}.pdf`}
          className="export-button"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Export to PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};
