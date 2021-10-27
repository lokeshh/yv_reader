import React, {Component} from 'react'
import {
  Container, Row, Col
} from 'reactstrap';
import VerseSelector from './VerseSelector'
import VerseDisplay from './VerseDisplay';

class App extends Component {
  constructor() {
    super()

    this.mapping = {
      1: 33,
      2: 20,
      3: 122,
      4: 62,
      5: 93,
      6: 128,
      7: 216
    }

    this.state = {
      book: 1,
      chapter: 1,
      maxChapters: 33
    }

    this.changeBook = this.changeBook.bind(this)
    this.nextChapter = this.nextChapter.bind(this)
    this.changeChapter = this.changeChapter.bind(this)
    this.prevChapter = this.prevChapter.bind(this)
  }

  changeBook(book) {
    book = Number(book)
    this.setState({
      book: book,
      maxChapters: this.mapping[book]
    })
  }

  changeChapter(chapter) {
    chapter = Number(chapter)
    this.setState({
      chapter: chapter
    })
  }

  nextChapter() {
    if (this.state.chapter === this.state.maxChapters) {
      if (this.state.book < 7) {
        this.setState({book: this.state.book + 1, chapter: 1, maxChapters: this.mapping[this.state.book+1]})
      }
    } else {
      this.setState({chapter: this.state.chapter + 1})
    }
  }

  prevChapter() {
    if (this.state.chapter === 1) {
      if (this.state.book > 1) {
        this.setState({book: this.state.book - 1, chapter: this.mapping[this.state.book-1], maxChapters: this.mapping[this.state.book+1]})
      }
    } else {
      this.setState({chapter: this.state.chapter - 1})
    }
  }  

  render() {
    return <div>
      <Container>
        <Row>
          <Col>
            <h1>योगवासिष्ठः</h1>
          </Col>
        </Row>

        <br />
        <VerseSelector 
          book={this.state.book} 
          chapter={this.state.chapter} 
          maxChapters={this.state.maxChapters}
          changeBook={this.changeBook}
          changeChapter={this.changeChapter}
        />
        <VerseDisplay 
          nextChapter={this.nextChapter}
          prevChapter={this.prevChapter}  
        />
        <br />
      </Container>
    </div>
  }
}

export default App