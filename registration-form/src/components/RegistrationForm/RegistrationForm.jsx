import { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Modal from "../Modal/Modal";
import s from "./RegistrationForm.module.css";
import Input from "../Input/Input";
import Options from "../Options/Options";

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
      message: "Musisz dodać załącznik jako zdjęcie.",
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
  const [getData, setGetData] = useState(0);
  const optionList = ["JavaScript", "React", "Html", "CSS", "Java"];
  const levelList = [1, 2, 3, 4, 5];

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningType: "online",
      experience: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data) => {
    setGetData(data);
  };

  const checkboxValue = watch("checkbox");

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setValue("checkbox", isChecked);
    if (!isChecked) {
      setValue("experience", []);
      trigger("experience");
    }
  };

  return (
    <>
      {getData === 0 && (
        <>
          <div>
            <h1 className={s.header}>
              Formularz zgłoszeniowy na kurs programowania
            </h1>
          </div>
          <FormProvider {...methods}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2 className={s.header2}>Dane osobowe</h2>
                <Input name="name" placeholder="Imię" />
                <Input name="lastname" placeholder="Nazwisko" />
                <Input name="email" placeholder="E-mail" />
                <Input type="number" name="tel" placeholder="Numer telefonu" />
              </div>
              <div className={s.sectionContainer}>
                <h2 className={s.header2}>Preferencje kursu</h2>
                <div className={s.radioContainer}>
                  Wybierz formę nauki:
                  <input
                    {...register("learningType")}
                    id="option1"
                    name="learningType"
                    type="radio"
                    value={"Stacjonarny"}
                  />
                  <label htmlFor="option1">Stacjonarnie</label>
                  <input
                    {...register("learningType")}
                    id="option2"
                    name="learningType"
                    type="radio"
                    value={"Online"}
                  />
                  <label htmlFor="option2">Online</label>
                </div>
                <div>
                  <select
                    className={s.selectField}
                    {...register("technologies")}
                    size={5}
                    multiple={"multiple"}
                  >
                    <Options arr={optionList} />
                  </select>
                  <div className={s.messageContainer}>
                    {errors.technologies?.message && (
                      <p className={s.message}>
                        {errors.technologies?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={s.sectionContainer}>
                <h2 className={s.header2}>Dodaj swoje CV</h2>
                <div>
                  <label>
                    <input
                      {...register("cv")}
                      type="file"
                      accept=".jpeg, .png"
                    />
                  </label>
                </div>
                <div className={s.messageContainer}>
                  {errors.cv?.message && (
                    <div className={s.message}>{errors.cv?.message}</div>
                  )}
                </div>
              </div>
              <div className={s.sectionContainer}>
                <h2 className={s.header2}>Doświadczenie w Programowaniu</h2>
                <div className={s.checkboxContainer}>
                  <input
                    {...register("checkbox")}
                    onChange={handleCheckboxChange}
                    id="checkbox"
                    type="checkbox"
                  />
                  <label htmlFor="checkbox">
                    Czy posiadasz doświadczenie w programowaniu?
                  </label>
                </div>
                <div>
                  {errors.experience?.message && (
                    <p className={s.message}>{errors.experience?.message}</p>
                  )}
                </div>
                <div>
                  {checkboxValue && (
                    <div className={s.sectionContainer}>
                      <button
                        className={s.addExperienceButton}
                        type="button"
                        onClick={() => {
                          append({ name: "JavaScript", level: 1 });
                        }}
                      >
                        Dodaj doświadczenie
                      </button>
                      {fields.map((field, index) => (
                        <div className={s.experienceRow} key={field.id}>
                          <select
                            className={s.experienceField}
                            {...register(`experience.${index}.name`)}
                            defaultValue={"JavaScript"}
                          >
                            <Options arr={optionList} />
                          </select>
                          <select
                            className={s.experienceField}
                            {...register(`experience.${index}.level`)}
                          >
                            <Options arr={levelList} />
                          </select>
                          <button
                            className={s.deleteButton}
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Usuń
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className={s.sendButton} type="submit">
                  Wyślij zgłoszenie
                </button>
              </div>
            </form>
          </FormProvider>
        </>
      )}

      {getData !== 0 && <Modal data={getData} />}
    </>
  );
};

export default RegistrationForm;
