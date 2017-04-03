const { expect } = require('chai');
const evaluation = require('../../backend/models/evaluations/evaluation');
const { normalizeEvaluation } = require('../../frontend/modules/normalize');
const [ sampleEvaluation ] = require('./../fixtures/evaluations');

const normalizedEvaluation = {
  view: 'SUBJECT',
  evaluation: {
    retrieved: true,
    status: 'NEW'
  },
  template: {
    id: 'eng-nodejs',
    name: 'Node JS Dev',
    version: 1,
    categories: ['Magicness', 'Dragon Flight'],
    levels: ['Expert', 'Novice']
  },
  user: {
    email: 'jake@hello.com',
    id: 'user_id',
    name: 'Jake'
  },
  skills: {
    1: {
      id: 1,
      name: 'Dragon Feeding',
      criteria: 'Can successfully feed their dragon',
      type: 'skill',
      version: 1,
      questions: [
        { title: 'Do you know where to get the dragon food?' },
        { title: 'Are you able to feed a dragon and retain your hands' },
      ],
      status: { previous: null, current: null }
    },
    2: {
      id: 2,
      name: 'Advanced knowledge of Dragon Flight',
      criteria: 'Is able to fly their dragon in all situations',
      type: 'skill',
      version: 1,
      questions: [
        { title: 'Are you able to fly your dragon in a hurricane?' },
        { title: 'Can you memoize your dragon?' }
      ],
      status: { previous: null, current: null }
    },
    3: {
      id: 3,
      name: 'Advanced knowledge of the Dark Arts',
      criteria: 'Can execute the Imperius Curse',
      type: 'skill',
      version: 1,
      questions: [
        { title: 'Can you speak parseltongue?' }
      ],
      status: { previous: null, current: null }
    },
    4: {
      id: 4,
      name: 'Working knowledge of the Dark Arts',
      criteria: 'Can execute the Toenail-growing hex',
      type: 'skill',
      version: 1,
      questions: [
        { title: 'Have you hexed anyone in the last month?' }
      ],
      status: { previous: null, current: null }
    }
  },
  skillGroups: {
    0: {
      id: 0,
      level: 'Novice',
      category: 'Dragon Flight',
      skills: [1]
    },
    1: {
      id: 1,
      level: 'Expert',
      category: 'Dragon Flight',
      skills: [2]
    },
    2: {
      id: 2,
      level: 'Expert',
      category: 'Magicness',
      skills: [3]
    },
    3: {
      id: 3,
      level: 'Novice',
      category: 'Magicness',
      skills: [4]
    }
  }
};

describe('normalize evaluation', () => {
  it('should normalize an evaluation', () => {
    expect(normalizeEvaluation(evaluation(sampleEvaluation).subjectEvaluationViewModel)).to.deep.equal(normalizedEvaluation);
  });
});