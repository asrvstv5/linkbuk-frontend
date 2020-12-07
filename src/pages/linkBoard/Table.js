import React, { Component } from 'react'
import { IoIosTrash } from "react-icons/io";

const TableHeader = () => {
    return (
        <thead>
        <tr>
            <th>Nickname</th>
            <th className="link_col">Url</th>
        </tr>
        </thead>
    )
}

const TableBody = props => {
    const rows = props.linkData.map((row, index) => {
        console.log("Row is ", row)
        var dispUrl = row.url;
        if (row.url.length > 40 && row.url[0]!=='C') {
          dispUrl = row.url.slice(0, 41) + '...';
        }

        return (
        <tr key={index}>
            <td>{row.nickName}</td>
            <td className="link_col"><a href={row.url} className="url" target="_blank" rel="noopener noreferrer">{dispUrl}</a> {" "}
                <button className="trash-btn" onClick={() => props.removeLink(row._id)}><IoIosTrash /></button>
            </td>
        </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

class Table extends Component {
    render() {
      const { linkData, removeLink } = this.props
      return (
        <table>
          <TableHeader />
          <TableBody linkData={linkData} removeLink={removeLink} />
        </table>
      )
    }
  }
export default Table