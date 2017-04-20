import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Grid, Alert, ListGroup, ListGroupItem } from 'react-bootstrap';

import { actions, ACTION_TYPES } from '../../../modules/user/actions';
import PageHeader from './../../common/PageHeader';
import ActionsList from './ActionsList';

class FeedbackPageComponent extends React.Component {
  componentDidMount() {
    this.props.actions.retrieveActions(this.props.userId, ACTION_TYPES.FEEDBACK);
  }

  render() {
    const { error, actions } = this.props.feedback;

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
      <Grid>
        <PageHeader title='Feedback' />
        { actions ? <ActionsList actions={actions} />  : false}
      </Grid>
    )
  }
}

FeedbackPageComponent.propTypes = {
  userId: PropTypes.string.isRequired,
  feedback: PropTypes.object,
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