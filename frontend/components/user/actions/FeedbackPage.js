import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Grid, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';

import { actions, ACTION_TYPES } from '../../../modules/user/actions';
import PageHeader from './../../common/PageHeader';
import ActionsList from './ActionsList';
import SkillDetailsModal from '../../common/matrix/SkillDetailsModal';

class FeedbackPageComponent extends React.Component {
  componentDidMount() {
    this.props.actions.retrieveActions(this.props.userId, ACTION_TYPES.FEEDBACK);
  }
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.viewSkillDetails = this.viewSkillDetails.bind(this);
    this.hideSkillDetails = this.hideSkillDetails.bind(this);
  }

  viewSkillDetails(skill) {
    console.log('view skill details: ', skill);
    this.setState({
      showModal: true,
      currentSkill: skill,
    });
  }

  hideSkillDetails() {
    this.setState({
      currentSkill: null,
      showModal: false,
    })
  }

  render() {
    const { error, actions, skillBeingEvaluated, updateSkillStatus, canUpdateSkillStatus } = this.props.feedback;

    if (error) {
      return (
        <Grid>
          <Row>
            <Alert bsStyle='danger'>Something went wrong: {error.message}</Alert>
          </Row>
        </Grid>
      );
    }

    return (
      <div>
        <Grid>
          <PageHeader title='Feedback' />
          { actions ? <ActionsList
            actions={actions}
            viewSkillDetails={this.viewSkillDetails}
            skillBeingEvaluated={skillBeingEvaluated}
          />  : false}
        </Grid>
        <SkillDetailsModal
          showModal={this.state.showModal}
          onClose={this.hideSkillDetails}
          skill={this.state.currentSkill}
          updateSkillStatus={updateSkillStatus}
          canUpdateSkillStatus={canUpdateSkillStatus}
        />
      </div>
    )
  }
}

FeedbackPageComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  feedback: PropTypes.object,
  skillBeingEvaluated: PropTypes.number,
  canUpdateSkillStatus: PropTypes.bool,
};

export const FeedbackPage = connect(
  function mapStateToProps(state) {
    return ({
      userId: state.user.userDetails.id,
      feedback: state.actions.feedback
    });
  },
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
)(FeedbackPageComponent);
