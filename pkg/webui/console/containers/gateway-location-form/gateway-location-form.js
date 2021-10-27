// Copyright © 2020 The Things Network Foundation, The Things Industries B.V.
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

import React, { useCallback, useState } from 'react'
import { defineMessages } from 'react-intl'

import Checkbox from '@ttn-lw/components/checkbox'
import Form from '@ttn-lw/components/form'
import Radio from '@ttn-lw/components/radio-button'

import LocationForm from '@console/components/location-form'

import Yup from '@ttn-lw/lib/yup'
import PropTypes from '@ttn-lw/lib/prop-types'
import sharedMessages from '@ttn-lw/lib/shared-messages'
import tooltipIds from '@ttn-lw/lib/constants/tooltip-ids'

import { latitude as latitudeRegexp, longitude as longitudeRegexp } from '@console/lib/regexp'

const m = defineMessages({
  updateLocationFromStatus: 'Update from status messages',
  updateLocationFromStatusDescription:
    'Update the location of this gateway based on incoming status messages',
  setGatewayLocation: 'Gateway antenna location settings',
  locationSource: 'Location source',
  locationPrivacy: 'Location privacy',
  placement: 'Placement',
  indoor: 'Indoor',
  outdoor: 'Outdoor',
})

const validationSchema = Yup.object().shape({
  latitude: Yup.number().when('update_location_from_status', {
    is: false,
    then: schema =>
      schema
        .required(sharedMessages.validateRequired)
        .test('is-valid-latitude', sharedMessages.validateLatitude, value =>
          latitudeRegexp.test(String(value)),
        ),
    otherwise: schema => schema.strip(),
  }),
  longitude: Yup.number().when('update_location_from_status', {
    is: false,
    then: schema =>
      schema
        .required(sharedMessages.validateRequired)
        .test('is-valid-longitude', sharedMessages.validateLongitude, value =>
          longitudeRegexp.test(String(value)),
        ),
    otherwise: schema => schema.strip(),
  }),
  altitude: Yup.number().when('update_location_from_status', {
    is: false,
    then: schema =>
      schema.integer(sharedMessages.validateInt32).required(sharedMessages.validateRequired),
    otherwise: schema => schema.strip(),
  }),
  location_public: Yup.bool(),
  update_location_from_status: Yup.bool(),
  _placement: Yup.string().oneOf(['PLACEMENT_UNKNOWN', 'INDOOR', 'OUTDOOR']),
})

const getRegistryLocation = antennas => {
  let registryLocation
  if (antennas) {
    for (const key of Object.keys(antennas)) {
      if (
        antennas[key].location !== null &&
        typeof antennas[key].location === 'object' &&
        antennas[key].location.source === 'SOURCE_REGISTRY'
      ) {
        registryLocation = { antenna: antennas[key], key }
        break
      } else {
        registryLocation = { antenna: antennas[key], key }
      }
    }
  }
  return registryLocation
}

const GatewayLocationForm = ({ gateway, gatewayId, updateGateway }) => {
  const registryLocation = getRegistryLocation(gateway.antennas)
  const initialValues = {
    _placement:
      registryLocation && registryLocation.antenna.placement
        ? registryLocation.antenna.placement
        : 'PLACEMENT_UNKNOWN',
    location_public: gateway.location_public || false,
    update_location_from_status: gateway.update_location_from_status || false,
    ...(registryLocation
      ? registryLocation.antenna.location
      : {
          latitude: undefined,
          longitude: undefined,
          altitude: undefined,
        }),
  }

  const handleSubmit = useCallback(
    async values => {
      const patch = {
        location_public: values.location_public,
        update_location_from_status: values.update_location_from_status,
      }

      const registryLocation = getRegistryLocation(gateway.antennas)
      if (!values.update_location_from_status) {
        if (registryLocation) {
          // Update old location value.
          patch.antennas = [...gateway.antennas]
          patch.antennas[registryLocation.key].location = {
            ...registryLocation.antenna.location,
            ...values,
          }
          patch.antennas[registryLocation.key].placement = values._placement
        } else {
          // Create new location value.
          patch.antennas = [
            {
              gain: 0,
              location: {
                ...values,
                accuracy: 0,
                source: 'SOURCE_REGISTRY',
              },
              placement: values._placement,
            },
          ]
        }
      } else if (registryLocation) {
        patch.antennas = gateway.antennas.map(antenna => {
          const { location, ...rest } = antenna
          return rest
        })
        patch.antennas[registryLocation.key].placement = values._placement
      } else {
        patch.antennas = [{ gain: 0, placement: values._placement }]
      }

      return updateGateway(gatewayId, patch)
    },
    [gateway, gatewayId, updateGateway],
  )

  const handleDelete = useCallback(async () => {
    const registryLocation = getRegistryLocation(gateway.antennas)

    const patch = {
      antennas: [...gateway.antennas],
    }
    patch.antennas.splice(registryLocation.key, 1)

    return updateGateway(gatewayId, patch)
  }, [gateway, gatewayId, updateGateway])

  const [updateLocationFromStatus, setUpdateLocationFromStatus] = useState(
    initialValues.update_location_from_status,
  )

  const handleUpdateLocationFromStatusChange = useCallback(evt => {
    setUpdateLocationFromStatus(evt.target.checked)
  }, [])

  return (
    <LocationForm
      entityId={gatewayId}
      initialValues={initialValues}
      validationSchema={validationSchema}
      formTitle={m.setGatewayLocation}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      locationFieldsDisabled={updateLocationFromStatus}
      allowDelete={!updateLocationFromStatus}
    >
      <Form.Field
        title={m.locationPrivacy}
        name="location_public"
        component={Checkbox}
        label={sharedMessages.public}
        description={sharedMessages.locationDescription}
        tooltipId={tooltipIds.GATEWAY_LOCATION}
      />
      <Form.Field
        title={m.locationSource}
        name="update_location_from_status"
        component={Checkbox}
        description={m.updateLocationFromStatusDescription}
        label={m.updateLocationFromStatus}
        onChange={handleUpdateLocationFromStatusChange}
        tooltipId={tooltipIds.UPDATE_LOCATION_FROM_STATUS}
      />
      <Form.Field
        title={m.placement}
        name="_placement"
        component={Radio.Group}
        horizontal
        tooltipId={tooltipIds.GATEWAY_PLACEMENT}
      >
        <Radio label={sharedMessages.unknown} value="PLACEMENT_UNKNOWN" />
        <Radio label={m.indoor} value="INDOOR" />
        <Radio label={m.outdoor} value="OUTDOOR" />
      </Form.Field>
    </LocationForm>
  )
}

GatewayLocationForm.propTypes = {
  gateway: PropTypes.gateway.isRequired,
  gatewayId: PropTypes.string.isRequired,
  updateGateway: PropTypes.func.isRequired,
}

export default GatewayLocationForm
