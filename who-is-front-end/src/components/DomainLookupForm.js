import React, { useState } from 'react';

function DomainLookupForm({ onLookup }) {
    const [domain, setDomain] = useState('');
    const [infoType, setInfoType] = useState('1');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLookup(domain, infoType);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter domain name"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-select"
                    value={infoType}
                    onChange={(e) => setInfoType(e.target.value)}
                >
                    <option value="1">Domain Information</option>
                    <option value="0">Contact Information</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Lookup</button>
        </form>
    );
}

export default DomainLookupForm;