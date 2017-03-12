const database = require('../../database');
const evaluationsCollection = database.collection('evaluations');
const evaluation = require('./evaluation');
const { STATUS } = require('./evaluation');
const { ObjectId } = require('mongodb');
const R = require('ramda');

const lensMatching = (pred) =>
  R.lens(
    R.find(pred),
    (newVal, arr) => {
      const index = R.findIndex(pred, arr);
      return R.update(index, newVal, arr);
    }
  );

const lensById = R.compose(lensMatching, R.propEq('id'));

module.exports = {
  addEvaluation: function (newEvaluation) {
    return evaluationsCollection.insertOne(newEvaluation)
      .then(({ insertedId }) => evaluationsCollection.findOne({ _id: new ObjectId(insertedId) }))
      .then((res) => res ? evaluation(res) : null);
  },
  getEvaluationById: function (id) {
    return evaluationsCollection.findOne({ _id: ObjectId(id) })
      .then(res => res ? evaluation(res) : null);
  },
  getByUserId: function (userId) {
    return evaluationsCollection.find({ 'user.id': userId })
      .then(res => res.toArray())
      .then(res => res.map(evaluation))
  },
  updateSkillStatus: function(inProgressEvaluation, skillGroupId, skillId, status) {
    const skillLens = R.compose(
      R.lensProp('skillGroups'),
      lensById(skillGroupId),
      R.lensProp('skills'),
      lensById(skillId),
      R.lensPath(['status', 'current'])
    );

    const updatedEvaluation = R.set(skillLens, status, inProgressEvaluation);

    return evaluationsCollection.updateOne(
      { _id: new ObjectId(inProgressEvaluation.id) },
      { $set:  updatedEvaluation }
    )
    .then(() => evaluationsCollection.findOne({ _id: ObjectId(inProgressEvaluation.id) }))
    .then((res) => res ? evaluation(res) : null )
  },
  complete: function(completedEvaluation) {
    return evaluationsCollection.updateOne(
      { _id: ObjectId(completedEvaluation.id) },
      { $set: { status: STATUS.COMPLETE} }
    )
    .then(() => evaluationsCollection.findOne({ _id: ObjectId(completedEvaluation.id) }))
    .then((res) => res ? evaluation(res) : null )
  }
};
