import React from 'react';
import { Link } from 'react-router-dom';

// Import Chart
import ApexBar4 from '../../charts/apexcharts/Bar4';
import ApexBar5 from '../../charts/apexcharts/Bar5';

const Flot = () => {
  return (
    <>
      <div>
        <div className="page-titles">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="">Charts</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="">Flot</Link>
            </li>
          </ol>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Bar Chart</h4>
                  </div>
                  <div className="card-body">
                    <ApexBar4></ApexBar4>

                    <div
                      className="flot-text"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        fontSize: 'smaller',
                        color: 'rgb(84, 84, 84)',
                      }}
                    >
                      <div
                        className="flot-x-axis flot-x1-axis xAxis x1Axis"
                        style={{
                          position: 'absolute',
                          inset: 0,
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            maxWidth: 60,
                            top: 238,
                            font: '400 10px / 12px poppins, sans-serif',
                            color: 'rgb(255, 255, 255)',
                            left: 17,
                            textAlign: 'center',
                          }}
                        >
                          0.0
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 83,
                              textAlign: 'center',
                            }}
                          >
                            2.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 148,
                              textAlign: 'center',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 214,
                              textAlign: 'center',
                            }}
                          >
                            7.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 277,
                              textAlign: 'center',
                            }}
                          >
                            10.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 343,
                              textAlign: 'center',
                            }}
                          >
                            12.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 409,
                              textAlign: 'center',
                            }}
                          >
                            15.0
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 227,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            0.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 190,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 5,
                              textAlign: 'right',
                            }}
                          >
                            2.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 152,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 115,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 5,
                              textAlign: 'right',
                            }}
                          >
                            7.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 77,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 1,
                              textAlign: 'right',
                            }}
                          >
                            10.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 40,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 2,
                              textAlign: 'right',
                            }}
                          >
                            12.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 1,
                              textAlign: 'right',
                            }}
                          >
                            15.0
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Bar Chart</h4>
                  </div>
                  <div className="card-body">
                    <ApexBar5
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    ></ApexBar5>
                    <canvas
                      className="flot-base"
                      width={426}
                      height={251}
                      style={{
                        direction: 'ltr',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '426.5px',
                        height: '251.188px',
                      }}
                    />
                    <div
                      className="flot-text"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        fontSize: 'smaller',
                        color: 'rgb(84, 84, 84)',
                      }}
                    >
                      <div
                        className="flot-x-axis flot-x1-axis xAxis x1Axis"
                        style={{
                          position: 'absolute',
                          inset: 0,
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            maxWidth: 53,
                            top: 238,
                            font: '400 10px / 12px poppins, sans-serif',
                            color: 'rgb(255, 255, 255)',
                            left: 17,
                            textAlign: 'center',
                          }}
                        >
                          0.0
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 53,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 78,
                              textAlign: 'center',
                            }}
                          >
                            2.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 53,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 140,
                              textAlign: 'center',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 53,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 202,
                              textAlign: 'center',
                            }}
                          >
                            7.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 53,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 261,
                              textAlign: 'center',
                            }}
                          >
                            10.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 53,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 323,
                              textAlign: 'center',
                            }}
                          >
                            12.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 53,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 384,
                              textAlign: 'center',
                            }}
                          >
                            15.0
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 227,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            0.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 190,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 5,
                              textAlign: 'right',
                            }}
                          >
                            2.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 152,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 115,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 5,
                              textAlign: 'right',
                            }}
                          >
                            7.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 77,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 1,
                              textAlign: 'right',
                            }}
                          >
                            10.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 40,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 2,
                              textAlign: 'right',
                            }}
                          >
                            12.5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 1,
                              textAlign: 'right',
                            }}
                          >
                            15.0
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Line Chart</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="flotLine1"
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    >
                      <canvas
                        className="flot-base"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div
                        className="flot-text"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          fontSize: 'smaller',
                          color: 'rgb(84, 84, 84)',
                        }}
                      >
                        <div
                          className="flot-x-axis flot-x1-axis xAxis x1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 8,
                              textAlign: 'center',
                            }}
                          >
                            0.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 76,
                              textAlign: 'center',
                            }}
                          >
                            1.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 142,
                              textAlign: 'center',
                            }}
                          >
                            2.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 210,
                              textAlign: 'center',
                            }}
                          >
                            3.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 277,
                              textAlign: 'center',
                            }}
                          >
                            4.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 344,
                              textAlign: 'center',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 411,
                              textAlign: 'center',
                            }}
                          >
                            6.0
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 228,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 153,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 77,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            10
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(153, 153, 153)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            15
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div className="legend">
                        <div
                          style={{
                            position: 'absolute',
                            width: 151,
                            height: 38,
                            top: 13,
                            left: 20,
                            backgroundColor: 'rgb(255, 255, 255)',
                            opacity: '0.85',
                          }}
                        >
                          {' '}
                        </div>
                        <table
                          style={{
                            position: 'absolute',
                            top: 13,
                            left: 20,
                            fontSize: 'smaller',
                            color: '#545454',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #36c95f',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">New Customer</td>
                            </tr>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #a336c9',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">
                                Returning Customer
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Line Chart</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="flotLine2"
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    >
                      <canvas
                        className="flot-base"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div
                        className="flot-text"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          fontSize: 'smaller',
                          color: 'rgb(84, 84, 84)',
                        }}
                      >
                        <div
                          className="flot-x-axis flot-x1-axis xAxis x1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 8,
                              textAlign: 'center',
                            }}
                          >
                            0.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 76,
                              textAlign: 'center',
                            }}
                          >
                            1.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 142,
                              textAlign: 'center',
                            }}
                          >
                            2.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 210,
                              textAlign: 'center',
                            }}
                          >
                            3.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 277,
                              textAlign: 'center',
                            }}
                          >
                            4.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 344,
                              textAlign: 'center',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 411,
                              textAlign: 'center',
                            }}
                          >
                            6.0
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 228,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 153,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 77,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            10
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            15
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div className="legend">
                        <div
                          style={{
                            position: 'absolute',
                            width: 151,
                            height: 38,
                            top: 13,
                            left: 20,
                            backgroundColor: 'rgb(255, 255, 255)',
                            opacity: '0.85',
                          }}
                        >
                          {' '}
                        </div>
                        <table
                          style={{
                            position: 'absolute',
                            top: 13,
                            left: 20,
                            fontSize: 'smaller',
                            color: '#545454',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #36c95f',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">New Customer</td>
                            </tr>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #a336c9',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">
                                Returning Customer
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Line Chart</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="flotLine3"
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    >
                      <canvas
                        className="flot-base"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div
                        className="flot-text"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          fontSize: 'smaller',
                          color: 'rgb(84, 84, 84)',
                        }}
                      >
                        <div
                          className="flot-x-axis flot-x1-axis xAxis x1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 8,
                              textAlign: 'center',
                            }}
                          >
                            0.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 76,
                              textAlign: 'center',
                            }}
                          >
                            1.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 142,
                              textAlign: 'center',
                            }}
                          >
                            2.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 210,
                              textAlign: 'center',
                            }}
                          >
                            3.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 277,
                              textAlign: 'center',
                            }}
                          >
                            4.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 344,
                              textAlign: 'center',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 411,
                              textAlign: 'center',
                            }}
                          >
                            6.0
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 228,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 153,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 77,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            10
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            15
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div className="legend">
                        <div
                          style={{
                            position: 'absolute',
                            width: 151,
                            height: 38,
                            top: 13,
                            left: 20,
                            backgroundColor: 'rgb(255, 255, 255)',
                            opacity: '0.85',
                          }}
                        >
                          {' '}
                        </div>
                        <table
                          style={{
                            position: 'absolute',
                            top: 13,
                            left: 20,
                            fontSize: 'smaller',
                            color: '#545454',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #36c95f',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">New Customer</td>
                            </tr>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #a336c9',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">
                                Returning Customer
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Area Chart</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="flotArea1"
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    >
                      <canvas
                        className="flot-base"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div
                        className="flot-text"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          fontSize: 'smaller',
                          color: 'rgb(84, 84, 84)',
                        }}
                      >
                        <div
                          className="flot-x-axis flot-x1-axis xAxis x1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 8,
                              textAlign: 'center',
                            }}
                          >
                            0.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 76,
                              textAlign: 'center',
                            }}
                          >
                            1.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 142,
                              textAlign: 'center',
                            }}
                          >
                            2.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 210,
                              textAlign: 'center',
                            }}
                          >
                            3.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 277,
                              textAlign: 'center',
                            }}
                          >
                            4.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 344,
                              textAlign: 'center',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 411,
                              textAlign: 'center',
                            }}
                          >
                            6.0
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 228,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 153,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 77,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            10
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            15
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div className="legend">
                        <div
                          style={{
                            position: 'absolute',
                            width: 151,
                            height: 38,
                            top: 13,
                            left: 20,
                            backgroundColor: 'rgb(255, 255, 255)',
                            opacity: '0.85',
                          }}
                        >
                          {' '}
                        </div>
                        <table
                          style={{
                            position: 'absolute',
                            top: 13,
                            left: 20,
                            fontSize: 'smaller',
                            color: '#545454',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #36c95f',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">New Customer</td>
                            </tr>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #a336c9',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">
                                Returning Customer
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Area Chart</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="flotArea2"
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    >
                      <canvas
                        className="flot-base"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div
                        className="flot-text"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          fontSize: 'smaller',
                          color: 'rgb(84, 84, 84)',
                        }}
                      >
                        <div
                          className="flot-x-axis flot-x1-axis xAxis x1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 8,
                              textAlign: 'center',
                            }}
                          >
                            0.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 76,
                              textAlign: 'center',
                            }}
                          >
                            1.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 142,
                              textAlign: 'center',
                            }}
                          >
                            2.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 210,
                              textAlign: 'center',
                            }}
                          >
                            3.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 277,
                              textAlign: 'center',
                            }}
                          >
                            4.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 344,
                              textAlign: 'center',
                            }}
                          >
                            5.0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 60,
                              top: 239,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 411,
                              textAlign: 'center',
                            }}
                          >
                            6.0
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 228,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 153,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 3,
                              textAlign: 'right',
                            }}
                          >
                            5
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 77,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            10
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 0,
                              textAlign: 'right',
                            }}
                          >
                            15
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div className="legend">
                        <div
                          style={{
                            position: 'absolute',
                            width: 151,
                            height: 38,
                            top: 13,
                            left: 20,
                            backgroundColor: 'rgb(255, 255, 255)',
                            opacity: '0.85',
                          }}
                        >
                          {' '}
                        </div>
                        <table
                          style={{
                            position: 'absolute',
                            top: 13,
                            left: 20,
                            fontSize: 'smaller',
                            color: '#545454',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #36c95f',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">New Customer</td>
                            </tr>
                            <tr>
                              <td className="legendColorBox">
                                <div
                                  style={{
                                    border: '1px solid #ccc',
                                    padding: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 4,
                                      height: 0,
                                      border: '5px solid #a336c9',
                                      overflow: 'hidden',
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="legendLabel">
                                Returning Customer
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Realtime Chart</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="flotRealtime1"
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    >
                      <canvas
                        className="flot-base"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div
                        className="flot-text"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          fontSize: 'smaller',
                          color: 'rgb(84, 84, 84)',
                        }}
                      >
                        <div
                          className="flot-x-axis flot-x1-axis xAxis x1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 19,
                              textAlign: 'center',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 98,
                              textAlign: 'center',
                            }}
                          >
                            10
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 178,
                              textAlign: 'center',
                            }}
                          >
                            20
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 259,
                              textAlign: 'center',
                            }}
                          >
                            30
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 339,
                              textAlign: 'center',
                            }}
                          >
                            40
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 227,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 10,
                              textAlign: 'right',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 182,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 5,
                              textAlign: 'right',
                            }}
                          >
                            20
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 137,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            40
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 92,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            60
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 47,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            80
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 1,
                              textAlign: 'right',
                            }}
                          >
                            100
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Realtime Chart</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="flotRealtime2"
                      className="flot-chart"
                      style={{ padding: 0, position: 'relative' }}
                    >
                      <canvas
                        className="flot-base"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                      <div
                        className="flot-text"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          fontSize: 'smaller',
                          color: 'rgb(84, 84, 84)',
                        }}
                      >
                        <div
                          className="flot-x-axis flot-x1-axis xAxis x1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 19,
                              textAlign: 'center',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 98,
                              textAlign: 'center',
                            }}
                          >
                            10
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 178,
                              textAlign: 'center',
                            }}
                          >
                            20
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 259,
                              textAlign: 'center',
                            }}
                          >
                            30
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              maxWidth: 71,
                              top: 238,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 339,
                              textAlign: 'center',
                            }}
                          >
                            40
                          </div>
                        </div>
                        <div
                          className="flot-y-axis flot-y1-axis yAxis y1Axis"
                          style={{
                            position: 'absolute',
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 227,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 10,
                              textAlign: 'right',
                            }}
                          >
                            0
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 182,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 5,
                              textAlign: 'right',
                            }}
                          >
                            20
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 137,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            40
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 92,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            60
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 47,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 4,
                              textAlign: 'right',
                            }}
                          >
                            80
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              top: 2,
                              font: '400 10px / 12px poppins, sans-serif',
                              color: 'rgb(255, 255, 255)',
                              left: 1,
                              textAlign: 'right',
                            }}
                          >
                            100
                          </div>
                        </div>
                      </div>
                      <canvas
                        className="flot-overlay"
                        width={426}
                        height={251}
                        style={{
                          direction: 'ltr',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '426.5px',
                          height: '251.188px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flot;
