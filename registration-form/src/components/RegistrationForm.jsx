import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Modal from "./Modal";

const RegistrationForm = () => {
  const [checked, setChecked] = useState(false);
  const [getData, setGetData] = useState(0);
  const { register, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });
  const onSubmit = (data) => {
    setGetData(data);
  };
  console.log("data", getData);
  return (
    <>
      {getData === 0 && (
        <div>
          <div>
            <h1>Formularz zgłoszeniowy na kurs programowania</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Dane osobowe</h2>
            <input {...register("name")} type="text" placeholder="Imię" />
            <br />
            <input
              {...register("lastname")}
              type="text"
              placeholder="Nazwisko"
            />
            <br />
            <input {...register("email")} type="email" placeholder="E-mail" />
            <br />
            <input
              {...register("tel")}
              type="number"
              placeholder="Numer telefonu"
            />
            <h2>Preferencje kursu</h2>
            <p>
              Wybierz formę nauki:
              <input
                {...register("learningType")}
                name="learningType"
                type="radio"
                value={"stacjonarny"}
              />
              stacjonarnie
              <input
                {...register("learningType")}
                name="learningType"
                type="radio"
                value={"online"}
              />
              online
            </p>
            <select
              {...register("technologies")}
              size={5}
              multiple={"multiple"}
            >
              <option value={"JavaScript"}>JavaScript</option>
              <option value={"React"}>React</option>
              <option value={"Html"}>Html</option>
              <option value={"CSS"}>CSS</option>
              <option value={"Node"}>Node</option>
              <option value={"Node1"}>Node1</option>
              <option value={"Node2"}>Node2</option>
              <option value={"Node3"}>Node3</option>
            </select>
            <h2>Dodaj swoje CV</h2>
            <input {...register("cv")} type="file" accept=".jpeg,.png" />
            <h2>Doświadczenie w Programowaniu</h2>
            <p>
              <input
                {...register("checkbox")}
                onClick={() => {
                  setChecked(!checked);
                }}
                type="checkbox"
              />{" "}
              <label>Czy posiadasz doświadczenie w programowaniu?</label>
            </p>
            {checked && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    append({ name: "JavaScript", level: 1 });
                  }}
                >
                  Dodaj doświadczenie
                </button>
                <br />
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <select
                      {...register(`experience.${index}.name`)}
                      defaultValue={"JavaScript"}
                    >
                      <option value={"JavaScript"}>JavaScript</option>
                      <option>HTML</option>
                      <option>NODE</option>
                      <option>REACT</option>
                      <option>C#</option>
                    </select>
                    <select {...register(`experience.${index}.level`)}>
                      <option value={1}>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                    <button type="button" onClick={() => remove(index)}>
                      Usuń
                    </button>
                  </div>
                ))}
              </>
            )}
            <br />
            <button type="submit">Wyślij zgłoszenie</button>
            <br />
          </form>
        </div>
      )}
      {getData !== 0 && <Modal data={getData} />}
    </>
  );
};

export default RegistrationForm;
