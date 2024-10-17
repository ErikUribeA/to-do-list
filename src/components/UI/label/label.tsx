import React from 'react';
import styled from 'styled-components';

interface LabelProps {
    text: string;
    htmlFor?: string;
    className?: string;
}

export const LabelStyle = styled.label`
  font-size: 20px;     
  font-weight: bold;   
  color: #000;         
  margin-bottom: 8px;  
  display: block;      
`;


const Label: React.FC<LabelProps> = ({ text, htmlFor, className }) => {
    return (
        <LabelStyle htmlFor={htmlFor} className={className}>
            {text}
        </LabelStyle>
    );
};

export default Label;