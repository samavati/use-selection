import Checkbox, { CheckboxProps } from 'antd/lib/checkbox/Checkbox';
import React, { memo } from 'react';

type RowProps = {
    children?: React.ReactNode,
    first_name: string,
    last_name: string,
    email: string,
    checkboxProps: CheckboxProps,
} & React.HTMLProps<HTMLDivElement>

const Row: React.FC<RowProps> = ({ first_name, last_name, email, checkboxProps, ...props }) => {
    return (
        <div {...props}>
            <span className='checkbox'><Checkbox {...checkboxProps} /></span>
            <span className='name'>{first_name}</span>
            <span className='name'>{last_name}</span>
            <span className='email'>{email}</span>
        </div>
    );
}

export default memo(Row, (prev, next) => prev.checkboxProps.checked === next.checkboxProps.checked);
