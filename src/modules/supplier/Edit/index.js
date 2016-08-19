import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, FormItem, Row, Select, Table } from 'antd';
import { isEmpty } from 'lodash';
import { fetchFilters } from 'redux/modules/supplyChain/supplierFilters';
import { fetchProvinces, fetchCities, fetchDistricts } from 'redux/modules/supplyChain/district';

const actionCreators = {
  fetchFilters: fetchFilters,
  fetchProvinces: fetchProvinces,
  fetchCities: fetchCities,
  fetchDistricts: fetchDistricts,
};

@connect(
  state => ({
    filters: state.supplierFilters,
    district: state.district,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
class EditWithForm extends Component {

  static propTypes = {
    form: React.PropTypes.object,
    filters: React.PropTypes.object,
    district: React.PropTypes.object,
    fetchFilters: React.PropTypes.func,
    fetchProvinces: React.PropTypes.func,
    fetchCities: React.PropTypes.func,
    fetchDistricts: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  state = {

  }

  componentWillMount() {
    const { filters } = this.props;
    if (isEmpty(filters.categorys)) {
      this.props.fetchFilters();
    }
    this.props.fetchProvinces();
  }

  onProvinceChange = (value) => {
    this.props.form.setFieldsValue({ province: value });
    this.props.form.setFieldsValue({ city: undefined });
    this.props.form.setFieldsValue({ district: undefined });
    this.props.fetchCities(value);
  }

  onCityChange = (value) => {
    this.props.form.setFieldsValue({ city: value });
    this.props.form.setFieldsValue({ district: undefined });
    this.props.fetchDistricts(value);
  }

  onDistrictChange = (value) => {
    this.props.form.setFieldsValue({ district: value });
  }

  onSubmitCliick = (e) => {
    console.log(this.props.form.getFieldsValue());
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log(errors);
        return;
      }
      console.log(this.props.form.getFieldsValue());
    });
  }

  formItemLayout = () => ({
    labelCol: { span: 2 },
    wrapperCol: { span: 5 },
  })

  render() {
    const { getFieldProps, getFieldValue, setFieldsValue } = this.props.form;
    const { filters, district } = this.props;
    return (
      <div>
        <Form horizontal>
          <Form.Item {...this.formItemLayout()} label="公司名称">
            <Input {...getFieldProps('supplierName', { rules: [{ required: true, message: '请输入公司名称！' }] })} value={getFieldValue('supplierName')} placeholder="请输入公司名称" />
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="品牌名称">
            <Input {...getFieldProps('supplierCode', { rules: [{ required: true, message: '请输入品牌名称！' }] })} value={getFieldValue('supplierCode')} placeholder="请输入品牌名称" />
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="品牌主页">
            <Input {...getFieldProps('mainPage', { rules: [{ required: true, message: '请输入品牌主页！' }] })} value={getFieldValue('mainPage')} placeholder="请输入品牌主页" />
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="类别">
            <Select {...getFieldProps('category', { rules: [{ required: true, type: 'number', message: '请选择供应商类别！' }] })} value={getFieldValue('category')} placeholder="请选择供应商类别">
              {filters.categorys.map((item) => (<Select.Option value={item[0]}>{item[1]}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="平台">
            <Select {...getFieldProps('platform', { rules: [{ required: true, message: '请选择供应商所在平台！' }] })} value={getFieldValue('platform')} placeholder="请选择供应商所在平台">
              {filters.platform.map((item) => (<Select.Option value={item[0]}>{item[1]}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="类型">
            <Select {...getFieldProps('supplierType', { rules: [{ required: true, type: 'number', message: '请选择供应商类型！' }] })} value={getFieldValue('supplierType')} placeholder="请选择供应商类型">
              {filters.supplierType.map((item) => (<Select.Option value={item[0]}>{item[1]}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="进度">
            <Select {...getFieldProps('progress', { rules: [{ required: true, message: '请选择当前进度！' }] })} value={getFieldValue('progress')} placeholder="请选择当前进度">
              {filters.progress.map((item) => (<Select.Option value={item[0]}>{item[1]}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="区域">
            <Select style={{ width: 108, marginRight: 8 }} {...getFieldProps('province', { rules: [{ required: true, type: 'number', message: '请选择省份！' }] })} value={getFieldValue('province')} placeholder="请选择省份" onChange={this.onProvinceChange}>
              {district.provinces.map((item) => (<Select.Option value={item.id}>{item.name}</Select.Option>))}
            </Select>
            <Select style={{ width: 108, marginRight: 8 }} {...getFieldProps('city', { rules: [{ required: true, type: 'number', message: '请选择城市！' }] })} value={getFieldValue('city')} placeholder="请选择城市" onChange={this.onCityChange}>
              {district.cities.map((item) => (<Select.Option value={item.id}>{item.name}</Select.Option>))}
            </Select>
            <Select style={{ width: 108, marginRight: 8 }} {...getFieldProps('district', { rules: [{ required: true, type: 'number', message: '请选择地区！' }] })} value={getFieldValue('district')} placeholder="请选择地区" onChange={this.onDistrictChange}>
              {district.districts.map((item) => (<Select.Option value={item.name}>{item.name}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="仓库">
            <Select {...getFieldProps('wareBy', { rules: [{ required: true, type: 'number', message: '请选择仓库！' }] })} value={getFieldValue('wareBy')} placeholder="请选择仓库">
              {filters.wareBy.map((item) => (<Select.Option value={item[0]}>{item[1]}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="联系人手机">
            <Input {...getFieldProps('phone', { rules: [{ required: true, min: 11, max: 11, message: '请输入11位手机号！' }] })} value={getFieldValue('phone')} placeholder="请输入联系人手机" />
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="联系人QQ">
            <Input {...getFieldProps('qq')} value={getFieldValue('qq')} placeholder="请输入联系人QQ" />
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="联系人微信">
            <Input {...getFieldProps('weixin')} value={getFieldValue('weixin')} placeholder="请输入联系人微信" />
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="产品特长">
            <Input {...getFieldProps('speciality')} value={getFieldValue('speciality')} placeholder="请输入产品特长" />
          </Form.Item>
          <Form.Item {...this.formItemLayout()} label="备注">
            <Input {...getFieldProps('memo')} value={getFieldValue('memo')} placeholder="备注" />
          </Form.Item>
          <Row>
            <Col span={2} offset={6}><Button type="primary" onClick={this.onSubmitCliick}>保存</Button></Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export const Edit = Form.create()(EditWithForm);
