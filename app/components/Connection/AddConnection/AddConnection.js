import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import TextField from 'material-ui/TextField'
import {
    Step,
    Stepper,
    StepLabel
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import { ConnectionCard } from 'components'
import { formatConnection } from 'helpers/utils'
import {
    centeredContainer,
    breathingRoom,
    uri
} from 'shared/styles.css'
import {
    newConnectionInputWrapper,
    step
} from './styles.css'

const styles = {
    buttonSelectedStyle: {
        fontSize: '24px',
        border: '1px solid #00DFFC',
        marginRight: '40px',
        height: '56px',
        width: '138px',
        paddingBottom: '3px'
    },
    buttonStyle: {
        fontSize: '24px',
        border: '1px solid #666',
        marginRight: '40px',
        height: '56px',
        width: '138px',
        paddingBottom: '3px'
    },
    buttonLabelStyle: {
        fontSize: '.5em',
        fontWeight: '300'
    },
    stepLabelStyle: {
        cursor: 'pointer'
    }

}

const {
    object,
    string,
    func
} = PropTypes

/**
 * AddConnection() returns component that displays necessary
 * input fields for adding new connections.
 */
class AddConnection extends Component {

    state = {
        finished: false,
        editing: false,
        stepIndex: 0,
    }

    componentWillUnmount() {
        //clear the state once this component unmounts
        this.props.updateConnectionType('')
        this.props.updateConnectionName('')
        this.props.updateConnectionUri('')
    }

    handleNext = () => {
        console.log('in handleNext  ')
        const {stepIndex, editing} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
            editing: stepIndex >= 2 ? false : editing
        });
    }

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    onClickCreateConnection = (props)  => {
        props.connectionFanout(
            formatConnection(
                props.connectionUri,
                props.connectionType,
                props.connectionName,
                props.app.get('appId'),
                props.app.get('backendSiteUri')
            )
        )
        this.context.router.push('/dashboard/app/' + props.app.get('appId') + '/connections')
    }

    renderButtons = (props) => {
        const { buttonSelectedStyle, buttonStyle, buttonLabelStyle } = styles
        console.log('type',props.connectionType)
        return (
            <div className={`${centeredContainer} ${breathingRoom}`}>
                <div>
                    <FlatButton
                        label="Blog"
                        style={props.connectionType === 'blog' ? buttonSelectedStyle : buttonStyle}
                        labelStyle={buttonLabelStyle}
                        rippleColor={'#00DFFC'}
                        hoverColor={'#00DFFC'}
                        onTouchTap={
                            () =>  {
                                props.updateConnectionType('blog')
                                this.handleNext()
                            }
                        }
                    />
                    <FlatButton
                        label="Page"
                        style={props.connectionType === 'page' ? buttonSelectedStyle : buttonStyle}
                        labelStyle={buttonLabelStyle}
                        rippleColor={'#00DFFC'}
                        hoverColor={'#00DFFC'}
                        onTouchTap={
                            () =>  {
                                props.updateConnectionType('page')
                                this.handleNext()
                            }
                        }
                    />
                </div>
            </div>

        )
    }

    getStepContent = (stepIndex, props) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div className={breathingRoom}>
                        <h3>What type of content would you like to connect to this website?</h3>
                        {this.renderButtons(props)}
                    </div>
                )
            case 1:
                return (
                    <div className={`${centeredContainer} ${breathingRoom}`}>
                        <h3>What would you like to name your {`${props.connectionType ? props.connectionType : 'content '}${props.connectionType === 'page' ? '' : `'s directory`}`}?</h3>
                        <TextField
                            value={props.connectionName}
                            maxLength={340}
                            type="text"
                            style={{width: '340px'}}
                            floatingLabelText={`${props.connectionType ? props.connectionType : 'content'}${props.connectionType === 'page' ? '' : ` directory`} name`}
                            hintText={`Enter a name for the ${props.connectionType ? props.connectionType : 'content '}${props.connectionType === 'page' ? '' : `'s directory`}`}
                            onChange={
                                    (event) =>  {
                                        props.updateConnectionName(event.target.value)
                                    }
                                }
                        />
                    </div>
                )
            case 2:
                return (
                    <div className={`${centeredContainer} ${breathingRoom}`}>
                        <h3>What is the URL where your {`${props.connectionType ? props.connectionType : 'content '}`} is located?</h3>
                        <TextField
                                value={props.connectionUri}
                                maxLength={340}
                                type="text"
                                style={{width: '340px'}}
                                floatingLabelText={`${props.connectionType ? props.connectionType : 'content'} location`}
                                hintText={`Enter the URL location for the ${props.connectionType ? props.connectionType : 'content '}`}
                                onChange={
                                    (event) =>  {
                                        props.updateConnectionUri(event.target.value)
                                    }
                                }
                        />
                    </div>
                )
            default:
                return `Let's get started!'`;
        }
    }

    //TODO: Set this up so that it is leading text of connectionUri with ${backendSiteUri}
    render () {
        console.log('--------------------------')
        console.log('index: ', this.state.stepIndex)
        console.log(this.state.finished ? 'finished' : 'not finished')
        console.log(this.state.editing ? 'editing' : 'not editing')
        console.log('--------------------------')
        const { buttonStyle, stepLabelStyle, buttonLabelStyle } = styles
        const {finished, editing, stepIndex} = this.state
        return (
            <div style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
                <div className={centeredContainer}>
                    <h1 className={breathingRoom}><span className={uri}>{this.props.app.get('backendSiteUri')}</span></h1>
                </div>
                <Stepper style={{maxWidth: 960, margin: 'auto'}} activeStep={stepIndex}>
                    <Step>
                        <StepLabel style={stepLabelStyle} onTouchTap={() => this.setState({stepIndex: 0, editing: true})}>
                           {`${this.props.connectionType ? 'Type: ' : 'Choose type'} ${this.props.connectionType}`}
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel style={stepLabelStyle} onTouchTap={() => this.setState({stepIndex: 1, editing: true})}>
                            {`${this.props.connectionName ? 'Directory name: /' : 'Set directory name'}${this.props.connectionName}`}
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel style={stepLabelStyle} onTouchTap={() => this.setState({stepIndex: 2, editing: true})}>
                            {`${this.props.connectionUri ? 'Location: ' : 'Enter location'} ${this.props.connectionUri}`}
                        </StepLabel>
                    </Step>
                </Stepper>
                <div className={centeredContainer}>
                    { finished && !editing
                        ?   <div className={`${centeredContainer} ${breathingRoom}`}>
                                <h4>If the information you have entered is correct, click the 'Connect' button below.</h4>
                                <div className={`${centeredContainer} ${breathingRoom}`}>
                                    <FlatButton
                                        style={buttonStyle}
                                        labelStyle={buttonLabelStyle}
                                        rippleColor={'#00DFFC'}
                                        hoverColor={'#00DFFC'}
                                        onTouchTap={() => this.onClickCreateConnection(this.props)}
                                    >
                                        {`Connect`}
                                    </FlatButton>
                                </div>
                            </div>
                        :   <div>
                                {this.getStepContent(stepIndex, this.props)}
                                { stepIndex === 0
                                    ?   ''
                                    :   <div className={`${centeredContainer} ${breathingRoom}`}>
                                            <div style={{position: 'relative'}}>
                                                <FlatButton
                                                    label="Back"
                                                    disabled={stepIndex === 0}
                                                    style={{position: 'relative', left: '0'}}
                                                    onTouchTap={this.handlePrev}
                                                />
                                                <FlatButton
                                                    label="Next"
                                                    primary={true}
                                                    style={{position: 'relative', right: '0'}}
                                                    onTouchTap={this.handleNext}
                                                />
                                                {   finished
                                                        ?   <FlatButton
                                                                label="Connect"
                                                                primary={true}
                                                                style={{position: 'relative', right: '0'}}
                                                                onTouchTap={() => this.onClickCreateConnection(this.props)}
                                                            />
                                                        :   ''
                                                }
                                            </div>
                                         </div>
                                    }
                            </div>
                    }
                </div>
            </div>
        )
    }

}

AddConnection.propTypes = {
    connectionUri: string.isRequired,
    connectionType: string.isRequired,
    connectionName: string.isRequired,
    app: PropTypes.instanceOf(Map),
    updateConnectionUri: func.isRequired,
    updateConnectionType: func.isRequired,
    updateConnectionName: func.isRequired,
    connectionFanout: func.isRequired
}

AddConnection.contextTypes = {
    router: object.isRequired
}

export default AddConnection
