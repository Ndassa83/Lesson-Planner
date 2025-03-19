import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

type PDFDocumentProps = {
  responseTitle: string;
  responseSummary: string;
  responseIntro: string;
  responseObjectives: string[];
  responseMaterials: string[];
  responseInstructions: string[];
  responseAssessment: string;
  responseConclusion: string;
};

// PDF styles with an elegant and structured look
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: 40,
    fontFamily: "Helvetica",
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 30,
    borderRadius: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    color: "black",
  },
  text: {
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 4,
    color: "#333",
  },
  listItem: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 2,
  },
  instructionItem: {
    fontSize: 10,
    marginLeft: 14,
    marginBottom: 3,
  },
  section: {
    marginBottom: 10,
  },
});

const PDFDocument = ({
  responseTitle,
  responseSummary,
  responseIntro,
  responseObjectives,
  responseMaterials,
  responseInstructions,
  responseAssessment,
  responseConclusion,
}: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>{responseTitle}</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary</Text>
          <Text style={styles.text}>{responseSummary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Introduction</Text>
          <Text style={styles.text}>{responseIntro}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Objectives</Text>
          {responseObjectives.map((obj, index) => (
            <Text key={index} style={styles.listItem}>
              • {obj}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Materials Needed</Text>
          {responseMaterials.map((mat, index) => (
            <Text key={index} style={styles.listItem}>
              • {mat}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Instructions</Text>
          {responseInstructions.map((step, index) => (
            <Text key={index} style={styles.instructionItem}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Assessment</Text>
          <Text style={styles.text}>{responseAssessment}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Conclusion</Text>
          <Text style={styles.text}>{responseConclusion}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
