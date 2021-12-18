import App from './App';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.less';

ReactModal.setAppElement('#root');

ReactDOM.render(<App />, document.getElementById('root'));
