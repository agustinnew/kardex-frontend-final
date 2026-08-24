import { useMemo } from "react";
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

const trimestres = [
  { value: 1, label: "Primer trimestre" },
  { value: 2, label: "Segundo trimestre" },
  { value: 3, label: "Tercer trimestre" },
];

interface StudentKardexProps {
  CI: string;
}

function StudentKardex({ CI }: StudentKardexProps) {
  const recordsByTrimester = useMemo(
    () =>
      trimestres.map((trimestre) => ({
        ...trimestre,
        records: (kardexData as KardexRecord[]).filter(
          (record) => record.CI === CI && record.trimestre === trimestre.value
        ),
      })),
    [CI]
  );

  return (
    <section className="student-kardex" aria-labelledby="student-kardex-title">
      <div className="student-kardex__header">
        <div>
          <span className="student-kardex__eyebrow">Registro académico</span>
          <h2 id="student-kardex-title">Mi Kardex</h2>
        </div>
        <p>Consulta tus faltas organizadas en tarjetas por trimestre.</p>
      </div>

      <div className="student-kardex__cards">
        {recordsByTrimester.map((trimestre) => (
          <article className="student-kardex__table-card" key={trimestre.value}>
            <div className="student-kardex__table-title">
              <div>
                <span>Trimestre {trimestre.value}</span>
                <h3>{trimestre.label}</h3>
              </div>
              <strong>
                {trimestre.records.length} registro
                {trimestre.records.length === 1 ? "" : "s"}
              </strong>
            </div>

            {trimestre.records.length > 0 ? (
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
                    {trimestre.records.map((record) => (
                      <tr key={record.id}>
                        <td>
                          <span className="student-kardex__badge">
                            {record.tipoFalta}
                          </span>
                        </td>
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default StudentKardex;
