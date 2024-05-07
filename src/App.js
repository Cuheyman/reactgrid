import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import './ag-grid.css';
import './ag-theme-alpine.css';
import Papa from 'papaparse';
import Stylecomponents from './styles.js';
import styled from '@emotion/styled';
import './App.css'
import { useRef, useState, useEffect } from 'react';

  const {Styles, Container, ArrowsContainer, ArrowButton} = Stylecomponents;


const ArrowIcon = styled.span ` 
display: inline-block;
  width: 12px;
  height: 12px;
  border-left: 5px solid #000;
  border-bottom: 5px solid #000;
  transform: rotate(45deg);
` ;


const App = () => {
  const [rowData, setRowData] = React.useState([]);
  const [columnDefs, setColumnDefs] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  const gridRef = React.useRef();
  const containerRef = React.useRef();
  const [rowData1, setRowData1] = React.useState([]);
  const [dragEnabled, setDragEnabled] = useState(true);
  const gridApi = useRef(null);

  const [columnDefs1, setColumnDefs1] = React.useState([]);

React.useEffect(() => {
  Papa.parse('./lv1.csv', {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
      const headers = results.meta.fields;
      const allColumns = headers.map((header) => {
        return {
          headerName: header,
          field: header,
          sortable: true,
          filter: true,
    
        };
      });
      setColumnDefs1(allColumns);
      setRowData1(results.data);
    },
  });
}, []);

React.useEffect(() => {
  Papa.parse('./Scope3.csv', {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
      const headers = results.data[0];
      const allColumns = Object.keys(headers).map((header) => {
        return {
          headerName: header,
          field: header,
          sortable: true,
          filter: true,
          
        };
      });

      // Include a new column at the start for row dragging
      allColumns.unshift({
        headerName: "Drag",
        rowDrag: true,
        width: 80,
        maxWidth: 80,
        cellClass: 'cell-drag',
      });

      setColumnDefs(allColumns);
      setRowData(results.data);
    }
   
  
  });
}, [dragEnabled]);

const handleRowDragEnd = (event) => {
  const movingNodes = gridApi.current.getSelectedNodes();
  const movingDataArray = movingNodes.map(node => node.data);

  // Remove the row being dragged from the first table
  setRowData(prevData => {
    let updatedData = [...prevData];
    movingDataArray.forEach(movingData => {
      updatedData = updatedData.filter(row => row !== movingData);
    });
    return updatedData;
  });

  // Add the row being dragged to the second table
  setRowData1(prevData => {
    let updatedData = [...prevData];
    updatedData.splice(event.overIndex, 0, ...movingDataArray);
    return updatedData;
  });
};

const handleRowDragEnter = (event) => {
  event.api.rowDragMove(event);
};


  const handleExpandClick = () => {
    setExpanded(!expanded);
    setSortConfig(null);
    setSearchText('');
  };



  React.useEffect(() => {
    const containerElement = containerRef.current;
    if (expanded) {
      containerElement.style.width = '70%';
    } else {
      containerElement.style.width = '30%';
    }
  }, [expanded]);

  let filteredData = rowData;
  if (searchText) {
    filteredData = filteredData.filter((row) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  if (sortConfig) {
    const { field, order } = sortConfig;
    filteredData = filteredData.slice().sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      if (valueA === valueB) return 0;
      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }

  return (
    <Styles>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <label style={{
          fontFamily: 'sans-serif',
          fontWeight: 'bolder',
          marginLeft: '30px'
        }}
        
        
        >Search the table </label>
        <input
          type="text"
          value={searchText}
          
          onChange={(e) => setSearchText(e.target.value)}
     
          style={{ width: '10%', border: '3px solid darkblue', borderRadius: '20px' }}
        />
  
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Container

            ref={containerRef}
            className="ag-theme-alpine"
            style={{ transition: 'width 0.8s', width: '70%', marginRight: '50px' }}
          >
            <AgGridReact
              ref={gridRef}
              onGridReady={params => {
                gridApi.current = params.api;
              }}
            rowSelection='multiple'
            onRowDragEnd={handleRowDragEnd}
              rowData={filteredData}
              columnDefs={columnDefs}
              rowDragManaged={true}
              animateRows={true}
              defaultColDef={{
                flex: 1,
                minWidth: 150,
                resizable: true,
              }}
       
            >
            </AgGridReact>
            <ArrowsContainer>
              <ArrowButton onClick={handleExpandClick}>
                <ArrowIcon />
              </ArrowButton>
            </ArrowsContainer>
          </Container>
          <Container
            className="ag-theme-alpine"
            style={{ transition: 'width 0.8s', width: '30%', height: '75%' }}
          >
            <AgGridReact
              rowData={rowData1}
              columnDefs={columnDefs1}
              onRowDragEnd={handleRowDragEnter}
              defaultColDef={{
                flex: 2,
                width: 100,
                resizable: true,
                className : '.second-table',
              }}
            />

          </Container>
          
        </div>
      </div>
    </Styles>
  );
  
      };

      export default App;
