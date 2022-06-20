import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../../../context/Context';
import timeForToday from '../../../utils/timeForToday';
import ReplyCreate from './ReplyCreate';

const ReplyListBlock = styled.div`
  .total {
    margin: 20px 0 20px 5px;
    font-size: 20px;
  }
`;

const Reply = styled.div`
  padding: 15px;
  margin: 15px 0;
  border: 1px solid lightgrey;
  display: grid;
  grid-template-columns: 7fr 1fr;
  grid-gap: 10px;

  .replyInfo {
    font-size: 15px;
  }

  .nickname {
    font-weight: bold;
  }

  .content {
    font-size: 17px;
    line-height: 30px;
    grid-column: 1 / span 2;
  }

  .time {
    text-align: right;
    color: grey;
  }

  .buttonGroup {
    grid-column: 2 / span 1;
    display: flex;
    justify-content: right;
    align-items: flex-end;
    font-size: 16px;
    color: grey;
  }

  .deleteBtn {
    margin-left: 10px;
    color: #b71d1d;
  }
`;

function ReplyList({ replies }) {
  const { loggedUser } = useContext(Context);
  return (
    <ReplyListBlock>
      <ReplyCreate />
      <div className='total'>총 댓글 수: {replies.length}</div>
      {replies.length > 0 &&
        replies.map((reply, index) => (
          <Reply key={index}>
            <div className='nickname replyInfo'>
              {reply.nickname} ({reply.user_id})
            </div>
            <div className='time replyInfo'>{timeForToday(reply.regdate)}</div>
            <div className='content replyInfo'>{reply.content}</div>
            {loggedUser.id === reply.writer && (
              <div className='buttonGroup'>
                <div className='button'>수정</div>
                <div className='button deleteBtn'>삭제</div>
              </div>
            )}
          </Reply>
        ))}
    </ReplyListBlock>
  );
}

export default ReplyList;
