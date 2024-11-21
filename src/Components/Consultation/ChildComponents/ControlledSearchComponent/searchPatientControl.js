import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { getPatientList } from  '../../../../Actions/consultation';
import _ from 'lodash';


const SearchPatientComponent = ({ getPatientList }) => {
    const [searchString, setSearchString] = useState('');

    const debouncedFn = useCallback(
        _.debounce((value) => {
            getPatientList(value);
        }, 300),
        []
    );

    const handleChange = (event) => {
        event.persist();
        setSearchString(event.target.value);
        debouncedFn(event.target.value);
    };

    return (
        <input 
            onChange={handleChange} 
            type="text" 
            value = {searchString}
            className='form-control' 
            aria-describedby="sizing-addon1" 
            placeholder="Enter patient ID or mobile number to search patient..." 
        />
    );
};

export default connect(
    null,
    { getPatientList }
)(SearchPatientComponent);