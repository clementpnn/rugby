'use client'

import Select from 'react-select'

export type SelectValue = {
    label?: string
    value?: string
}

interface SelectProps {
    label: string
    value?: SelectValue
    onChange: (value: SelectValue) => void
}

const SelectJob: React.FC<SelectProps> = ({ label, value, onChange }) => {
    const JOB_OPTIONS: SelectValue[] = [
        { label: 'Journaliste', value: 'JOURNALIST' },
        { label: 'Photographe', value: 'PHOTOGRAPHER' }
    ]

    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <Select
                id={label}
                placeholder='-'
                isClearable
                options={JOB_OPTIONS}
                value={value}
                onChange={(value) => onChange(value as SelectValue)}
                formatOptionLabel={(option) => (
                    option?.label
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    )
}

export default SelectJob