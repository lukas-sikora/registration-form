function Modal({ data }) {
  const cvImage = URL.createObjectURL(data.cv[0]);
  return (
    <>
      <div>
        <h1>Dane z formularza</h1>
      </div>
      <div>
        <h2>Dane osobowe</h2>
        <p>Imię: {data.name}</p>
        <p>Nazwisko: {data.lastname}</p>
        <p>Email: {data.email}</p>
        <p>Telefon: {data.tel}</p>
        {data.checkbox && (
          <div>
            <h2>Doświadczenie w Programowaniu</h2>
            <ul>
              {data.experience.map((el) => (
                <li key={el}>
                  Technologia: {el.name} / poziom: {el.level}
                </li>
              ))}
            </ul>
          </div>
        )}

        <h2>Preferencje kursu:</h2>
        <p>Typ kursu: {data.learningType}</p>
        <div>
          <h3>Preferowane technologie:</h3>
          <ul>
            {data.technologies &&
              data.technologies.map((el) => <li key={el}>{el}</li>)}
          </ul>
        </div>
        <div>
          <h2>Curriculum vitae:</h2>
       <img src={cvImage} />
        </div>
      </div>
    </>
  );
}
export default Modal;
