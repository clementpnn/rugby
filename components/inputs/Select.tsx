'use client'

import { ChangeEvent, Ref } from 'react'

interface SelectProperties {
  label: string
  name: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  value: string
  disabled: boolean
}

const Select: React.FC<SelectProperties> = ({ label, onChange, name, value, disabled }) => (
  <div className='block'>
    <label>{label}</label>
    <select name={name} onChange={onChange} disabled={disabled} value={value}>
      <option value='ADMIN'>Admin</option>
      <option value='DEV'>Dev</option>
    </select>
  </div>
);

export default Select
