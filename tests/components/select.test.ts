import React, { ChangeEvent } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Select, { SelectOption, SelectProperties } from '@/components/inputs/select'

describe('Select component', () => {
  const options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
  ];

  const onChangeMock = jest.fn();

  const renderComponent = (props: SelectProperties) => {
    const { id, label, name, value, onChange, options, errors } = props;

    render(
      <Select
        id={id}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        errors={errors}
      />
    )
  }

  test('renders with default properties', () => {
    const props: SelectProperties = {
      id: 'selectId',
      label: 'Select Label',
      name: 'selectName',
      value: 'option1',
      options: options,
      onChange: onChangeMock,
    };

    renderComponent(props);

    const selectElement = screen.getByLabelText('Select Label') as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('option1');
    expect(selectElement.disabled).toBe(false);
    fireEvent.change(selectElement, { target: { value: 'option3' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
    expect(onChangeMock.mock.calls[0][0].target.value).toBe('option3');
  });

  test('renders with disabled option', () => {
    const props: SelectProperties = {
      id: 'selectId',
      label: 'Select Label',
      name: 'selectName',
      value: 'option1',
      options: options,
      onChange: onChangeMock,
    };

    renderComponent(props);

    const selectElement = screen.getByLabelText('Select Label') as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('option1');
    expect(selectElement.disabled).toBe(false);
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });

  test('renders with error', () => {
    const props: SelectProperties = {
      id: 'selectId',
      label: 'Select Label',
      name: 'selectName',
      value: 'option1',
      options: options,
      onChange: onChangeMock,
      errors: { selectId: { message: 'Select error' } },
    };

    renderComponent(props);

    const selectElement = screen.getByLabelText('Select Label') as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();

    const errorElement = screen.getByText('Select error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
  });

  test('triggers onChange event', () => {
    const props: SelectProperties = {
      id: 'selectId',
      label: 'Select Label',
      name: 'selectName',
      value: 'option1',
      options: options,
      onChange: onChangeMock,
    };

    renderComponent(props);

    const selectElement = screen.getByLabelText('Select Label') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
    expect(onChangeMock.mock.calls[0][0].target.value).toBe('option2');
  });

  test('renders disabled option', () => {
    const props: SelectProperties = {
      id: 'selectId',
      label: 'Select Label',
      name: 'selectName',
      value: 'option1',
      options: options,
      onChange: onChangeMock,
    };

    renderComponent(props);

    const selectElement = screen.getByLabelText('Select Label') as HTMLSelectElement;
    expect(selectElement.options[1].disabled).toBeTruthy();
  });
});
