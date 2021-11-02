import React, { useState } from 'react'
import TimeSelectDialog from './TimeSelectDialog'
// import { dateToUnix } from '../features/utils/time'
import { Button, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import { dispatchErrorMsg } from '../features/utils/notifs'
import { useDispatch } from 'react-redux'

const Competition: React.FC = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const [minDate, setMinDate] = useState<Date | null>(null)
  const [maxDate, setMaxDate] = useState<Date | null>(null)

  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

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

  const onStartDateChange = (date: Date) => {
    setStartDate(date)
  }

  const onEndDateChange = (date: Date) => {
    setEndDate(date)
  }

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onChangeDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (title && description) {
      return
    }

    dispatchErrorMsg(dispatch, 'Not all fields filled out')
  }

  return (
    <>
      <div
        className="full"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '25px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '800px',
          }}
        >
          <form onSubmit={handleSubmit}>
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
                leftIcon="edit"
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
                fill={true}
                growVertically={true}
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
                    endDate ? endDate.toString() : 'No competition end date'
                  }
                  onClick={() => onEndDateOpen()}
                  outlined={true}
                  fill={true}
                />
              </FormGroup>

              <Button
                rightIcon="tick-circle"
                intent="success"
                text="Register"
                type="submit"
                large={true}
                outlined={false}
              />
            </div>
          </form>
        </div>

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
          isOpen={startDateOpen}
          handleClose={onStartDateClose}
          title={'Select start date'}
          onDateChange={onStartDateChange}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    </>
  )
}

export default Competition
