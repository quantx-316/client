import React, { useState, useEffect } from 'react'
import TimeSelectDialog from './TimeSelectDialog'
import { Button, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import { dispatchErrorMsg } from '../features/utils/notifs'
import { useDispatch } from 'react-redux'
import { Classes, Popover2 } from '@blueprintjs/popover2'
import { fetchQuoteAllowedTimes } from '../features/actions/quotes'
import {dateStrToDate, dateToUnix} from '../features/utils/time'
import {createCompetition} from '../features/actions/comps';
import Modal from './Modal';

type CompetitionProps = {
  isOpen: boolean, 
  handleClose: any, 
  onNewComp: any, 
}

const Competition = (props: CompetitionProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [compEndDate, setCompEndDate] = useState<Date | null>(null)

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
    setStartDate(date)
  }

  const onEndDateChange = (date: Date) => {
    setEndDate(date)
  }

  const onCompEndDateChange = (date: Date) => {
    setCompEndDate(date)
  }

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onChangeDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!title || !description || !startDate || !endDate || !compEndDate) {
      dispatchErrorMsg(dispatch, 'Not all required fields filled out')
      return 
    }

    //@ts-ignore 
    if (startDate >= endDate) {
      dispatchErrorMsg(
        dispatch,
        'End date must be strictly greater than end date'
      )
      return 
    }

    const startTime = dateToUnix(startDate)
    const endTime = dateToUnix(endDate)
    const compEndTime = dateToUnix(compEndDate);
    dispatch(
      createCompetition(
        {
          title: title, 
          description: description,
          end_time: compEndTime, 
          test_start: startTime, 
          test_end: endTime, 
        },
        props.onNewComp, 
      )
    )

  }

  return (
    <Modal
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      title={"New Competition"}
    >
      <div
        className="full"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '25px',
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '800px',
            }}
          >
            <FormGroup
              disabled={true}
              inline={false}
              labelFor="text-input"
              label={true && 'Title'}
              labelInfo={true && '(required)'}
            >
              <InputGroup
                fill={true}
                large={true}
                placeholder="Enter your title"
                // leftIcon="edit"
                onChange={onChangeTitle}
                value={title}
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
                // growVertically={true}
                fill={true}
                large={true}
                placeholder="Enter your description"
                onChange={onChangeDescription}
                value={description}
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
              <FormGroup
                disabled={true}
                inline={false}
                labelFor="text-input"
                label={true && 'Test Start'}
                labelInfo={true && '(required)'}
              >
                <Button
                  rightIcon="calendar"
                  text={startDate ? startDate.toString() : 'No test start date'}
                  onClick={() => onStartDateOpen()}
                  outlined={true}
                  fill={true}
                />
              </FormGroup>

              <FormGroup
                disabled={true}
                inline={false}
                labelFor="text-input"
                label={true && 'Test End'}
                labelInfo={true && '(required)'}
              >
                <Button
                  rightIcon="calendar"
                  text={endDate ? endDate.toString() : 'No test end date'}
                  onClick={() => onEndDateOpen()}
                  outlined={true}
                  fill={true}
                />
              </FormGroup>

              <FormGroup
                disabled={true}
                inline={false}
                labelFor="text-input"
                label={true && 'Competition End'}
                labelInfo={true && '(required)'}
              >
                <Button
                  rightIcon="calendar"
                  text={
                    compEndDate
                      ? compEndDate.toString()
                      : 'No competition end date'
                  }
                  onClick={() => onCompEndDateOpen()}
                  outlined={true}
                  fill={true}
                />
              </FormGroup>
              <Button
                  rightIcon="tick-circle"
                  intent="success"
                  text="Create"
                  type="submit"
                  large={true}
                  outlined={false}
                  onClick={handleSubmit}
                />
              {/* <Popover2
                interactionKind="click"
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                autoFocus={false}
                enforceFocus={false}
                placement="bottom-end"
                isOpen={runPopoverOpen}
                content="Created"
              >
                <Button
                  rightIcon="tick-circle"
                  intent="success"
                  text="Create"
                  type="submit"
                  large={true}
                  outlined={false}
                  onClick={handleSubmit}
                />
              </Popover2> */}
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
    </Modal>
  )
}

export default Competition
