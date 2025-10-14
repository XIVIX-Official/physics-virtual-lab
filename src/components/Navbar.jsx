import styled from '@emotion/styled';

const NavbarContainer = styled.nav`
  background-color: #1a1a1a;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }

  ${({ active }) =>
    active &&
    `
    background-color: #444;
    &:hover {
      background-color: #555;
    }
  `}
`;

const Navbar = ({ onNavigate, currentPage }) => {
  return (
    <NavbarContainer>
      <Logo onClick={() => onNavigate('home')}>Physics Virtual Lab</Logo>
      <NavLinks>
        <NavLink
          active={currentPage === 'home'}
          onClick={() => onNavigate('home')}
        >
          Home
        </NavLink>
        <NavLink
          active={currentPage === 'lab'}
          onClick={() => onNavigate('lab')}
        >
          Lab
        </NavLink>
        <NavLink
          active={currentPage === 'docs'}
          onClick={() => onNavigate('docs')}
        >
          Documentation
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;