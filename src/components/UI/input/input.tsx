// Input.tsx
import React from 'react';
import styled from 'styled-components';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'checkbox' | 'radio'; // Agrega más tipos si es necesario

interface IInputProps {
    type?: InputType;
    placeholder?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    id?: string;
    disabled?: boolean;
}


export const InputStyle = styled.input`
  background-color: #fff; 
  width: 100%;           
  padding: 20px;      
  font-size: 16px;      
  border: 1px solid aqua; 
  border-radius: 15px;   
  margin-bottom: 16px;  
  outline: none;
  
  &:focus {
    outline: none;          
  }
  
  &:disabled {
    background-color: #f5f5f5; 
    cursor: not-allowed;       
  }
`;

const Input: React.FC<IInputProps> = ({
    type = 'text',
    placeholder,
    value,
    name,
    onChange,
    id,
    disabled = false
}) => {
    return (
        <div>
            <InputStyle
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                id={id}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;