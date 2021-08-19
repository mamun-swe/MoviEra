import React, { useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { bell } from 'react-icons-kit/fa'
import { video } from 'react-icons-kit/feather'
import { DropdownButton, Dropdown } from 'react-bootstrap'

export const Notification = (props) => {
    const [total, setTotal] = useState(props.total)
    return (
        <DropdownButton
            className="custom-notification-dropdown"
            title={
                <div className="title-container">
                    <Icon className="title-icon" icon={bell} size={18} />
                    <p className="title-text mb-0">{total > 9 ? 9 + "+" : total}</p>
                </div>
            }
            onClick={() => setTotal(0)}
        >

            <div className="dropdown-body">

                {props.items && props.items.map((item, i) =>
                    <Dropdown.Item
                        key={i}
                        as={Link}
                        to={`/singlemovieview${item._id}`}
                    >
                        <div className="d-flex notification-item">
                            <div><Icon icon={video} size={18} /></div>
                            <div className="pl-2">
                                <p className="text-capitalize mb-0">
                                    {item.movieName && item.movieName.length >= 30 ? item.movieName.slice(0, 30) + " ..." : item.movieName}
                                </p>
                            </div>
                        </div>
                    </Dropdown.Item>
                )}

            </div>
        </DropdownButton>
    );
};
