import { useState } from "react";

export const InputQuestionCard = ({ label, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="question-box">
      <label className="question-title" for={label}>
        {label}
      </label>
      <input
        type="text"
        id={label}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Tu respuesta"
        style={{
          width: "100%",
          border: "none",
          borderBottom: focused ? "2px solid #005699" : "2px solid #cccccc",
          paddingBottom: "4px",
          fontSize: "20px",
          transition: "all 0.2s ease",
        }}
      />
    </div>
  );
};

export const RadioQuestionCard = ({
  label,
  selected,
  onSelect,
  fixedValue,
  rrq = false,
}) => {
  const options = rrq
    ? [
        { text: "0 - En desacuerdo", value: 0 },
        { text: "1 - Levemente en desacuerdo", value: 1 },
        { text: "2 - No estoy de acuerdo ni en desacuerdo", value: 2 },
        { text: "3 - Levemente de acuerdo", value: 3 },
        { text: "4 - De acuerdo", value: 4 },
      ]
    : [
        { text: "0 - Nunca", value: 0 },
        { text: "1 - Varios días", value: 1 },
        { text: "2 - Más de la mitad de los días", value: 2 },
        { text: "3 - Casi todos los días", value: 3 },
      ];

  const isFixed = typeof fixedValue === "number";

  return (
    <div className="question-box">
      <label className="question-title" htmlFor={label}>
        {label}
      </label>
      <div>
        {options.map((opt) => {
          const isSelected = isFixed
            ? fixedValue === opt.value
            : selected === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "block",
                marginBottom: "8px",
                cursor: isFixed ? "not-allowed" : "pointer",
                padding: "6px 0",
                fontSize: "20px",
                color: isFixed && fixedValue === opt.value ? "grey" : "inherit",
              }}
            >
              <input
                type="radio"
                checked={isSelected}
                disabled={isFixed}
                onChange={() => !isFixed && onSelect(opt.value)}
                style={{ marginRight: "8px" }}
              />
              {opt.text}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export const PastDisorderQuestionCard = ({
  background,
  onBackgroundChange,
  otherText,
  onOtherTextChange,
  treatment,
  onTreatmentChange,
  therapy,
  onTherapyChange,
}) => {
  const disorderOptions = [
    { label: "Depresion", value: "Depresion" },
    { label: "Ansiedad", value: "Ansiedad" },
    {
      label: "Trastorno de estrés postraumático",
      value: "Trastorno de estrés postraumático",
    },
    { label: "Otro", value: "Otro" },
    { label: "Ninguno", value: "Ninguno" },
  ];

  const standardOptions = [
    "Depresion",
    "Ansiedad",
    "Trastorno de estrés postraumático",
    "Ninguno",
    "Otro",
  ];
  const isNone = background === "Ninguno" || !background;
  const isOther = otherText.length > 0 || background === "Otro";
  const selectedOption = standardOptions.includes(background)
    ? background
    : background && background.trim().length > 0
      ? "Otro"
      : null;

  const handleBackgroundSelect = (value) => {
    onBackgroundChange(value);

    // If selecting "Ninguno", clear treatment and therapy
    if (value === "Ninguno") {
      onTreatmentChange(null);
      onTherapyChange(null);
    }
  };

  return (
    <div>
      <div className="question-box">
        <label className="question-title">
          ¿Presenta antecedentes de trastornos de salud mental?
        </label>
        <div>
          {disorderOptions.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: "block",
                marginBottom: "8px",
                cursor: "pointer",
                padding: "6px 0",
                fontSize: "20px",
              }}
            >
              <input
                type="radio"
                checked={selectedOption === opt.value}
                onChange={() => handleBackgroundSelect(opt.value)}
                style={{ marginRight: "8px" }}
              />
              {opt.label}
            </label>
          ))}
        </div>

        {isOther && (
          <div>
            <input
              type="text"
              maxLength={50}
              value={otherText}
              onChange={(e) => onOtherTextChange(e.target.value)}
              placeholder="Especificar (máximo 50 caracteres)"
              style={{
                width: "100%",
                border: "none",
                borderBottom: "2px solid #cccccc",
                paddingBottom: "4px",
                fontSize: "20px",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) =>
                (e.target.style.borderBottom = "2px solid #005699")
              }
              onBlur={(e) =>
                (e.target.style.borderBottom = "2px solid #cccccc")
              }
            />
          </div>
        )}
      </div>

      {background !== null && (
        <div className="question-box" style={{ marginTop: "1rem" }}>
          <label className="question-title">En caso afirmativo</label>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "20px",
              }}
            >
              ¿Recibe tratamiento farmacológico?
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  cursor: isNone ? "not-allowed" : "pointer",
                  color: isNone ? "#cccccc" : "inherit",
                }}
              >
                <input
                  type="radio"
                  checked={treatment === true}
                  disabled={isNone}
                  onChange={() => onTreatmentChange(true)}
                  style={{ marginRight: "8px" }}
                />
                Sí
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  cursor: isNone ? "not-allowed" : "pointer",
                  color: isNone ? "#cccccc" : "inherit",
                }}
              >
                <input
                  type="radio"
                  checked={treatment === false}
                  disabled={isNone}
                  onChange={() => onTreatmentChange(false)}
                  style={{ marginRight: "8px" }}
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "20px",
              }}
            >
              ¿Hace psicoterapia?
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  cursor: isNone ? "not-allowed" : "pointer",
                  color: isNone ? "#cccccc" : "inherit",
                }}
              >
                <input
                  type="radio"
                  checked={therapy === true}
                  disabled={isNone}
                  onChange={() => onTherapyChange(true)}
                  style={{ marginRight: "8px" }}
                />
                Sí
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  cursor: isNone ? "not-allowed" : "pointer",
                  color: isNone ? "#cccccc" : "inherit",
                }}
              >
                <input
                  type="radio"
                  checked={therapy === false}
                  disabled={isNone}
                  onChange={() => onTherapyChange(false)}
                  style={{ marginRight: "8px" }}
                />
                No
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
