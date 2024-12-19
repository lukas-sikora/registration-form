import s from "./Modal.module.css";

function Modal({ data }) {
  const cvImage = URL.createObjectURL(data.cv[0]);
  return (
    <>
      <div>
        <h1 className={s.header}>Dane z formularza</h1>
      </div>
      <div className={s.modal}>
        <div className={s.personData}>
          <h2 className={s.header2}>Dane osobowe</h2>
          <p>Imię: {data.name}</p>
          <p>Nazwisko: {data.lastname}</p>
          <p>Email: {data.email}</p>
          <p>Telefon: {data.tel}</p>
        </div>
        {data.checkbox && (
          <div>
            <h2 className={s.header2}>Doświadczenie w Programowaniu</h2>
            <ul className={s.listContainer}>
              {data.experience.map((el) => (
                <li key={el.name}>
                  Technologia: {el.name} / poziom: {el.level}
                </li>
              ))}
            </ul>
          </div>
        )}
        <h2 className={s.header2}>Preferencje kursu:</h2>
        <p>Typ kursu: {data.learningType}</p>
        <h3>Preferowane technologie:</h3>
        <ul className={s.listContainer}>
          {data.technologies &&
            data.technologies.map((el) => <li key={el}>{el}</li>)}
        </ul>
        <div>
          <h2 className={s.header2}>Curriculum vitae:</h2>
          <img className={s.img} src={cvImage} />
        </div>
      </div>
    </>
  );
}
export default Modal;
