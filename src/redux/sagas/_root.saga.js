import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import treesSaga from './trees.saga';
import selectedTreeSaga from './selectedTree.saga';
import editTreesSaga from './editTree.saga';
import addTreeSaga from './addTree.saga';
import fetchAllStatusesSaga from './statuses.saga';
import tree_ActivitySaga from './tree_activity.saga';
import updateDateSaga from './updateDate.saga';
import imagesByIdSaga from './images.saga';
import allImagesSaga from './allImages.saga';
import addImagesSaga from './addImages.saga';
import deleteTreeSaga from './deleteTree.saga'
import singleImagesSaga from './singleTreeImages.saga';
import addInitialTree_activitySaga from './initialTree_activity.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    treesSaga(),
    addTreeSaga(),
    selectedTreeSaga(),
    editTreesSaga(),
    fetchAllStatusesSaga(),
    tree_ActivitySaga(),
    updateDateSaga(),
    imagesByIdSaga(),
    allImagesSaga(),
    addImagesSaga(),
    deleteTreeSaga(),
    singleImagesSaga(),
    addInitialTree_activitySaga(),
  ]);
}
