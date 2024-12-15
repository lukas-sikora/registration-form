import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Modal from "./Modal";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Imię musi składać sie conajmniej z 3 znaków." }),
    lastname: z
      .string()
      .min(3, { message: "Nazwisko musi składać sie conajmniej z 3 znaków." }),
    email: z.string().email({ message: "Nieprawidłowy adres e-mail." }),
    tel: z
      .string()
      .length(9, { message: "Numer telefonu musi składać się z 9 cyfr." }),
    technologies: z
      .string()
      .array()
      .nonempty({ message: "Proszę wybrać co najmniej jedną technologię" }),
    cv: z.instanceof(FileList).refine((files) => files.length > 0, {
      message: "Musisz dodać załącznik jako zdjęcie w formacie jpeg lub png.",
    }),
    checkbox: z.boolean(),
    experience: z
      .array(
        z.object({
          name: z.string(),
          level: z.string(),
        })
      )
      .optional(),
    learningType: z.string(),
  })
  .refine(
    (data) => {
      if (data.checkbox) {
        return data.experience && data.experience.length > 0;
      }
      return true;
    },
    {
      message:
        "Gdy zaznaczono doświadczenie w programowaniu, lista doświadczeń nie może być pusta.",
      path: ["experience"],
    }
  );

const RegistrationForm = () => {
  const [checked, setChecked] = useState(false);
  const [getData, setGetData] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningType: "online",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data) => {
    setGetData(data);
  };

  console.log("data", getData);
  console.log("typ kursu", getData.learningType);

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
            {errors.name?.message && <p>{errors.name?.message}</p>}
            <br />
            <input
              {...register("lastname")}
              type="text"
              placeholder="Nazwisko"
            />
            {errors.lastname?.message && <p>{errors.lastname?.message}</p>}
            <br />
            <input {...register("email")} type="email" placeholder="E-mail" />
            {errors.email?.message && <p>{errors.email?.message}</p>}
            <br />
            <input
              {...register("tel")}
              type="number"
              placeholder="Numer telefonu"
            />
            {errors.tel?.message && <p>{errors.tel?.message}</p>}
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
            {errors.technologies?.message && (
              <p>{errors.technologies?.message}</p>
            )}
            <div>
              <h2>Dodaj swoje CV</h2>
              <input {...register("cv")} type="file" accept=".jpeg, .png" />
              {errors.cv?.message && <p>{errors.cv?.message}</p>}
            </div>
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
            {errors.experience?.message && <p>{errors.experience?.message}</p>}
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
                      <option value={"HTML"}>HTML</option>
                      <option value={"NODE"}>NODE</option>
                      <option value={"REACT"}>REACT</option>
                      <option value={"C#"}>C#</option>
                    </select>
                    <select {...register(`experience.${index}.level`)}>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
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
