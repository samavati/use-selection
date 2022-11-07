import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { DATA } from "./data";
import Row from './Row';
import { useSelection } from './useSelection';

function App() {
  const { bulkCheckboxProps, checkBoxProps, setReference } = useSelection();

  useEffect(() => {
    setReference(DATA.map(d => d.id));
  }, [])


  return (
    <div>
      <div>
        <span className='checkbox'><Checkbox {...bulkCheckboxProps} /></span>
        <span className='name'>first name</span>
        <span className='name'>last name</span>
        <span className='email'>email</span>
      </div>
      <List
        height={300}
        itemCount={DATA.length}
        itemSize={20}
        width={1000}
      >
        {({ index, style }) => {
          const { id, ...item } = DATA[index];
          const { checked, onChange } = checkBoxProps(id);
          return (
            <Row key={index} {...item} checkboxProps={{ checked, onChange }} style={style} />
          )
        }}
      </List>
    </div>
  );
}

export default App;
