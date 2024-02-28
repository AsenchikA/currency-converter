import React, { FC, InputHTMLAttributes } from 'react';

export const DateInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => <input {...props} type="date" />;
