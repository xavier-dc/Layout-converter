import React, {useState} from 'react';
import * as XLSX from 'xlsx';

const ParseExcel = () => {
    const [fileName, setFileName] = React.useState(null);
    const [columns, setColumns] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, {sheetRows: 5});

        setFileName(file.name);

        const JSONData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
            header: 1,
            defval: '',
        });
        setColumns(JSONData);
    }

    const changeRow = (e) => {
        e.preventDefault();
        const row = e.target.selectedIndex;
        setRows(columns[1][row]);
    }

    return(
        <div>
            <h3>Parse Excel</h3>
            <input type="file" onChange={handleFile}/>
            {fileName && (
                <React.Fragment>
                <p>
                    Columns: 
                    <select onChange={changeRow}>
                        {Object.keys(columns[0]).map((column, index) => (
                            <option key={index} value={columns[0][column]}>{columns[0][column]}</option>
                        ))}
                    </select>
                </p>
                <br></br>
                <p>
                    Value:
                      {rows}
                </p>
                </React.Fragment>
            )}
        </div>
    )
}

export default ParseExcel;