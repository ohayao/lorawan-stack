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
import classnames from 'classnames'

import Message from '@ttn-lw/lib/components/message'

import PropTypes from '@ttn-lw/lib/prop-types'

import Section from '../section'
import SortButton from '../sort-button'
import Row from '../row'
import { HeadCell, DataCell } from '../cell'

import style from './table.styl'

/* Empty message to render when no entries provided. */
const Empty = ({ className, colSpan, message }) => (
  <Row className={classnames(className, style.emptyMessageRow)} clickable={false}>
    <DataCell colSpan={colSpan}>
      {Boolean(message) && <Message className={style.emptyMessage} content={message} />}
    </DataCell>
  </Row>
)

Empty.propTypes = {
  className: PropTypes.string,
  colSpan: PropTypes.number,
  message: PropTypes.message,
}

Empty.defaultProps = {
  className: undefined,
  colSpan: 1,
  message: undefined,
}

class Table extends React.Component {
  static Head = props => <Section component="thead" {...props} />
  static Body = props => <Section component="tbody" {...props} />
  static Footer = props => <Section component="tfoot" {...props} />
  static Row = Row
  static HeadCell = HeadCell
  static DataCell = DataCell
  static SortButton = SortButton
  static Empty = Empty

  render() {
    const { className, children, minWidth, ...rest } = this.props
    const tableClassNames = classnames(className, style.table)
    const minWidthProp = Boolean(minWidth) ? { style: { minWidth } } : {}
    return (
      <table className={tableClassNames} {...minWidthProp} {...rest}>
        {children}
      </table>
    )
  }
}

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  minWidth: PropTypes.string,
}

Table.defaultProps = {
  className: undefined,
  children: undefined,
  minWidth: undefined,
}

export default Table
