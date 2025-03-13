import { Fragment, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

export default function CommanSelect() {
  const [selectData, setSelectData] = useState('Daily');
  return (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle as="div" className="btn-primary btn light">
          {selectData}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectData('Daily')}>
            Daily
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectData('Newest')}>
            Newest
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectData('Old')}>
            Old
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
}
