import "./index.css";

function RadioOption({ optionId, text, name, onChange, checked }) {
  const uniqueId = `option-${name}-${optionId}`; // HTML id는 고유해야 합니다.

  return (
    <div className="radio_option">
      <input
        type="radio"
        id={uniqueId}
        name={name} // 이 name이 같아야 한 그룹으로 묶입니다.
        value={optionId}
        onChange={onChange}
        checked={checked}
      />
      <label className="radio_backgound" htmlFor={uniqueId}>
        {text}
      </label>
    </div>
  );
}

export default RadioOption;
