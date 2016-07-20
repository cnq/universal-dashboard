import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import FlatButton from 'material-ui/FlatButton';
import { AppCard } from 'components'
import { formatTimestamp } from 'helpers/utils'
import {
    appContainer,
    contentContainer,
    avatar,
    actionContainer,
    header,
    text,
    icon,
    domain
} from './styles.css'

const {func} = PropTypes

/**
 * App() returns an individual app component
 * which contains the AppCard.
 */
App.propTypes = {
    app: PropTypes.instanceOf(Map),
    goToAppDetail: func,
    deleteApp: func
}

function App(props) {

    const renderActions = ({ goToAppDetail, deleteApp }) => {
        return (
            <div>
                <FlatButton onClick={goToAppDetail} label="View Details" />
                <FlatButton label="Add Hook" />
                <FlatButton onClick={(event) => deleteApp(event, props.appId )} label="Delete" />
            </div>
        )
    }

    return (
        <AppCard
            className={appContainer}
            backendSiteUri={props.app.get('backendSiteUri')}
            actions={renderActions(props)}
        />
    )

}

export default App
