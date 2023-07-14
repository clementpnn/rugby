import { render, screen, fireEvent } from '@testing-library/react';
import Button, { ButtonProperties } from '@/components/buttons/button'
import '@testing-library/jest-dom'

describe('Button component', () => {
    const onClickMock = jest.fn();
  
  const renderComponent = (props: ButtonProperties) => {
    const { variant, size, type, className, children, onClick, disabled } = props;

    render(
      <Button
        variant={variant}
        size={size}
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      />
        {children}
      </Button>
    );
  };
    test('renders button with default properties', () => {
      const props: ButtonProperties = {
        variant: 'primary',
        size: 'md',
        onClick: onClickMock,
      };
  
      renderComponent(props);
  
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('');
      expect(buttonElement).toHaveClass('primary md');
      expect(buttonElement).toBeEnabled();
      fireEvent.click(buttonElement);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  
    test('renders button with custom properties', () => {
      const props: ButtonProperties = {
        variant: 'secondary',
        size: 'lg',
        type: 'submit',
        className: 'custom-class',
        onClick: onClickMock,
        disabled: true,
        children: 'Custom Button',
      };
  
      renderComponent(props);
  
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('Custom Button');
      expect(buttonElement).toHaveClass('secondary lg custom-class');
      expect(buttonElement).toBeDisabled();
      fireEvent.click(buttonElement);
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });