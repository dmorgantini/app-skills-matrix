const { normalize, schema } = require('normalizr');

const normaliseEvaluationSkillGroup = (skillGroups) => {
  const skill = new schema.Entity('skills');
  const skillGroup = new schema.Entity('skillGroups', { skills: [skill] });
  const skillGroupList = new schema.Array(skillGroup);

  return normalize(skillGroups, skillGroupList).entities;
};

module.exports.normalizeEvaluation = (evaluation) => {
  const { skills, skillGroups } = normaliseEvaluationSkillGroup(evaluation.skillGroups);

  return Object.assign({}, {
    evaluation: {
      retrieved: true,
      status: evaluation.status,
    },
    template: evaluation.template,
    skills,
    skillGroups
  });
};
