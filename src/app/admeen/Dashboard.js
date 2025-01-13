"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vertical dark">
      <div className="wrapper">
        <nav className="topnav navbar navbar-light">
          <button type="button" className="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
            <i className="fe fe-menu navbar-toggler-icon"></i>
          </button>
          <form className="form-inline mr-auto searchform text-muted">
            <input className="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted" type="search" placeholder="Type something..." aria-label="Search" />
          </form>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-muted my-2" href="#" id="modeSwitcher" data-mode="dark">
                <i className="fe fe-sun fe-16"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-muted my-2" href="#" data-toggle="modal" data-target=".modal-shortcut">
                <span className="fe fe-grid fe-16"></span>
              </a>
            </li>
            <li className="nav-item nav-notif">
              <a className="nav-link text-muted my-2" href="#" data-toggle="modal" data-target=".modal-notif">
                <span className="fe fe-bell fe-16"></span>
                <span className="dot dot-md bg-success"></span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="avatar avatar-sm mt-2">
                  <Image src="/assets/avatars/face-1.jpg" alt="..." width={32} height={32} className="avatar-img rounded-circle" />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" href="#">Settings</a>
                <a className="dropdown-item" href="#">Activities</a>
              </div>
            </li>
          </ul>
        </nav>

        <aside className="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
          <a href="#" className="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
            <i className="fe fe-x"><span className="sr-only"></span></i>
          </a>
          <nav className="vertnav navbar navbar-light">
            <div className="w-100 mb-4 d-flex">
              <Link href="/" className="navbar-brand mx-auto mt-2 flex-fill text-center">
                <Image src="/assets/images/collably-logo.png" alt="" width={120} height={40} className="navbar-brand-img brand-sm" />
              </Link>
            </div>
            <ul className="navbar-nav flex-fill w-100 mb-2">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  <i className="fe fe-home fe-16"></i>
                  <span className="ml-3 item-text">Dashboard</span>
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
            <p className="text-muted nav-heading mt-4 mb-1">
              <span>Components</span>
            </p>
            <ul className="navbar-nav flex-fill w-100 mb-2">
              <li className="nav-item dropdown">
                <a href="#ui-elements" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle nav-link">
                  <i className="fe fe-box fe-16"></i>
                  <span className="ml-3 item-text">UI elements</span>
                </a>
                <ul className="collapse list-unstyled pl-4 w-100" id="ui-elements">
                  <li className="nav-item">
                    <a className="nav-link pl-3" href="#"><span className="ml-1 item-text">Buttons</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link pl-3" href="#"><span className="ml-1 item-text">Cards</span></a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        <main role="main" className="main-content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="row align-items-center mb-2">
                  <div className="col">
                    <h2 className="h5 page-title">Welcome!</h2>
                  </div>
                  <div className="col-auto">
                    <form className="form-inline">
                      <div className="form-group d-none d-lg-inline">
                        <label htmlFor="reportrange" className="sr-only">Date Ranges</label>
                        <div id="reportrange" className="px-2 py-2 text-muted">
                          <span className="small"></span>
                        </div>
                      </div>
                      <div className="form-group">
                        <button type="button" className="btn btn-sm"><span className="fe fe-refresh-ccw fe-16 text-muted"></span></button>
                        <button type="button" className="btn btn-sm mr-2"><span className="fe fe-filter fe-16 text-muted"></span></button>
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="row my-4">
                  <div className="col-md-4">
                    <div className="card shadow mb-4">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col">
                            <small className="text-muted mb-1">Page Views</small>
                            <h3 className="card-title mb-0">1168</h3>
                            <p className="small text-muted mb-0"><span className="fe fe-arrow-down fe-12 text-danger"></span><span>-18.9% Last week</span></p>
                          </div>
                          <div className="col-4 text-right">
                            <span className="sparkline inlineline"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card shadow mb-4">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col">
                            <small className="text-muted mb-1">Conversion</small>
                            <h3 className="card-title mb-0">68</h3>
                            <p className="small text-muted mb-0"><span className="fe fe-arrow-up fe-12 text-warning"></span><span>+1.9% Last week</span></p>
                          </div>
                          <div className="col-4 text-right">
                            <span className="sparkline inlinepie"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card shadow mb-4">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col">
                            <small className="text-muted mb-1">Visitors</small>
                            <h3 className="card-title mb-0">108</h3>
                            <p className="small text-muted mb-0"><span className="fe fe-arrow-up fe-12 text-success"></span><span>37.7% Last week</span></p>
                          </div>
                          <div className="col-4 text-right">
                            <span className="sparkline inlinebar"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="card shadow mb-4">
                      <div className="card-header">
                        <strong>Goal</strong>
                      </div>
                      <div className="card-body px-4">
                        <div className="row border-bottom">
                          <div className="col-4 text-center mb-3">
                            <p className="mb-1 small text-muted">Completions</p>
                            <span className="h3">26</span><br />
                            <span className="small text-muted">+20%</span>
                            <span className="fe fe-arrow-up text-success fe-12"></span>
                          </div>
                          <div className="col-4 text-center mb-3">
                            <p className="mb-1 small text-muted">Goal Value</p>
                            <span className="h3">₹260</span><br />
                            <span className="small text-muted">+6%</span>
                            <span className="fe fe-arrow-up text-success fe-12"></span>
                          </div>
                          <div className="col-4 text-center mb-3">
                            <p className="mb-1 small text-muted">Conversion</p>
                            <span className="h3">6%</span><br />
                            <span className="small text-muted">-2%</span>
                            <span className="fe fe-arrow-down text-danger fe-12"></span>
                          </div>
                        </div>
                        <table className="table table-borderless mt-3 mb-1 mx-n1 table-sm">
                          <thead>
                            <tr>
                              <th className="w-50">Goal</th>
                              <th className="text-right">Conversion</th>
                              <th className="text-right">Completions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Checkout</td>
                              <td className="text-right">5%</td>
                              <td className="text-right">260</td>
                            </tr>
                            <tr>
                              <td>Add to Cart</td>
                              <td className="text-right">55%</td>
                              <td className="text-right">1260</td>
                            </tr>
                            <tr>
                              <td>Contact</td>
                              <td className="text-right">18%</td>
                              <td className="text-right">460</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card shadow mb-4">
                      <div className="card-header">
                        <strong className="card-title">Top Selling</strong>
                        <a className="float-right small text-muted" href="#!">View all</a>
                      </div>
                      <div className="card-body">
                        <div className="list-group list-group-flush my-n3">
                          <div className="list-group-item">
                            <div className="row align-items-center">
                              <div className="col-3 col-md-2">
                                <Image src="/assets/products/p1.jpg" alt="..." width={64} height={64} className="thumbnail-sm" />
                              </div>
                              <div className="col">
                                <strong>Fusion Backpack</strong>
                                <div className="my-0 text-muted small">Gear, Bags</div>
                              </div>
                              <div className="col-auto">
                                <strong>+85%</strong>
                                <div className="progress mt-2" style={{ height: '4px' }}>
                                  <div className="progress-bar" role="progressbar" style={{ width: '85%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="list-group-item">
                            <div className="row align-items-center">
                              <div className="col-3 col-md-2">
                                <Image src="/assets/products/p2.jpg" alt="..." width={64} height={64} className="thumbnail-sm" />
                              </div>
                              <div className="col">
                                <strong>Luma hoodies</strong>
                                <div className="my-0 text-muted small">Jackets, Men</div>
                              </div>
                              <div className="col-auto">
                                <strong>+75%</strong>
                                <div className="progress mt-2" style={{ height: '4px' }}>
                                  <div className="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="list-group-item">
                            <div className="row align-items-center">
                              <div className="col-3 col-md-2">
                                <Image src="/assets/products/p3.jpg" alt="..." width={64} height={64} className="thumbnail-sm" />
                              </div>
                              <div className="col">
                                <strong>Luma shorts</strong>
                                <div className="my-0 text-muted small">Shorts, Men</div>
                              </div>
                              <div className="col-auto">
                                <strong>+62%</strong>
                                <div className="progress mt-2" style={{ height: '4px' }}>
                                  <div className="progress-bar" role="progressbar" style={{ width: '62%' }} aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="list-group-item">
                            <div className="row align-items-center">
                              <div className="col-3 col-md-2">
                                <Image src="/assets/products/p4.jpg" alt="..." width={64} height={64} className="thumbnail-sm" />
                              </div>
                              <div className="col">
                                <strong>Brown Trousers</strong>
                                <div className="my-0 text-muted small">Trousers, Women</div>
                              </div>
                              <div className="col-auto">
                                <strong>+24%</strong>
                                <div className="progress mt-2" style={{ height: '4px' }}>
                                  <div className="progress-bar" role="progressbar" style={{ width: '24%' }} aria-valuenow="24" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <div className="card shadow eq-card">
                      <div className="card-header">
                        <strong className="card-title">Recent Orders</strong>
                        <a className="float-right small text-muted" href="#!">View all</a>
                      </div>
                      <div className="card-body">
                        <table className="table table-hover table-borderless table-striped mt-n3 mb-n1">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Company</th>
                              <th>Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>3224</td>
                              <th scope="col">Keith Baird</th>
                              <td>Enim Limited<br /><span className="small text-muted">901-6206 Cras Av.</span></td>
                              <td>Apr 24, 2019</td>
                              <td><span className="dot dot-lg bg-warning mr-2"></span></td>
                            </tr>
                            <tr>
                              <td>3218</td>
                              <th scope="col">Graham Price</th>
                              <td>Nunc Lectus Incorporated<br /><span className="small text-muted">Ap #705-5389 Id St.</span></td>
                              <td>May 23, 2020</td>
                              <td><span className="dot dot-lg bg-success mr-2"></span></td>
                            </tr>
                            <tr>
                              <td>2651</td>
                              <th scope="col">Reuben Orr</th>
                              <td>Nisi Aenean Eget Limited<br />
                                <span className="small text-muted">7425 Malesuada Rd.</span></td>
                              <td>Nov 4, 2019</td>
                              <td><span className="dot dot-lg bg-warning mr-2"></span></td>
                            </tr>
                            <tr>
                              <td>2636</td>
                              <th scope="col">Akeem Holder</th>
                              <td>Pellentesque Associates<br />
                                <span className="small text-muted">896 Sodales St.</span></td>
                              <td>Mar 27, 2020</td>
                              <td><span className="dot dot-lg bg-danger mr-2"></span></td>
                            </tr>
                            <tr>
                              <td>2757</td>
                              <th scope="col">Beau Barrera</th>
                              <td>Augue Incorporated<br />
                                <span className="small text-muted">4583 Id St.</span></td>
                              <td>Jan 13, 2020</td>
                              <td><span className="dot dot-lg bg-success mr-2"></span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card shadow eq-card timeline">
                      <div className="card-header">
                        <strong className="card-title">Recent Activity</strong>
                        <a className="float-right small text-muted" href="#!">View all</a>
                      </div>
                      <div className="card-body" style={{ height: '360px', overflowY: 'auto', overflowX: 'hidden' }}>
                        <div className="pb-3 timeline-item item-primary">
                          <div className="pl-5">
                            <div className="mb-1 small"><strong>@Brown Asher</strong><span className="text-muted mx-2">Just create new layout Index, form, table</span><strong>Tiny Admin</strong></div>
                            <p className="small text-muted">Creative Design <span className="badge badge-light">1h ago</span>
                            </p>
                          </div>
                        </div>
                        <div className="pb-3 timeline-item item-warning">
                          <div className="pl-5">
                            <div className="mb-3 small"><strong>@Fletcher Everett</strong><span className="text-muted mx-2">created new group for</span><strong>Tiny Admin</strong></div>
                            <ul className="avatars-list mb-2">
                              <li>
                                <a href="#!" className="avatar avatar-sm">
                                  <Image alt="..." className="avatar-img rounded-circle" src="/assets/avatars/face-1.jpg" width={32} height={32} />
                                </a>
                              </li>
                              <li>
                                <a href="#!" className="avatar avatar-sm">
                                  <Image alt="..." className="avatar-img rounded-circle" src="/assets/avatars/face-4.jpg" width={32} height={32} />
                                </a>
                              </li>
                              <li>
                                <a href="#!" className="avatar avatar-sm">
                                  <Image alt="..." className="avatar-img rounded-circle" src="/assets/avatars/face-3.jpg" width={32} height={32} />
                                </a>
                              </li>
                            </ul>
                            <p className="small text-muted">Front-End Development <span className="badge badge-light">1h ago</span>
                            </p>
                          </div>
                        </div>
                        <div className="pb-3 timeline-item item-success">
                          <div className="pl-5">
                            <div className="mb-2 small"><strong>@Kelley Sonya</strong><span className="text-muted mx-2">has commented on</span><strong>Advanced table</strong></div>
                            <div className="card d-inline-flex mb-2">
                              <div className="card-body bg-light small py-2 px-3"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </div>
                            </div>
                            <p className="small text-muted">Back-End Development <span className="badge badge-light">1h ago</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8">
                    <div className="card shadow eq-card">
                      <div className="card-header">
                        <strong className="card-title">Affiliate tracking</strong>
                        <a className="float-right small text-muted" href="#!">View all</a>
                      </div>
                      <div className="card-body">
                        <table className="table table-hover table-borderless table-striped mt-n3 mb-n1">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Affiliate</th>
                              <th>Product</th>
                              <th>Brand</th>
                              <th>Date</th>
                              <th>Commission</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>A5324</td>
                              <th scope="col">John Smith</th>
                              <td>Premium Package<br /><span className="small text-muted">30-day access</span></td>
                              <td>RedTape</td>
                              <td>Jun 15, 2023</td>
                              <td>₹45.00</td>
                            </tr>
                            <tr>
                              <td>A5318</td>
                              <th scope="col">Emma Johnson</th>
                              <td>Basic Course<br /><span className="small text-muted">Lifetime access</span></td>
                              <td>Drishti IAS</td>
                              <td>Jun 14, 2023</td>
                              <td>₹30.00</td>
                            </tr>
                            <tr>
                              <td>A5312</td>
                              <th scope="col">Michael Brown</th>
                              <td>Pro Subscription<br /><span className="small text-muted">Annual plan</span></td>
                              <td>Amazon Prime</td>
                              <td>Jun 13, 2023</td>
                              <td>₹100.00</td>
                            </tr>
                            <tr>
                              <td>A5306</td>
                              <th scope="col">Sarah Davis</th>
                              <td>E-book Bundle<br /><span className="small text-muted">5 e-books</span></td>
                              <td>MCGrowHill</td>
                              <td>Jun 12, 2023</td>
                              <td>₹25.00</td>
                            </tr>
                            <tr>
                              <td>A5300</td>
                              <th scope="col">Robert Wilson</th>
                              <td>Video Course<br /><span className="small text-muted">10-hour course</span></td>
                              <td>H&M</td>
                              <td>Jun 11, 2023</td>
                              <td>₹50.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

