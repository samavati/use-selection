import Checkbox, { CheckboxProps } from 'antd/lib/checkbox/Checkbox';
import React, { memo } from 'react';

type RowProps = {
    children?: React.ReactNode,
    first_name: string,
    last_name: string,
    email: string,
    checkboxProps: CheckboxProps
}

const Row: React.FC<RowProps> = ({ first_name, last_name, email, checkboxProps }) => {
    return (
        <tr>
            <td><Checkbox {...checkboxProps} /></td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
        </tr>
    );
}

export default memo(Row, (prev, next) => prev.checkboxProps.checked === next.checkboxProps.checked);
