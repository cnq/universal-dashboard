import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { User } from 'components'
import { UserProfile } from 'views'
import { staleUser, staleApps } from 'helpers/utils'
import {
    users as usersActions,
    usersApps as usersAppsActions
} from 'actions'

const UserContainer = React.createClass({
    propTypes: {
        noUser: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        appIds: PropTypes.array.isRequired,
        fetchAndHandleUser: PropTypes.func.isRequired,
        fetchAndHandleUsersApps: PropTypes.func.isRequired,
        lastUpdatedUser: PropTypes.number.isRequired,
        lastUpdatedApps: PropTypes.number.isRequired
    },
    componentDidMount () {
        const uid = this.props.routeParams.uid
        if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
            this.props.fetchAndHandleUser(uid)
        }
        if (this.props.noUser === true || staleApps(this.props.lastUpdatedApps)) {
            this.props.fetchAndHandleUsersApps(uid)
        }
    },
    render () {
        return (
            <UserProfile>
                <User
                    noUser={this.props.noUser}
                    name={this.props.name}
                    isFetching={this.props.isFetching}
                    error={this.props.error}
                    appIds={this.props.appIds}
                />
            </UserProfile>
        )
    }

})

const mapStateToProps = ({users, usersApps}, props) => ({
    noUser: typeof users[props.routeParams.uid] === 'undefined', //noUser (true/false): check whether this user exists
    name: typeof users[props.routeParams.uid] === 'undefined' ? '' : users[props.routeParams.uid].info.name, //if user exists set name, otherwise set name to ''
    isFetching: users.isFetching || usersApps.isFetching ? true : false,
    error: users.error || usersApps.error,
    appIds: usersApps[props.routeParams.uid] ? usersApps[props.routeParams.uid].appIds : [], //assign this user's apps to appIds
    lastUpdatedUser: users[props.routeParams.uid] ? users[props.routeParams.uid].lastUpdated : 0,
    lastUpdatedApps: usersApps[props.routeParams.uid] ? usersApps[props.routeParams.uid].lastUpdated : 0
})

export default connect(
    mapStateToProps,
    {...usersActions, ...usersAppsActions}
)(UserContainer)