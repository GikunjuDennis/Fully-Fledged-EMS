import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveList = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await axios.get('/auth/leave_requests');
                if (response.data.Status) {
                    setLeaveRequests(response.data.Result);
                } else {
                    alert('Error fetching leave requests: ' + response.data.Error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching leave requests.');
            }
        };

        fetchLeaveRequests();
    }, []);

    return (
        <div>
            <h2>Leave Requests</h2>
            <ul>
                {leaveRequests.map(request => (
                    <li key={request.id}>
                        <p>Leave Type: {request.leave_type}</p>
                        <p>Start Date: {request.start_date}</p>
                        <p>End Date: {request.end_date}</p>
                        <p>Reason: {request.reason}</p>
                        <p>Status: {request.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveList;
