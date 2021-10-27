import React, {Component} from 'react'
import {
  Container, Row, Col
} from 'reactstrap';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
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
      maxChapters: 33,
      mainText: []
    }

    this.changeBook = this.changeBook.bind(this)
    this.nextChapter = this.nextChapter.bind(this)
    this.changeChapter = this.changeChapter.bind(this)
    this.prevChapter = this.prevChapter.bind(this)
    this.updateMainText = this.updateMainText.bind(this)
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyA82zcPEsxhD4dAnJ6c_QotN8n7hqrPsEw",
      authDomain: "yv-api-5737d.firebaseapp.com",
      databaseURL: "https://yv-api-5737d.firebaseio.com",
      projectId: "yv-api-5737d",
      storageBucket: "yv-api-5737d.appspot.com",
      messagingSenderId: "1067244693931",
      appId: "1:1067244693931:web:dfe0203bc9fe77e646caee",
      measurementId: "G-55VK3ZZZ20"
    };
    this.app = initializeApp(firebaseConfig);
    this.updateMainText()
  }

  changeBook(book) {
    book = Number(book)
    if (this.state.chapter > this.mapping[book]) {
      this.setState({book: book, chapter: 1, maxChapters: this.mapping[book]}, this.updateMainText)
    } else {
      this.setState({
        book: book,
        maxChapters: this.mapping[book]
      }, this.updateMainText)
    }
  }

  changeChapter(chapter) {
    chapter = Number(chapter)
    this.setState({
      chapter: chapter
    }, this.updateMainText)
  }

  nextChapter() {
    if (this.state.chapter === this.state.maxChapters) {
      if (this.state.book < 7) {
        this.setState(
          {book: this.state.book + 1, chapter: 1, maxChapters: this.mapping[this.state.book+1]},
          this.updateMainText)
      }
    } else {
      this.setState({chapter: this.state.chapter + 1}, this.updateMainText)
    }
  }

  prevChapter() {
    if (this.state.chapter === 1) {
      if (this.state.book > 1) {
        this.setState({book: this.state.book - 1, chapter: this.mapping[this.state.book-1], maxChapters: this.mapping[this.state.book+1]})
      }
    } else {
      this.setState({chapter: this.state.chapter - 1}, this.updateMainText)
    }
  }

  updateMainText() {
    const db = getDatabase();
    const starCountRef = ref(db, `yv/yv_core/${this.state.book}/${this.state.chapter}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.setState({mainText: data})
    });
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
        <br />
        <VerseDisplay 
          nextChapter={this.nextChapter}
          prevChapter={this.prevChapter}
          mainText={this.state.mainText}
        />
        <br />
      </Container>
    </div>
  }
}

export default App