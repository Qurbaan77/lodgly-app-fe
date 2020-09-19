// eslint-disable-next-line react/jsx-no-undef
<Row
  style={{
    alignItems: 'center',
    padding: '0px 20px',
    // marginBottom: '20px',
    background: '#fbfbfc',
    paddingTop: '20px',
  }}
  hidden={show}
>
  {data.map((el, i) => (
    <Col span={24} className="unit-border">
      <div className="reservation-booker select-unit-reservation" id={el}>
        <Row>
          <Col span={12} className="unit-available">
            <label htmlFor="units">
              <input hidden />
              Units
            </label>
            <p>{el.unitTypeName}</p>
            <span>Available :{el.noOfUnits}</span>
          </Col>

          <Col span={12}>
            {/* <Form.Item label="Number of units" name={`units${i}`}> */}
            <Form.Item
              label="Number of units"
              name={[`array${i}`, 'units']}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select style={{ width: '50%', display: 'inline-block' }}>
                {Array.from(Array(el.noOfUnits).keys()).map((ele) => (
                  <Select.Option value={ele} key={ele + 1}>
                    {ele + 1}
                  </Select.Option>
                ))}
                {/* {el.units.map((ele, k) => (
                          <Select.Option value={ele} key={k+1}>
                            {k + 1}
                          </Select.Option>
                        ))} */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Price per night/unit"
              name={[`array${i}`, 'pricePer']}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{
                  width: '50%',
                  display: 'inline-block',
                  marginRight: '10px',
                }}
                onChange={(e) => priceFunction(e.target.value, i)}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Total per unit type"
              name={[`array${i}`, 'amount']}
            >
              <Input
                style={{
                  width: '50%',
                  display: 'inline-block',
                  marginRight: '10px',
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="price-per-night">
        <Collapse accordion>
          <Panel
            icon={<PlusSquareOutlined />}
            header="Price per night"
            key="11"
          >
            <div className="night-container">
              {daysArr.map((ele, j) => (
                <div className="night-box">
                  <Form.Item
                    label={
                      startDate + j <= currMonthDay
                        ? `${startDate + j} : ${startDateMonth}`
                        : `${0 + j} : ${startDateMonth + 1}`
                    }
                    name={[`array${i}`, ele, 'everyDayPrice']}
                  >
                    <Input />
                  </Form.Item>
                </div>
              ))}
            </div>
          </Panel>
        </Collapse>
      </div>
    </Col>
  ))}
</Row>;
