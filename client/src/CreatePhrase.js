import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import trashImage from "./img/trash.png";
import Button from "react-bootstrap/esm/Button";
import { useRef, useState } from "react";
import axios from "axios";

const CreatePhrase = (props) => {
  const filePicker = useRef();
  const [base64ImageString, setBase64ImageString] = useState()
  const [imgSrc, setImgSrc] = useState()

  // const imgToBase64 = (img) => {
  //   let reader = new FileReader()
  //   reader.onloadend = () => {
  //     console.log(reader.result)
  //     setBase64ImageString(reader.result)
  //     props.editFlashcard(props.index, "base64Image", reader.result);
  //   }
  //   reader.readAsDataURL(img);
  //   console.log(reader.result)
  //   return reader.result
  // }

  const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("image", image)
    const result = await axios.post("http://localhost:5000/api/images", formData, {
      headers: {'Content-Type': 'multipart/form-data'}})
    setImgSrc("http://localhost:5000/" + result.data.imageUrl)
    props.editFlashcard(props.index, "imageUrl", "http://localhost:5000/" + result.data.imageUrl);
  }

  return (
    <div className="p-3 mt-3 fraza">
      <Form>
        <div
          className="p-1"
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <div>{props.index + 1}</div>
          <div>
            <img src={trashImage} alt="" height="15"></img>
          </div>
        </div>
        <Row>
          <Col sm={12} md={5}>
            <Form.Control
              type="text"
              placeholder="Pojęcie"
              className="fraza-input"
              defaultValue={props.word}
              onChange={(e) => {
                props.editFlashcard(props.index, "word", e.target.value);
              }}
            ></Form.Control>
            <div className="podpis mt-1">POJĘCIE</div>
          </Col>
          <Col sm={12} md={5}>
            <Form.Control
              className="fraza-input"
              type="text"
              placeholder="Definicja"
              defaultValue={props.translation}
              onChange={(e) => {
                props.editFlashcard(props.index, "translation", e.target.value);
              }}
            ></Form.Control>
            <div className="podpis mt-1">DEFINICJA</div>
          </Col>
          <Col md={1}>
            {imgSrc ?
            <div>
              <img src={imgSrc} height="50" width="60"></img>
              <span>Usuń obraz</span>
            </div>
            :
            <div>
              <div onClick={() => filePicker.current.click()}>Dodaj obraz</div>
              <input
                ref={filePicker}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => uploadImage(e.target.files[0])}
              ></input>
            </div>
            }
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CreatePhrase;
