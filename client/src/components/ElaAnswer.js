const ElaAnswer = ({text, checkAnswer, index}) => {

  return (
    <div onClick={() => {checkAnswer(text); console.log("clicked answer")}} className="ela-answer p-3 m-3">
      {text}
    </div>
  )
}
export default ElaAnswer