import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import TimeSelectDialog from './TimeSelectDialog'
import { Button, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import { dispatchErrorMsg } from '../features/utils/notifs'
import { useDispatch } from 'react-redux'
import { Classes, Popover2 } from '@blueprintjs/popover2'
import { fetchQuoteAllowedTimes } from '../features/actions/quotes'
import {dateStrToDate, dateToUnix} from '../features/utils/time'
import {createCompetition, updateCompetition} from '../features/actions/comps';
import Modal from './Modal';

type CompetitionProps = {
  title?: string, 
  compForm?: any, 
  enabled?: boolean, 
}

const Competition = (props: CompetitionProps) => {

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(props.enabled ?? true);
  }, [props.enabled])

  const history = useHistory();

  const defCompForm = {
    title: '',
    description: '',
    startDate: null, 
    endDate: null, 
    compEndDate: null, 
  };

  const [compForm, setCompForm] = useState(props.compForm ?? defCompForm);

  useEffect(() => {
    setCompForm(props.compForm ?? defCompForm);
  }, [props.compForm])

  const [minDate, setMinDate] = useState<Date | null>(null)
  const [maxDate, setMaxDate] = useState<Date | null>(null)
  const now = new Date()
  //minimum competition end date is 7 days from now
  const minCompEndDate = dateStrToDate(now.setDate(now.getDate() + 7))
  const maxCompEndDate = dateStrToDate(now.setDate(now.getDate() + 30))

  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)
  const [compEndDateOpen, setCompEndDateOpen] = useState(false)

  const [runPopoverOpen, setRunPopoverOpen] = useState(false)

  useEffect(() => {
    fetchQuoteAllowedTimes(dispatch, setMinDate, setMaxDate);
  }, [])

  const dispatch = useDispatch()

  const onStartDateClose = () => {
    setStartDateOpen(false)
  }
  const onStartDateOpen = () => {
    setStartDateOpen(true)
  }
  const onEndDateClose = () => {
    setEndDateOpen(false)
  }
  const onEndDateOpen = () => {
    setEndDateOpen(true)
  }

  const onCompEndDateClose = () => {
    setCompEndDateOpen(false)
  }

  const onCompEndDateOpen = () => {
    setCompEndDateOpen(true)
  }

  const onStartDateChange = (date: Date) => {
    if (props.compForm) {
      dispatchErrorMsg(dispatch, "You cannot change this.");
      return;
    }

    setCompForm({
      ...compForm, 
      startDate: date, 
    })
  }

  const onEndDateChange = (date: Date) => {
    if (props.compForm) {
      dispatchErrorMsg(dispatch, "You cannot change this.");
      return;
    }

    setCompForm({
      ...compForm, 
      endDate: date, 
    })
  }

  const onCompEndDateChange = (date: Date) => {
    if (props.compForm) {
      dispatchErrorMsg(dispatch, "You cannot change this.");
      return;
    }

    setCompForm({
      ...compForm,
      compEndDate: date, 
    })
  }

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setCompForm({
      ...compForm,
      title: e.currentTarget.value,
    })
  }

  const onChangeDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setCompForm({
      ...compForm, 
      description: e.currentTarget.value,
    })
  }


  const onCreateNewComp = (data: any) => {
    if (data && data.id) {
      history.push("/competition/" + data.id);
    }
  }

  const onUpdateComp = (data: any) => {

  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!compForm.title || !compForm.description || !compForm.startDate || !compForm.endDate || !compForm.compEndDate) {
      dispatchErrorMsg(dispatch, 'Not all required fields filled out')
      return 
    }

    //@ts-ignore 
    if (compForm.startDate >= compForm.endDate) {
      dispatchErrorMsg(
        dispatch,
        'End date must be strictly greater than end date'
      )
      return 
    }

    const startTime = dateToUnix(compForm.startDate)
    const endTime = dateToUnix(compForm.endDate)
    const compEndTime = dateToUnix(compForm.compEndDate);

    if (props.compForm) {
      dispatch(
        updateCompetition(
          {
            id: props.compForm.id, 
            owner: props.compForm.owner, 
            created: props.compForm.created, 
            edited_at: props.compForm.edited_at, 
            end_time: compEndTime, 
            test_start: startTime, 
            test_end: endTime, 
            title: compForm.title, 
            description: compForm.description, 
          },
          onUpdateComp,
        )
      )
    } else {
      dispatch(
        createCompetition(
          {
            ...compForm, 
            end_time: compEndTime, 
            test_start: startTime, 
            test_end: endTime, 
          },
          onCreateNewComp, 
        )
      )
    }

  }

  return (
      <div
        className="full centered"
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: "700px",
              overflow: "auto",
              maxHeight: "500px",
              border: "1px solid #C0C0C0",
              padding: "10px"
            }}
          >

            <h1>
              {props.title ?? "New Competition"}
            </h1>

            <FormGroup
              disabled={true}
              inline={false}
              labelFor="text-input"
              label={true && 'Title'}
              labelInfo={true && '(required)'}
            >
              <InputGroup
                readOnly={!enabled}
                fill={true}
                large={true}
                placeholder="Enter your title"
                // leftIcon="edit"
                onChange={onChangeTitle}
                value={compForm.title}
              ></InputGroup>
            </FormGroup>

            <FormGroup
              disabled={true}
              inline={false}
              labelFor="text-input"
              label={true && 'Description'}
              labelInfo={true && '(required)'}
            >
              <TextArea
                style={{
                  height: "300px"
                }}
                readOnly={!enabled}
                fill={true}
                large={true}
                placeholder="Enter your description"
                onChange={onChangeDescription}
                value={compForm.description}
              />
            </FormGroup>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignContent: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}
            >

              <div
                style={{
                  display: "flex",
                }}
              >
                <FormGroup
                  disabled={true}
                  inline={false}
                  labelFor="text-input"
                  label={'Test Start'}
                  labelInfo={'(required)'}
                >
                  <Button
                    disabled={!enabled}
                    rightIcon="calendar"
                    text={compForm.startDate ? compForm.startDate.toString() : 'No test start date'}
                    onClick={() => onStartDateOpen()}
                    outlined={true}
                    fill={true}
                  />
                </FormGroup>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start"
                }}
              >
                <FormGroup
                  disabled={true}
                  inline={false}
                  labelFor="text-input"
                  label={'Test End'}
                  labelInfo={'(required)'}
                >
                  <Button
                    disabled={!enabled}
                    rightIcon="calendar"
                    text={compForm.endDate ? compForm.endDate.toString() : 'No test end date'}
                    onClick={() => onEndDateOpen()}
                    outlined={true}
                    fill={true}
                  />
                </FormGroup>
              </div>
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start"
                }}
              >
                <FormGroup
                  disabled={true}
                  inline={false}
                  labelFor="text-input"
                  label={'Competition End'}
                  labelInfo={'(required)'}
                >
                  <Button
                    disabled={!enabled}
                    rightIcon="calendar"
                    text={
                      compForm.compEndDate
                        ? compForm.compEndDate.toString()
                        : 'No competition end date'
                    }
                    onClick={() => onCompEndDateOpen()}
                    outlined={true}
                    fill={true}
                  />
                </FormGroup>
              </div>
                
                {
                  enabled && 
                  <div
                    className="centered"
                  >
                    <Button
                        rightIcon="tick-circle"
                        intent="success"
                        text={props.compForm ? "Save" : "Create"}
                        type="submit"
                        large={true}
                        outlined={false}
                        onClick={handleSubmit}
                      />
                  </div>
                }
            </div>
          </div>
        </form>

        <TimeSelectDialog
          isOpen={startDateOpen}
          handleClose={onStartDateClose}
          title={'Select start date'}
          onDateChange={onStartDateChange}
          minDate={minDate}
          maxDate={maxDate}
        />

        <TimeSelectDialog
          isOpen={endDateOpen}
          handleClose={onEndDateClose}
          title={'Select end date'}
          onDateChange={onEndDateChange}
          minDate={minDate}
          maxDate={maxDate}
        />

        <TimeSelectDialog
          isOpen={compEndDateOpen}
          handleClose={onCompEndDateClose}
          title={'Select competition end date'}
          onDateChange={onCompEndDateChange}
          minDate={minCompEndDate}
          maxDate={maxCompEndDate}
        />
      </div>
  )
}

export default Competition
