import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveDetails = ({ match }) => {
    const [leaveRequest, setLeaveRequest] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchLeaveRequest = async () => {
            try {
                const response = await axios.get(`/auth/leave_requests/${match.params.id}`);
                if (response.data.Status) {
                    setLeaveRequest(response.data.Result);
                } else {
                    alert('Error fetching leave request: ' + response.data.Error);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching leave request.');
            }
        };

        fetchLeaveRequest();
    }, [match.params.id]);

    const handleStatusChange = async () => {
        try {
            const response = await axios.put(`/auth/approve_leave/${match.params.id}`, { status });
            if (response.data.Status) {
                alert('Leave request updated successfully!');
                // Handle success (e.g., redirect or refresh list)
            } else {
                alert('Error updating leave request: ' + response.data.Error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error updating leave request.');
        }
    };

    return leaveRequest ? (
        <div>
            <h2>Leave Request Details</h2>
            <p>Leave Type: {leaveRequest.leave_type}</p>
            <p>Start Date: {leaveRequest.start_date}</p>
            <p>End Date: {leaveRequest.end_date}</p>
            <p>Reason: {leaveRequest.reason}</p>
            <p>Status: {leaveRequest.status}</p>
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Approved">Approve</option>
                    <option value="Rejected">Reject</option>
                </select>
            </label>
            <button onClick={handleStatusChange}>Update Status</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default LeaveDetails;
