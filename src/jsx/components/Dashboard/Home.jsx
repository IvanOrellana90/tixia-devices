import { Fragment, useContext, useEffect } from 'react';
import HomeComponent from './HomeComponent';
import { ThemeContext } from '../../../context/ThemeContext';

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: 'light', Label: 'Light' });
  }, []);
  return (
    <Fragment>
      <HomeComponent />
    </Fragment>
  );
};
export default Home;
