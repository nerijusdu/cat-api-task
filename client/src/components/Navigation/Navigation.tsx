import { Link, useLocation } from 'react-router-dom';
import './Navigation.less';

const Navigation : React.FC = () => {
  return (
    <nav className="navigation">
      <NavigationItem to="/breeds">Breeds</NavigationItem>
      <NavigationItem to="/cats">Cats</NavigationItem>
    </nav>
  );
};

type NavigationItemProps = {
  to: string;
}

const NavigationItem : React.FC<NavigationItemProps> = ({ to, children }) => {
  const location = useLocation();
  const activeClass = location.pathname === to ? 'active' : '';

  return (
    <Link to={to} className={`navigation-item ${activeClass}`}>
      {children}
    </Link>
  );
};

export default Navigation;
