import React from "react"
import {Link} from "react-router-dom"
import {Avatar} from "admin/lib/ui"
import {useUser} from "../../../../../../hooks/use-user"
import './HeaderProfile.less'

interface HeaderProfileProps {
    mr?: string
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({mr}) => {
    const {user} = useUser()

    return (
        <Link to="/profile" className="header-profile" style={{marginRight: mr || '.5rem'}}>
            <Avatar
                src={user.url_image}
                alt={`${user.last_name} ${user.first_name}`}
            />
            <div className="header-profile-data">
                <span className="header-profile-full-name">
                    {user.full_name}
                </span>
                <span className="header-profile-id">
                    Ваш ID: <span>{user.id}</span>
                </span>
            </div>
        </Link>
    )
}

export default HeaderProfile
