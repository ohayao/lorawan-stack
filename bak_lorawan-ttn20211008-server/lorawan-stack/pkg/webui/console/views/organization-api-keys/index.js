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

import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'

import Breadcrumb from '@ttn-lw/components/breadcrumbs/breadcrumb'
import { withBreadcrumb } from '@ttn-lw/components/breadcrumbs/context'

import ErrorView from '@ttn-lw/lib/components/error-view'

import withFeatureRequirement from '@console/lib/components/with-feature-requirement'

import SubViewError from '@console/views/sub-view-error'
import OrganizationApiKeysList from '@console/views/organization-api-keys-list'
import OrganizationApiKeyAdd from '@console/views/organization-api-key-add'
import OrganizationApiKeyEdit from '@console/views/organization-api-key-edit'

import sharedMessages from '@ttn-lw/lib/shared-messages'
import PropTypes from '@ttn-lw/lib/prop-types'

import { mayViewOrEditOrganizationApiKeys } from '@console/lib/feature-checks'

import { selectSelectedOrganizationId } from '@console/store/selectors/organizations'

@connect(state => ({ orgId: selectSelectedOrganizationId(state) }))
@withFeatureRequirement(mayViewOrEditOrganizationApiKeys, {
  redirect: ({ orgId }) => `/organizations/${orgId}`,
})
@withBreadcrumb('org.single.api-keys', ({ orgId }) => (
  <Breadcrumb path={`/organizations/${orgId}/api-keys`} content={sharedMessages.apiKeys} />
))
class OrganizationApiKeys extends React.Component {
  static propTypes = {
    match: PropTypes.match.isRequired,
  }

  render() {
    const { match } = this.props
    return (
      <ErrorView errorRender={SubViewError}>
        <Switch>
          <Route exact path={`${match.path}`} component={OrganizationApiKeysList} />
          <Route exact path={`${match.path}/add`} component={OrganizationApiKeyAdd} />
          <Route path={`${match.path}/:apiKeyId`} component={OrganizationApiKeyEdit} />
        </Switch>
      </ErrorView>
    )
  }
}

export default OrganizationApiKeys
