import { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import ProfileOverviewCard from './ProfileOverviewCard';
import { IMAGES, SVGICON } from '../../content/theme';
import { Nav, Tab } from 'react-bootstrap';

const fileExtension = [
  { name: 'CRUD Invoices', image: IMAGES.Folder, status: '12 files' },
  { name: 'Tower Hill Docs', image: IMAGES.Folder, status: '17 files' },
  { name: 'Mivy App', image: IMAGES.Folder, status: '12 files' },
  { name: 'Leaf CRM API Co..', image: IMAGES.Folder, status: '21 days ago' },
  { name: 'Tower Hill bilboa..', image: IMAGES.CsvFile, status: '34 days ago' },
  { name: 'Orders backup', image: IMAGES.CssFile, status: '03 days ago' },
  { name: 'Avionica Tech.', image: IMAGES.PdfFile, status: '04 days ago' },
  { name: '9 Degree CRUD.', image: IMAGES.HhtmlFile, status: '10 days ago' },
  { name: 'User CRUD Styles', image: IMAGES.PptFile, status: '78 days ago' },
  { name: 'Craft Logo', image: IMAGES.Mp3File, status: '65 days ago' },
];

function Documents() {
  return (
    <Fragment>
      <PageTitle motherMenu={'Profile'} activeMenu={'Documents'} />
      <div className="card profile-overview profile-overview-wide">
        <ProfileOverviewCard activePage="documents" />
      </div>
      <Tab.Container defaultActiveKey={'List'}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Documents</h5>
          <div className="d-flex align-items-center">
            <Nav as="ul" className="nav nav-pills">
              <Nav.Item as="li" className="nav-item ms-1">
                <Nav.Link
                  as="button"
                  className="nav-link btn btn-light btn-sharp p-0"
                  eventKey={'List'}
                >
                  {SVGICON.TabList}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="nav-item ms-1">
                <Nav.Link
                  as="button"
                  className="nav-link btn btn-light btn-sharp p-0"
                  eventKey={'Grid'}
                >
                  {SVGICON.TabGrid}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey={'List'}>
            <div className="row">
              {fileExtension.map((item, index) => (
                <div className="col-xl-3 col-md-4 col-sm-6" key={index}>
                  <div className="card">
                    <div className="card-body px-4 py-3 d-flex align-items-center gap-3">
                      <div>
                        <img src={item.image} width="40" alt="icon" />
                      </div>
                      <div className="clearfix">
                        <h6 className="mb-0">{item.name}</h6>
                        <span className="fs-14">{item.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
          <Tab.Pane eventKey={'Grid'}>
            <div className="row">
              {fileExtension.map((item, index) => (
                <div className="col-xl-2 col-lg-4 col-sm-6">
                  <div className="card">
                    <div className="card-body text-center p-4 d-flex flex-column justify-content-between">
                      <div className="m-auto pb-3">
                        <img src={item.image} alt="icon" />
                      </div>
                      <div className="clearfix">
                        <h5 className="mb-0">{item.name}</h5>
                        <span className="fs-14">{item.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Fragment>
  );
}
export default Documents;
