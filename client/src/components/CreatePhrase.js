import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import trashImage from "../img/trash.png";
import Button from "react-bootstrap/esm/Button";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import Popup from "./Popup";
import UserContext from "../context/UserContext";

const CreatePhrase = (props) => {
  const filePicker = useRef();
  const [imageUrls, setImageUrls] = useState(props.imageUrls || []);
  const [errorText, setErrorText] = useState();
  const [index, setIndex] = useState(props.index);
  const { user } = useContext(UserContext)

  const uploadImage = async (image) => {
    if (image.size >= 2000000) {
      setErrorText("Za duży obraz. Maksymalny rozmiar to 2MB.");
      return;
    }

    if (!image.type.startsWith("image")) {
      setErrorText("Wstaw obraz, nie co innego.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    const result = await axios.post(
      "http://localhost:5000/api/images",
      formData,
      {headers: { "Content-Type": "multipart/form-data", 'Authorization': `Bearer ${user.token}`}},
    );

    setImageUrls(imageUrls.concat(["http://localhost:5000/" + result.data.imageUrl]))
    props.editFlashcard(
      props.index,
      "imageUrls",
      imageUrls.concat(["http://localhost:5000/" + result.data.imageUrl])
    );
  };

  const deleteImage = (e, index) => {
    e.preventDefault();
    console.log(index)
    let copy = imageUrls
    return
    console.log(imageUrls.length === 1)
    let newImageArray
    if (copy.length === 1) {
      newImageArray = []
    } else {
      newImageArray = copy.splice(imageUrls.indexOf(imageUrls[index]) - 1, 1);
      console.log(newImageArray)
    }
    setImageUrls(newImageArray);
    props.editFlashcard(
      props.index,
      "imageUrls",
      newImageArray)
  };

  return (
    <div className="p-3 mt-3 fraza">
      <Popup
        show={errorText ? true : false}
        text={errorText}
        onHide={() => setErrorText(null)}
      />
      <Form>
        <div
          className="p-1"
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <div>{props.index + 1}</div>
          <div>
            <img
              src={trashImage}
              alt=""
              height="15"
              onClick={() => props.deleteFlashcard(props.index)}
            ></img>
          </div>
        </div>
        <Row>
          <Col sm={12} md={4}>
            <input
              type="text"
              placeholder="Pojęcie"
              className="text-input"
              defaultValue={props.word}
              onChange={(e) => {
                props.editFlashcard(props.index, "word", e.target.value.trim());
              }}
            ></input>
            <div className="podpis mt-1">POJĘCIE</div>
          </Col>
          <Col sm={12} md={4}>
            <input
              className="text-input"
              type="text"
              placeholder="Definicja"
              defaultValue={props.translation}
              onChange={(e) => {
                props.editFlashcard(
                  props.index,
                  "translation",
                  e.target.value.trim()
                );
              }}
            ></input>
            <div className="podpis mt-1">DEFINICJA</div>
          </Col>
          <Col md={2} style={{display: "flex"}}>
            {imageUrls.map((image, index) => {
              return (
                <div key={index}>
                  <img src={image} height="50" width="50"></img>
                  <span onClick={(e) => deleteImage(e, index)} style={{fontSize: "small"}}>
                    Usuń obraz
                  </span>
                </div>
              );
            })}
            <div>
              <Button onClick={() => filePicker.current.click()}>
                Dodaj obraz
              </Button>
              <input
                ref={filePicker}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => uploadImage(e.target.files[0])}
              ></input>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default CreatePhrase;
