import React from 'react';
import LeaveForm from '../components/Leave/LeaveForm';
import LeaveList from '../components/Leave/LeaveList';
import { Route, Switch } from 'react-router-dom';
import LeaveDetails from '../components/Leave/LeaveDetails';

const LeavePage = () => {
    return (
        <div>
            <h1>Leave Management</h1>
            <Switch>
                <Route path="/apply_leave" component={LeaveForm} />
                <Route path="/leave_requests" component={LeaveList} />
                <Route path="/leave_request/:id" component={LeaveDetails} />
            </Switch>
        </div>
    );
};

export default LeavePage;
