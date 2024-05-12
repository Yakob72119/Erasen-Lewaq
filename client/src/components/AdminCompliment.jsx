import React from 'react'

const AdminCompliment = () => {
    const compliments = [
        {
            examId: '66308e90a7f6a6b01b595e47',
            complimentText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit tempora esse, quia et quod impedit facere nobis rem temporibus eos pariatur, repellat quis, deleniti nihil suscipit ducimus incidunt. Ipsum, optio.',
        },
        {
            examId: '66308e90a7f6a6b01b595e47',
            complimentText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit tempora esse, quia et quod impedit facere nobis rem temporibus eos pariatur, repellat quis, deleniti nihil suscipit ducimus incidunt. Ipsum, optio.',
        },
        {
            examId: '66308e90a7f6a6b01b595e47',
            complimentText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit tempora esse, quia et quod impedit facere nobis rem temporibus eos pariatur, repellat quis, deleniti nihil suscipit ducimus incidunt. Ipsum, optio.',
        },
        {
            examId: '66308e90a7f6a6b01b595e47',
            complimentText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit tempora esse, quia et quod impedit facere nobis rem temporibus eos pariatur, repellat quis, deleniti nihil suscipit ducimus incidunt. Ipsum, optio.',
        },
        {
            examId: '66308e90a7f6a6b01b595e47',
            complimentText: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit tempora esse, quia et quod impedit facere nobis rem temporibus eos pariatur, repellat quis, deleniti nihil suscipit ducimus incidunt. Ipsum, optio.',
        },
    ];
    return (
        <div className='admin-compliment'>
            {compliments.map((compliment, index) => (
                <div key={index} className="compliment">
                    <div className="examId">
                        {compliment.examId}
                    </div>
                    <div className="complimentText">
                        {compliment.complimentText}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminCompliment
