import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Wrapper from '../wrapper';

const PageNotFound = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <Wrapper>
      <div className="result-404">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary" onClick={handleClick}>Return</Button>}
        />
      </div>
    </Wrapper>
  );
};
export default PageNotFound;
