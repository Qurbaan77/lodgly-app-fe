import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './sidenav.css';
import { Layout, Menu } from 'antd';
import { ArrowLeftOutlined, ApartmentOutlined } from '@ant-design/icons';
import logo from '../../../assets/images/logo.png';
import UserProfile from '../userprofile/userprofile';
import { userInstance } from '../../../axios/axiosconfig';
import bookingIcon from '../../../assets/images/menu/booking-icon.png';
import calenderIcon from '../../../assets/images/menu/calendar-icon.png';
import propertyIcon from '../../../assets/images/menu/property-icon.png';
import guestIcon from '../../../assets/images/menu/guest-icon.png';
import teamIcon from '../../../assets/images/menu/team-icon.png';
import invoiceIcon from '../../../assets/images/menu/invoice-icon.png';
import statsIcon from '../../../assets/images/menu/stats-icon.png';
// import integrationIcon from '../../../assets/images/menu/integration-icon.png';
import ownerIcon from '../../../assets/images/menu/owner-icon.png';
import propertyDetailIcon from '../../../assets/images/menu/property-detail-icon.png';
import unitIcon from '../../../assets/images/menu/unit-type-icon.png';
// import taskIcon from '../../../assets/images/menu/task-icon.png';
import channelIcon from '../../../assets/images/menu/channel-icon.png';
import closeicon from '../../../assets/images/menu/close-icon.png';
// import arrow from '../../../assets/images/Polygon.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidenav = ({
  img, name, getUserInfo, handleMenuSide, menutoggle,
}) => {
  const { t } = useTranslation();
  // const [propertyData, setPropertyData] = useState([]);
  const [currProperty, setCurrProperty] = useState('');
  const [hideBooking, setHideBooking] = useState(false);
  const [hideCalendar, setHidecalendar] = useState(false);
  const [hideInvoice, setHideInvoice] = useState(false);
  const [hideTeam, setHideTeam] = useState(false);
  const [hideStats, setHideStats] = useState(false);
  const [hideService, setHideService] = useState(false);
  const [hideOwner, setHideOwner] = useState(false);
  const [disableProperties, setDisableProperties] = useState(false);
  // const [disableGuests, setDisableGuests] = useState(false);
  const isSubUser = localStorage.getItem('isSubUser');
  const subUserCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [
    {
      bookingRead,
      calendarRead,
      invoicesRead,
      propertiesRead,
      serviceRead,
      statsRead,
      teamRead,
      userId,
      ownerRead,
    },
  ] = subUserCred || [{}];

  const getSubUser = useCallback(() => {
    if (!isSubUser) {
      setHideBooking(false);
    } else if (bookingRead) {
      setHideBooking(false);
    } else {
      setHideBooking(true);
    }
    if (!isSubUser) {
      setHidecalendar(false);
    } else if (calendarRead) {
      setHidecalendar(false);
    } else {
      setHidecalendar(true);
    }
    if (!isSubUser) {
      setHideInvoice(false);
    } else if (invoicesRead) {
      setHideInvoice(false);
    } else {
      setHideInvoice(true);
    }
    if (!isSubUser) {
      setDisableProperties(false);
    } else if (propertiesRead) {
      setDisableProperties(false);
    } else {
      setDisableProperties(true);
    }
    if (!isSubUser) {
      setHideService(false);
    } else if (serviceRead) {
      setHideService(false);
    } else {
      setHideService(true);
    }
    if (!isSubUser) {
      setHideStats(false);
    } else if (statsRead) {
      setHideStats(false);
    } else {
      setHideStats(true);
    }
    if (!isSubUser) {
      setHideTeam(false);
    } else if (teamRead) {
      setHideTeam(false);
    } else {
      setHideTeam(true);
    }
    if (!isSubUser) {
      setHideOwner(false);
    } else if (ownerRead) {
      setHideOwner(false);
    } else {
      setHideOwner(true);
    }
  }, [
    bookingRead,
    calendarRead,
    invoicesRead,
    isSubUser,
    propertiesRead,
    serviceRead,
    statsRead,
    teamRead,
    ownerRead,
  ]);
  const getData = useCallback(async () => {
    const values = {
      affiliateId: userId,
    };
    const res = await userInstance.post('/getFeature', values);
    if (res.data.code === 200) {
      const { featureData } = res.data;
      // getFeature(featureData);
      const [
        {
          booking, calendar, properties, team, invoice, owner, stats,
        },
      ] = featureData;
      setHideBooking(isSubUser ? !bookingRead : !booking);
      setHidecalendar(isSubUser ? !calendarRead : !calendar);
      setDisableProperties(!isSubUser ? !properties : !propertiesRead);
      setHideTeam(!isSubUser ? !team : !teamRead);
      setHideInvoice(!isSubUser ? !invoice : !invoicesRead);
      setHideOwner(!isSubUser ? !owner : !ownerRead);
      setHideStats(!isSubUser ? !stats : !statsRead);
    }
    const Id = localStorage.getItem('propertyId');
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      // setPropertyData(data);
      if (Id) {
        const curProperty = data.filter((el) => el.id === parseInt(Id, 10));
        setCurrProperty(curProperty[0].propertyName);
      }
    }
  }, [
    userId,
    bookingRead,
    calendarRead,
    propertiesRead,
    teamRead,
    invoicesRead,
    ownerRead,
    statsRead,
    isSubUser,
  ]);

  const [nav, setNav] = useState(false);
  const [ratesNav, setRatesNav] = useState(false);
  const changeMenu = useCallback(() => {
    const { pathname } = window.location;
    if (
      (pathname === '/property'
        || pathname === '/unittype'
        || pathname === '/channelmanager'
        || pathname === '/services'
        || pathname === '/groups'
        || pathname === '/task')
      && nav === false
    ) {
      setNav(true);
    }
  }, [nav]);

  const changeMenuUnitTypes = useCallback(() => {
    const { pathname } = window.location;
    if (
      (pathname === '/addunittype'
        || pathname === '/rates'
        || pathname === '/seasonrates'
        || pathname === '/createseasonrates')
      && ratesNav === false
    ) {
      setRatesNav(true);
    }
  }, [ratesNav]);

  useEffect(() => {
    changeMenu();
    changeMenuUnitTypes();
  }, [changeMenu, changeMenuUnitTypes]);

  useEffect(() => {
    getData();
    if (localStorage.getItem('isSubUser')) {
      getSubUser();
    }
  }, [getData, getSubUser]);

  const handleMenu = (e) => {
    if (e === 'open') {
      setNav(true);
    } else if (e === 'close') {
      setNav(false);
    } else if (e === 'toggle') {
      setNav(!nav);
    }
  };

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      className={`side-menu ${menutoggle ? 'menu-show' : ''}`}
    >
      <div className="sidebar-logo">
        <img className="logo" src={logo} alt="logo" />
        <img
          className="close-icon"
          src={closeicon}
          alt="close"
          onClick={() => handleMenuSide('close')}
          role="presentation"
          aria-hidden="true"
        />
      </div>

      <UserProfile img={img} name={name} getUserInfo={getUserInfo} />

      <Menu
        className={`main-menu ${nav || ratesNav ? 'hide' : ''}`}
        theme="light"
        mode="inline"
        style={{ height: '100%' }}
      >
        <Menu.Item className="booking-nav" hidden={hideBooking}>
          <img src={bookingIcon} alt="booking-icon" />
          <Link to="/booking">{t('sidebar.menu1')}</Link>
        </Menu.Item>

        <Menu.Item className="calendar-nav" hidden={hideCalendar}>
          <img src={calenderIcon} alt="calendar-icon" />
          <Link to="/calendar">{t('sidebar.menu2')}</Link>
        </Menu.Item>

        <Menu.Item className="property-nav" hidden={disableProperties}>
          <img src={propertyIcon} alt="property-icon" />
          <Link to="/propertylist">{t('sidebar.menu3')}</Link>
        </Menu.Item>

        {/* <SubMenu
          className={`${disableProperties ? 'hide-prop' : 'property-nav'}`}
          onClick={() => handleMenu('toggle')}
          key="2"
          disabled={disableProperties}
          title={(
            <div>
              <img src={propertyIcon} alt="property-icon" />
              <Link to="/propertylist">{t('sidebar.menu3')}</Link>
            </div>
          )}
        >
          {/* {propertyData.map((el) => (
            <Menu.Item key={el.propertyNo}>
              <Link
                to="/property"
                onClick={() => {
                  func(el.id);
                }}
              >
                {' '}
                {el.propertyName}
                {' '}j
              </Link>
            </Menu.Item>
          ))} */}
        {/* </SubMenu> */}

        <SubMenu
          title={(
            <div>
              <img src={guestIcon} alt="guest-icon" />
              <Link to="/">{t('sidebar.menu4')}</Link>
            </div>
          )}
        >
          <Menu.Item className="guest-nav">
            <img src={guestIcon} alt="guest-icon" />
            <Link to="/guests">{t('sidebar.menu4')}</Link>
          </Menu.Item>
          <Menu.Item className="guest-nav">
            <img src={guestIcon} alt="guest-icon" />
            <Link to="/companylist">Companies</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item className="team-nav" hidden={hideTeam}>
          <img src={teamIcon} alt="team" />
          <Link to="/team">{t('sidebar.menu5')}</Link>
        </Menu.Item>

        <Menu.Item className="invoice-nav" hidden={hideInvoice}>
          <img src={invoiceIcon} alt="invoice-icon" />
          <Link to="/invoice">{t('sidebar.menu6')}</Link>
        </Menu.Item>

        <Menu.Item className="stats-nav" hidden={hideStats}>
          <img src={statsIcon} alt="stats=icon" />
          <Link to="/stats">{t('sidebar.menu7')}</Link>
        </Menu.Item>

        {/* <Menu.Item className="integration-nav">
          <img src={integrationIcon} alt="integration-icon" />
          <Link to="/">{t('sidebar.menu8')}</Link>
        </Menu.Item> */}

        <Menu.Item className="owner-nav" hidden={hideOwner}>
          <img src={ownerIcon} alt="owner-icon" />
          <Link to="/owner">{t('sidebar.menu9')}</Link>
        </Menu.Item>
      </Menu>

      <Menu
        className={`main-menu-mbl ${nav ? 'show' : ''}`}
        theme="light"
        mode="inline"
        style={{ height: '100%' }}
      >
        <span
          className="submenu-heading"
          onClick={() => handleMenu('close')}
          role="presentation"
        >
          <Link
            to="/propertylist"
            onClick={() => localStorage.removeItem('propertyId')}
          >
            <ArrowLeftOutlined />
            {' '}
            {currProperty}
          </Link>
        </span>
        <Menu.Item className="detail-nav">
          <img src={propertyDetailIcon} alt="property" />
          <Link to="/property">{t('sidebar.menu11')}</Link>
        </Menu.Item>
        <Menu.Item className="unit-nav">
          <img src={unitIcon} alt="unit" />
          <Link to="/unittype">{t('sidebar.menu12')}</Link>
        </Menu.Item>
        {/* <Menu.Item className="group-nav">
          <img src={taskIcon} alt="task" />
          <Link to="/groups">{t('sidebar.menu13')}</Link>
        </Menu.Item> */}
        <Menu.Item className="channel-nav">
          <img src={channelIcon} alt="channel" />
          <Link to="/channelmanager">{t('sidebar.menu14')}</Link>
        </Menu.Item>

        <Menu.Item className="service-nav" hidden={hideService}>
          <ApartmentOutlined />
          <Link to="/services">{t('sidebar.menu15')}</Link>
        </Menu.Item>
      </Menu>

      <Menu
        className={`main-menu-mbl ${ratesNav ? 'show' : ''}`}
        theme="light"
        mode="inline"
        style={{ height: '100%' }}
      >
        <span
          className="submenu-heading"
          onClick={() => handleMenu('close')}
          role="presentation"
        >
          <Link
            to="/unittype"
            onClick={() => localStorage.removeItem('unittype')}
          >
            <ArrowLeftOutlined />
            {' '}
            Unit Types
          </Link>
        </span>
        <Menu.Item className="unit-nav">
          <img src={propertyDetailIcon} alt="property" />
          <Link to="/addunittype">Units</Link>
        </Menu.Item>

        <Menu.Item className="rates-nav">
          <img src={unitIcon} alt="unit" />
          <Link to="/rates">Rates</Link>
        </Menu.Item>

        <Menu.Item className="season-nav">
          <img src={channelIcon} alt="channel" />
          <Link to="/seasonrates">Season Rates</Link>
        </Menu.Item>
      </Menu>

      <div className="company-ip">
        <h6>
          Page:
          {window.location.host}
        </h6>
        {/* <p>1234-5674-3658</p> */}
      </div>
    </Sider>
  );
};

Sidenav.propTypes = {
  img: PropTypes.element,
  name: PropTypes.string,
  getUserInfo: PropTypes.func,
  menutoggle: PropTypes.bool,
  handleMenuSide: PropTypes.func,
};
Sidenav.defaultProps = {
  img: '',
  name: '',
  getUserInfo: () => {},
  handleMenuSide: () => {},
  menutoggle: false,
};

export default Sidenav;
