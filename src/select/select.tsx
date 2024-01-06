import { useEffect, useState } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelect = {
  multiple?: false;
  value?: SelectOption;
  setValue: (value: SelectOption | undefined) => void;
};

type MultiSelect = {
  multiple: true;
  value: SelectOption[];
  setValue: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelect | MultiSelect);

const Select = ({ multiple, value, options, setValue }: SelectProps) => {
  const [isOpen, setOpen] = useState(false);
  const [highlightedIdx, setHighlighted] = useState(0);

  function clearOption(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (multiple) setValue([]);
    else setValue(undefined);
  }
  function chooseOption(option: SelectOption) {
    if (multiple) {
      if (value?.includes(option))
        setValue(value.filter((o) => o.value !== option.value));
      else setValue([...value, option]);
    } else {
      if (option !== value) setValue(option);
    }
  }
  function isSlected(option: SelectOption) {
    if (option === value) return true;
    else return false;
  }

  useEffect(() => {
    if (!isOpen) setHighlighted(0);
  }, [isOpen]);

  return (
    <div
      className={styles.container}
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      onBlur={() => setOpen(false)}
    >
      {multiple ? (
        <span className={styles.value}>
          {value.map((v) => (
            <button
              key={v.value}
              onClick={(e) => {
                chooseOption(v);
                e.stopPropagation();
              }}
              className={styles["option-btn"]}
            >
              {v.label}
              <span className={styles["clear-btn"]}>&times;</span>
            </button>
          ))}
        </span>
      ) : (
        <span className={styles.value}>{value?.label}</span>
      )}
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`${styles.option} ${
              isSlected(option) ? styles.selected : ""
            } ${highlightedIdx === index ? styles.highlighted : ""}`}
            onClick={() => chooseOption(option)}
            onMouseEnter={() => setHighlighted(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <button className={styles["clear-btn"]} onClick={(e) => clearOption(e)}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
    </div>
  );
};

export default Select;
