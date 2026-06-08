import { InputQuestionCard, PastDisorderQuestionCard } from "./QuestionCards";
import { useState, useEffect } from "react";

export default function PersonalDataSection({
  setCurrentSection,
  form,
  setForm,
}) {
  const [continueEnabled, setContinueEnabled] = useState(false);
  const [otherText, setOtherText] = useState("");

  useEffect(() => {
    const basicFilled = [
      form.apellido,
      form.nombre,
      form.dni,
      form.telefono,
    ].every((field) => field.trim().length > 0);
    
    const standardOptions = ["Depresion", "Ansiedad", "Trastorno de estrés postraumático", "Ninguno"];
    const backgroundValid =
      standardOptions.includes(form.background) ||
      (form.background && form.background !== "Otro" && form.background.trim().length > 0);
    
    const treatmentFilled =
      form.background && form.background !== "Ninguno" ? form.treatment !== null : true;
    const therapyFilled =
      form.background && form.background !== "Ninguno" ? form.therapy !== null : true;
    
    setContinueEnabled(
      basicFilled && backgroundValid && treatmentFilled && therapyFilled
    );
  }, [form]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        style={{
          backgroundColor: "#005699",
          color: "white",
          borderRadius: "10px",
          padding: "1.5rem",
          fontSize: "20px",
        }}
      >
        Estimado/a paciente:
        <br />
        <br />
        Desde la Clínica de Insuficiencia Cardíaca sabemos que la salud
        emocional y la salud cardiovascular están estrechamente relacionadas.
        Tanto la ansiedad como la depresión pueden afectar la calidad de vida,
        los síntomas de su enfermedad y la adherencia al tratamiento.
        <br />
        <br />
        Por este motivo, le invitamos a completar una breve encuesta sobre
        ansiedad, depresión y estilos de pensamiento. Sus respuestas son
        confidenciales y nos ayudarán a brindarle una atención más integral.
        <br />
        <br />
        La encuesta le llevará solo unos minutos. Agradecemos mucho su
        participación.
        <br />
        <br />
        Clínica de Insuficiencia Cardíaca
      </div>
      <div className="section-title-box">Datos personales</div>
      <InputQuestionCard
        label="Apellido"
        value={form.apellido}
        onChange={(e) => setForm((f) => ({ ...f, apellido: e.target.value }))}
      />
      <InputQuestionCard
        label="Nombre"
        value={form.nombre}
        onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
      />
      <InputQuestionCard
        label="DNI"
        value={form.dni}
        onChange={(e) => setForm((f) => ({ ...f, dni: e.target.value }))}
      />
      <InputQuestionCard
        label="Teléfono"
        value={form.telefono}
        onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
      />

      <PastDisorderQuestionCard
        background={form.background}
        onBackgroundChange={(value) => {
          if (value === "Otro") {
            setForm((f) => ({ ...f, background: "Otro" }));
          } else {
            setForm((f) => ({ ...f, background: value }));
            setOtherText("");
          }
        }}
        otherText={otherText}
        onOtherTextChange={(text) => {
          setOtherText(text);
          setForm((f) => ({ ...f, background: text }));
        }}
        treatment={form.treatment}
        onTreatmentChange={(value) =>
          setForm((f) => ({ ...f, treatment: value }))
        }
        therapy={form.therapy}
        onTherapyChange={(value) =>
          setForm((f) => ({ ...f, therapy: value }))
        }
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          className={
            continueEnabled ? "continue-button" : "continue-button--disabled"
          }
          disabled={!continueEnabled}
          onClick={() => {
            setCurrentSection((section) => section + 1);
          }}
        >
          Siguiente
        </button>
        <button
          className="clear-form-button"
          onClick={() => {
            setForm((f) => ({
              ...f,
              apellido: "",
              nombre: "",
              dni: "",
              telefono: "",
              background: "",
              treatment: null,
              therapy: null,
            }));
            setOtherText("");
          }}
        >
          Borrar formulario
        </button>
      </div>
    </div>
  );
}
