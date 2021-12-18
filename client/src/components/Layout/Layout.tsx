import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import './Layout.less';

const Layout : React.FC = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
