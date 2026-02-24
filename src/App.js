import React, {useEffect, useLayoutEffect, useReducer, useState} from "react";
import {useRef} from "react";
import Select from 'react-select';
import ReactSlider from "react-slider";
import jsPDF from "jspdf";
import "./style.css";
import MakeData from "./components/makeData";
import Table from "./components/Table";
import { randomColor, shortId } from "./utils";
import { grey } from "./colors";
import Slider  from "./components/Slider";
import axios from "axios";
import Pdf from "./components/toPdf";
import {usePDF} from "react-to-pdf";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import CellLink from "./components/CellLink";
import { components } from 'react-select';
import {tab} from "@testing-library/user-event/dist/tab";
import nanoid from "nanoid";
import './Darkmode/darkmode.css'


import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { Viewer } from '@react-pdf-viewer/core';
import slider from "./components/Slider";
import YoutubeEmbed from "./components/YoutubeEmbed";
import {BrowserRouter, Navigate, NavLink, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Hamburger from "./img/Hamburger";




const { SingleValue, Option } = components;

const getTargetElement = () => document.getElementById('target-ref');

// Different symbols

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







// const tableRef = useRef();

// Different cases for columns and cells
function reducer(state, action) {
  switch (action.type) {
    case "add_option_to_column":
      const optionIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, optionIndex),
          {
            ...state.columns[optionIndex],
            options: [
              ...state.columns[optionIndex].options,
              { label: action.option }
            ]
          },
          ...state.columns.slice(optionIndex + 1, state.columns.length)
        ]
      };
    case "add_row":
      console.log('new row added');
      const newWork = {
        work1_name: '',
        work2_name: '',
        work3_name: '',
        work4_name:''
      }
      console.log(state.data);
      console.log(state.data);



      // this code is commented because at the moment, the backend isn't utilized.
      // if it were, this is called the save new work types in to a database.
      /*
      work_types_service.create(newWork)
          .then(response => {
            console.log("success", response.data)
          })
          .catch(error => {
            console.log(error)
          })

       */


      // console.log('saving ', newWork)
      /*
            data: state.data.map((row) => ({
              ...row,
              [action.columnId]: row[action.columnId] + ""
            }))
       */
      return {
        data:{

        }
      };
    case "update_column_type":
      const typeIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      switch (action.dataType) {
        case "select":
          if (state.columns[typeIndex].dataType === "select") {
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                { ...state.columns[typeIndex], dataType: action.dataType },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              skipReset: true
            };
          } else {
            const options = [];
            state.data?.forEach((row) => {
              if (row[action.columnId]) {
                options.push({
                  label: row[action.columnId]
                });
              }
            });
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                {
                  ...state.columns[typeIndex],
                  dataType: action.dataType,
                  options: [...state.columns[typeIndex].options, ...options]
                },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              skipReset: true
            };
          }
        case "text":
          if (state.columns[typeIndex].dataType === "text") {
            return state;
          } else if (state.columns[typeIndex].dataType === "select") {
            return {
              ...state,
              skipReset: true,
              columns: [
                ...state.columns.slice(0, typeIndex),
                { ...state.columns[typeIndex], dataType: action.dataType },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ]
            };
          } else {
            return {
              ...state,
              skipReset: true,
              columns: [
                ...state.columns.slice(0, typeIndex),
                { ...state.columns[typeIndex], dataType: action.dataType },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              data: state.data.map((row) => ({
                ...row,
                [action.columnId]: row[action.columnId] + ""
              }))
            };
          }
        default:
          return state;
      }
    case "update_column_header":
      const index = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, index),
          { ...state.columns[index], label: action.label },
          ...state.columns.slice(index + 1, state.columns.length)
        ]
      };
    case "update_cell":
      return {
        ...state,
        skipReset: true,
        data: state.data?.map((row, index) => {
          if (index === action.rowIndex) {
            return {
              ...state.data[action.rowIndex],
              [action.columnId]: action.value
            };
          }
          return row;
        })
      };
    case "add_column_to_left":
      const leftIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      let leftId = shortId();
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, leftIndex),
          {
            id: leftId,
            label: "Column",
            accessor: leftId,
            dataType: "text",
            created: action.focus && true,
            options: [
              {
                value: 0,
                label: cc,
                image: cc,
              },
              {
                value: 1,
                label: lc,
                image: lc,
              },
              {
                value: 2,
                label: lu,
                image: lu,
              },
              {
                value: 3,
                label: rb,
                image: rb,
              },
              {
                value: 4,
                label: rc,
                image: rc,
              },
              {
                value: 5,
                label: rc,
                image: rc,
              },
              {
                value: 6,
                label: rv,
                image: rv,
              },
              {
                value: 7,
                label: rv_lu,
                image: rv_lu,
              },
              {
                value: 8,
                label: rv_lurd,
                image: rv_lurd,
              },
              {
                value: 9,
                label: rv_rb,
                image: rv_rb,
              },
              {
                value: 10,
                label: rv_lurd,
                image: rv_lurd,
              }
            ]
          },
          ...state.columns.slice(leftIndex, state.columns.length)
        ]
      };
    case "add_column_to_right":
      const rightIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      const rightId = shortId();
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, rightIndex + 1),
          {
            id: rightId,
            label: "Column",
            accessor: rightId,
            dataType: "text",
            created: action.focus && true,
            options: [
              {
                value: 0,
                label: cc,
                image: cc,
              },
              {
                value: 1,
                label: lc,
                image: lc,
              },
              {
                value: 2,
                label: lu,
                image: lu,
              },
              {
                value: 3,
                label: rb,
                image: rb,
              },
              {
                value: 4,
                label: rc,
                image: rc,
              },
              {
                value: 5,
                label: rc,
                image: rc,
              },
              {
                value: 6,
                label: rv,
                image: rv,
              },
              {
                value: 7,
                label: rv_lu,
                image: rv_lu,
              },
              {
                value: 8,
                label: rv_lurd,
                image: rv_lurd,
              },
              {
                value: 9,
                label: rv_rb,
                image: rv_rb,
              },
              {
                value: 10,
                label: rv_lurd,
                image: rv_lurd,
              }
            ]
          },
          ...state.columns.slice(rightIndex + 1, state.columns.length)
        ]
      };
    case "delete_column":
      const deleteIndex = state.columns.findIndex(
          (column) => column.id === action.columnId
      );
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, deleteIndex),
          ...state.columns.slice(deleteIndex + 1, state.columns.length)
        ]
      };
    case "delete_row":
      const deleteRowIndex = state.rows.findIndex(
          (row) => row.id === action.rowId
      );
      return {
        ...state,
        skipReset: true,
        rows: [
          ...state.rows.slice(0, deleteRowIndex),
          ...state.rows.slice(deleteRowIndex + 1, state.rows.length)
        ]
      };
    case "enable_reset":
      return {
        ...state,
        skipReset: false
      };
    default:
      return state;
  }
}

function App() {

  const [theme, setTheme] = useState('light');

  const [darkMode, setDarkMode] = useState(true);



  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);



  const [data, setData] = useState(['']);

  const [skipPageReset, setSkipPageReset] = React.useState(false)


  const {toPDF, targetRef} = usePDF({filename: 'page.pdf'});

  // Maybe a database isn't necessary for this kind of simple application?
  /*
  useEffect(() => {
        axios.get("http://localhost:3001/work_types")
            .then(response => setData(response.data))
            .catch(error => console.error(error));
      }
  )

   */

  // Reducer sets the state
  const [state, dispatch] = useReducer(reducer, MakeData());

  const [tableData, setTableData] = React.useState([]);

  const [lkm, setLkm] = useState('');

  /*
  const tabledata = [
    {
      id: 1,
      name: '',
      age: '',
    },
    {
      id: 2,
      name: '',
      age: '',
    },
    {
      id: 3,
      name: '',
      age: '',
    }
  ]
  //setTableData(tabledata);

  React.useEffect(() => {
    setTableData(tabledata);
  }, []);

   */

  // Adds row to table
  const handleAdd = () => {
    const newData = {
      id: Math.floor(Math.random()*20),
      name: '',
      age: ''
    }
    // tableData.push(newData);
    setTableData([...tableData, newData]);
    console.log(tableData.length + '= Current height');

    const tableH = document.getElementById('targetContainer');
    console.log(parseInt(tableH.style.height));
    if (targetRef.current.clientHeight > 960){
      alert('WARNING: Adding another row will go over the current page limit,' +
          'If you wish to make more rows, please adjust the row height.');
    }
    console.log(targetRef.current.clientHeight);

    if (tableData.length > 2){
      // alert('WARNING: Adding another row will go over the current page limit.' +
      //  'If you wish to make more rows, please adjust the row height.');
    }


  };
  console.log(tableData.length);

  // Removes row from table
  const handleRemove = () => {
    console.log(tableData);
    console.log(tableData.length);
    const newVals = [];
    for(let i = 0; i < tableData.length-1; i++){
      newVals[i] = {
        id: Math.floor(Math.random()*20),
        name: '',
        age: '',
      }
    }
    console.log(newVals);
    // setTableData([newVals]);
    // const numero = tableData.length;
    /*
    if(tableData.length > 1 && tableData.length < 2){
      setTableData(tableData.filter((row) => row.id !== tableData.length-1));
    } else if(tableData.length >= 2){
      const newVals = [];
      for(let i = 0; i < tableData.length - 1; i++){
        newVals[i] = {
          id: Math.floor(Math.random()*20),
          name: '',
          age: '',
        }
      }
      console.log(newVals);
      setTableData([newVals]);
    } else {
      setTableData([]);
    }

     */
    // tableData.pop();
    //const newList = tableData.filter( li => li.id !== id);
    console.log(tableData);
    setTableData(newVals);


    document.querySelectorAll('*').forEach(el => {
      if (el.offsetWidth > document.documentElement.offsetWidth) {
        console.log('Found the overflow: ', el);
      }
    });
  }
  // Used for updating the data.
  const updateMyData = (rowIndex, columnId, value) => {
    // not reset the page
    setSkipPageReset(true)
    setTableData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,
            }
          }
          return row
        })
    )
  }

  const options = [
    {
      value: 0,
      image: cc,
    },
    {
      value: 1,
      image: lc,
    },
    {
      value: 2,
      image: lu,
    },
    {
      value: 3,
      image: rb,
    },
    {
      value: 4,
      image: rc,
    },
    {
      value: 5,
      image: rc,
    },
    {
      value: 6,
      image: rv,
    },
    {
      value: 7,
      image: rv_lu,
    },
    {
      value: 8,
      image: rv_lurd,
    },
    {
      value: 9,
      image: rv_rb,
    },
    {
      value: 10,
      image: rv_lurd,
    }
  ];


  // Options for the pdf download
  const Options = {
    method: 'open',
    resolution: Resolution.LOW,
    page: {
      margin: Margin.NONE,
      format: 'A4',
      orientation: 'landscape',
    },
    canvas: {
      mimeType: 'image/png',
      qualityRatio: 1,
      height:100
    },
    overrides: {
      pdf: {
        compress: true
      },
      canvas: {
        useCORS: true,
      }
    },
  };

  const IconSingleValue = (props) => (
      <SingleValue {...props}>
        <img src={props.data.image} style={{ height: '190px', width: '190px',
          justifyContent:'center', alignItems:'center'}}/>
        {props.data.label}
      </SingleValue>
  );
  const IconOption = (props) => (
      <Option {...props}>
        <img src={props.data.image} style={{ height: '30px', width: '50px', borderRadius: '50%', marginRight: '10px' }}/>
        {props.data.label}
      </Option>
  );

  // Style for the React select dropdown menu
  const colourStylesRow = {
    dropdownIndicator: styles => ({
      ...styles,
      color: 'white',
      height: 500,
    }),
    container:  base => ({
      ...base,
      flex:1,
      color: 'white',
      height: 200,
      width: 300,
    })
  }


  // Style for the React select dropdown menu
  const styles = {
    dropdownIndicator: styles => ({
      ...styles,
      color: '#FFAE12',
      height: 500,
    }),
    container:  base => ({
      ...base,
      flex:1,
      height: 200,
      width: 300,
    })
  }



  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'white !important'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black'
    }),
    input: (styles) => ({
      ...styles,
      '[type="text"]': {
        color: 'white !important'
      }
    })
  }



  // const [state, dispatch] = data;

  useEffect(() => {
    dispatch({ type: "enable_reset" });
  }, [state.columns, state.data]);


  const [rangeSliderValue, setRangeSliderValue] = useState(500);

  const handleRangeSliderChange = (e) => {
    setRangeSliderValue(e.target.value);
    console.log(slider.get());
    console.log('moi');
  };


  const [minHeight, setMinHeight] = useState('');

  const handleBigger = (e) => {
    setMinHeight(5000);
    document.querySelector('.table').style.height
        = minHeight;
    console.log('bigger');
    document.querySelectorAll(".td").minHeight
        = minHeight;
  }

  function rotate90() {
    /*
    document.querySelector('.table').style.transform
        = 'rotate(90deg)';
    document.querySelector('#tableId').style.transform
        = 'rotate(90deg)';
    document.querySelector('#firstSelect').style.transform
        = 'rotate(90deg)';
    document.querySelector('#secondSelect').style.transform
        = 'rotate(90deg)'
     */

    document.querySelector('.table').style.transform
        = 'rotate(90deg)';
    document.querySelector('#firstSelect').style.transform
        = 'rotate(90deg)';
    document.querySelector('#secondSelect').style.transform
        = 'rotate(90deg)';
    document.querySelector('#tableId').style.transform
        = 'rotate(90deg)';
    document.querySelector('#tableId').style.transform
        = 'flex';
    document.querySelector('#tableId').style.transform
        = 'left:20';
    targetRef.transform = 'rotate(90deg)';
  }

  const rotatePluginInstance = rotatePlugin();

  const changeWidth = (event) => {
    document.querySelector('.table').style.transform
        = 'rotate(45deg)';
  }

  const changeMinHeight = (event) => {
    setMinHeight(event.target.value);
  }
  const tableRef = useRef();

  const ChangeRowHeight = () => {
    console.log('Changing row heights');
    // tableRef.current.getElementsByClassName('.tr').style.height=10 + 'px';
    // tableRef.current.getElementsByClassName('.tr').style.height=10+'px';
    // document.querySelectorAll('.table td').height = 10 + 'px';
    // tableRef.current.rows.style.height=50 + 'px';
    // const poyta = document.getElementsByClassName('table');
    // poyta.maxHeight=100 + 'px';
    //const td = document.querySelectorAll(".table td");
    //td.height=500 + 'px';
    console.log(document.getElementsByClassName('.td'));
    //document.getElementsByClassName('.tr').style.height=10 + 'px';
  }

  // Slider for changing table row heights
  const tableSlider = document.getElementById('tableSlider');

  // Text for button for changing the options
  const [btnText, setBtnText] = useState('Hide Options');

  // Changes the text according to the current selection.
  const changeText = (x) => setBtnText(x);

  // Hides the elements of the React table, that are not necessary to show
  // in the PDF file.
  const onClicked = () =>{
    if( tableSlider.style.display !== 'none'){
      document.getElementById('tableSlider').style.display='none';
      document.getElementById('heightForm').style.display='none';
      document.getElementById('headers').style.display='none';
      document.getElementById('columnBtn').style.display='none';
      //document.getElementById('rowForm').style.display='none';
      document.getElementById('autoBtn').style.display='none';
      // document.getElementById('fontForm').style.display='none';
      changeText('Show Options');
    } else {
      document.getElementById('tableSlider').style.display='block';
      document.getElementById('heightForm').style.display='block';
      //document.getElementById('rowForm').style.display='block';
      document.getElementById('autoBtn').style.display='block';
      document.getElementById('columnBtn').style.display='flex';
      // document.getElementById('fontForm').style.display='block';
      document.getElementById('headers').style.display='flex';

      changeText('Hide Options');
    }
    // document.getElementById('headers').style.display='none';
  }



  const toggleMenu = (event) => {
    event.preventDefault()
    document.getElementById('main-nav-links').classList.toggle('hideOnMobile')
  }

  return (
      <div className={'main-layout'}>

        <nav className="main-nav">
          <div className="nav-wrapper">
            <div className="nav-header">
              Create Your Work Table
            </div>
            <button id="mobileMenu" className="mobileMenu" onClick={toggleMenu}><Hamburger/></button>
            <ul id="main-nav-links" className="hideOnMobile">
              <li>
                <button onClick={handleAdd} className="button">Add</button>
              </li>
              <li>
                <button onClick={handleRemove} className="delButton">Remove</button>
              </li>
              <li>
                <button id="pdfButton" className="button" onClick={() => generatePDF(targetRef, Options)}>
                  PDF
                </button>
              </li>
              <li>
                <div style={{display: "flex", justifyContent: "center", margin: 5}}>
                  <button className="button" onClick={onClicked}>{btnText}</button>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <div
            style={{
              width: "100vw",
              height: "100vh",
              overflowX: "auto"
            }}
        >


          <div
              style={{
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
          >

            {/*
            <div>
              <h1 className="title"> Create Your Own Work Table </h1>
            </div>
            */}


          </div>
          <div className="container">
            {/*

          <div className={`App ${theme}`}>
            <button id="darkmodeButton" onClick={toggleTheme} className="navlink">
              Darkmode
            </button>
          </div>
          */}

            <div style={{
              display: "flex"
            }}>

              {/*
              <div className={`App ${theme}`} style={{justifyContent: 'left', marginRight: '200px'}}>
                <button id="darkmodeButton" onClick={toggleTheme} className="navlink">
                  Darkmode
                </button>
              </div>
              */}

              {/*
              <div style={{
                display: 'flex', justifyContent: "center",
                alignItems: "center"
              }}>
                <button onClick={handleAdd} className="button">Add New Row</button>
                <button onClick={handleRemove} className="delButton">Remove Row</button>
              </div>
              */}


            </div>
            <div style={{overflow: "auto", display: "flex"}}>
              <div
                  style={{
                    flex: "1 1 auto",
                    padding: "1rem",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
              >


                <div id="targetContainer">
                  <div ref={targetRef} id="targetDiv" style={{minHeight: `${minHeight}`, minWidth: 60}}>
                    <div className='table-container'
                        //style={{minHeight: `${rangeSliderValue}%`}}
                         style={{minHeight: `${minHeight}`}}
                    >
                      <div style={{
                        verticalAlign: "top", left: 0, right: 100, width: 210,
                        fontSize: 100
                      }} id="firstSelect">
                        <Select
                            components={{
                              SingleValue: IconSingleValue,
                              Option: IconOption,
                              DropdownIndicator: () => null
                            }}
                            options={options}
                            menuPortalTarget={document.body}
                            placeholder={''}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                boxShadow: "none",
                                color: "red",
                                width: "100%",
                              }),
                              option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#00AEEC' : 'inherit',
                              })
                            }}
                            autoSize={true}
                        />
                      </div>
                      <div style={{marginLeft: 100, marginRight: 100, width: 1300, maxWidth: 1500}}>
                        <Table id="reactTable"
                               ref={tableRef}
                               columns={state.columns}
                               rows={state.rows}
                               minHeight={minHeight}
                               manualRowResize={true}
                               autoRowResize={true}
                               data={tableData}
                               dispatch={dispatch}
                               skipReset={state.skipReset}
                               pageSize={100}
                               rotate={90}
                               updateMyData={updateMyData}/>
                      </div>
                      <div style={{verticalAlign: "bottom", position: 'fixed', right: 280, width: 100}}
                           id="secondSelect">
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      float: "right",
                      verticalAlign: "bottom",
                      right: 20,
                      width: 210,
                      fontSize: 20,
                      height: minHeight
                    }}>
                      <div style={{
                        verticalAlign: "bottom", width: 210, position: 'relative',
                        fontSize: 100, right: 20
                      }} id="secondSelect">
                        <Select
                            components={{
                              SingleValue: IconSingleValue,
                              Option: IconOption,
                              DropdownIndicator: () => null
                            }}
                            options={options}
                            styles={{colourStylesRow}}
                            autoSize={true}
                            menuPortalTarget={document.body}
                            placeholder={''}
                        />
                      </div>
                    </div>

                    <div id="tableId" style={{display: "flex", margin: 15, height: 300, fontSize: 30}}>
                      ID:
                      <div style={{width: 210, fontSize: 100, margin: 10}}>
                        <Select
                            components={
                              {SingleValue: IconSingleValue, Option: IconOption, DropdownIndicator: () => null}}
                            options={options}
                            styles={{colourStylesRow}}
                            autoSize={true}
                            menuPortalTarget={document.body}
                            placeholder={''}
                        />
                      </div>
                      <div style={{width: 210, fontSize: 100, margin: 10, alignItems: 'center'}}>
                        <Select
                            components={{
                              SingleValue: IconSingleValue, Option: IconOption,
                              DropdownIndicator: () => null
                            }}
                            options={options}
                            styles={{colourStylesRow}}
                            autoSize={false}
                            menuPortalTarget={document.body}
                            placeholder={''}
                        />
                      </div>
                      <div style={{width: 210, fontSize: 100, margin: 10}}>
                        <Select
                            components={{
                              SingleValue: IconSingleValue, Option: IconOption,
                              DropdownIndicator: () => null
                            }}
                            options={options}
                            styles={{colourStylesRow}}
                            autoSize={true}
                            menuPortalTarget={document.body}
                            placeholder={''}
                        />
                      </div>
                      <div style={{width: 210, fontSize: 100, margin: 10}}>
                        <Select
                            components={{
                              SingleValue: IconSingleValue, Option: IconOption,
                              DropdownIndicator: () => null
                            }}
                            options={options}
                            styles={{colourStylesRow}}
                            autoSize={true}
                            menuPortalTarget={document.body}
                            placeholder={''}
                        />
                      </div>
                      <div style={{width: 210, fontSize: 100, margin: 10}}>
                        <Select
                            components={{
                              SingleValue: IconSingleValue, Option: IconOption,
                              DropdownIndicator: () => null
                            }}
                            options={options}
                            styles={{colourStylesRow}}
                            autoSize={true}
                            menuPortalTarget={document.body}
                            placeholder={''}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{
                  display: "flex", justifyContent: "center",
                  alignItems: "center"
                }}>
                  <button id="pdfButton" className="button" onClick={() => generatePDF(targetRef, Options)}>
                    PDF
                  </button>
                  <div id="content-id">
                  </div>
                  {/*
                <button className="button" onClick={() => toPDF()} style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  PDF(A4)
                </button>
                */}

                </div>
                <div style={{display: "flex", justifyContent: "center", margin: 5}}>
                  <button className="button" onClick={onClicked}>{btnText}</button>
                </div>
              </div>
            </div>

          </div>
          <div
              style={{
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
              }}
          >
          </div>

          <div id="videoContainer" style={{display: "flex", justifyContent: 'center', margin: 20}}>
            <iframe id="myFrame" width={rangeSliderValue}
                    height="315" src="https://www.youtube.com/embed/t8IJOo3XlEg?si=G4NdFC4cdWQHMe1h"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
          </div>


          {/*
        <div className='sliderContainer'>
          <Slider>
            <input
                type="range"
                min="300"
                max="600"
                value={rangeSliderValue}
                onChange={(value) => handleRangeSliderChange(value)}
                className="slider"
            />
          </Slider>
        </div>


        <button className="button" onClick={rotate90}>Rotate</button>

        <button className="button" onClick={vaihdaFont}>Rotate</button>

        <div>Tietoja mahdollisista korkeuksista
          <form onSubmit={handleHeightSubmit} id={"rowForm"}>Kuinka monta riviä haluat taulukkoon?
            <input placeholder="lkm" style={{padding: 10, margin: 5}} onChange={(e) => setLkm(e.target.value)}
                   value={lkm}></input>
            <button type='submit'>Click to submit</button>
          </form>
        </div>

        */}


          {/*
        <button className="button" onClick={onClicked}></button>

        <input
            type="text"
            value={minHeight}
            onChange={changeMinHeight}
        />

        <button className='button' onClick={ChangeRowHeight}></button>
        */}

          <Footer></Footer>


        </div>
      </div>


  );
}

export default App;
