import React, { Component } from 'react';
import { Row, Col, CardHeader, CardBody, Card } from 'reactstrap';

class VerseDisplay extends Component {
 
  render() {
    return (
      <Row>
        <Col>
          <Card className="card bg-light mb-3">
            <CardHeader>
              <button type="button" className="btn btn-secondary float-left btn-sm" onClick={this.props.prevChapter}>Previous</button>
              <button type="button" className="btn btn-secondary float-right btn-sm" onClick={this.props.nextChapter}>Next</button>
              <center><h4>मूलश्लोकाः</h4></center>
            </CardHeader>
            <CardBody>
              <center>
                <h5 className="display-linebreak">
                  {
                    this.props.mainText.map((verse, verse_index) => {
                      verse = verse.concat(["\n"])
                      return verse.map((line, index) => <div key={[verse_index, index]}>{ line }<br /></div>)
                    })
                  }
                </h5>
              </center>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default VerseDisplay