'use client'

import { ChangeEvent, SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProperties extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  value: string
  options: SelectOption[]
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProperties> = ({ label, name, value, onChange, options, disabled }) => (
  <div className='block'>
    <label>{label}</label>
    <select name={name} disabled={disabled} onChange={onChange} value={value}>
    {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
    ))}
    </select>
  </div>
)

export default Select
