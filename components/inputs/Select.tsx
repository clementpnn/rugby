'use client'

import { ChangeEvent, SelectHTMLAttributes } from 'react'

interface SelectProperties extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProperties> = ({ label, name, value, onChange, disabled }) => (
  <div className='block'>
    <label>{label}</label>
    <select name={name} disabled={disabled} onChange={onChange} value={value}>
      <option value='ADMIN'>Admin</option>
      <option value='DEV'>Dev</option>
    </select>
  </div>
)

export default Select
