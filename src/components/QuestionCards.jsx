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
        { text: "En desacuerdo", value: 0 },
        { text: "Levemente en desacuerdo", value: 1 },
        { text: "No estoy de acuerdo ni en desacuerdo", value: 2 },
        { text: "Levemente de acuerdo", value: 3 },
        { text: "De acuerdo", value: 4 },
      ]
    : [
        { text: "Nunca", value: 0 },
        { text: "Varios días", value: 1 },
        { text: "Más de la mitad de los días", value: 2 },
        { text: "Casi todos los días", value: 3 },
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
