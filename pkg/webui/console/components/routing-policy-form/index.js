// Copyright © 2021 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState, useCallback } from 'react'
import { Col, Row } from 'react-grid-system'
import { defineMessages } from 'react-intl'

import Form from '@ttn-lw/components/form'
import Checkbox from '@ttn-lw/components/checkbox'
import SubmitBar from '@ttn-lw/components/submit-bar'
import SubmitButton from '@ttn-lw/components/submit-button'
import Radio from '@ttn-lw/components/radio-button'

import Message from '@ttn-lw/lib/components/message'

import RoutingPolicy from '@console/components/routing-policy'

import PropTypes from '@ttn-lw/lib/prop-types'
import sharedMessages from '@ttn-lw/lib/shared-messages'
import Yup from '@ttn-lw/lib/yup'

import { isValidPolicy } from '@console/lib/packet-broker/utils'
import policyMessages from '@console/lib/packet-broker/messages'

import style from './routing-policy-form.styl'

const m = defineMessages({
  saveDefaultPolicy: 'Save default policy',
  useDefaultPolicy: 'Use default routing policy for this network',
  useSpecificPolicy: 'Use network specific routing policy',
  doNotUseADefaultPolicy: 'Do not use a default routing policy for this network',
  doNotUseAPolicy: 'Do not use a routing policy for this network',
})

const validationSchema = Yup.object({
  _use_default_policy: Yup.bool(),
  policy: Yup.object({
    uplink: Yup.object({}),
    downlink: Yup.object({}),
  }).when('_use_default_policy', { is: 'default', then: Yup.object().strip() }),
})

const policySourceEncode = val => val === 'default'
const policySourceDecode = val => (val ? 'default' : 'specific')
const useDefaultEncode = val => val === 'default'
const useDefaultDecode = val => (val ? 'default' : 'no-default')

const RoutingPolicyForm = ({
  onSubmit,
  initialValues,
  error,
  defaultPolicy,
  networkLevel,
  submitMessage,
}) => {
  const handleSubmit = useCallback(values => onSubmit(validationSchema.cast(values)), [onSubmit])
  const [useDefault, setUseDefault] = useState(initialValues._use_default_policy || false)
  const handlePolicySourceChange = useCallback(setUseDefault, [setUseDefault])
  const hasDefaultPolicy = isValidPolicy(defaultPolicy)

  const showDefaultPolicySheet = networkLevel && useDefault && isValidPolicy(defaultPolicy)
  const showPolicyCheckboxes = (useDefault && !networkLevel) || (!useDefault && networkLevel)

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      error={error}
      validationSchema={validationSchema}
    >
      <Row>
        <Col md={12}>
          {networkLevel ? (
            <Form.Field
              component={Radio.Group}
              className={style.policySource}
              name="_use_default_policy"
              onChange={handlePolicySourceChange}
              encode={policySourceEncode}
              decode={policySourceDecode}
            >
              <Radio
                label={hasDefaultPolicy ? m.useDefaultPolicy : m.doNotUseAPolicy}
                value="default"
              />
              <Radio label={m.useSpecificPolicy} value="specific" />
            </Form.Field>
          ) : (
            <Form.Field
              component={Radio.Group}
              className={style.policySource}
              name="_use_default_policy"
              onChange={handlePolicySourceChange}
              encode={useDefaultEncode}
              decode={useDefaultDecode}
            >
              <Radio label={m.doNotUseADefaultPolicy} value="no-default" />
              <Radio label={m.useDefaultPolicy} value="default" />
            </Form.Field>
          )}
        </Col>
        {showDefaultPolicySheet && (
          <Col md={12}>
            <RoutingPolicy.Sheet policy={defaultPolicy} />
          </Col>
        )}
        {showPolicyCheckboxes && (
          <>
            <Col md={6} xs={12}>
              <Message
                content={sharedMessages.uplink}
                component="h4"
                className={style.directionHeader}
              />
              <Form.Field
                name="policy.uplink.join_request"
                component={Checkbox}
                label={policyMessages.joinRequest}
                description={policyMessages.joinRequestDesc}
              />
              <Form.Field
                name="policy.uplink.mac_data"
                component={Checkbox}
                label={policyMessages.macData}
                description={policyMessages.macDataDesc}
              />
              <Form.Field
                name="policy.uplink.application_data"
                component={Checkbox}
                label={policyMessages.applicationData}
                description={policyMessages.applicationDataDesc}
              />
              <Form.Field
                name="policy.uplink.signal_quality"
                component={Checkbox}
                label={policyMessages.signalQualityInformation}
                description={policyMessages.signalQualityInformationDesc}
              />
              <Form.Field
                name="policy.uplink.localization"
                component={Checkbox}
                label={policyMessages.localizationInformation}
                description={policyMessages.localizationInformationDesc}
              />
            </Col>
            <Col sm={6} xs={12}>
              <Message
                content={sharedMessages.downlink}
                component="h4"
                className={style.directionHeader}
              />
              <Form.Field
                name="policy.downlink.join_accept"
                component={Checkbox}
                label={policyMessages.joinAccept}
                description={policyMessages.joinAcceptDesc}
              />
              <Form.Field
                name="policy.downlink.mac_data"
                component={Checkbox}
                label={policyMessages.macData}
                description={policyMessages.macDataAllowDesc}
              />
              <Form.Field
                name="policy.downlink.application_data"
                component={Checkbox}
                label={policyMessages.applicationData}
                description={policyMessages.applicationDataAllowDesc}
              />
            </Col>
          </>
        )}
      </Row>
      <SubmitBar>
        <Form.Submit component={SubmitButton} message={submitMessage} />
      </SubmitBar>
    </Form>
  )
}

RoutingPolicyForm.propTypes = {
  defaultPolicy: PropTypes.routingPolicy,
  error: PropTypes.error,
  initialValues: PropTypes.shape({
    _use_default_policy: PropTypes.bool,
    policy: PropTypes.shape({}),
  }),
  networkLevel: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  submitMessage: PropTypes.message,
}

RoutingPolicyForm.defaultProps = {
  error: undefined,
  networkLevel: false,
  defaultPolicy: undefined,
  submitMessage: m.saveDefaultPolicy,
  initialValues: {
    _use_default_policy: false,
    policy: {
      uplink: {
        join_request: false,
        mac_data: false,
        application_data: false,
        signal_quality: false,
        localization: false,
      },
      downlink: {
        join_accept: false,
        mac_data: false,
        application_data: false,
      },
    },
  },
}

export default RoutingPolicyForm
