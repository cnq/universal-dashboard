import axios from 'axios';
import { fireDb } from 'config/constants'


/**
 * saveToApps() save an app to Firebase and returns a an
 * appId along with a Promise
 *
 * @param {Object} app
 * @return {String} appId, {Promise} appPromise
 */
function saveToApps (app) {
    //Firebase
    const appId = fireDb.ref().child('apps').push().key //Have firebase generate the appId for us
    const appPromise = fireDb.ref().child(`apps/${appId}`).set({...app, appId})
    return {
        appId,
        appPromise
    }
}

/**
 * saveToUsersApps() saves, to Firebase, a reference to the app along with
 * pertinent data under the user's object and returns a firebase reference
 *
 * @param {Object} app, {String} appId
 * @return firebase.ref()
 */
function saveToUsersApps (app, appId) {
    //Firebase
    return fireDb.ref().child(`usersApps/${app.uid}/${appId}`)
        .set({...app, appId})
}

/**
 * saveApp() saves the app to Firebase or Paperhook
 *
 * @param {Object} app
 * @return {Object} app, {String} appId
 */
export function saveApp (app) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        const { appId, appPromise } = saveToApps(app)
        return Promise.all([
            appPromise,
            saveToUsersApps(app, appId)
        ]).then(() => ({...app, appId}))
    } else {
        //Paperhook
        return axios({
            method: 'post',
            url: '/api/apps',
            data: {
                backendSiteUri: app.text
            },
            timeout: 60000
        }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            errorCallback();
        })
    }
}

/**
 * deleteFromApps() deletes an app from Firebase and returns a Promise
 *
 * @param {String} appId
 * @return {Promise} appPromise
 */
function deleteFromApps (appId) {
    //Firebase
    const appPromise = fireDb.ref(`apps/${appId}`).remove()
    return {
        appPromise
    }
}

/**
 * deleteFromUsersApps() deletes the reference to the app from the user object on Firebase
 *
 * @param {Object} app
 * @return firebase.ref()
 */
function deleteFromUsersApps (appId, uid) {
    //Firebase
    return fireDb.ref(`usersApps/${uid}/${appId}`).remove()
}

/**
 * deleteApp() deletes the app from Firebase or Paperhook
 *
 * @param {String} appId, {String} uid
 * @return {Promise} appPromise, {String} error
 */
export function deleteApp (appId, uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        const { appPromise } = deleteFromApps(appId)
        return Promise.all([
            appPromise,
            deleteFromUsersApps(appId, uid)
        ]).then(
            (error) => {
                if (error) {
                    console.log('Firebase delete failed: ', error);
                } else {
                    console.log('Firebase delete succeeded');
                }
            }
        )
    } else {
        //Paperhook
        return axios({
            method: 'delete',
            url: `/api/apps/${appId}`,
            timeout: 60000
        }).then(function (response) {
            return response.data;
        }).catch(function (response) {
            errorCallback();
        })
    }
}

/**
 * listenToFeed() listens to app feed for updates
 *
 * @param {Function} callback, {Function} errorCallback
 * @return {Function} callback, {Function} errorCallback
 */
export function listenToFeed (callback, errorCallback) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        fireDb.ref().child('apps').on('value', (snapshot) => {
            const feed = snapshot.val() || {}
            const sortedIds = Object.keys(feed).sort((a,b) => {
                return feed[b].timestamp - feed[a].timestamp
            })
            callback({feed, sortedIds})
        }, errorCallback)
    } else {
        //Paperhook
        return axios.get("/api/apps").then(function (response) {
            const feed = response.data || {}
            const sortedIds = Object.keys(feed).sort((a, b) => {
                return feed[b].timestamp - feed[a].timestamp
            })
            callback({feed, sortedIds});
        }).catch(function (response) {
            errorCallback();
        })
    }
}

/**
 * fetchUser() fetches user data from Firebase or Paperhook
 *
 * @param {String} uid
 * @return {Object} user data
 */
export function fetchUser (uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`users/${uid}`).once('value')
            .then((snapshot) => (
                snapshot.val()
            ))
    } else {
        //Paperhook
        return axios.get("/api/auth/authenticateduser").then(function (response) {
            return response.data;
        })
    }
}

/**
 * fetchUsersApps() fetches user created apps from Firebase or Paperhook
 *
 * @param {String} uid
 * @return {Object} users apps data
 */
export function fetchUsersApps (uid) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`usersApps/${uid}`).once('value')
            .then((snapshot) => (
                snapshot.val() || {}
            ))
    } else {
        //Paperhook
        console.debug("fetchUsersApps...")
    }
}

/**
 * fetchApp() fetches a specific app from Firebase or Paperhook
 *
 * @param {String} appId
 * @return {Object} app data
 */
export function fetchApp (appId) {
    if (process.env.NODE_ENV !== 'production') {
        //Firebase
        return fireDb.ref().child(`apps/${appId}`).once('value')
            .then((snapshot) => (
                snapshot.val()
            ))
    } else {
        //Paperhook
        return axios.get(`/api/apps/${appId}`).then(function (response) {
            return response.data;
        })
    }
}