import WordPair from "./WordPair";
import "../css/PhraseList.css"

const PhraseList = ({ items }) => {
  return (
    <div className="phrase-list">
      {items.map((pair, index) => {
        return (
          <WordPair
            key={index}
            word={pair.word}
            translation={pair.translation}
          />
        );
      })}
    </div>
  );
};
export default PhraseList;
