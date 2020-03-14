import React, { useEffect, useState } from 'react';
import { getCypherComments } from '../../../../http/cyphers';
import BoardRow from '../../../primitive/Board/BoardRow/BoardRow';
import Spinner from '../../../primitive/Spinner/Spinner';

const CypherComment = ({ nameEN, limit, tick }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    setComments(null);
    getCypherComments(nameEN, limit)
      .then(response => {
        setComments(response.data.comments);
      })
      .catch(e => {
        console.log(e);
      });
  }, [nameEN, tick, limit]);

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
    return <Spinner />;
  }
};

export default CypherComment;
