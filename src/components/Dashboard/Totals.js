import React,  { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
// import dataCSVdaily from '../../Data/dataTableDaily';
import './CSS/Totals.css';
import Posts from '../../Data/dataDetch';




function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {




    // const [postsList, setPostArr] = React.useState([]);

    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/posts/')
    //         .then(response => response.json())
    //         .then(data => setPostArr([...data]
    //         ))
    //         .catch((error) => {
    //             alert('Error:', error);
    //         });
    // }, []);

    // console.log(postsList, "POSTLOST")




    return (
      <React.Fragment >
        <div style={{textAlign:'center'}}>
          <Title>{props.factor}</Title>
          <p>TOTAL</p>
          <Typography color="secondary" variant="h5" >
            <p style={{ fontSize: 18, display: 'flex', alignItems: 'center', marginTop: 60 }}>
              <PeopleAltTwoToneIcon style={{ fontSize: 60, marginRight: 30 }} />{props.country1 }
            </p>
          </Typography>
          <p style={{ fontSize: 30 }}>{props.sickCount} </p>
          <Typography color="primary" variant="h6">
            <p style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>
              <PeopleAltTwoToneIcon style={{ fontSize: 60, marginRight: 30 }} />{props.country2 }
            </p>
          </Typography>
          <p style={{ fontSize: 30 }}>{props.sickCount2} </p>
          <div>
            <Link color="primary" href="#" onClick={preventDefault}>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }