'use client'

import { SelectHTMLAttributes } from 'react'

interface SelectProperties extends SelectHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  value: string
}

const Select: React.FC<SelectProperties> = ({ label, name, value, disabled }) => (
  <div className='block'>
    <label>{label}</label>
    <select name={name} disabled={disabled} value={value}>
      <option value='ADMIN'>Admin</option>
      <option value='DEV'>Dev</option>
    </select>
  </div>
)

export default Select
