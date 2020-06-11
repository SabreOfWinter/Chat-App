const Workspace = require("./../models/Workspace");
const User = require("./../models/User");
const catchAsync = require("./../utils/catchAsync");
const Company = require("./../models/Company");
const Collection = require("./../models/ToDoCollection");
const TodoElement = require("./../models/ToDoElement");
const AppError = require("./../utils/appError");

//Create a new todocollection
exports.createCollection = catchAsync(async (req, res, next) => {
  var workspaceDetails = await Workspace.findById(req.body.workspaceid);
  // console.log(workspaceDetails);
  //Only an admin should be able to create a workspace
  if (!workspaceDetails.users.includes(req.user.id)) {
    return next(
      new AppError(
        "You are not a member of this given workspace. You have no right to create a todo collection",
        401
      )
    );
  }
  //So that if the owner of a company creates the workspace their id is not repeated...

  var newCollection = await Collection.create({
    title: req.body.name,
    workspaceID: req.body.workspaceid
  });

  workspaceDetails.task_collections.push(newCollection._id);

  await Workspace.findByIdAndUpdate(workspaceDetails._id, workspaceDetails, {
    new: true
  });
  res.status(200).json({
    status: "success",
    data: newCollection
  });
});

//Returns a given collection provided the correct id
exports.getAGivenCollection = catchAsync(async (req, res, next) => {
  var collectionDetails = await Collection.findById(req.query.collection_id);

  res.status(200).json({
    status: "success",
    data: {
      collectionDetails
    }
  });
});

//SHould be deleted on production
exports.getAllCollectionsInWorkspace = catchAsync(async (req, res, next) => {
  const workspaceData = await Workspace.findById(req.query.workspace_id);
  var answer = [];
  for (var x = 0; x < workspaceData.task_collections.length; x++) {
    answer.push(await Collection.findById(workspaceData.task_collections[x]));
  }
  res.status(200).json({
    status: "success",
    data: answer
  });
});

//Deletes a given collection and its associated collection values
exports.deleteACollection = catchAsync(async (req, res, next) => {
  var collectionDetails = await Collection.findById(req.query.collection_id);
  var workspaceData = await Workspace.findById(collectionDetails.workspaceID);

  // Delete all todo elements form a user account
  for (var x in collectionDetails.to_do_elements.length) {
    await TodoElement.findByIdAndDelete(collectionDetails.to_do_elements[x]);
  }

  //Delete a collection form a workspace
  let new_tasks_collections = []

  console.log("serach", req.query.collection_id)
  console.log(workspaceData.task_collections)
  
  
  for (var x in workspaceData.task_collections) {
    if (workspaceData.task_collections[x].toString() !== req.query.collection_id.toString()) {
      await new_tasks_collections.push(workspaceData.task_collections[x])      
    }
  }
  workspaceData.task_collections = new_tasks_collections

  console.log(workspaceData.task_collections)

  await Workspace.findByIdAndUpdate(workspaceData._id, workspaceData, {
    new: true
  });

  //Remove the collection details
  await Collection.findByIdAndDelete(req.query.collection_id);
  res.status(200).json({
    status: "success",
  });
});

//Adds a given todo element to a collection
exports.addATodoToCollection = catchAsync(async (req, res, next) => {
  var collectionDetails = await Collection.findById(req.body.collectionid);
  //Only if the appropaite methods are present then does it add the data for the update field
  if (req.body.title != "") {
    collectionDetails.title = req.body.title;
  }
  if (req.body.todo_id != "") {
    collectionDetails.to_do_elements.push(req.body.todo_id);
  }

  await Collection.findByIdAndUpdate(collectionDetails.id, collectionDetails, {
    new: true
  });
  res.status(200).json({
    status: "success",
    data: collectionDetails
  });
});
