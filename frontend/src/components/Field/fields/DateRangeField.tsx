import React, { Component } from 'react';
import { FormGroup, Label } from 'reactstrap';
import { IFieldProps } from '../types';
import DateField from './DateField';

class DateRangeField extends Component<IFieldProps> {
  public state = {
    startDate: '',
    endDate: '',
  };

  render() {
    const { startDate, endDate } = this.state;
    const { onChangeRequest } = this.props;

    return (
      <div className="d-flex">
        <FormGroup className="mb-3 mr-2 d-flex flex-column">
          <Label>
            <div>Starting Date</div>
          </Label>
          <DateField
            type="date"
            selected={startDate}
            onChange={date =>
              this.setState({ startDate: date }, () =>
                onChangeRequest(date, endDate)
              )
            }
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </FormGroup>
        <FormGroup className="mb-3 ml-2 d-flex flex-column">
          <Label>
            <div>Ending Date</div>
          </Label>
          <DateField
            type="date"
            selected={endDate}
            onChange={date =>
              this.setState({ endDate: date }, () =>
                onChangeRequest(startDate, date)
              )
            }
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </FormGroup>
      </div>
    );
  }
}

export default DateRangeField;
