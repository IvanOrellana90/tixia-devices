import { Fragment, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import AccountDefaultCard from './Account/AccountDefaultCard';
import SellingCategories from '../Profile/Profile/SellingCategories';
import Contributions from '../Profile/Profile/Contributions';
import { IMAGES } from '../../content/theme';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const basicDetail = [
  { title: 'Full Name', subtitle: 'Brad Dennis' },
  { title: 'Company', subtitle: 'DexignLab' },
  { title: 'Contact Phone', subtitle: '123 456 7890' },
  { title: 'Company Site', subtitle: 'dexignlab.com' },
  { title: 'Country', subtitle: 'United States' },
  { title: 'Communication', subtitle: 'Email, Phone' },
  { title: 'Allow Changes', subtitle: 'Yes' },
];

const tableData = [
  {
    itemname: 'AudioEngine HD3',
    productid: '#PXF-578',
    added: 'Nov 01, 2024',
    status: 'In Stock',
    statuscolor: 'success',
    price: '$1,120',
    qty: '58 PCS',
  },
  {
    itemname: 'Google Pixel 6 Pro',
    productid: '#XGY-356',
    added: 'Sep 27, 2024',
    status: 'Out of Stock',
    statuscolor: 'danger',
    price: '$440',
    qty: '14 PCS',
  },
  {
    itemname: 'Dell 32 UltraSharp',
    productid: '#SRR-678',
    added: 'Jul 09, 2024',
    status: 'Out of Stock',
    statuscolor: 'danger',
    price: '$4,720',
    qty: '58 PCS',
  },
  {
    itemname: 'Google Pixel 6 Pro',
    productid: '#XGY-356',
    added: 'May 14, 2024',
    status: 'In Stock',
    statuscolor: 'success',
    price: '$120',
    qty: '11 PCS',
  },
  {
    itemname: 'AudioEngine HD3',
    productid: '#XGY-356',
    added: 'Dec 30, 2024',
    status: 'In Stock',
    statuscolor: 'success',
    price: '$503',
    qty: '58 PCS',
  },
  {
    itemname: 'Google Pixel 6 Pro',
    productid: '#SRR-678',
    added: 'Oct 25, 2024',
    status: 'Out of Stock',
    statuscolor: 'danger',
    price: '$102',
    qty: '96 PCS',
  },
];
function AccountOverview() {
  const [control, setControl] = useState('Slow All');
  return (
    <Fragment>
      <PageTitle activeMenu={'Overview'} motherMenu={'Account'} />
      <div className="card profile-overview">
        <AccountDefaultCard activePage={'overview'} />
      </div>
      <div className="tab-content" id="tabContentMyProfileBottom">
        <div className="row">
          <div className="col-xl-5 col-xxl-6">
            <div className="card">
              <div className="card-header py-3">
                <h6 className="card-title">Profile Details</h6>
                <Link to={'#'} className="btn btn-sm btn-primary">
                  Edit Profile
                </Link>
              </div>
              <div className="card-body">
                {basicDetail.map((elem, ind) => (
                  <div className="row py-2" key={ind}>
                    <div className="col-6">
                      <span className="fs-13">{elem.title}</span>
                    </div>
                    <div className="col-6">
                      <span className="fs-13 fw-semibold">{elem.subtitle}</span>
                    </div>
                  </div>
                ))}

                <div className="alert alert-warning border-warning outline-dashed py-3 px-3 mt-4 mb-0 text-dark d-flex align-items-center">
                  <div className="clearfix">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 30C18.9782 30 22.7936 28.4196 25.6066 25.6066C28.4196 22.7936 30 18.9782 30 15C30 11.0218 28.4196 7.20644 25.6066 4.3934C22.7936 1.58035 18.9782 0 15 0C11.0218 0 7.20644 1.58035 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 18.9782 1.58035 22.7936 4.3934 25.6066C7.20644 28.4196 11.0218 30 15 30ZM12.6562 19.6875H14.0625V15.9375H12.6562C11.877 15.9375 11.25 15.3105 11.25 14.5312C11.25 13.752 11.877 13.125 12.6562 13.125H15.4688C16.248 13.125 16.875 13.752 16.875 14.5312V19.6875H17.3438C18.123 19.6875 18.75 20.3145 18.75 21.0938C18.75 21.873 18.123 22.5 17.3438 22.5H12.6562C11.877 22.5 11.25 21.873 11.25 21.0938C11.25 20.3145 11.877 19.6875 12.6562 19.6875ZM15 7.5C15.4973 7.5 15.9742 7.69754 16.3258 8.04918C16.6775 8.40081 16.875 8.87772 16.875 9.375C16.875 9.87228 16.6775 10.3492 16.3258 10.7008C15.9742 11.0525 15.4973 11.25 15 11.25C14.5027 11.25 14.0258 11.0525 13.6742 10.7008C13.3225 10.3492 13.125 9.87228 13.125 9.375C13.125 8.87772 13.3225 8.40081 13.6742 8.04918C14.0258 7.69754 14.5027 7.5 15 7.5Z"
                        fill="#FF8A11"
                      ></path>
                    </svg>
                  </div>
                  <div className="mx-3">
                    <h6 className="mb-0 fw-semibold">
                      We need your attention!
                    </h6>
                    <p className="mb-0 fs-13">
                      Your Payment was declined. To start using tools, please{' '}
                      <Link to={'#'} className="text-warning">
                        Add Payment Method
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-xxl-6 col-lg-6">
            <Contributions />
          </div>
          <div className="col-xl-3 col-xxl-4 col-lg-6">
            <div className="card">
              <div className="card-body text-center p-3 pb-1">
                <div className="clearfix">
                  <h4>
                    Upgrade to Pro <br /> Create Limitless Deals
                  </h4>
                  <p>
                    Craft a headline that is both informative and will capture
                    creating an outline, and checking facts
                  </p>
                  <Link to={'#'} className="btn btn-primary">
                    Upgrade Now
                  </Link>
                </div>
                <div className="px-md-3">
                  <img
                    className="view-light w-100"
                    src={IMAGES.Upgrade}
                    alt="upgrade"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-xxl-8">
            <SellingCategories />
          </div>
          <div className="col-xl-7 col-xxl-12">
            <div className="card">
              <div className="card-header border-0 pt-3 pb-0">
                <h4 className="heading mb-0">Stock Report</h4>
                <div className="clearfix d-inline-flex">
                  <Dropdown className="">
                    <Dropdown.Toggle
                      as="div"
                      className="btn btn-primary tp-btn-light  d-flex align-items-center i-false"
                    >
                      {control}
                      <i className="fas fa-angle-down text-primary ms-1" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu dropdown-menu-end mt-1"
                      align="end"
                    >
                      <Dropdown.Item onClick={() => setControl('Slow All')}>
                        Slow All
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setControl('In Stock')}>
                        In Stock
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setControl('Out of Stock')}>
                        Out of Stock
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <button type="button" className="btn btn-sm btn-primary ms-2">
                    View All
                  </button>
                </div>
              </div>
              <div className="card-body py-3">
                <div className="table-responsive">
                  <table className="table mb-1 table-striped-thead table-wide table-md table-border-last-0">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Product Id</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th className="text-end">Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((data, ind) => (
                        <tr key={ind}>
                          <td>{data.itemname}</td>
                          <td>{data.productid}</td>
                          <td>{data.added}</td>
                          <td>
                            <span
                              className={`badge badge-sm light border-0 badge-${data.statuscolor}`}
                            >
                              {data.status}
                            </span>
                          </td>
                          <td>{data.price}</td>
                          <td className="text-end">{data.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default AccountOverview;
