// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
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

import { defineMessages } from 'react-intl'

import CreateFetchSelect from '@console/containers/fetch-select'

import { getDeviceTemplateFormats } from '@console/store/actions/device-template-formats'

import {
  selectDeviceTemplateFormats,
  selectDeviceTemplateFormatsError,
  selectDeviceTemplateFormatsFetching,
} from '@console/store/selectors/device-template-formats'

const m = defineMessages({
  title: 'File format',
  warning: 'End device template formats unavailable',
})

const formatOptions = formats =>
  Object.keys(formats).map(key => ({
    value: key,
    label: formats[key].name,
    description: formats[key].description,
    fileExtensions: formats[key].file_extensions,
  }))

export default CreateFetchSelect({
  fetchOptions: getDeviceTemplateFormats,
  optionsSelector: selectDeviceTemplateFormats,
  errorSelector: selectDeviceTemplateFormatsError,
  fetchingSelector: selectDeviceTemplateFormatsFetching,
  defaultWarning: m.warning,
  defaultTitle: m.title,
  optionsFormatter: formatOptions,
})
