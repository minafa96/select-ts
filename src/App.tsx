import { useState } from "react";
import Select, { SelectOption } from "./select/select";

const options = [
  { label: "option 1", value: 1 },
  { label: "option 2", value: 2 },
  { label: "option 3", value: 3 },
  { label: "option 4", value: "four" },
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  const [valueM, setValueM] = useState<SelectOption[]>([options[0]]);
  return (
    <>
      <Select options={options} value={value} setValue={setValue} />
      <br />
      <Select multiple options={options} value={valueM} setValue={setValueM} />
    </>
  );
}

export default App;
