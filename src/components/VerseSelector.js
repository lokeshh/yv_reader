import React, {Component} from 'react'
import {Row, Col} from 'reactstrap'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select';

class VerseSelector extends Component {
  render() {
    return <div><center>
      <Row>
        <Col>
          <InputLabel id="demo-simple-select-label">प्रकरणम्</InputLabel>
          <Select
            native
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.props.book}
            onChange={(event) => this.props.changeBook(event.target.value)}
          >
            {
                [1, 2, 3, 4, 5, 6, 7].map(i => {
                  return <option value={i} key={i}>{i}</option>
                })
            }
          </Select>
        </Col>

        <Col>
          <InputLabel id="demo-simple-select-label">सर्गः</InputLabel>
          <Select
            native
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.props.chapter}
            onChange={(event) => this.props.changeChapter(event.target.value)}
          >
            {
              [...Array(this.props.maxChapters).keys()].map(i => {
                i += 1;
                return <option value={i} key={i}>{i}</option>
              })        
            }
          </Select>          
        </Col>
      </Row>
    </center></div>
  }
}

export default VerseSelector