import React from 'react'

export default function MissionKey() {
    return (
        <div className='my-3' style={{marginBottom: 20 + 'px', marginTop: 20 + 'px'}}>
            <p style={{padding: 10 + 'px', margin: 10 + 'px', width: 100 }} className="px-3 mr-2 bg-success">
                <span className="px-3 mr-2 bg-success"></span> Success
            </p>
            <p style={{padding: 10 + 'px', margin: 10 + 'px', width: 100 }} className="px-3 mr-2 bg-danger">
                <span className="px-3 mr-2 bg-danger"></span> Fail
            </p>
        </div>
    )
}
