const ElaAnswer = ({text, checkAnswer, index}) => {

  return (
    <div onClick={() => {checkAnswer(text)}} className="ela-answer p-3 m-3">
      {text}
    </div>
  )
}
export default ElaAnswer