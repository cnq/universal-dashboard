﻿import { applist as actions } from 'actions'
import { appActions } from 'actions'
import { connectionActions } from 'actions'

const initialState = {
    initialFetchComplete: false,
    isFetching: false,
    constantFetch: false,
    error: '',
    apps: []
}

export default function applist ( state = initialState, action ) {
    switch ( action.type ) {
        case actions.APPLIST_INITILIZE:
            return {
                ... state,
                isFetching: true
            }
        case actions.APPLIST_FETCH_START:
            return {
                ... state,
                isFetching: true
            }
        case actions.APPLIST_FETCH_REQUEST:
            return {
                ... state
            }
        case actions.APPLIST_FETCH_SUCCESS:
            return {
                ... state,
                isFetching: false,
                initialFetchComplete: true,
                error: '',
                apps: action.apps
        }
        case actions.APPLIST_FETCH_FAIL:
            return {
                ... state,
                isFetching: false,
                initialFetchComplete: true,
                error: action.error
        }
        case actions.APPLIST_REFRESH_START_CONSTANT:
            return {
                ... state,
                constantFetch: true
            }
        case actions.APPLIST_REFRESH_STOP_CONSTANT:
            return {
                ... state,
                constantFetch: false
            }
        case actions.APPLIST_REFRESH_REQUEST:
            return {
                ... state
            }
        case actions.APPLIST_REFRESH_SUCCESS:
            return {
                ... state,
                error: '',
                apps: state.apps.map(function(currentStateApp) { 
                    var freshapp = action.apps.find((a) => a.appId == currentStateApp.appId)
                    if(freshapp){
                        currentStateApp.isDnsLive = freshapp.isDnsLive;
                        currentStateApp.uri = freshapp.uri;
                    }
                    return currentStateApp;
                })
            }
        case actions.APPLIST_REFRESH_FAIL:
            return {
                ... state,
            error: action.error
            }
        case appActions.APP_CREATE_START:
            return {
                ... state,
                apps: state.apps.concat({appId: "newapp", backendSiteUri: action.backendSiteUri, isCreating: true, connections: [], uri:"" }),
                error: ''
            }
        case appActions.APP_CREATE_SUCCESS:
            return {
                ... state,
                apps: state.apps.map(function(app) { return app.appId == "newapp" ? action.app : app; }),
                error: ''
            }
        case appActions.APP_CREATE_FAIL:
            return {
                ... state,
                error: action.error,
                apps: state.apps.filter(function(app) { return app.appId != "newapp"; })
            }

        case appActions.APP_DELETE_START:
            return {
                ... state,
                apps: state.apps.map(function(app) { 
                    if( app.appId == action.app.appId ){
                        app.isDeleting = true; 
                    }
                    return app;
                }),
                error: ''
            }
        case appActions.APP_DELETE_SUCCESS:
            return {
                ... state,
                apps: state.apps.filter(function(app) { return app.appId != action.app.appId; }),
                error: ''
            }
        case appActions.APP_DELETE_FAIL:
            return {
                ... state,
                apps: state.apps.filter(function(app) { return app.appId != action.app.appId; }),
                error: action.error
            }
        case connectionActions.CONNECTION_CREATE_START:
            return {
                ... state,
                apps: state.apps.map(function(app) { 
                    if(app.appId == action.connection.appId){
                        app.connections = app.connections.concat(action.connection);
                    }
                    return app; 
                })
            }
        case connectionActions.CONNECTION_CREATE_SUCCESS:
            return {
                ... state,
                apps: state.apps.map(function(app) { 
                    if(app.appId == action.connection.appId){
                        app.connections = app.connections.map(function(connection) { 
                            return connection.connectionId == "newconnection" ? action.connection : connection; 
                        })
                    }
                    return app; 
                })
            }
        case connectionActions.CONNECTION_CREATE_FAIL:
            return {
                ... state,
                apps: state.apps.map(function(app) { 
                    if(app.appId == action.connection.appId){
                        app.connections = app.connections.filter(function(connection) { 
                            return connection.connectionId != "newconnection"; 
                        })
                    }
                    return app; 
                })
            }
        case connectionActions.CONNECTION_DELETE_START:
            return {
                ... state,
                apps: state.apps.map(function(app) { 
                    if(app.appId == action.connection.appId){
                            app.connections = app.connections.map(function(connection) { 
                                if(connection.connectionId == action.connection.connectionId){
                                    connection.isDeleting = true;
                                }
                                return connection;
                            })
                    }
                    return app; 
                 })
            }
        case connectionActions.CONNECTION_DELETE_SUCCESS:
            return {
                ... state,
                apps: state.apps.map(function(app) { 
                    if(app.appId == action.connection.appId){
                        app.connections = app.connections.filter(function(connection) { 
                            return connection.connectionId != action.connection.connectionId; 
                        })
                    }
                    return app; 
                })
            }
        case connectionActions.CONNECTION_DELETE_FAIL:
            return {
                ... state,
                apps: state.apps.map(function(app) { 
                    if(app.appId == action.connection.appId){
                        app.connections = app.connections.map(function(connection) { 
                            if(connection.connectionId == action.connection.connectionId){
                                connection.isDeleting = false;
                            }
                            return connection;
                        })
                    }
                    return app; 
                })
            }
        default:
            return state
    }
}