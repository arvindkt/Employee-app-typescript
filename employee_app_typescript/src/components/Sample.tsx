 /*
 * Copyright (c) 2020 athenahealth, Inc. All Rights Reserved.
 */
import React from 'react';
import {​ CSVLink }​ from 'react-csv';
import {​ Button, Tooltip, Input , DateInput, FormField, GridRow, GridCol }​ from '@athena/forge';
import Labels from '../../../constants/Labels';
const Sample = (props: any) => {​
  return (
    <div className="actionButtons">
      <span className="leftActionButtons">
        <span className="searchFilters">
        <GridRow>
          <GridCol width={​{​ small: 24, medium: 12, large: 8 }​}​>
            <FormField
                id = "ruleid"
                className = "rule search"
                inputAs={​Input}​
                labelText="Rule ID"
                onChange={​(event) => props.handleChange(event)}​
            />
          </GridCol>
          <GridCol width={​{​ small: 12, medium: 6, large: 4 }​}​>
            <Button
              text={​Labels.DASHBOARD.BUTTONS.SEARCH}​
              variant="primary"
              className="extra-margin"
              onClick={​props.handleClick}​
            />
          </GridCol>
          <GridCol width={​{​ small: 12, medium: 6, large: 4 }​}​>
            <span className="rightActionButtons">
              <CSVLink data={​props.data}​ filename={​`${​props.filename || 'data'}​.csv`}​>
                <Tooltip text={​Labels.DASHBOARD.BUTTONS.EXPORT}​ id="info-export">
                  <Button
                    text={​Labels.DASHBOARD.BUTTONS.EXPORT}​
                    variant="primary"
                    icon="Export"
                    className="extra-margin"
                  />
                </Tooltip>
              </CSVLink>
            </span>
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol width={​{​ small: 12, medium: 6, large: 4 }​}​ >
           <FormField
            id = "start-date"
            className = "start-date-filter"
            inputAs={​DateInput}​
            labelText="Start Date"
            onChange={​(event) => props.handleDate(event)}​
          />
          </GridCol>
          <GridCol width={​{​ small: 12, medium: 6, large: 4 }​}​ >
            <Button
              text={​Labels.DASHBOARD.BUTTONS.SEARCH}​
              variant="primary"
              className="extra-margin"
              onClick={​props.handleClick}​
            />
          </GridCol>
        </GridRow>
          {​/* <FormField
              id = "ruleid"
              className = "rule search"
              inputAs={​Input}​
              labelText="Rule ID"
              onChange={​(event) => props.handleChange(event)}​
          />
          <Button
            text={​Labels.DASHBOARD.BUTTONS.SEARCH}​
            variant="primary"
            className="extra-margin"
            onClick={​props.handleClick}​
          /> */}​
          {​/* <FormField
            id = "start-date"
            className = "start-date-filter"
            inputAs={​DateInput}​
            labelText="Start Date"
            onChange={​(event) => props.handleDate(event)}​
          />
          <Button
            text={​Labels.DASHBOARD.BUTTONS.SEARCH}​
            variant="primary"
            className="extra-margin"
            onClick={​props.handleDateSearch}​
          /> */}​
        </span>
      </span>
    </div>
  );
}​;
export default DualMaintenanceActions;
    
    
  
  

