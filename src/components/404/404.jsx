import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import AlertBox from '../wrapper/alert';

const PageNotFound = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <>
      <div hidden>
        <AlertBox />
      </div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={handleClick}>Return</Button>}
      />
    </>
  );
};
export default PageNotFound;
