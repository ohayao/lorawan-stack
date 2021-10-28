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

import React from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'

import Icon from '@ttn-lw/components/icon'
import Link from '@ttn-lw/components/link'

import Message from '@ttn-lw/lib/components/message'

import PropTypes from '@ttn-lw/lib/prop-types'

import style from './dropdown.styl'

const Dropdown = React.forwardRef(({ className, children, larger, onItemsClick }, ref) => (
  <ul
    onClick={onItemsClick}
    className={classnames(style.dropdown, className, { [style.larger]: larger })}
    ref={ref}
  >
    {children}
  </ul>
))

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  larger: PropTypes.bool,
  onItemsClick: PropTypes.func,
}

Dropdown.defaultProps = {
  className: undefined,
  larger: false,
  onItemsClick: () => null,
}

const DropdownItem = ({
  active,
  icon,
  title,
  path,
  action,
  exact,
  showActive,
  tabIndex,
  external,
  ...rest
}) => {
  const iconElement = icon && <Icon className={style.icon} icon={icon} nudgeUp />
  const activeClassName = classnames({
    [style.active]: (!Boolean(action) && showActive) || active,
  })
  const ItemElement = action ? (
    <button
      onClick={action}
      onKeyPress={action}
      role="tab"
      tabIndex={tabIndex}
      className={classnames(style.button, activeClassName)}
    >
      {iconElement}
      <Message content={title} />
    </button>
  ) : external ? (
    <Link.Anchor href={path} external tabIndex={tabIndex} className={style.button}>
      {Boolean(iconElement) ? iconElement : null}
      <Message content={title} />
    </Link.Anchor>
  ) : (
    <NavLink
      className={style.button}
      activeClassName={activeClassName}
      to={path}
      exact={exact}
      tabIndex={tabIndex}
    >
      {iconElement}
      <Message content={title} />
    </NavLink>
  )
  return (
    <li className={style.dropdownItem} key={title.id || title} {...rest}>
      {ItemElement}
    </li>
  )
}

DropdownItem.propTypes = {
  action: PropTypes.func,
  active: PropTypes.bool,
  exact: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.string,
  path: PropTypes.string,
  showActive: PropTypes.bool,
  tabIndex: PropTypes.string,
  title: PropTypes.message.isRequired,
}

DropdownItem.defaultProps = {
  active: false,
  action: undefined,
  exact: false,
  external: false,
  icon: undefined,
  path: undefined,
  showActive: true,
  tabIndex: '0',
}

const DropdownHeaderItem = ({ title }) => (
  <li className={style.dropdownHeaderItem}>
    <span>
      <Message content={title} />
    </span>
  </li>
)

DropdownHeaderItem.propTypes = {
  title: PropTypes.message.isRequired,
}

Dropdown.Item = DropdownItem
Dropdown.HeaderItem = DropdownHeaderItem

export default Dropdown
