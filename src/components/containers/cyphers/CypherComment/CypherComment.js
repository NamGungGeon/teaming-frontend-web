import React, { useEffect, useState } from 'react';
import { getCypherComments } from '../../../http/cyphers';
import BoardRow from '../../primitive/Board/BoardRow/BoardRow';

const CypherComment = ({ nameEN, limit }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    console.log(nameEN);
    getCypherComments(nameEN, limit)
      .then(response => {
        setComments(response.data.comments);
      })
      .catch(e => {
        console.log(e);
      });
  }, [nameEN]);

  if (comments) {
    return (
      <div>
        {comments.map(comment => {
          return (
            <BoardRow
              thumbnail={null}
              title={comment.comment}
              explains={[comment.createDate]}
            />
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CypherComment;
