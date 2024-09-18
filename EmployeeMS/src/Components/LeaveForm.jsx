import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = () => {
    const [leaveType, setLeaveType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/employee/apply_leave', {
                leave_type: leaveType,
                start_date: startDate,
                end_date: endDate,
                reason: reason,
            });
            if (response.data.Status) {
                alert('Leave applied successfully!');
                // Handle success (e.g., redirect or clear form)
            } else {
                alert('Error applying leave: ' + response.data.Error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error applying leave.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Leave Type:
                <input type="text" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} />
            </label>
            <label>
                Start Date:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
                End Date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <label>
                Reason:
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
            </label>
            <button type="submit">Apply Leave</button>
        </form>
    );
};

export default LeaveForm;
