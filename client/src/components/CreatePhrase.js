import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import trashImage from "../img/trash.png";
import Button from "react-bootstrap/esm/Button";
import { useRef, useState } from "react";
import axios from "../utils/axios";
import Popup from "./Popup";
import useAuth from "../hooks/useAuth";

const CreatePhrase = (props) => {
  const filePicker = useRef();
  const [imageUrls, setImageUrls] = useState(props.imageUrls || []);
  const [errorText, setErrorText] = useState();
  const { user } = useAuth()

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
      "/api/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setImageUrls(
      imageUrls.concat(["/" + result.data.imageUrl])
    );
    props.editFlashcard(
      props._id,
      "imageUrls",
      imageUrls.concat(["/" + result.data.imageUrl])
    );
  };

  const deleteImage = (e, index) => {
    e.preventDefault();
    let newImageArray = imageUrls.filter(value => value !== imageUrls[index])
    setImageUrls(newImageArray);
    props.editFlashcard(props._id, "imageUrls", newImageArray);
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
              onClick={() => props.deleteFlashcard(props._id)}
            ></img>
          </div>
        </div>
        <Row>
          <Col sm={12} md={4}>
            <input
              type="text"
              placeholder="Słówko"
              className="text-input"
              defaultValue={props.word}
              onChange={(e) => {
                props.editFlashcard(props._id, "word", e.target.value.trim());
              }}
            ></input>
            <div className="podpis mt-1">SŁÓWKO</div>
          </Col>
          <Col sm={12} md={4}>
            <input
              className="text-input"
              type="text"
              placeholder="Definicja"
              defaultValue={props.translation}
              onChange={(e) => {
                props.editFlashcard(
                  props._id,
                  "translation",
                  e.target.value.trim()
                );
              }}
            ></input>
            <div className="podpis mt-1">DEFINICJA</div>
          </Col>
          <Col md={2} style={{ display: "flex" }}>
            {imageUrls.map((image, index) => {
              return (
                <div key={image} className="image-container">
                  <img
                    className="p-1"
                    src={image}
                    height="100"
                    width="100"
                    alt="obraz definicji"
                  ></img>
                  <Button
                    className="red overlay-button"
                    onClick={(e) => deleteImage(e, index)}
                    style={{ fontSize: "small" }}
                  >
                    <img src={trashImage} alt="" height="15"></img>
                  </Button>
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
