import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect } from 'react';
import './App.css';
import { DATA } from "./data";
import Row from './Row';
import { useSelection } from './useSelection';

function App() {
  const { bulkCheckboxProps, checkBoxProps, setReference } = useSelection();

  useEffect(() => {
    setReference(DATA.map(d => d.id));
  }, [setReference])

  return (
    <table>
      <thead>
        <tr>
          <td><Checkbox {...bulkCheckboxProps} /></td>
          <th>first name</th>
          <th>last name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {DATA.map((data, index) => {
          const { checked, onChange } = checkBoxProps(index);
          return (
            <Row key={index} {...data} checkboxProps={{ checked, onChange }} />
          )
        })}
      </tbody>
    </table>
  );
}

export default App;
