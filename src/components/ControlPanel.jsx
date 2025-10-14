import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BackButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Panel = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const Control = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #444;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const Value = styled.div`
  color: #333;
  font-family: monospace;
  margin-bottom: 0.5rem;
`;

const ControlPanel = ({
  title,
  controls,
  onControlChange,
  onReset,
  onStart,
  isRunning,
}) => {
  return (
    <Panel>
      <Title>{title}</Title>
      {controls.map((control) => (
        <Control key={control.id}>
          <Label>{control.label}</Label>
          <Input
            type={control.type}
            min={control.min}
            max={control.max}
            step={control.step}
            value={control.value}
            onChange={(e) =>
              onControlChange(control.id, e.target.value)
            }
          />
          <Value>{control.value + ' ' + control.unit}</Value>
        </Control>
      ))}
      <Button onClick={onStart}>
        {isRunning ? 'Stop' : 'Start'}
      </Button>
      <Button
        onClick={onReset}
        style={{ marginTop: '0.5rem', backgroundColor: '#666' }}
      >
        Reset
      </Button>
    </Panel>
  );
};

export default ControlPanel;