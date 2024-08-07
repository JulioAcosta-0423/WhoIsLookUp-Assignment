import React from 'react';

function ResultsDisplay({ results }) {
    if (!results) return null;
    if (results.type === '1') {
        return (
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Domain Name</th>
                        <th>Registrar</th>
                        <th>Registration Date</th>
                        <th>Expiration Date</th>
                        <th>Estimated Domain Age</th>
                        <th>Hostnames</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{results.DomainName}</td>
                        <td>{results.Registrar}</td>
                        <td>{results.RegistrationDate}</td>
                        <td>{results.ExpirationDate}</td>
                        <td>{results.EstimatedDomainAge}</td>
                        <td class="text-wrap text-break w-25">{results.Hostnames}</td>
                    </tr>
                </tbody>
            </table>
        );
    } else if (results.type === '0') {
        return (
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>Registrant Name</th>
                        <th>Technical Contact Name</th>
                        <th>Administrative Contact Name</th>
                        <th>Contact Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{results.RegistrantName}</td>
                        <td>{results.TechnicalContactName}</td>
                        <td>{results.AdministrativeContactName}</td>
                        <td>{results.ContactEmail}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return null;
}

export default ResultsDisplay;