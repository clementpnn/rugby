'use client'

import { ChangeEvent, SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
  disabled: boolean
}

interface SelectProperties extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  value: string
  options: SelectOption[]
  onChange: (_event: ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProperties> = ({ label, name, value, onChange, options, disabled }) => (
  <div className='block'>
    <label>{label}</label>
    <select name={name} disabled={disabled} onChange={onChange} value={value}>
      {options.map((option, index) => (
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default Select
