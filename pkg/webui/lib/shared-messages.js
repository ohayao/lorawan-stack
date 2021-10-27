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

import { defineMessages } from 'react-intl'

export default defineMessages({
  // Keep these sorted alphabetically.
  '16Bit': '16 bit',
  '32Bit': '32 bit',
  abp: 'Activation by personalization (ABP)',
  accuracy: 'Accuracy',
  actions: 'Actions',
  activationMode: 'Activation mode',
  add: 'Add',
  addApiKey: 'Add API key',
  addApplication: 'Add application',
  addAttributes: 'Add attributes',
  addCollaborator: 'Add collaborator',
  addDevice: 'Add end device',
  addDeviceBulk: 'End device bulk creation',
  addGateway: 'Add gateway',
  addOrganization: 'Add organization',
  addPubsub: 'Add Pub/Sub',
  address: 'Address',
  addressPlaceholder: 'host',
  addWebhook: 'Add webhook',
  admin: 'Admin',
  all: 'All',
  allAdmin: 'All (Admin)',
  altitude: 'Altitude',
  altitudeDesc: 'The altitude in meters, where 0 means sea level',
  antennas: 'Antennas',
  apiKey: 'API key',
  apiKeyCounted: '{count, plural, one {API key} other {API keys}}',
  apiKeyNamePlaceholder: 'My new API key',
  apiKeys: 'API keys',
  appEUI: 'AppEUI',
  appEUIJoinEUI: 'AppEUI/JoinEUI',
  appEUIDescription:
    'The AppEUI uniquely identifies the owner of the end device. If no AppEUI is provided by the device manufacturer (usually for development), it can be filled with zeros.',
  appId: 'Application ID',
  appKey: 'AppKey',
  application: 'Application',
  applications: 'Applications',
  applicationServerAddress: 'Application Server address',
  approve: 'Approve',
  appSKey: 'AppSKey',
  asServerID: 'Application Server ID',
  asServerIDDescription: 'The AS-ID of the Application Server to use',
  asServerKekLabel: 'Application Server KEK label',
  asServerKekLabelDescription:
    'The KEK label of the Application Server to use for wrapping the application session key',
  attributeDescription:
    'Attributes can be used to set arbitrary information about the entity, to be used by scripts, or simply for your own organization',
  attributeKeyValidateTooLong: 'Attribute keys must have less than 32 characters',
  attributeKeyValidateTooShort:
    'Attribute keys must have at least 3 characters and contain no special characters',
  attributes: 'Attributes',
  attributesValidateRequired:
    'All attribute entry values are required. Please remove empty entries.',
  attributesValidateTooMany: '{field} must be 10 items or fewer',
  attributeValueValidateTooLong: 'Attribute values must have less than 200 characters',
  automaticUpdates: 'Automatic updates',
  autoUpdateDescription: 'Gateway can be updated automatically',
  backToOverview: 'Back to overview',
  brand: 'Brand',
  cancel: 'Cancel',
  changeLocation: 'Change location settings',
  changePassword: 'Change password',
  channel: 'Channel',
  claimAuthCode: 'Claim authentication code',
  claiming: 'Claiming',
  clear: 'Clear',
  collaborator: 'Collaborator',
  collaboratorCounted: '{count, plural, one {Collaborator} other {Collaborators}}',
  collaboratorDeleteSuccess: 'Collaborator removed',
  collaboratorEdit: 'Edit {collaboratorId}',
  collaboratorEditRights: 'Edit rights of {collaboratorId}',
  collaboratorId: 'Collaborator ID',
  collaboratorIdPlaceholder: 'collaborator-id',
  collaboratorWarningSelf: 'Changing your own rights could result in loss of access',
  collaboratorModalWarning: 'Are you sure you want to remove {collaboratorId} as a collaborator?',
  collaboratorModalWarningSelf:
    'Are you sure you want to remove yourself as a collaborator? Access to this entity will be lost until someone else adds you as a collaborator again.',
  collaboratorRemove: 'Collaborator remove',
  collaborators: 'Collaborators',
  collaboratorUpdateSuccess: 'Collaborator rights updated',
  componentAs: 'Application Server',
  componentEdtc: 'End Device Template Converter',
  componentGs: 'Gateway Server',
  componentIs: 'Identity Server',
  componentJs: 'Join Server',
  componentNs: 'Network Server',
  componentQrg: 'QR Code Generator',
  confirmPassword: 'Confirm password',
  connected: 'Connected',
  connecting: 'Connecting',
  connectionIssues: 'Connection issues',
  contactInformation: 'Contact information',
  copiedToClipboard: 'Copied to clipboard!',
  copyToClipboard: 'Copy to clipboard',
  createApiKey: 'Create API key',
  created: 'Created',
  createdAt: 'Created at',
  currentCollaborators: 'Current collaborators',
  currentUserIndicator: '(This is you)',
  data: 'Data',
  defineRights: 'Define rights',
  delayWarning:
    'Delay too short. The lower bound ({minimumValue}ms) will be used by the Gateway Server.',
  deleted: 'Deleted (Admin)',
  deleteModalTitle: 'Are you sure you want to delete <pre>{entityName}</pre>?',
  deleteModalDefaultMessage:
    'This will <strong>PERMANENTLY DELETE THE ENTITY ITSELF AND ALL ASSOCIATED ENTITIES</strong>, including collaborator associations. It will also <strong>NOT BE POSSIBLE TO REUSE THE ENTITY ID</strong>.',
  deleteModalPurgeMessage:
    'This will <strong>PERMANENTLY DELETE THE ENTITY ITSELF AND ALL ASSOCIATED ENTITIES</strong>, including collaborator associations.',
  deleteModalConfirmMessage: 'Please enter <pre>{entityId}</pre> to confirm the deletion.',
  deleteModalConfirmDeletion: 'Confirm deletion',
  deleteModalPurgeWarning:
    'Releasing the entity IDs will make it possible to register a new entity with the same ID. Note that this <strong>irreversible</strong> and may lead to <strong>other users gaining access to historical data of the entity if they register an entity with the same ID</strong> . Please make sure you understand the implications of purging as described <DocLink>here</DocLink>.',
  deleteModalReleaseIdTitle: 'Entity purge (admin only)',
  deleteModalReleaseIdLabel: 'Also release entity IDs (purge)',
  description: 'Description',
  devAddr: 'Device address',
  devDesc: 'End device description',
  devEUI: 'DevEUI',
  devEUIBlockLimitReached: 'DevEUI generation limit reached',
  deviceCounted: '{count, plural, one {End device} other {End devices}}',
  deviceDescDescription:
    'Optional end device description; can also be used to save notes about the end device',
  deviceDescPlaceholder: 'Description for my new end device',
  deviceIdPlaceholder: 'my-new-device',
  deviceNamePlaceholder: 'My new end device',
  deviceSimulationDisabledWarning: 'Simulation is disabled for devices that skip payload crypto',
  device: 'End device',
  devices: 'End devices',
  devID: 'End device ID',
  devName: 'End device name',
  disabled: 'Disabled',
  disconnected: 'Disconnected',
  documentation: 'Documentation',
  downlink: 'Downlink',
  downlinkAck: 'Downlink ack',
  downlinkFailed: 'Downlink failed',
  downlinkFrameCount: 'Downlink frame count',
  downlinkNack: 'Downlink nack',
  downlinkPush: 'Downlink push',
  downlinkQueued: 'Downlink queued',
  downlinkQueueInvalidated: 'Downlink queue invalidated',
  downlinkReplace: 'Downlink replace',
  downlinkSent: 'Downlink sent',
  downlinksScheduled: 'Downlinks (re)scheduled',
  edit: 'Edit',
  email: 'Email',
  emailAddress: 'Email address',
  empty: 'Empty',
  enabled: 'Enabled',
  enforceDutyCycleDescription:
    'Recommended for all gateways in order to respect spectrum regulations',
  enforceDutyCycle: 'Enforce duty cycle',
  entityId: 'Entity ID',
  eventsCannotShow: 'Cannot show events',
  external: 'External',
  externalJoinServer: 'External Join Server',
  fetching: 'Fetching data…',
  firmwareVersion: 'Firmware version',
  fNwkSIntKey: 'FNwkSIntKey',
  frameCounterWidth: 'Frame counter width',
  frequencyPlan: 'Frequency plan',
  frequencyPlanWarning:
    'Without choosing a frequency plan, packets from the gateway will not be correctly processed',
  furtherResources: 'Further resources',
  gateway: 'Gateway',
  gatewayDescDescription:
    'Optional gateway description; can also be used to save notes about the gateway',
  gatewayDescPlaceholder: 'Description for my new gateway',
  gatewayDescription: 'Gateway description',
  gatewayEUI: 'Gateway EUI',
  gatewayID: 'Gateway ID',
  gatewayIdPlaceholder: 'my-new-gateway',
  gatewayLocation: 'Gateway location',
  gatewayName: 'Gateway name',
  gatewayNamePlaceholder: 'My new gateway',
  gateways: 'Gateways',
  gatewayScheduleDownlinkLate: 'Schedule downlink late',
  gatewayServerAddress: 'Gateway Server address',
  gatewayStatus: 'Gateway status',
  gatewayUpdateOptions: 'Gateway updates',
  general: 'General',
  generalInformation: 'General information',
  generalSettings: 'General settings',
  getSupport: 'Get support',
  gsServerAddressDescription: 'The address of the Gateway Server to connect to',
  hardware: 'Hardware',
  hardwareVersion: 'Hardware version',
  homeNetID: 'Home NetID',
  homeNetIDDescription: 'ID to identify the LoRaWAN network',
  hours: 'hours',
  id: 'ID',
  idAlreadyExists: 'ID already exists',
  import: 'Import',
  importDevices: 'Import end devices',
  integrations: 'Integrations',
  joinAccept: 'Join accept',
  insufficientAppKeyRights: 'Insufficient rights to set an AppKey',
  insufficientNwkKeyRights: 'Insufficient rights to set a NwkKey',
  joinEUI: 'JoinEUI',
  joinServerAddress: 'Join Server address',
  key: 'key',
  keyEdit: 'Edit API key',
  keyId: 'Key ID',
  lastSeen: 'Last seen',
  lastSeenUnavailable: 'Last seen info unavailable',
  latitude: 'Latitude',
  latitudeDesc: 'The north-south position in degrees, where 0 is the equator',
  lbsLNSSecret: 'LoRa Basics Station LNS Authentication Key',
  lbsLNSSecretDescription:
    'The Authentication Key for Lora Basics Station LNS connections. This field is ignored for other gateways.',
  link: 'Link',
  linked: 'Linked',
  liveData: 'Live data',
  location: 'Location',
  locationDescription:
    'The location of this gateway may be visible to other users and on public gateway maps',
  locationSolved: 'Location solved',
  login: 'Login',
  logout: 'Logout',
  longitude: 'Longitude',
  longitudeDesc: 'The east-west position in degrees, where 0 is the prime meridian (Greenwich)',
  loraCloud: 'LoRa Cloud',
  lorawanClassCapabilities: 'LoRaWAN class capabilities',
  lorawanInformation: 'LoRaWAN information',
  lorawanOptions: 'LoRaWAN options',
  lorawanPhyVersionDescription: 'The LoRaWAN PHY version of the end device',
  macVersion: 'LoRaWAN version',
  messaging: 'Messaging',
  messageTypes: 'Message types',
  milliseconds: 'milliseconds',
  minutes: 'minutes',
  model: 'Model',
  moreInformation: 'More information',
  mqtt: 'MQTT',
  multicast: 'Define multicast group (ABP & Multicast)',
  name: 'Name',
  netId: 'Net ID',
  networks: 'Networks',
  networkServerAddress: 'Network Server address',
  next: 'Next',
  noDesc: 'This end device has no description',
  noEvents: 'Waiting for events from <pre>{entityId}</pre>…',
  noLocation: 'No location information available',
  noMatch: 'No items found',
  none: 'None',
  notAvailable: 'n/a',
  notLinked: 'Not linked',
  notSet: 'Not set',
  nsAddress: 'Network Server address',
  nsEmptyDefault: 'Leave empty to link to the Network Server in the same cluster',
  nsServerKekLabel: 'Network Server KEK label',
  nsServerKekLabelDescription:
    'The KEK label of the Network Server to use for wrapping the network session key',
  nwkKey: 'NwkKey',
  nwkSEncKey: 'NwkSEncKey',
  nwkSEncKeyDescription: 'Network session encryption key',
  nwkSKey: 'NwkSKey',
  offline: 'Offline',
  ok: 'Ok',
  online: 'Online',
  options: 'Options',
  organization: 'Organization',
  organizationId: 'Organization ID',
  organizations: 'Organizations',
  otaa: 'Over the air activation (OTAA)',
  otherCluster: 'Other cluster',
  overview: 'Overview',
  packetBroker: 'Packet Broker',
  password: 'Password',
  passwordChanged: 'Password changed',
  pause: 'Pause',
  payload: 'Payload',
  payloadFormatters: 'Payload formatters',
  payloadFormattersDownlink: 'Downlink payload formatters',
  payloadFormattersUpdateFailure: 'There was an error updating the payload formatter',
  payloadFormattersUpdateSuccess: 'Payload formatter updated',
  payloadFormattersUplink: 'Uplink payload formatters',
  personalApiKeys: 'Personal API keys',
  phyVersion: 'Regional Parameters version',
  phyVersionDescription:
    'The Regional Parameters version (PHY), as provided by the device manufacturer',
  port: 'Port',
  privacyPolicy: 'Privacy policy',
  profileSettings: 'Profile settings',
  provider: 'Provider',
  provisionedOnExternalJoinServer: 'Provisioned on external Join Server',
  public: 'Public',
  pubsubBaseTopic: 'Base topic',
  pubsubFormat: 'Pub/Sub format',
  pubsubId: 'Pub/Sub ID',
  pubsubs: 'Pub/Subs',
  purge: 'Purge',
  redirecting: 'Redirecting…',
  refresh: 'Refresh',
  replaceWebhook: 'Replace webhook',
  removeCollaborator: 'Remove collaborator',
  removeCollaboratorSelf: 'Remove yourself as collaborator',
  requireAuthenticatedConnection: 'Require authenticated connection',
  requireAuthenticatedConnectionDescription:
    'Controls whether this gateway may only connect if it uses an authenticated Basic Station or MQTT connection',
  resetsFCnt: 'Resets frame counters',
  resetsJoinNonces: 'Resets join nonces',
  resetWarning: 'Reseting is insecure and makes your end device susceptible for replay attacks',
  restartStream: 'Restart stream',
  restore: 'Restore',
  resume: 'Resume',
  rights: 'Rights',
  rootKeys: 'Root keys',
  saveChanges: 'Save changes',
  scheduleAnyTimeDelay: 'Schedule any time delay',
  scheduleAnyTimeDescription:
    'Configure gateway delay (minimum: {minimumValue}ms, default: {defaultValue}ms)',
  scheduleDownlinkLateDescription: 'Enable server-side buffer of downlink messages',
  searchById: 'Search by ID',
  seconds: 'seconds',
  secure: 'Secure',
  serviceData: 'Service data',
  settings: 'Settings',
  skipCryptoDescription: 'Skip decryption of uplink payloads and encryption of downlink payloads',
  skipCryptoPlaceholder: 'Encryption/decryption disabled',
  skipCryptoTitle: 'Skip payload encryption and decryption',
  sNwkSIKey: 'SNwkSIntKey',
  sNwkSIKeyDescription: 'Serving network session integrity key',
  source: 'Source',
  stable: 'Stable',
  state: 'State',
  stateApproved: 'Approved',
  stateFlagged: 'Flagged',
  stateRejected: 'Rejected',
  stateRequested: 'Requested',
  stateSuspended: 'Suspended',
  status: 'Status',
  statusDescription: 'The status of this gateway may be visible to other users',
  statusUnknown: 'Status unknown',
  success: 'Success',
  supportsClassB: 'Supports class B',
  supportsClassC: 'Supports class C',
  takeMeBack: 'Take me back',
  tenantId: 'Tenant ID',
  termsAndCondition: 'Terms and conditions',
  time: 'Time',
  token: 'Token',
  tokenDelete: 'Token delete',
  tokenDeleted: 'Token deleted',
  tokenSet: 'Set token',
  tokenUpdated: 'Token updated',
  traffic: 'Traffic',
  type: 'Type',
  unknown: 'Unknown',
  unknownError: 'Unknown error while generating DevEUI',
  updateChannelDescription: 'Channel for gateway automatic updates',
  updatedAt: 'Last updated at',
  uplink: 'Uplink',
  uplinkFrameCount: 'Uplink frame count',
  uplinkMessage: 'Uplink message',
  uplinksReceived: 'Uplinks received',
  unexposed: 'Unexposed',
  used: '{currentValue}/{maxValue} used',
  user: 'User',
  userAdd: 'Add user',
  userDelete: 'Delete user',
  userEdit: 'Edit user',
  userId: 'User ID',
  userManagement: 'User management',
  username: 'Username',
  users: 'Users',
  validateAddressFormat: '{field} must be in the format "host" or "host:port"',
  validateApiKey: 'API keys must follow the format "NNSXS.[…].[…]"',
  validateDelayFormat: '{field} must be a positive, whole number',
  validateDigit: '{field} must have at least {digit} {digit, plural, one {digit} other {digits}}',
  validateEmail: 'An email address must use exactly one "@", one "." and use no special characters',
  validateFreqNumeric: 'All frequency values must be positive integers',
  validateFreqRequired: 'All frequency values are required. Please remove empty entries.',
  validateHexLength: '{field} must be a complete hex value',
  validateIdFormat: '{field} must contain only lowercase letters, numbers and dashes (-)',
  validateInt32: '{field} must be a whole number, negative or positive',
  validateLatitude: 'Latitude must be a whole or decimal number between -90 and 90',
  validateLength: '{field} must be exactly {length} characters long',
  validateLongitude: 'Longitude must be a whole or decimal number between -180 and 180',
  validateMqttPassword: '{field} must be empty or have at least 2 characters',
  validateMqttUrl:
    'MQTT URLs must have the format "mqtt[s]://[username][:password]@host.domain[:port]"',
  validateNoSpaces: '{field} must contain no spaces',
  validateNumberGte: '{field} must be at least {min} or higher',
  validateNumberLte: '{field} must be {max} or lower',
  validatePasswordMatch: 'Passwords must match',
  validateRequired: '{field} is required',
  validateRights: 'At least one right must be selected',
  validateSpecial:
    '{field} must have at least {special} special {special, plural, one {character} other {characters}}',
  validateTooLong: '{field} must have less than {max} characters',
  validateTooShort: '{field} must have at least {min} characters',
  validateUppercase:
    '{field} must have at least {upper} uppercase {upper, plural, one {character} other {characters}}',
  validateUrl: 'Must be a valid URL format, contain no spaces or special characters',
  validFrom: 'Valid from',
  validTo: 'Valid to',
  value: 'value',
  webhookAlreadyExistsModalMessage:
    'A Webhook with the ID "{id}" already exists. Do you wish to replace this webhook?',
  webhookBaseUrl: 'Base URL',
  webhookFormat: 'Webhook format',
  webhookId: 'Webhook ID',
  webhooks: 'Webhooks',
})