import axios from './api/axios';
import BootstrapTable from 'react-bootstrap-table-next';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import cellEdit, {Type} from "react-bootstrap-table2-editor";  Import this for editing cells
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
const Table_URL = 'http://localhost:1111/getData';

function DisplayTable(props){
    const [data, setData] = useState([])

    useEffect(()=>{
        getData()
    }, []);

const getData = () => {
    axios(Table_URL).then((res)=> {
        setData(res.data?.gps)
    });
};

const columns = [
    {
        dataField:"DeviceId",
        text: "Device Id",
        sort: true, //sorting
        // editable: false,  // uncomment this if you want it to be uneditable
        filter: textFilter(), //filteration
    },
    {
        dataField:"DeviceType",
        text: "Device Type",
        sort: true,
        // editable: false,  // uncomment this if you want it to be uneditable
        filter: textFilter(),
    },
    {
        dataField:"LatestLocation",
        text: "Latest Location",
    },
    {
        dataField:"createdAt",
        text: "Time Stamp",
    },
];


    return (
        <div className='App'>
            <BootstrapTable keyField='Id' data={data} columns = {columns} striped hover condensed //design aspects
            pagination = {paginationFactory()} // pagination
            // cellEdit = {cellEdit({  // Allows to edit rows except the 2nd and third, if one wants editing just uncomment it. 
            //     mode: "dbclick",
            //     nonEditableRows: () =>[2,3] 
            // })}
            
            filter = {filterFactory()}/>
        </div>
    );
}
export default DisplayTable