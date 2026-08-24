import { useMemo, useState } from "react";
import kardexData from "../../data/kardex.json";

interface KardexRecord {
  id: string;
  CI: string;
  trimestre: number;
  tipoFalta: string;
  descripcion: string;
  materia: string;
  fecha: string;
}

const trimestreLabels = ["Primer trimestre", "Segundo trimestre", "Tercer trimestre"];

interface StudentKardexProps {
  CI: string;
}

function StudentKardex({ CI }: StudentKardexProps) {
  const [trimestre, setTrimestre] = useState(1);

  const records = useMemo(
    () =>
      (kardexData as KardexRecord[]).filter(
        (record) => record.CI === CI && record.trimestre === trimestre
      ),
    [CI, trimestre]
  );

  return (
    <section className="student-kardex">
      <div className="student-kardex__header">
        <div>
          <span className="student-kardex__eyebrow">Registro académico</span>
          <h2>Mi Kardex</h2>
        </div>
        <p>Consulta tus faltas por trimestre.</p>
      </div>

      <div className="student-kardex__tabs" role="tablist" aria-label="Trimestres">
        {trimestreLabels.map((label, index) => {
          const value = index + 1;
          const active = trimestre === value;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              className={`student-kardex__tab ${active ? "is-active" : ""}`}
              onClick={() => setTrimestre(value)}
            >
              <span>{value}</span>
              {label}
            </button>
          );
        })}
      </div>

      <div className="student-kardex__table-card">
        <div className="student-kardex__table-title">
          <h3>{trimestreLabels[trimestre - 1]}</h3>
          <span>{records.length} registro{records.length === 1 ? "" : "s"}</span>
        </div>

        {records.length > 0 ? (
          <div className="student-kardex__table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tipo de falta</th>
                  <th>Descripción</th>
                  <th>Materia</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td><span className="student-kardex__badge">{record.tipoFalta}</span></td>
                    <td>{record.descripcion}</td>
                    <td>{record.materia}</td>
                    <td>{record.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="student-kardex__empty">
            No existen faltas registradas en este trimestre.
          </div>
        )}
      </div>
    </section>
  );
}

export default StudentKardex;
