import React from 'react';
import styles from '../singleresult.module.css'


const YelpSingleResult = () => {
    return ( 
        <div className = {styles.searchresult}> 
            <img src ='https://via.placeholder.com/150'/>
            <p>General Info</p>
            <p>AddressData</p>
        </div>
        
    )
}

export default YelpSingleResult;