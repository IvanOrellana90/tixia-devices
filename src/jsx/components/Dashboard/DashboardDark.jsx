import { Fragment, useContext, useEffect } from 'react';
import HomeComponent from './HomeComponent';
import { ThemeContext } from '../../../context/ThemeContext';

const DashboardDark = () => {
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: 'dark', Label: 'Dark' });
  }, []);
  return (
    <Fragment>
      <HomeComponent />
    </Fragment>
  );
};
export default DashboardDark;
