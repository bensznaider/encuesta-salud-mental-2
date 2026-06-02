import { useEffect, useState } from "react";
import PersonalDataSection from "./components/PersonalDataSection";
import QuestionsSection from "./components/QuestionsSection";
import { phq2, gad2, phq9, gad7, rrq } from "./lib/questions";
import FinalMessageSection from "./components/FinalMessageSection";

export default function App() {
  const rrqInitialValues = Array(10).fill(null);
  const [form, setForm] = useState({
    apellido: "",
    nombre: "",
    dni: "",
    telefono: "",
    //BASIC IS PHQ2 + GAD2, MERGED INTO ONE ARRAY SO THAT BOTH APPEAR IN THE SAME SECTION
    basic: [null, null, null, null],
    phq9: [null, null, null, null, null, null, null, null, null],
    gad7: [null, null, null, null, null, null, null],
    rrq: rrqInitialValues,
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [phq9Enabled, setPhq9Enabled] = useState(false);
  const [gad7Enabled, setGad7Enabled] = useState(false);

  useEffect(() => {
    const phq2Score = (form.basic[0] ?? 0) + (form.basic[1] ?? 0);
    const gad2Score = (form.basic[2] ?? 0) + (form.basic[3] ?? 0);
    setPhq9Enabled(phq2Score >= 3);
    setGad7Enabled(gad2Score >= 3);
    setForm((f) => {
      const updatedForm = { ...f };
      if (phq2Score >= 3) {
        updatedForm.phq9 = [f.basic[0], f.basic[1], ...f.phq9.slice(2)];
      }
      if (gad2Score >= 3) {
        updatedForm.gad7 = [f.basic[2], f.basic[3], ...f.gad7.slice(2)];
      }
      return updatedForm;
    });
  }, [form.basic]);

  useEffect(() => {
    // The goal is to force the browser to evaluate scrollY
    // to avoid some bug where scrollTo is ignored in some cases when
    // navigating between sections
    const Y = window.scrollY;
    window.scrollTo({ top: Y - Y, behavior: "smooth" });
  }, [currentSection]);

  return (
    <div style={{ padding: "0 10px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            backgroundColor: "#005699",
            borderRadius: "10px 10px 0 0",
            width: "100%",
            height: "10px",
          }}
        />
        <div
          className="question-box"
          style={{
            borderRadius: 0,
            marginTop: 0,
            marginBottom: 0,
            borderBottom: 0,
          }}
        >
          <h1>Encuesta de salud mental</h1>
        </div>
        <div
          className="question-box"
          style={{ borderRadius: "0 0 10px 10px", marginTop: 0 }}
        >
          <p style={{ color: "red" }}>
            Todas las preguntas son de respuesta obligatoria
          </p>
        </div>
      </div>
      {currentSection === 0 && (
        <PersonalDataSection
          setCurrentSection={setCurrentSection}
          form={form}
          setForm={setForm}
        />
      )}
      {currentSection === 1 && (
        <QuestionsSection
          questions={phq2.concat(gad2)}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          form={form}
          setForm={setForm}
          flag="basic"
          initialValues={[null, null, null, null]}
        />
      )}
      {currentSection === 2 &&
        (phq9Enabled && !gad7Enabled ? (
          <QuestionsSection
            questions={phq9}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            form={form}
            setForm={setForm}
            flag="phq9"
            initialValues={[
              form.basic[0],
              form.basic[1],
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ]}
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ) : phq9Enabled && gad7Enabled ? (
          <QuestionsSection
            questions={phq9}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            form={form}
            setForm={setForm}
            flag="phq9"
            initialValues={[
              form.basic[0],
              form.basic[1],
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ]}
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ) : !phq9Enabled && gad7Enabled ? (
          <QuestionsSection
            questions={gad7}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            form={form}
            setForm={setForm}
            flag="gad7"
            initialValues={[
              form.basic[2],
              form.basic[3],
              null,
              null,
              null,
              null,
              null,
            ]}
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ) : (
          <QuestionsSection
            questions={rrq}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            form={form}
            setForm={setForm}
            flag="rrq"
            initialValues={rrqInitialValues}
            endsForm
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ))}
      {currentSection === 3 &&
        (gad7Enabled && phq9Enabled ? (
          <QuestionsSection
            questions={gad7}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            form={form}
            setForm={setForm}
            flag="gad7"
            initialValues={[
              form.basic[2],
              form.basic[3],
              null,
              null,
              null,
              null,
              null,
            ]}
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ) : !phq9Enabled && !gad7Enabled ? (
          <FinalMessageSection
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ) : (
          <QuestionsSection
            questions={rrq}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            form={form}
            setForm={setForm}
            flag="rrq"
            initialValues={rrqInitialValues}
            endsForm
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ))}
      {currentSection === 4 &&
        (gad7Enabled && phq9Enabled ? (
          <QuestionsSection
            questions={rrq}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            form={form}
            setForm={setForm}
            flag="rrq"
            initialValues={rrqInitialValues}
            endsForm
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ) : (
          <FinalMessageSection
            phq9Enabled={phq9Enabled}
            gad7Enabled={gad7Enabled}
          />
        ))}
      {currentSection === 5 && (
        <FinalMessageSection
          phq9Enabled={phq9Enabled}
          gad7Enabled={gad7Enabled}
        />
      )}
      {/* Replace the following <div> for the real one before npm run build
      and don't commit the change to the public repo, so that the version
      for the portfolio remains a mock from the original in Apps Script */}
      <div
        style={{
          padding: "1rem 1.5rem",
          fontSize: "small",
          textAlign: "center",
        }}
      >
        Disclaimer message
      </div>
    </div>
  );
}
