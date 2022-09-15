import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const WordPair = (props) => {
    return (
        <div className="word-pair p-4 m-1">
            <Row>
                <Col sm={6}>
                    {props.word}
                </Col>
                <Col sm={6}>
                    {props.translation}
                </Col>
            </Row>
        </div>
    )
}
export default WordPair;