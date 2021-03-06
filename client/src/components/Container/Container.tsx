import './Container.less';

const Container : React.FC = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default Container;
