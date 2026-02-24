import { faker } from '@faker-js/faker';
import {useEffect, useState} from "react";
import axios from 'axios';

const cc = require('./symbols/mark_cc.png');
const lc = require('./symbols/mark_lc.png');
const lu = require('./symbols/mark_lu_b.png');
const rb = require('./symbols/mark_rb_b.png');
const rc = require('./symbols/mark_rc.png');
const rv = require('./symbols/mark_rv_lu.png');
const rv_lu = require('./symbols/mark_rv_lu.png');
const rv_lurd = require('./symbols/mark_rv_lurd.png');
const rv_rb = require('./symbols/mark_rv_rb.png');
const rv_ruld = require('./symbols/mark_rv_ruld.png');



export default function MakeData(count) {
    // let data = [];

    let options = [];

    let kuvat = [];

    kuvat = [
        kuvat[0] = cc,
        kuvat[1] = lc,
        kuvat[2] = lu,
        kuvat[3] = rb,
        kuvat[4] = rc,
        kuvat[5] = rv,
        kuvat[6] = rv_lu,
        kuvat[7] = rv_lurd,
        kuvat[8] = rv_rb,
        kuvat[9] = rv_ruld
    ]

    for (let j = 0; j < kuvat.length; j++) {
        let roww = {
            music: kuvat[j]
        };
        options.push({label: roww.music});
    }


    const [data, setData] = useState([]);

    const [work3Name, setWork3Name] = useState(null);
    const [work1Name, setWork1Name] = useState(null);
    const [work2Name, setWork2Name] = useState(null);

    /*
    useEffect(() => {
        axios.get("http://localhost:3001/work_types")
            .then(response => setData(response.data))
            .catch(error => console.error(error));
        }
    )

     */

    /*
        const backendItems = data.map((item,index) =>
            let row = {}
        {
            ID: index,
            firstName:item.work1_name,
            lastName: item.work2_name,
            email: item.work3_name
        })

     */


    for (let i = 0; i < count; i++) {
        let row = {
            ID: i,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
        };
        // options.push({label: row.music, backgroundColor: randomColor()});

        data.push(row);
    }



    let [row, setRow] = useState('');

    /*
const rows = data.map((item, k) => {
    return (
        <tr key={item.id}>
            <td>{item.work1_name}</td>
            <td>{item.work2_name}</td>
            <td>{item.work3_name}</td>
        </tr>
    );
});
     */

    /*
        let rows = data.map((_,index) => {
            let columnValues = data.map(i => data[index][i])
            return columnValues
        })

     */

    let columns = [
        {
            id: "_id",
            label: "work1_name",
            accessor: "work1_name",
            minWidth: 100,
            dataType: "text",
            options: options,
        },
        {
            id: "lastName",
            label: "work2_name",
            accessor: "work2_name",
            minWidth: 100,
            dataType: "text",
            options: options
        },
        {
            id: "age",
            label: "work3_name",
            accessor: "work3_name",
            minWidth: 100,
            dataType: "text",
            options: options,
        },

        /*
        {
            id: 999999,
            width: 2,
            label: "+",
            disableResizing: true,
            dataType: "null"
        }

         */




    ];
    let rows = [
        {
            id: Math.floor(Math.random()*20),
            name: '',
            age: ''
        }
    ];
    return {columns: columns, rows: rows, skipReset: false};
    // return {columns: columns, data: rows, skipReset: false};
}
