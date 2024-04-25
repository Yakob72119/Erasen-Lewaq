import React from 'react'

const AdminPaymentHis = () => {
    const data = [
        ['Akrem Muktar', 'PHD', 'Seng', 'payed', '200'],
        ['Akrem Muktar', 'PHD', 'Seng', 'Deleted', '200'],
        ['Akrem Muktar', 'PHD', 'Seng', 'payed', '200']
    ];
    
    const dataView = data.map((item, index) => (
        <tbody className='body' key={item.id}>
            <tr>
                <td className='name'> {item[0]}</td>
                <td className='eduStatus'>{item[1]}</td>
                <td className='depart'>{item[2]}</td>
                <td className='examStates'>{item[3]}</td>
                <td className='examStates'>{item[4]}</td>

            </tr>
        </tbody>
    ));
    return (
        <>
            <table border={1}>
                <thead className='head'>
                    <th>Name</th>
                    <th>Education</th>
                    <th>Department</th>
                    <th>Payment status</th>
                    <th>Amount</th>
                </thead>
                {dataView}
            </table>
        </>
    )
}

export default AdminPaymentHis
