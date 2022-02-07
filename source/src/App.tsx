import React, { useState } from "react";
import "./App.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { inititazeModel, evaluateModel } from "./data/contestentMode";

function App() {
  const [contestens, setContestents] =
    useState<evaluateModel[]>(inititazeModel);

  const onValueChange = (value: string, order: number, accessor: string) => {
    const tempContestent = [...contestens];

    console.log("accessor: ", accessor, "value:", value);

    (tempContestent[order] as any)[accessor] = value;
    setContestents(tempContestent);
  };

  const onGradeChange = (
    value: string,
    verticalOrder: number,
    horizontalOrder: number
  ) => {
    const tempContestent = [...contestens];

    tempContestent[verticalOrder].judges[horizontalOrder] = Number(value);
    setContestents(tempContestent);
  };

  const calculateGameOffset = (val: number): number => {
    const offset = val <= 480 ? 480 - val : val >= 600 ? 600 - val : 0;
    if (offset > 1 && offset < 30) return 0.5;
    else if (offset > 30 && offset <= 60) return 1;
    else if (offset > 60) return 5;

    return 0;
  };

  const getAverage = (mdl: evaluateModel) => {
    const total = mdl.judges.reduce((first, second) => first + second);
    const averageCount = mdl.judges.filter((el: number) => el).length;
    let offset = mdl.intoDuration > 30 ? 1 : 0;
    const gameOffset = calculateGameOffset(mdl.gameDuration);
    return (total / averageCount - offset - gameOffset).toFixed(2);
  };
  return (
    <div className="general-wrapper">
      <div className="top_bar">
        <div className="icon">
          <img
            alt="THOF"
            src="https://www.thof.gov.tr/Files/images/thoflogo2019.png"
            width="100"
            height="100"
          />
        </div>
        <div className="title">
          <p>TÜRKİYE HALK OYUNLARI FEDERASYONU</p>
          <p>OYUN TOPLULUĞU YARIŞMA SONUÇ TUTANAĞI</p>
        </div>
      </div>
      <div className="contest_content">
        <div className="for_content">
          <table>
            <tr>
              <td rowSpan={2} style={{ width: "120px" }}>
                YARIŞMANIN
              </td>{" "}
              <td style={{ width: "120px" }}>KATEGORİ</td>
              <td></td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>BASAMAĞI</td>
              <td></td>
            </tr>
          </table>
        </div>

        <div className="for_date">
          <table>
            <tr>
              <td style={{ width: "120px" }}> DALI</td>{" "}
              <td colSpan={2} style={{ width: "120px" }}></td>
            </tr>
            <tr>
              <td style={{ width: "120px" }}>YERİ VE TARİHİ</td>
              <td></td>
              <td style={{ width: "100px" }}>....../...../20</td>
            </tr>
          </table>
        </div>
      </div>
      <Table className="react-table" stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="center" rowSpan={3}>
              Sıra No.
            </TableCell>
            <TableCell align="center" rowSpan={3}>
              Oyun Topluluğunun Adı
            </TableCell>
            <TableCell align="center" rowSpan={3}>
              Oyun Töresi
            </TableCell>
            <TableCell align="center" rowSpan={3}>
              İntro Süresi
            </TableCell>
            <TableCell align="center" rowSpan={3}>
              Oyun süresi
            </TableCell>
            <TableCell align="center" colSpan={9} rowSpan={1}>
              Değerlendirme Hakemleri
            </TableCell>
            <TableCell align="center" colSpan={4}>
              Yarışma Sonuçları
            </TableCell>
          </TableRow>
          <TableRow>
            {[...Array(9).keys()].map((data: number) => (
              <TableCell rowSpan={2}>
                <textarea rows={2} cols={8} />
              </TableCell>
            ))}
            <TableCell rowSpan={2}>Toplam Puan</TableCell>
            <TableCell rowSpan={2}>Ortalama Puanı</TableCell>
            <TableCell colSpan={2}>Derecesi</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rakamla</TableCell>
            <TableCell>Yazıyla</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestens.map((contestent, index) => (
            <TableRow key={index} hover role="checkbox" tabIndex={-1}>
              {Object.entries(contestent).map(([key, value], i) => {
                if (key === "judges") {
                  return [...Array(9).keys()].map((val, order) => (
                    <TableCell key={val}>
                      <textarea
                        onChange={e => {
                          onGradeChange(e.target.value, index, order);
                        }}
                        rows={2}
                        cols={8}
                        value={value[order]}
                      />
                    </TableCell>
                  ));
                } else if (key === "order") {
                  return <TableCell> {value}</TableCell>;
                } else
                  return (
                    <TableCell>
                      <textarea
                        onChange={e => {
                          onValueChange(e.target.value, index, key);
                        }}
                        rows={2}
                        cols={8}
                        value={value}
                      />
                    </TableCell>
                  );
              })}

              <TableCell>
                {contestent.judges.reduce((first, second) => first + second)}
              </TableCell>
              <TableCell>
                {getAverage(contestent) === "NaN" ? 0 : getAverage(contestent)}
              </TableCell>
              <TableCell>###</TableCell>
              <TableCell>###</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
