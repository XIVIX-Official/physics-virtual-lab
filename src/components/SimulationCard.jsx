import { styled } from '@emotion/styled';

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  margin: 0 0 1rem 0;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-right: 0.5rem;
`;

const SimulationCard = ({ title, description, tags, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <div>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
    </Card>
  );
};

export default SimulationCard;